import { useState, useEffect } from "react"
import {
getReminders,
createReminder,
updateReminder,
deleteReminder
} from "../api/remindersApi"

export default function Reminders(){

const token = localStorage.getItem("token")

const [reminders,setReminders] = useState([])
const [showModal,setShowModal] = useState(false)
const [menuOpen,setMenuOpen] = useState(null)
const [editingId,setEditingId] = useState(null)

const [title,setTitle] = useState("")
const [description,setDescription] = useState("")
const [date,setDate] = useState("")
const [hour,setHour] = useState("")
const [minute,setMinute] = useState("")
const [before,setBefore] = useState("5")

/* تحميل التذكيرات */

const loadReminders = async () => {

try{

const data = await getReminders(token)

setReminders(Array.isArray(data) ? data : data.reminders || [])

}catch(err){

console.error("load reminders error:",err)

}

}

/* عند فتح الصفحة */

useEffect(()=>{

loadReminders()

},[])

/* فتح نافذة الإنشاء */

function openCreate(){

setEditingId(null)

setTitle("")
setDescription("")
setDate("")
setHour("")
setMinute("")
setBefore("5")

setShowModal(true)

}

/* حفظ */

const handleSave = async () => {

try{

const payload = {
title,
description,
date,
hour,
minute,
before
}

if(editingId){

await updateReminder(editingId,payload,token)

}else{

await createReminder(payload,token)

}

setShowModal(false)

loadReminders()

}catch(err){

console.error(err)

}

}

/* حذف */

const handleDelete = async (id) => {

try{

await deleteReminder(id,token)

loadReminders()

}catch(err){

console.error(err)

}

}

/* تعديل */

function handleEdit(reminder){

setEditingId(reminder._id)

setTitle(reminder.title || "")
setDescription(reminder.description || "")
setDate(reminder.date || "")
setHour(reminder.hour || "")
setMinute(reminder.minute || "")
setBefore(reminder.before || "5")

setShowModal(true)

}

return(

<div className="page">

<div className="header">

<button
className="back"
onClick={()=>window.location.href="/chat"}
>
←
</button>

<h1>My Reminders</h1>

</div>

<button
className="createBtn"
onClick={openCreate}
>
Create Reminder
</button>

<div className="list">

{reminders.map(r=>(

<div key={r._id} className="card">

<div className="cardContent">

<h3>{r.title}</h3>

<p>{r.description}</p>

<small>{r.date}</small>

<br/>

<small>
Remind {r.before} min before
</small>

</div>

<div className="menuWrapper">

<button
className="dots"
onClick={()=>setMenuOpen(menuOpen === r._id ? null : r._id)}
>
⋮
</button>

{menuOpen === r._id && (

<div className="menu">

<button onClick={()=>handleEdit(r)}>
Edit
</button>

<button onClick={()=>handleDelete(r._id)}>
Delete
</button>

</div>

)}

</div>

</div>

))}

</div>

{showModal && (

<div className="overlay">

<div className="modal">

<h2>{editingId ? "Edit Reminder" : "Create Reminder"}</h2>

<input
placeholder="Title"
value={title}
onChange={(e)=>setTitle(e.target.value)}
/>

<input
placeholder="Description"
value={description}
onChange={(e)=>setDescription(e.target.value)}
/>

<input
type="date"
value={date}
onChange={(e)=>setDate(e.target.value)}
/>

<div className="timeRow">

<input
type="number"
placeholder="Hour"
min="0"
max="23"
value={hour}
onChange={(e)=>setHour(e.target.value)}
/>

<input
type="number"
placeholder="Minute"
min="0"
max="59"
value={minute}
onChange={(e)=>setMinute(e.target.value)}
/>

</div>

<select
value={before}
onChange={(e)=>setBefore(e.target.value)}
>

<option value="5">5 minutes before</option>
<option value="10">10 minutes before</option>
<option value="15">15 minutes before</option>
<option value="20">20 minutes before</option>

</select>

<div className="buttons">

<button onClick={()=>setShowModal(false)}>
Cancel
</button>

<button onClick={handleSave}>
{editingId ? "Save" : "Create"}
</button>

</div>

</div>

</div>

)}

</div>

)

}