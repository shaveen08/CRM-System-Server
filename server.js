require('dotenv').config();

const express = require("express");
const app = express();
const cors = require('cors');
const connectDB = require('./config/db');

// Middlewares ----------------------------------------------------------------------------------- /
app.use(cors());
app.use(express.json());

// Database Connection --------------------------------------------------------------------------- /
connectDB();

// Routes ---------------------------------------------------------------------------------------- /
app.use("/api/leads", require("./routes/leads"));

// Server ---------------------------------------------------------------------------------------- /
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port http://localhost:${PORT}`));