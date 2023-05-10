//👇🏻index.js
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({limit: '50mb'}));
app.use(cors());

import { ChatGPTUnofficialProxyAPI } from "chatgpt";
import axios from 'axios'

app.get("/sdapi/v1/sd_models", async (req, res) => {
  const result = await sd_models();
  //👇🏻 return the result as a response
  res.json({ message: "Retrieved successfully!", result: result });
});

app.get("/sdapi/v1/options", async (req, res) => {
  const result = await sd_options_get(req.body);
  //👇🏻 return the result as a response
  res.json({ message: "Retrieved successfully!", result: result });
});

app.post("/sdapi/v1/options", async (req, res) => {
  const result = await sd_options_post(req.body);
  //👇🏻 return the result as a response
  res.json({ message: "Retrieved successfully!", result: result });
});


app.post("/sdapi/v1/text2image", async (req, res) => {
  const result = await sd_text2Image(req.body);
  //👇🏻 return the result as a response
  res.json({ message: "Retrieved successfully!", result: result });
});

app.post("/sdapi/v1/image2image", async (req, res) => {
  const result = await sd_image2Image(req.body);
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

async function sd_models() {
  try {
    const request = await axios.get('http://101.34.12.71:7861/sdapi/v1/sd-models')
    let result = await request.data
    return result
  } catch (error) {
    console.error(error)
  }
}

async function sd_options_post(reqBody) {
  try {
    const request = await axios.post('http://101.34.12.71:7861/sdapi/v1/options', reqBody)
    let result = await request.data
    return result
  } catch (error) {
    console.error(error)
  }
}

async function sd_options_get() {
  try {
    const request = await axios.get('http://101.34.12.71:7861/sdapi/v1/options')
    let result = await request.data
    return result
  } catch (error) {
    console.error(error)
  }
}


async function sd_text2Image(reqBody) {
  try {
    const request = await axios.post('http://101.34.12.71:7861/sdapi/v1/txt2img', reqBody)
    let result = await request.data
    return result
  } catch (error) {
    console.error(error)
  }
}

async function sd_image2Image(reqBody) {
  try {
    const request = await axios.post('http://101.34.12.71:7861/sdapi/v1/img2img', reqBody)
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
        accessToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1UaEVOVUpHTkVNMVFURTRNMEZCTWpkQ05UZzVNRFUxUlRVd1FVSkRNRU13UmtGRVFrRXpSZyJ9.eyJodHRwczovL2FwaS5vcGVuYWkuY29tL3Byb2ZpbGUiOnsiZW1haWwiOiJqaWFuY2hlbmd3YW5nODBAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWV9LCJodHRwczovL2FwaS5vcGVuYWkuY29tL2F1dGgiOnsidXNlcl9pZCI6InVzZXItM3lzc05pSGdsOU4xelFlVTEyTjMwVVVXIn0sImlzcyI6Imh0dHBzOi8vYXV0aDAub3BlbmFpLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDExNTU5MTIwNjgyODQ4ODg5MDc5NiIsImF1ZCI6WyJodHRwczovL2FwaS5vcGVuYWkuY29tL3YxIiwiaHR0cHM6Ly9vcGVuYWkub3BlbmFpLmF1dGgwYXBwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2ODI1OTI3NTQsImV4cCI6MTY4MzgwMjM1NCwiYXpwIjoiVGRKSWNiZTE2V29USHROOTVueXl3aDVFNHlPbzZJdEciLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIG1vZGVsLnJlYWQgbW9kZWwucmVxdWVzdCBvcmdhbml6YXRpb24ucmVhZCBvZmZsaW5lX2FjY2VzcyJ9.pKiJxl53nsjiSNbhaDlWj8wkuuCtNXcI9-wJSHte6EX7gTL3Y8sOKGgr5mKFiuHxxjvSgoDPDncyK2HiVBZjR6FteYj2gJ6ulXXE7p-1tlEDb6HD1ULWSbu8zqbt-QtKtoKbEyRwtbrj_Iv2dUXbUNimN8WxkU2SWgRMsMoqrRuHzeCJrU4ywrmpXCivYe1MvOuHoRewAYn2GsTAzYq_Cc8vEFKGWKQYbj0UZZiiwxeBCuxJ2Xs0Yk4aOmVWDP_rywXFHjV45kHjLt8PrHYf7mLZibrJOD1MD9B_37tVL0WWu4jVy8Qx7Y3X4zkENqVNYFPi6s4iu5AafpGXfKeVXA',        
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