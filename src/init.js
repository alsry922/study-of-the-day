import "dotenv/config"; // import this as early as possible
import "./db";
import "./models/User";
import app from "./server";

// dotenv will read .env file and put the values in process.env

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`✔ Server is listening http://localhost:${PORT} 🚀`);
});
