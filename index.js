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
const userRoutes = require("./routes/user");
app.use("/user", userRoutes);

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);
// end routes ========

app.listen(port, () => {
  console.log(`App running at port ${port}`);
});
