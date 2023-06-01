const express = require("express");

const app = express();
const port = 3000;

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "Hello" });
});

// routes ============
var routePath = "./routes/";
fs.readdirSync(routePath).forEach(function (file) {
  app.use("/", require(routePath + "/" + file));
});
// end routes ========

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});


app.listen(port, () => {
  console.log(`App running at port ${port}`);
});
