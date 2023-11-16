import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { OpenAI } from "openai";

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
const app = express();
app.use(cors());
app.use(express.json());
app.post("/", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const response = await openai.chat.completions.create({
      messages: [{ role: 'user', content: `${prompt}` }],
      model: 'text-davinci-003',
      max_tokens:10
    });
    
    // create({
    //   model: "text-davinci-003",
    //   prompt: `${prompt}`,
    //   temperature: 0,
    //   max_tokens: 3000,
    //   top_p: 1,
    //   frequency: 0.5,
    //   presence_penaly: 0,
    // });
    console.log(response)
    res.status(200).send({
      chatai: response
    });
  } catch (error) {
    res.status(500).send(error || "Something went wrong");
  }
});
app.listen(8000, () => {
  console.log("App is running", 8000);
});
