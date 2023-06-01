const { router, db } = require("../includes");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.get("/", (req, res, next) => {
  // console.log(req.ip);
  res.json({ message: "hello" });
});

router.post("/", (req, res, next) => {
  // let user_id = db.escape(req.body.user_id);
  let user_id = req.body.user_id;
  db.query(
    "SELECT username, password, ip, level FROM user WHERE username=?",
    [user_id],
    function (err, data) {
      if (err) throw err;
      if (data.length < 1) {
        return res.status(401).json({
          message: "Auth failed",
        });
      } else {
        let ipcl = req.ip.toString().replace("::ffff:", "");
        if (data[0].ip != null) {
          let ips = data[0].ip.split(",");
          if (ips.includes(ipcl)) {
            bcrypt.compare(
              req.body.user_key,
              data[0].password,
              (err, result) => {
                if (err) {
                  return res.status(401).json({
                    message: "Auth failed",
                  });
                }
                if (result) {
                  const token = jwt.sign(
                    {
                      user_id: data[0].username,
                      token: req.body.token,
                      level: data[0].level,
                    },
                    data[0].password,
                    {
                      expiresIn: "1h",
                    }
                  );

                  db.query(
                    "UPDATE user SET bearer=? WHERE username=?",
                    [token, data[0].username],
                    function (err, res) {
                      if (err) throw err;
                    }
                  );

                  return res.status(200).json({
                    message: "Auth successful",
                    token: token,
                  });
                } else {
                  return res.status(401).json({
                    message: "Auth failed",
                  });
                }
              }
            );
          } else {
            return res.status(401).json({
              message: "Auth failed",
            });
          }
        } else {
          return res.status(401).json({
            message: "Auth failed",
          });
        }
      }
    }
  );
});

module.exports = router;
