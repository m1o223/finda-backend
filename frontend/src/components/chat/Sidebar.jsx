import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { PanelLeft, History, Bell, Settings, CopyPlus, MoreVertical } from "lucide-react"
import "./Sidebar.css"

export default function Sidebar({ onSelectChat }) {

  const navigate = useNavigate()

  const [open, setOpen] = useState(true)
  const [chats, setChats] = useState([])
  const [menuOpen, setMenuOpen] = useState(null)


  // =============================
  // LOAD CHAT HISTORY
  // =============================

  useEffect(() => {

    async function loadChats(){

      try{

        const res = await fetch("http://localhost:3000/api/chat/history")
        const data = await res.json()

        if(!Array.isArray(data)) return

        // فقط رسائل المستخدم
        const userMessages = data.filter(m => m.role === "user")

        setChats(userMessages)

      }
      catch(err){
        console.error("Failed to load chats", err)
      }

    }

    loadChats()

  }, [])



  // =============================
  // NEW CHAT
  // =============================

  const handleNewChat = () => {

    window.location.reload()

  }



  // =============================
  // DELETE CHAT
  // =============================

  const deleteChat = (index) => {

    const newChats = chats.filter((_,i)=> i !== index)

    setChats(newChats)

  }



  // =============================
  // RENAME CHAT
  // =============================

  const renameChat = (index) => {

    const name = prompt("Rename chat")

    if(!name) return

    const updated = [...chats]

    updated[index].message = name

    setChats(updated)

  }



  return (

    <div className={`sidebar ${open ? "open" : "closed"}`}>

      {/* menu button */}

      <div className="menu-button" onClick={()=>setOpen(!open)}>
        <PanelLeft size={20}/>
      </div>



      {/* New Chat */}

      <div className="sidebar-item" onClick={handleNewChat}>
        <CopyPlus size={18}/>
        {open && <span className="item-text">New Chat</span>}
      </div>



      {/* Reminders */}

      <div className="sidebar-item" onClick={()=>navigate("/reminders")}>
        <Bell size={18}/>
        {open && <span className="item-text">Reminders</span>}
      </div>



      {/* History title */}

      <div className="sidebar-item">
        <History size={18}/>
        {open && <span className="item-text">History</span>}
      </div>



      {/* Chat History */}

      {open && (

        <div className="chat-history">

          {chats.map((chat,index)=>(

            <div className="history-row" key={index}>

              <div
                className="history-item"
                onClick={()=>onSelectChat && onSelectChat(chat)}
              >
                {chat.message.slice(0,40)}
              </div>



              {/* three dots menu */}

              <div className="history-menu">

                <MoreVertical
                  size={16}
                  onClick={()=>setMenuOpen(menuOpen === index ? null : index)}
                />

                {menuOpen === index && (

                  <div className="menu-dropdown">

                    <div onClick={()=>renameChat(index)}>
                      Rename
                    </div>

                    <div onClick={()=>deleteChat(index)}>
                      Delete
                    </div>

                  </div>

                )}

              </div>

            </div>

          ))}

        </div>

      )}



      {/* space */}

      <div className="sidebar-space"></div>



      {/* Settings */}

      <div
        className="sidebar-item settings-bottom"
        onClick={()=>navigate("/settings")}
      >
        <Settings size={18}/>
        {open && <span className="item-text">Settings</span>}
      </div>

    </div>

  )

}