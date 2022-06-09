const express = require("express");
const morgan = require("morgan");

const app = express();

app.set("port", process.env.PORT || 4000);

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  next();
});

app.use(require("./routes"));
app.use("/user", require("./routes/user"));
app.use("/recomendation", require("./routes/recomendations"));

app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
