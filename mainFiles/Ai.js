// import { GoogleGenerativeAI } from "@google/generative-ai";
let ques = document.getElementById("ques");
let ans = document.getElementById("ansText");
let submit = document.getElementById("submit");
let res = document.getElementById("resText");
let prev = document.getElementById("prev");
let next = document.getElementById("next");
let finish=document.getElementById("finish");
let showResult=document.getElementById("showResult");
let submitted=false;
let len=0;
// const API_KEY="AIzaSyAWkLXbPVIuq27qeQ3WkQ67INMfOR3E2Po";
finish.style.display="none";
let sum=0;
let currIndex=0;
let question=" ";
let id=0;
async function FetchQues(index){
    try {
        let res = await fetch("/questions");
        let data = await res.json();
        // console.log(data);
        len=data.length;
        question=data[index].Ques;
        id=data[index].id;
        ques.textContent=`Q${index+1}: ${question}`;
    } catch (err) {
        console.error("Error fetching questions:", err);
    }
}
function calculateMarks(arr){
    let index=arr.findIndex(e=>e=="score:");
    sum+=parseInt(arr[index+1]);
}
// async function generateApi(prompt){
//     const genAI = new GoogleGenerativeAI(API_KEY);
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//     const result = await model.generateContent(prompt);
//     let string=result.response.text();
//     res.textContent=string;
//     let splittedString=string.split(/[\s/]+/);
//     calculateMarks(splittedString);
// }
// submit.addEventListener('click',()=>{
//     if(ans.value==" "||ans.value==NaN){
//         alert("Provide a proper answer");
//     }
//     else{
//         submitted=true;
//         generateApi(question+"solution:"+ans.value+"judge the provided solution and give response in single line in the following fromat- judgement,score: score/10");
//     }
// })
window.submitQues=async function(){
    const answer=ans.value;
    if(answer.trim()===""){
        alert("Please provide a proper answer");
        return;
    }
    try {
        const response=await fetch(`/submit/${id}`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                question:question,
                answer:answer
            })
        });
        const data = await response.json();
        let generatedResponse=await data.response;
        res.textContent = `Response: ${generatedResponse}`;
        submitted=true;
        calculateMarks(generatedResponse.split(/[\s/]+/)); 
    } catch (error) {
        console.error("Error submitting question:", error);
    }
};
prev.classList.remove("enablePrev");
prev.classList.add("disablePrev");
prev.addEventListener('click',()=>{
    finish.style.display="none";
    ans.value=" ";
    res.textContent="Response will appear here...";
    if(currIndex!=0){
        currIndex=(currIndex-1);
        FetchQues(currIndex);
        next.classList.remove("disableNext");
        next.classList.add("enableNext");
        if(currIndex==0){
            prev.classList.remove("enablePrev");
            prev.classList.add("disablePrev");
        }
    }
    
})
next.addEventListener('click',()=>{
    if(submitted){
        finish.style.display="none";
        ans.value=" ";
        res.textContent="Response will appear here...";
        currIndex=currIndex+1;
        FetchQues(currIndex);
        prev.classList.remove("disablePrev");
        prev.classList.add("enablePrev");
        if(currIndex==len-1){
            next.classList.remove("enableNext");
            next.classList.add("disableNext");
            finish.style.display="block";
        }
        submitted=false;
    }
    else{
        alert("Submit your answer first"); 
    }
})
finish.addEventListener('click',()=>{
    console.log(sum);
    showResult.textContent=`Total Marks of your test is: ${sum}/100 `;
})
FetchQues(currIndex);

