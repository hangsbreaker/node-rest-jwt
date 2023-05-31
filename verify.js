const db = require("./con");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader != undefined) {
    const token = authHeader && authHeader.split(" ");
    if (token[0] == "Bearer") {
      db.query(
        "SELECT password, ip FROM user WHERE bearer=?",
        [token[1]],
        function (err, data) {
          if (data.length == 1) {
            let ipcl = req.ip.toString().replace("::ffff:", "");
            if (data[0].ip != null) {
              let ips = data[0].ip.split(",");
              if (ips.includes(ipcl)) {
                if (data.length == 1) {
                  try {
                    const decoded = jwt.verify(token[1], data[0].password);
                    req.userData = decoded;
                    next();
                  } catch (error) {
                    return res.status(401).json({
                      message: "Auth failed",
                    });
                  }
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
};
