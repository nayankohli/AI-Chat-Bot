const express = require("express");
const app = express();
const fs = require("fs");
const { GoogleGenerativeAI } = require("@google/generative-ai"); 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const API_KEY = "AIzaSyAkir_BQXIV5eOSuOr2dOi9yCyoTM2ywBY";
const genAI = new GoogleGenerativeAI(API_KEY);
async function generativeAI(question, answer) {
    const prompt = `${question} solution: ${answer}. Judge the provided solution and give a response in a single line in the format - judgement, score: score/10`;
    try {
        const model=await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result=await model.generateContent(prompt);
        return result.response.text();
    } catch(error){
        console.error("Error with AI generation:", error);
        throw new Error("Failed to generate AI response");
    }
}
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/mainFiles/Ai.html");
});

app.get("/Ai.js",(req,res)=>{
    res.sendFile(__dirname+"/mainFiles/Ai.js");
});
app.get("/questions",(req,res)=>{
    fs.readFile("./mainFiles/ques.json","utf-8",(err,data)=>{
        if(err){
            console.log(err);
        }else{
            res.send(data);
        }
    });
});
app.post("/submit/:id",async(req, res) => {
    const {question,answer}=req.body;
    console.log("Q:"+question);
    console.log("A:"+answer);
    if(!question||!answer){
        return res.status(400).json({error:"Question and answer are required."});
    }
    try{
        const aiResponse=await generativeAI(question, answer);
        res.json({response:aiResponse});
    }catch(error){
        res.status(500).json({error:"Failed to generate AI response"});
    }
});

app.listen(3001,(e)=>{
    if(e){
        console.log(e);
    }else{
        console.log("Server running at port 3001");
    }
});
