require("dotenv").config(); // Load environment variables

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const router = require("./Router/router");

const app = express();
const port = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// 🔌 Connect to MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed:", err.message);
    process.exit(1);
  });

// 🌐 Middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// 🛣️ Routes
app.use(router);

// 🖼️ Views with Handlebars
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// 🚀 Start Server
app.listen(port, () => {
  console.log(`✅ Server started on http://localhost:${port}`);
});
