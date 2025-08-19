let select=document.querySelector(".select-heading")
let arrow=document.querySelector(".select-heading img")

let options=document.querySelector(".options")
let option=document.querySelectorAll(".option")
let selecttext=document.querySelector(".select-heading span")

select.addEventListener("click",()=>{
options.classList.toggle("active-options")
arrow.classList.toggle("rotate")
})
option.forEach((item)=>{
item.addEventListener("click",()=>{
selecttext.innerText=item.innerText
})
})

// chatbot

let prompt=document.querySelector(".prompt")
let chatbtn=document.querySelector(".input-area button")
let chatContainer=document.querySelector(".chat-container")
let userMessage="";
let Api_url="https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAJt207kDZSnRpiY8ZG-ZnQLYBEMK_4ZZY" 

async function generateApiResponse(aiChatBox){
const textElement=aiChatBox.querySelector(".text")
try{
const response=await fetch(Api_url,{
method:"POST",
headers:{"Content-Type": "application/json"},
body:JSON.stringify({
contents:[{
"role": "user",
"parts":[{text:`${userMessage} in 10 words`}]
}]
})
})
const data=await response.json()
const apiResponse=data?.candidates[0].content.parts[0].text.trim();
textElement.innerText=apiResponse
}
catch(error){
console.log(error)
}
finally{
aiChatBox.querySelector(".loading").style.display="none"
}
}

function createChatBox(html,className){
const div=document.createElement("div")
div.classList.add(className)
div.innerHtml=html;
return div
}
function showLoading(){
const html=`<p class="text"></p>`
let aiChatBox=createChatBox(html,"ai-chat-box")
chatContainer.appendChild(aiChatBox)
generateApiResponse(aiChatBox)
}

chatbtn.addEventListener("click",()=>{
userMessage=prompt.value;
const html=`<p class="text"></p>`
let userChatBox=createChatBox(html,"user-chat-box")
userChatBox.querySelector(".text").innerText=userMessage
chatContainer.appendChild(userChatBox)
prompt.value=""
setTimeout(showLoading,500)

})
