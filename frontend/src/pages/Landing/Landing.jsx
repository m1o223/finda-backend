import { useState, useEffect } from "react";
import "./Landing.css";
import { useNavigate } from "react-router-dom";

export default function Landing(){

const navigate = useNavigate();

const phrases = [
"BlueMind AI",
"Fast. Smart. Intelligent.",
"Your intelligent assistant"
];

const [text,setText] = useState("");
const [index,setIndex] = useState(0);
const [char,setChar] = useState(0);
const [deleting,setDeleting] = useState(false);
const [jump,setJump] = useState(false);

useEffect(()=>{

let speed = deleting ? 40 : 80;

const timer = setTimeout(()=>{

const current = phrases[index];

if(!deleting){

setText(current.substring(0,char+1));
setChar(char+1);

if(char+1 === current.length){

setTimeout(()=>setDeleting(true),1200);

}

}else{

setText(current.substring(0,char-1));
setChar(char-1);

if(char-1 === 0){

setDeleting(false);
setIndex((index+1)%phrases.length);

setJump(true);
setTimeout(()=>setJump(false),400);

}

}

},speed);

return ()=>clearTimeout(timer);

},[char,deleting,index]);

return(

<div className="landing">

<div className="logo">

BlueMind <span className="ai">AI</span>

</div>

<div className="center">

<div className={`shapes ${jump ? "jump" : ""}`}>

<div className="square"></div>
<div className="circle"></div>
<div className="triangle"></div>

</div>

<h1 className="title">

{text}
<span className="cursor">|</span>

</h1>

<p className="subtitle">

BlueMind AI helps you think faster,
learn smarter and organize your ideas.

</p>

<button
className="start"
onClick={()=>navigate("/auth")}
>

Start Now

</button>

</div>

<div className="features">

<div>• Understand ideas instantly</div>
<div>• Remember important information</div>
<div>• Help you study faster</div>
<div>• Organize your daily tasks</div>
<div>• Smart AI responses</div>

</div>

</div>

);

}