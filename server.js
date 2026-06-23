require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");

// Middlewares ----------------------------------------------------------------------------------- /
app.use(cors());
app.use(express.json());

// Database Connection --------------------------------------------------------------------------- /
connectDB();

// Routes ---------------------------------------------------------------------------------------- /
app.use("/api/dashboard", require("./routes/dashboard"));
app.use("/api/leads", require("./routes/leads"));
app.use("/api/contacts", require("./routes/contacts"));
app.use("/api/activity", require("./routes/activity"));
app.use("/api/appointments", require("./routes/appointments"));
app.use("/api/users", require("./routes/users"));

// Server ---------------------------------------------------------------------------------------- /
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port http://localhost:${PORT}`),
);
