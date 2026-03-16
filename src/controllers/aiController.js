import { askAI } from "../ai/openaiParser.js"

export async function chatWithAI(req,res){

try{

const { message } = req.body

if(!message){
return res.status(400).json({
error:"Message is required"
})
}

const aiReply = await askAI(message)

const text = typeof aiReply === "string"
? aiReply
: aiReply?.text || JSON.stringify(aiReply)

res.json({
reply: text
})

}catch(error){

console.error("AI Controller Error:",error)

res.status(500).json({
error:"AI failed to respond"
})

}

}