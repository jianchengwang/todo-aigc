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

app.post("/api", async (req, res) => {
  const { prompt } = req.body;
  const result = await chatgptFunction(prompt);
  //👇🏻 return the result as a response
  res.json({ message: "Retrieved successfully!", result: [result] });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

//👇🏻 holds the results
async function chatgptFunction(content) {
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

      //👇🏻 sends the instruction for the domain name to ChatGPT
      const getDomainName = await chatgptApi.sendMessage(
          `Can you generate a domain name for a website about: ${content}`
      );
      let domainName = getDomainName.text;
      console.log(domainName);

      // //👇🏻 sends the instruction for the prompt to ChatGPT
      const generatePrompt = await chatgptApi.sendMessage(
          `I have a website for ${content}, and I want to generate a logo for it, can you generate a prompt for dall-e for me? make it long like 50 words, you don't need to tell me why you generated the prompt`
      );
      const diffusionPrompt = generatePrompt.text;
      console.log(diffusionPrompt);
      //👇🏻 Makes a POST request via Axios with the prompt as the payload
      const request = await axios.post("http://101.34.12.71:7861/sdapi/v1/txt2img", {
          prompt: diffusionPrompt,
      });
      //👇🏻 returns the generated logo and the domain name
      let logoImage = await request.data.images;
      return { logoImage };
  } catch (err) {
      console.error(err);
  }
}