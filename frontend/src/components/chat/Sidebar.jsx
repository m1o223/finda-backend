import { useState, useEffect } from "react"
import { PanelLeft, History, Bell, Settings, CopyPlus } from "lucide-react"
// import { getChats } from "../../api/chatApi"
import "./Sidebar.css"

export default function Sidebar(){

  const [open,setOpen] = useState(true)

  const [chats,setChats] = useState([])

  const handleNewChat = () => {
    window.location.reload()
  }


  // ==============================
  // LOAD CHAT HISTORY
  // ==============================

  useEffect(()=>{

    async function loadChats(){

      try{

        // const data = await getChats()

        if(Array.isArray(data)){
          setChats(data)
        }

      }catch(err){

        console.error("Failed to load chats",err)

      }

    }

   // loadChats()

  },[])



  return(

    <div className={`sidebar ${open ? "open" : "closed"}`}>

      {/* زر فتح واغلاق */}
      <div className="menu-button" onClick={()=>setOpen(!open)}>
        <PanelLeft size={20}/>
      </div>



      {/* New Chat */}

      <div className="sidebar-item" onClick={handleNewChat}>
        <CopyPlus size={18}/>
        {open && <span className="item-text">New Chat</span>}
      </div>



      {/* Reminders */}

      <div className="sidebar-item">
        <Bell size={18}/>
        {open && <span className="item-text">Reminders</span>}
      </div>



      {/* ========================= */}
      {/* HISTORY */}
      {/* ========================= */}

      <div className="sidebar-item">
        <History size={18}/>
        {open && <span className="item-text">History</span>}
      </div>


      {open && (

        <div className="chat-history">

          {chats.map((chat)=>{

            return(

              <div key={chat._id} className="history-item">

                {chat.title || "New Chat"}

              </div>

            )

          })}

        </div>

      )}



      {/* مسافة */}

      <div className="sidebar-space"></div>



      {/* Settings */}

      <div className="sidebar-item">
        <Settings size={18}/>
        {open && <span className="item-text">Settings</span>}
      </div>

    </div>

  )

}