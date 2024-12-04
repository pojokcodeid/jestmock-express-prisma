import express from "express";
import userRoutes from "./routes/userRoutes.js";
const app = express();

app.use("/api", userRoutes);

if (process.env.NODE_ENV !== "test") {
  app.listen(3000, () => console.log("Server running on port 3000"));
}

export default app;
