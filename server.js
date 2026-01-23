require("dotenv").config();
const app = require("./app");
const { connectDB } = require("./db");

const PORT = process.env.PORT || 5005;

/* =========================
   START SERVER + DB
========================= */
const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ Database connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error starting server:", error);
  }
};

startServer();
