import express from "express";
import cors from "cors";
import morgan from "morgan";
import UserRoutes from "./infrastructure/http/routes/user.routes";
import ProjectRoutes from "./infrastructure/http/routes/project.routes";
import TaskRoutes from "./infrastructure/http/routes/task.routes";
import CatalogRoutes from "./infrastructure/http/routes/catalog.routes";

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/user", UserRoutes);
app.use("/project", ProjectRoutes);
app.use("/task", TaskRoutes);
app.use("/catalog", CatalogRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
