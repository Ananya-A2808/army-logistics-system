const express = require("express");
const personnelRoutes = require("./routes/personnelRoutes");

const app = express();

app.use(express.json());
app.use("/api/personnel", personnelRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
