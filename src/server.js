import express from "express";
import { config } from "dotenv";
import compression from "compression";
const PORT = process.env.PORT || 6969;
config();
const app = express();
app.use(compression());

app.listen(PORT, () => {
	console.log(`Server is started on http://localhost:${PORT}`);
});
