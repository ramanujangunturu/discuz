const express = require("express");
const app = express();
const mongoose = require("mongoose");
const signupRoute = require("./routes/signupRoute");
const loginRoute = require("./routes/loginRoute");
const discuzRoute = require("./routes/discuzRoute");
const userDataRoute = require("./routes/userDataRoute");
const updateProfileRoute = require("./routes/updateProfileRoute");
const chatRoute = require("./routes/chatRoute");
const cors = require("cors");
require('dotenv').config();

app.use(cors());

mongoose.connect("mongodb://0.0.0.0/Users", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("DB connected");
})
.catch((error) => {
  console.error("DB connection error:", error);
});

// This parses data into JSON format
app.use(express.json());
// This parses data into URL-encoded format
app.use(express.urlencoded({ extended: true }));

app.use("/signup", signupRoute);
app.use("/login", loginRoute);
app.use("/discuz", discuzRoute);
app.use("/userData", userDataRoute);
app.use("/updateProfile", updateProfileRoute);
app.use("/chat", chatRoute);

app.get("/", (req, res) => {
  res.send("default page");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
