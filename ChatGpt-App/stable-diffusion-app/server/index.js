//👇🏻index.js
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

import { ChatGPTAPIBrowser } from "chatgpt";
import axios from 'axios'

app.post("/api", async (req, res) => {
  const { prompt } = req.body;
  const result = await chatgptFunction(prompt);
  //👇🏻 saves the result to the database array
  database.push(result);
  //👇🏻 return the result as a response
  res.json({ message: "Retrieved successfully!", result: database });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

//👇🏻 holds the results
const database = [];
async function chatgptFunction(content) {
  try {
      // const api = new ChatGPTAPIBrowser({
      //   email: "",
      //   password: "",
      //   isGoogleLogin: false,
      // });
      // await api.initSession();

      //👇🏻 sends the instruction for the domain name to ChatGPT
      // const getDomainName = await api.sendMessage(
      //     `Can you generate a domain name for a website about: ${content}`
      // );
      // let domainName = getDomainName.response;

      // //👇🏻 sends the instruction for the prompt to ChatGPT
      // const generatePrompt = await api.sendMessage(
      //     `I have a website for ${content}, and I want to generate a logo for it, can you generate a prompt for dall-e for me? make it long like 50 words, you don't need to tell me why you generated the prompt`
      // );
      // const diffusionPrompt = generatePrompt.response;
      //👇🏻 Makes a POST request via Axios with the prompt as the payload
      const request = await axios.post("http://127.0.0.1:7860/sdapi/v1/txt2img", {
          prompt: content,
      });
      //👇🏻 returns the generated logo and the domain name
      let logoImage = await request.data.images;
      return { logoImage, domainName };
  } catch (err) {
      console.error(err);
  }
}