const express = require("express");
const app = express();
const mongoose = require("mongoose");
const signupRoute = require("./routes/signupRoute");
const loginRoute = require("./routes/loginRoute");
const discuzRoute = require("./routes/discuzRoute");
const userDataRoute = require("./routes/userDataRoute");
const updateProfileRoute = require("./routes/updateProfileRoute");
const cors = require("cors")

app.use(
  cors({
    origin: "http://localhost:5173",
})
)
mongoose.connect("mongodb://0.0.0.0/Users", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//this parses data into json format
app.use(express.json());
//this parses data into url encoded format
app.use(express.urlencoded({ extended: true }));

app.use("/signup", signupRoute);
app.use("/login", loginRoute);
app.use("/discuz", discuzRoute);
app.use("/userData", userDataRoute);
app.use("/updateProfile", updateProfileRoute);
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("default page");
});

app.listen(5000, () => {
  console.log("Server running");
});
