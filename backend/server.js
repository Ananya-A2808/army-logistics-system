const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const personnelRoutes = require("./routes/personnelRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const missionsRoutes = require("./routes/missionsRoutes");
const logisticsRoutes = require("./routes/logisticsRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/personnel", personnelRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/missions", missionsRoutes);
app.use("/api/logistics", logisticsRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
