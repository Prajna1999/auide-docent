import { useState, useEffect } from 'react';
import './App.css'

function App() {
  const [value, setValue]=useState("")
  const [message, setMessage]=useState(null);
  const [prevChats, setPreviousChats]=useState([]);
  const [currentTitle, setCurrentTitle]=useState(null);

  const createNewChat=()=>{
    setMessage(null);
    setValue("");
    setCurrentTitle(null);
  }

  //if click any one of chat titles
  // get back to that conversation.
  const handleClick=(uniqueTitle)=>{
    setCurrentTitle(uniqueTitle)
    setValue("");
    setCurrentTitle(null);
  }

const getMessages=async()=>{

  const options={
      method:"POST",
      body:JSON.stringify({
        message:value
      }),
      headers:{
        "Content-Type":"application/json"
      }
  }

  try{
    const response=await fetch('http://127.0.0.1:5001/api/v1/chat', options);
    const data= await response.json();
    
    setMessage(data)
  }catch(error){
    console.error(error);
    return

  }
}
  // console.log(value)
  useEffect(()=>{
      console.log(currentTitle, value, message)

      if(!currentTitle && value && message){
        setCurrentTitle(value);
      }

      if(currentTitle && value && message){
        // update the chats array
        setPreviousChats(prevChats=>(
          [...prevChats,
            {
            title:currentTitle,
            role:"user",
            content:value
          }, 
          
          {
            title:currentTitle,
            role:message.role,
            content:message.content

          }
        ]
        ))
      }


  }, [message,value, currentTitle])

  console.log(prevChats);

  //filter messages by current chat title
  // doesnot work at the moment figure out later
  const currentChat=prevChats.filter(previousChat=>previousChat.title===currentTitle)

  //filter out the unique titles only and create an array from it
  const uniqueTitles=Array.from (new Set(prevChats.map(previousChat=>previousChat.title))) 

  console.log(uniqueTitles);
  return (
    <div className='app'>
      {/* Sidebar section */}
      <section className='sidebar'>
        <button onClick={createNewChat}>+ New Chat</button>
        <ul className='history'>
            {uniqueTitles?.map((uniqueTitle, index)=><li key={index} onClick={()=>handleClick(uniqueTitle)}>{uniqueTitle}</li>)}
        </ul>
        <nav>
              <p>Made by Prajna</p>
            </nav>
      </section>

      {/* chat interface section */}
      <section className="main">
        {!currentTitle && <h1>PrajnaGPT</h1>}  
          <ul className='feed'>
             {currentChat?.map((chatMessage, index)=>{
              <li key={index}>
                <p className='role'>{chatMessage.role}</p>
                <p>{chatMessage.content}</p>
              </li>
            })} 
            
          </ul>
          <div className='bottom-section'>
              <div className='input-container'>
                <input value={value} onChange={(e)=>{
                  setValue(e.target.value)
                }}/>
                <div id="submit" onClick={getMessages}>➢</div>
              </div>

              <p className='info'>
              ChatGPT may produce inaccurate information about people, places, or facts. ChatGPT May 24 Version

              </p>
          </div>
      
      </section>
    
    </div>
  )
}

export default App
