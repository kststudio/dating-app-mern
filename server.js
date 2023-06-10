import express from "express";
import mongoose from "mongoose";
import Cors from "cors";
import Cards from "./dbCards.js";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 8001;
const connection_url = process.env.CONNECTION_URL;

app.use(express.json());
app.use(Cors());

(async function connectToMongoDB() {
  try {
    await mongoose.connect(connection_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB database successfully connected!");
  } catch (e) {
    console.log(" MongoDB database connection error: ", e);
  }
})();

app.get("/", (req, res) => res.status(200).send("Hello World"));

app.post("/dating/cards", async (req, res) => {
  try {
    const data = await Cards.create(req.body);
    res.json(data);
  } catch (e) {
    console.error("Something is wrong!", e);
  }
});

app.get("/dating/cards", async (req, res) => {
  try {
    const data = await Cards.find();
    res.json(data);
  } catch (e) {
    console.error("Something is wrong!", e);
  }
});

app.listen(port, () => console.log(`Listening to localhost: ${port}`));
