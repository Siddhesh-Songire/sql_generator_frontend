import express, { Application, Request, Response } from "express";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";
import bodyParser from "body-parser";
const PORT: number = 8000;

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const API_KEY: string = "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";

const configuration = new Configuration({
  organization: "org-4Gf0AwLztlx7d75pSNKobR7N",
  apiKey: API_KEY,
});

const openai = new OpenAIApi(configuration);

app.get("/completions", async (req: Request, res: Response) => {
  try {
    // const { message } = req.body.message;
    // if (!message || typeof message !== "string") {
    //   return res.status(400).json({
    //     error: "Invalid or missing 'message' property in the request body",
    //   });
    // }

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: "Create a SQL request to create a table",
        },
      ],
    });

    res.json({ data: completion.data.choices[0].message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => console.log(`Your server is running on PORT ${PORT}`));
