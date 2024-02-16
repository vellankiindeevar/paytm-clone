const express = require("express");
const rootRouter = require("./router/index");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1", rootRouter);

app.listen(3000, () => {
  console.log("app listening to port 3000 ....");
});

