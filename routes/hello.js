const { router, verify, db } = require("../includes");
const uri = "/hello";

// GET method
router.get(uri, (req, res, next) => {
  return res.status(200).json({
    message: "Hello world",
  });
});

router.get(uri + "/param/:vars", (req, res, next) => {
  let param = req.params.vars;
  return res.status(200).json({
    data: param,
  });
});

// POST method
router.post(uri, (req, res, next) => {
  let post = req.body;
  return res.status(200).json({
    data: post,
  });
});

// SECURE =====================
router.get(uri + "/secure", verify, (req, res, next) => {
  return res.status(200).json({
    message: "Hello secure",
  });
});

module.exports = router;
