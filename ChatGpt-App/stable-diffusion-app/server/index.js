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

import { ChatGPTUnofficialProxyAPI } from "chatgpt";
import axios from 'axios'

app.post("/api/text2Image", async (req, res) => {
  const result = await sf_text2Image(req.body);
  //👇🏻 return the result as a response
  res.json({ message: "Retrieved successfully!", result: result });
});

app.post("/api/chatGpt", async (req, res) => {
  const conversationId = req.body.conversationId;
  const parentMessageId = req.body.parentMessageId;
  const prompt = req.body.prompt;
  const result = await chatGpt_second(prompt, conversationId, parentMessageId);
  //👇🏻 return the result as a response
  res.json({ message: "Retrieved successfully!", result: result });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

async function sf_text2Image(reqBody) {
  try {
    reqBody.prompt = reqBody.prompt + ",(masterpiece, best quality:1.2), (ultra detailed), (illustration), (distinct_image), (intricate_details), (delicate illustration)"
    reqBody.negative_prompt = reqBody.negative_prompt + ",nsfw,(worst quality:1.4), (low quality:1.4), EasyNegative, (multiple Views:1.5), (multiple girls:1.5), (extra hands, extra fingers, extra arms, extra legs), cropped hands, extra digit, fewer digit, (bad hands:1.5), (bad antomy:1.5), (fused anatomy), (blurry:1.3), (artist name:1.5), (censored:1.4), (watermark:1.5), (text:1.5), (signature:1.5), (4 fingers, 3 fingers, 2 fingers, 3 legs, 4 legs, 3 hands, 4hands), (fewer than 5 fingers)"
    const request = await axios.post('http://101.34.12.71:7861/sdapi/v1/txt2img', reqBody)
    let result = await request.data
    return result
  } catch (error) {
    console.error(error)
  }
}

//👇🏻 holds the results
async function chatGpt_second(prompt, conversationId, parentMessageId) {
  try {
      // chatgptApi = new ChatGPTAPIBrowser({
      //   email: "",
      //   password: "",
      //   isGoogleLogin: false,
      // });
      // https://chat.openai.com/api/auth/session
      const chatgptApi = new ChatGPTUnofficialProxyAPI({
        accessToken: '',        
        apiReverseProxyUrl: 'https://api.pawan.krd/backend-api/conversation',
      })

      // //👇🏻 sends the instruction for the domain name to ChatGPT
      let opt = {}
      if(conversationId && parentMessageId) {
        opt = { conversationId: conversationId, parentMessageId: parentMessageId }
      }
      const result = await chatgptApi.sendMessage(
        prompt,
        opt
      );
      return {text: result.text, conversationId: result.conversationId, parentMessageId: result.parentMessageId}
  } catch (err) {
      console.error(err);
  }
}