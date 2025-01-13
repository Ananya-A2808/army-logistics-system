const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require('fs');

const app = express();
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}
// Simpler CORS configuration that will work with the Live Server
app.use(cors({
    origin: true, // This will copy the Origin header value
    credentials: true, // Required for cookies, authorization headers with HTTPS
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json());

// Ensure data directory exists
const dataPath = path.join(__dirname, 'data');
if (!require('fs').existsSync(dataPath)){
    require('fs').mkdirSync(dataPath);
}

// Move db.json to backend/data directory
if (!require('fs').existsSync(path.join(dataPath, 'db.json'))) {
    require('fs').copyFileSync(
        path.join(__dirname, '../data/db.json'),
        path.join(dataPath, 'db.json')
    );
}

// Add this before your routes
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Routes
app.use("/api/personnel", require("./routes/personnelRoutes"));
app.use("/api/inventory", require("./routes/inventoryRoutes"));
app.use("/api/logistics", require("./routes/logisticsRoutes"));
app.use("/api/missions", require("./routes/missionsRoutes"));

// Add this after your routes
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
