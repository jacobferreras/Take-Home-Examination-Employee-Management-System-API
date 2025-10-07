import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import departmentRouter from "./routes/departmentRoutes";
import positionRouter from "./routes/positionRoutes";
import employeeRouter from "./routes/employeeRoutes";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/departments", departmentRouter);
app.use("/api/positions", positionRouter);
app.use("/api/employees", employeeRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
