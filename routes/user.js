const { router, verify, db } = require("../includes");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

router.get("/", (req, res, next) => {
  // console.log(req.userData);
  res.json({ message: "hello" });
});

router.get("/:username", verify, (req, res, next) => {
  // console.log(req.userData);
  const sql =
    "SELECT username, token, ip, level FROM user WHERE username=" +
    db.escape(req.params.username);
  db.query(sql, function (err, data) {
    if (err) throw err;
    if (data.length == 1) {
      res.json(data[0]);
    } else {
      res.json([]);
    }
  });
});

router.post("/create", (req, res, next) => {
  let user_id = req.body.user_id;
  db.query(
    "SELECT username FROM user WHERE username=?",
    [user_id],
    function (err, data) {
      if (err) throw err;
      if (data.length >= 1) {
        return res.status(409).json({
          message: "user_id exists",
        });
      } else {
        let user_key = makekey(8);
        bcrypt.hash(user_key, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const sha1 = crypto
              .createHash("sha1")
              .update(user_id + hash)
              .digest("hex");
            db.query(
              "INSERT INTO user (username, password, token, ip) values (?, ?, ?, ?)",
              [user_id, hash, sha1, "127.0.0.1"],
              function (err, data) {
                if (err) throw err;
                res.status(201).json({
                  user_id: user_id,
                  user_key: user_key,
                  token: sha1,
                });
              }
            );
          }
        });
      }
    }
  );
});

router.post("/reset", verify, (req, res, next) => {
  let bearer = req.userData;
  if (bearer.level == "1") {
    let user_id = req.body.user_id;
    db.query(
      "SELECT username, token, ip, level FROM user WHERE username=?",
      [user_id],
      function (err, data) {
        if (err) throw err;
        if (data.length == 1) {
          let user_key = makekey(8);
          bcrypt.hash(user_key, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err,
              });
            } else {
              const sha1 = crypto
                .createHash("sha1")
                .update(user_id + hash)
                .digest("hex");
              db.query(
                "UPDATE user SET password=?, token=?, bearer=null WHERE username=?",
                [hash, sha1, user_id],
                function (err, data) {
                  if (err) throw err;
                  res.status(201).json({
                    user_id: user_id,
                    user_key: user_key,
                    token: sha1,
                  });
                }
              );
            }
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
});

function makekey(length) {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

module.exports = router;
