const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const noteRoutes = require("./routes/notes");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
dotenv.config();

const app = express();
app.use(cors());

app.use(bodyParser.json());

mongoose
  .connect("mongodb://localhost:27017/notes_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use("/api", noteRoutes);
app.use("/api", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
