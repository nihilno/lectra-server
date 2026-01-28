import { PORT } from "../constants";
import { app } from "./app";

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
