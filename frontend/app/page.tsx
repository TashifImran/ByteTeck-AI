// 'use client';
// import { useState, useRef, useEffect } from 'react';
// import axios from 'axios';

// export default function Home() {
//   const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
//   const [input, setInput] = useState('');
//   // Fix: Model state define kar di
//   const [model, setModel] = useState("models/gemini-2.0-flash");
//   const scrollRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
//   }, [messages]);

//   const sendMessage = async () => {
//     if (!input.trim()) return;
    
//     const userMsg = { role: 'user', content: input };
//     setMessages((prev) => [...prev, userMsg]);
//     setInput('');

//     try {
//       const res = await axios.post('http://127.0.0.1:8000/chat', {
//         history: messages,
//         message: input,
//         model_id: model
//       });
      
//       const cleanAnswer = res.data.answer ? res.data.answer.replace(/\*\*/g, '') : "No response from AI";
//       setMessages((prev) => [...prev, { role: 'assistant', content: cleanAnswer }]);
      
//     } catch (error: any) {
//       console.error("Error details:", error);
      
//       let userFriendlyMessage = "System is currently unavailable. Please check your backend connection.";
      
//       if (error.response?.status === 429 || error.response?.status === 503) {
//         userFriendlyMessage = "⚠️ The selected model is busy. Please try selecting a different model from the dropdown menu and try again.";
//       } else if (error.response?.data?.detail) {
//         userFriendlyMessage = error.response.data.detail;
//       }

//       setMessages((prev) => [...prev, { role: 'assistant', content: userFriendlyMessage }]);
//     }
//   };

//   return (
//     <div className="flex flex-col h-[600px] max-w-3xl mx-auto bg-gray-950 text-white p-4 border border-gray-800 rounded-2xl mt-10">
//       {/* Chat Area */}
//       <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 mb-4 bg-gray-900 rounded-xl shadow-inner">
//         {messages.map((m, i) => (
//           <div key={i} className={`p-3 rounded-lg max-w-[80%] ${m.role === 'user' ? 'bg-blue-600 ml-auto' : 'bg-gray-700'}`}>
//             {m.content}
//           </div>
//         ))}
//       </div>

//       {/* Input Area */}
//       <div className="flex gap-2 p-2 bg-gray-800 rounded-full items-center border border-gray-700">
//         <input 
//           className="flex-1 bg-transparent px-4 outline-none text-white text-sm"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
//           placeholder="Message ByteTeck AI..."
//         />

//         <select 
//           className="bg-gray-900 text-xs p-2 rounded-full border border-gray-600 outline-none text-gray-300 cursor-pointer w-40 text-center"
//           value={model}
//           onChange={(e) => setModel(e.target.value)}
//         >
//           <option value="models/gemini-2.0-flash">2.0 Flash</option>
//           <option value="models/gemini-2.5-flash">2.5 Flash</option>
//           <option value="models/gemini-3.1-flash-lite">3.1 Lite</option>
//           <option value="models/gemini-3.5-flash">3.5 Flash</option>
//           <option value="models/gemini-flash-latest">Flash Latest</option>
//         </select>

//         <button 
//           onClick={sendMessage} 
//           className="bg-blue-600 px-6 py-2 rounded-full hover:bg-blue-500 transition text-sm font-medium"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }




// 'use client';
// import { useState, useRef, useEffect } from 'react';
// import axios from 'axios';

// export default function Home() {
//   const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
//   const [input, setInput] = useState('');
//   const [model, setModel] = useState("models/gemini-2.0-flash");
//   const scrollRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
//   }, [messages]);

//   const sendMessage = async () => {
//     if (!input.trim()) return;
//     const userMsg = { role: 'user', content: input };
//     setMessages((prev) => [...prev, userMsg]);
//     setInput('');

//     try {
//       const res = await axios.post('http://127.0.0.1:8000/chat', {
//         history: messages,
//         message: input,
//         model_id: model
//       });
//       const cleanAnswer = res.data.answer ? res.data.answer.replace(/\*\*/g, '') : "No response from AI";
//       setMessages((prev) => [...prev, { role: 'assistant', content: cleanAnswer }]);
//     } catch (error: any) {
//       setMessages((prev) => [...prev, { role: 'assistant', content: "Error connecting to server." }]);
//     }
//   };

//   return (
//     <div className="min-h-screen w-full bg-black flex items-center justify-center p-4 font-sans">
      
//       <div className="relative flex flex-col h-[650px] w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden">
        
//         {/* WATERMARK */}
//         <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
//           <h1 
//             className="font-black text-white uppercase select-none text-center px-4"
//             style={{ fontSize: 'clamp(50px, 9vw, 110px)', opacity: 0.08, animation: 'pulse 3s ease-in-out infinite' }}
//           >
//             BYTETECK
              
//           </h1>
//         </div>

//         {/* CHAT AREA */}
//         <div ref={scrollRef} className="relative z-10 flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide">
//           {messages.map((m, i) => (
//             <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
//               <div className={`p-4 rounded-2xl max-w-[85%] text-[15px] ${m.role === 'user' ? 'bg-white text-black font-medium' : 'bg-white/5 text-white'}`}>
//                 {m.content}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* INPUT AREA - Updated for better visibility */}
//         <div className="relative z-20 p-4 bg-[#0a0a0a] border-t border-white/5">
//           <div className="flex gap-2 p-2 bg-white/5 rounded-full border border-white/10 backdrop-blur-md items-center">
//             <input 
//               className="flex-1 bg-transparent px-5 outline-none text-white text-sm"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
//               placeholder="Ask Anything..."
//             />
//             {/* Model Selector - Width aur text size barha diya hai */}
//             <select 
//               className="bg-transparent text-xs text-gray-300 cursor-pointer outline-none w-32 px-2 py-1 bg-white/5 rounded-md"
//               value={model}
//               onChange={(e) => setModel(e.target.value)}
//             >
//               <option className="text-black" value="models/gemini-2.0-flash">2.0 Flash</option>
//               <option className="text-black" value="models/gemini-2.5-flash">2.5 Flash</option>
//               <option className="text-black" value="models/gemini-3.1-flash-lite">3.1 Lite</option>
//               <option className="text-black" value="models/gemini-3.5-flash">3.5 Flash</option>
//               <option className="text-black" value="models/gemini-flash-latest">Flash Latest</option>
//             </select>
//             <button 
//               onClick={sendMessage} 
//               className="bg-white text-black px-6 py-2 rounded-full font-bold text-xs hover:bg-gray-200 transition-all"
//             >
//               SEND
//             </button>
//           </div>
//         </div>
//       </div>

//       <style jsx global>{`
//         @keyframes pulse {
//           0%, 100% { opacity: 0.08; transform: scale(1); }
//           50% { opacity: 0.2; transform: scale(1.02); }
//         }
//         .scrollbar-hide::-webkit-scrollbar { display: none; }
//       `}</style>
//     </div>
//   );
// }



// 'use client';
// import { useState, useEffect } from 'react';
// import axios from 'axios';

// export default function Home() {
//   const [sessions, setSessions] = useState<{ id: string; title: string; messages: any[] }[]>([]);
//   const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
//   const [messages, setMessages] = useState<any[]>([]);
//   const [input, setInput] = useState('');
//   const [model, setModel] = useState("models/gemini-2.0-flash");
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   useEffect(() => {
//     const saved = localStorage.getItem('chat-sessions');
//     if (saved) setSessions(JSON.parse(saved));
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('chat-sessions', JSON.stringify(sessions));
//   }, [sessions]);

//   const startNewChat = () => {
//     const newSession = { id: Date.now().toString(), title: "New Chat", messages: [] };
//     setSessions([newSession, ...sessions]);
//     setCurrentSessionId(newSession.id);
//     setMessages([]);
//   };

//   const deleteChat = (id: string, e: React.MouseEvent) => {
//     e.stopPropagation();
//     const updated = sessions.filter(s => s.id !== id);
//     setSessions(updated);
//     if (currentSessionId === id) { setMessages([]); setCurrentSessionId(null); }
//   };

//   const sendMessage = async () => {
//     if (!input.trim()) return;
//     if (!currentSessionId) startNewChat();
//     const userMsg = { role: 'user', content: input };
//     const newMessages = [...messages, userMsg];
//     setMessages(newMessages);
//     setInput('');
//     try {
//       const res = await axios.post('http://127.0.0.1:8000/chat', { history: messages, message: input, model_id: model });
//       const aiMsg = { role: 'assistant', content: res.data.answer.replace(/\*\*/g, '') };
//       setMessages([...newMessages, aiMsg]);
//       setSessions(prev => prev.map(s => s.id === (currentSessionId || s.id) ? { ...s, messages: [...newMessages, aiMsg], title: input.substring(0, 20) } : s));
//     } catch (e) { alert("Server Error!"); }
//   };

//   return (
//     <div className="flex h-screen w-full bg-[#0D0D0D] text-white font-sans overflow-hidden">
      
//       {/* SIDEBAR - Color: #242424 (Lighter/Distinct) */}
//       <div className={`${isSidebarOpen ? 'w-72' : 'w-0'} bg-[#242424] transition-all duration-300 flex flex-col overflow-hidden border-r border-white/5`}>
//         <div className={`p-4 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
//           <button onClick={startNewChat} className="w-full bg-[#333] py-3 rounded-xl text-sm font-bold hover:bg-[#444] transition-all">+ New Chat</button>
//         </div>
//         <div className="flex-1 overflow-y-auto px-3 space-y-2">
//           {sessions.map(s => (
//             <div key={s.id} onClick={() => { setCurrentSessionId(s.id); setMessages(s.messages); }} 
//                  className={`group flex items-center justify-between p-3.5 text-[14px] font-medium rounded-lg cursor-pointer ${currentSessionId === s.id ? 'bg-[#333]' : 'hover:bg-[#2D2D2D]'}`}>
//               <span className="truncate">{s.title}</span>
//               <button onClick={(e) => deleteChat(s.id, e)} className="hidden group-hover:block text-gray-400 hover:text-red-400">✕</button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* MAIN CHAT */}
//       <div className="flex-1 flex flex-col relative bg-[#0D0D0D]">
//         <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
//           <h1 className="font-black text-white uppercase opacity-[0.03]" style={{ fontSize: '10vw' }}>BYTETECK</h1>
//         </div>

//         <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="absolute top-5 left-5 z-50 p-2 hover:bg-white/10 rounded-full transition-all">
//            {isSidebarOpen ? '◀' : '▶'}
//         </button>

//         <div className="relative z-10 flex-1 overflow-y-auto p-10 space-y-8">
//            {messages.map((m, i) => (
//              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
//                {/* Bold Font Weight: font-medium added */}
//                <div className={`p-5 rounded-3xl max-w-[85%] text-[17px] font-medium leading-7 ${m.role === 'user' ? 'bg-[#2A2A2A] text-white' : 'bg-transparent text-gray-100'}`}>
//                  {m.content}
//                </div>
//              </div>
//            ))}
//         </div>

//         <div className="p-6 relative z-20">
//           <div className="max-w-3xl mx-auto flex gap-3 p-3 bg-[#1A1A1A] rounded-3xl border border-white/10 items-center shadow-2xl">
//             <input className="flex-1 bg-transparent px-4 py-2 outline-none text-base font-medium" placeholder="Ask ByteTeck..." 
//                    value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} />
//             <select className="bg-[#2A2A2A] text-xs font-bold px-4 py-2 rounded-xl outline-none" onChange={e => setModel(e.target.value)}>
//               <option value="models/gemini-2.0-flash">2.0 Flash</option>
//               <option value="models/gemini-2.5-flash">2.5 Flash</option>
//               <option value="models/gemini-3.1-flash-lite">3.1 Lite</option>
//               <option value="models/gemini-3.5-flash">3.5 Flash</option>
//               <option value="models/gemini-flash-latest">Flash Latest</option>
//             </select>
//             <button onClick={sendMessage} className="bg-white text-black px-6 py-2 rounded-xl font-black text-sm hover:bg-gray-200">SEND</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function Home() {
  const [sessions, setSessions] = useState<{ id: string; title: string; messages: any[] }[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [model, setModel] = useState("models/gemini-2.0-flash");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const saved = localStorage.getItem('chat-sessions');
    if (saved) setSessions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('chat-sessions', JSON.stringify(sessions));
  }, [sessions]);

  const startNewChat = () => {
    const newSession = { id: Date.now().toString(), title: "New Chat", messages: [] };
    setSessions([newSession, ...sessions]);
    setCurrentSessionId(newSession.id);
    setMessages([]);
  };

  const deleteChat = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = sessions.filter(s => s.id !== id);
    setSessions(updated);
    if (currentSessionId === id) { setMessages([]); setCurrentSessionId(null); }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    if (!currentSessionId) startNewChat();
    const userMsg = { role: 'user', content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    try {
      const res = await axios.post('http://127.0.0.1:8000/chat', { history: messages, message: input, model_id: model });
      const aiMsg = { role: 'assistant', content: res.data.answer.replace(/\*\*/g, '') };
      setMessages([...newMessages, aiMsg]);
      setSessions(prev => prev.map(s => s.id === (currentSessionId || s.id) ? { ...s, messages: [...newMessages, aiMsg], title: input.substring(0, 20) } : s));
    } catch (e) { alert("Server Error!"); }
  };

  return (
    <div className="flex h-screen w-full bg-[#0D0D0D] text-white font-sans overflow-hidden">
      
      {/* SIDEBAR */}
      <div className={`${isSidebarOpen ? 'w-72' : 'w-0'} bg-[#242424] transition-all duration-300 flex flex-col overflow-hidden border-r border-white/5`}>
        <div className={`p-4 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
          <button onClick={startNewChat} className="w-full bg-[#333] py-3 rounded-xl text-sm font-bold hover:bg-[#444] transition-all">Add New Chat</button>
        </div>
        <div className="flex-1 overflow-y-auto px-3 space-y-2">
          {sessions.map(s => (
            <div key={s.id} onClick={() => { setCurrentSessionId(s.id); setMessages(s.messages); }} 
                 className={`group flex items-center justify-between p-3.5 text-[14px] font-medium rounded-lg cursor-pointer ${currentSessionId === s.id ? 'bg-[#333]' : 'hover:bg-[#2D2D2D]'}`}>
              <span className="truncate">{s.title}</span>
              <button onClick={(e) => deleteChat(s.id, e)} className="hidden group-hover:block text-gray-400 hover:text-red-400">✕</button>
            </div>
          ))}
        </div>
      </div>

      {/* MAIN CHAT */}
      <div className="flex-1 flex flex-col relative bg-transparent">
        
        {/* WATERMARK FIXED */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
          <h1 className="watermark-text font-black text-white uppercase select-none text-center px-4">
            BYTETECK
          </h1>
        </div>

        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="absolute top-5 left-5 z-50 p-2 hover:bg-white/10 rounded-full transition-all">
           {isSidebarOpen ? '◀  Close Bar' : '▶  Open Bar'}
        </button>

        <div className="relative z-10 flex-1 overflow-y-auto p-10 space-y-8">
           {messages.map((m, i) => (
             <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
               <div className={`p-5 rounded-3xl max-w-[85%] text-[17px] font-medium leading-7 ${m.role === 'user' ? 'bg-[#2A2A2A] text-white' : 'bg-transparent text-gray-100'}`}>
                 {m.content}
               </div>
             </div>
           ))}
           <div ref={messagesEndRef} />
        </div>

        <div className="p-6 relative z-20">
          <div className="max-w-3xl mx-auto flex gap-3 p-3 bg-[#1A1A1A] rounded-3xl border border-white/10 items-center shadow-2xl">
            <input className="flex-1 bg-transparent px-4 py-2 outline-none text-base font-medium" placeholder="Ask ByteTeck..." 
                   value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} />
            <select className="bg-[#2A2A2A] text-xs font-bold px-4 py-2 rounded-xl outline-none" onChange={e => setModel(e.target.value)}>
              <option value="models/gemini-2.0-flash">2.0 Flash</option>
              <option value="models/gemini-2.5-flash">2.5 Flash</option>
              <option value="models/gemini-3.1-flash-lite">3.1 Lite</option>
              <option value="models/gemini-3.5-flash">3.5 Flash</option>
              <option value="models/gemini-flash-latest">Flash Latest</option>
            </select>
            <button onClick={sendMessage} className="bg-white text-black px-6 py-2 rounded-xl font-black text-sm hover:bg-gray-200">SEND</button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .watermark-text {
            font-size: clamp(90px, 9vw, 110px);
            opacity: 0.15;
            animation: pulse 3s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}