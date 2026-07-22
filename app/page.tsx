// 'use client';
// import { useState, useEffect, useRef } from 'react';
// import axios from 'axios';

// export default function Home() {
//   const [sessions, setSessions] = useState<{ id: string; title: string; messages: any[] }[]>([]);
//   const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
//   const [messages, setMessages] = useState<any[]>([]);
//   const [input, setInput] = useState('');
//   const [model, setModel] = useState("models/gemini-2.0-flash");
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => { scrollToBottom(); }, [messages]);

//   const startNewChat = () => {
//     const newSession = { id: Date.now().toString(), title: "New Chat", messages: [] };
//     setSessions([newSession, ...sessions]);
//     setCurrentSessionId(newSession.id);
//     setMessages([]);
//   };

//   const sendMessage = async () => {
//     if (!input.trim()) return;
//     if (!currentSessionId) startNewChat();
    
//     const userMsg = { role: 'user', content: input };
//     const newMessages = [...messages, userMsg];
//     setMessages(newMessages);
//     setInput('');

//     try {
//       // Yahan apna Sahi Live Backend URL daalna!
//       const res = await axios.post('https://byteteck-backend.onrender.com/chat', { 
//         history: messages, 
//         message: input, 
//         model_id: model 
//       });
      
//       const aiMsg = { role: 'assistant', content: res.data.answer.replace(/\*\*/g, '') };
//       setMessages([...newMessages, aiMsg]);
//     } catch (e) {
//       // Ye raha tumhara manga hua error message
//       const errorMsg = { 
//         role: 'assistant', 
//         content: "Model limit reached. Please select a different model and try again." 
//       };
//       setMessages([...newMessages, errorMsg]);
//     }
//   };

//   return (
//     <div className="flex h-screen w-full bg-[#0D0D0D] text-white font-sans overflow-hidden">
//       <div className={`${isSidebarOpen ? 'w-72' : 'w-0'} fixed md:relative z-40 h-full bg-[#242424] transition-all duration-300 flex flex-col border-r border-white/5`}>
//         <div className="p-4"><button onClick={startNewChat} className="w-full bg-[#333] py-3 rounded-xl text-sm font-bold hover:bg-[#444]">Add New Chat</button></div>
//         <div className="flex-1 overflow-y-auto px-3 space-y-2">
//           {sessions.map(s => (
//             <div key={s.id} onClick={() => { setCurrentSessionId(s.id); setMessages(s.messages); }} className="p-3.5 text-[14px] rounded-lg cursor-pointer hover:bg-[#2D2D2D]">
//               <span className="truncate">{s.title}</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="flex-1 flex flex-col relative bg-transparent w-full overflow-hidden">
//         <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="absolute top-5 left-5 z-50 p-2 hover:bg-white/10 rounded-full">
//            {isSidebarOpen ? '◀ Close' : '▶ Menu'}
//         </button>

//         <div className="relative z-10 flex-1 overflow-y-auto p-4 md:p-10 space-y-8">
//            {messages.map((m, i) => (
//              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
//                <div className={`p-4 rounded-3xl max-w-[85%] ${m.role === 'user' ? 'bg-[#2A2A2A]' : 'bg-transparent'}`}>
//                  {m.content}
//                </div>
//              </div>
//            ))}
//            <div ref={messagesEndRef} />
//         </div>

//         <div className="p-4 md:p-6">
//           <div className="w-full max-w-3xl mx-auto flex gap-3 p-3 bg-[#1A1A1A] rounded-3xl border border-white/10 items-center">
//             <input className="flex-1 bg-transparent px-4 py-2 outline-none" placeholder="Ask ByteTeck..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} />
//             <select className="bg-[#2A2A2A] text-xs font-bold px-4 py-2 rounded-xl" onChange={e => setModel(e.target.value)}>
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


// 'use client';
// import { useState, useEffect, useRef } from 'react';
// import axios from 'axios';

// export default function Home() {
//   const [sessions, setSessions] = useState<{ id: string; title: string; messages: any[] }[]>([]);
//   const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
//   const [messages, setMessages] = useState<any[]>([]);
//   const [input, setInput] = useState('');
//   const [model, setModel] = useState("models/gemini-2.0-flash");
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   // Auto-scroll
//   useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

//   // Load Saved Chats
//   useEffect(() => {
//     const saved = localStorage.getItem('chat-sessions');
//     if (saved) setSessions(JSON.parse(saved));
//   }, []);

//   // Save Chats to LocalStorage
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
//       const res = await axios.post('https://byteteck-backend.onrender.com/chat', { 
//         history: messages, message: input, model_id: model 
//       });
//       const aiMsg = { role: 'assistant', content: res.data.answer.replace(/\*\*/g, '') };
//       const updatedMessages = [...newMessages, aiMsg];
//       setMessages(updatedMessages);
//       setSessions(prev => prev.map(s => s.id === (currentSessionId || s.id) ? { ...s, messages: updatedMessages, title: input.substring(0, 20) } : s));
//     } catch (e) {
//       setMessages([...newMessages, { role: 'assistant', content: "Error: Model limit reached." }]);
//     }
//   };

//   return (
//     <div className="flex h-screen w-full bg-[#0D0D0D] text-white font-sans overflow-hidden">
//       {/* Sidebar */}
//       <div className={`${isSidebarOpen ? 'w-72' : 'w-0'} bg-[#242424] transition-all flex flex-col border-r border-white/5`}>
//         <div className="p-4 font-bold text-xl text-center">BYTETECK AI</div>
//         <div className="p-4"><button onClick={startNewChat} className="w-full bg-[#333] py-3 rounded-xl hover:bg-[#444]">Add New Chat</button></div>
//         <div className="flex-1 overflow-y-auto px-3">
//           {sessions.map(s => (
//             <div key={s.id} onClick={() => { setCurrentSessionId(s.id); setMessages(s.messages); }} 
//                  className={`p-3 flex justify-between cursor-pointer hover:bg-[#2D2D2D] rounded-lg ${currentSessionId === s.id ? 'bg-[#333]' : ''}`}>
//               <span>{s.title}</span>
//               <button onClick={(e) => deleteChat(s.id, e)} className="text-red-400">✕</button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Main Chat */}
//       <div className="flex-1 flex flex-col p-4">
//         <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 w-fit">Menu</button>
//         <div className="flex-1 overflow-y-auto p-4 space-y-4">
//           {messages.map((m, i) => (
//             <div key={i} className={`p-4 rounded-xl max-w-[80%] ${m.role === 'user' ? 'bg-[#2A2A2A] ml-auto' : ''}`}>{m.content}</div>
//           ))}
//           <div ref={messagesEndRef} />
//         </div>
//         <div className="flex gap-2 p-3 bg-[#1A1A1A] rounded-2xl">
//           <input className="flex-1 bg-transparent outline-none" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} />
//           <select className="bg-[#2A2A2A] text-xs px-2 rounded-lg" onChange={e => setModel(e.target.value)}>
//             <option value="models/gemini-2.0-flash">2.0 Flash</option>
//             <option value="models/gemini-2.5-flash">2.5 Flash</option>
//             <option value="models/gemini-3.1-flash-lite">3.1 Lite</option>
//             <option value="models/gemini-3.5-flash">3.5 Flash</option>
//             <option value="models/gemini-flash-latest">Flash Latest</option>




// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import axios from 'axios';

// export default function Home() {
//   const [sessions, setSessions] = useState<{ id: string; title: string; messages: any[] }[]>([]);
//   const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
//   const [messages, setMessages] = useState<any[]>([]);
//   const [input, setInput] = useState('');
//   const [model, setModel] = useState("gemini-3.5-flash");
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

//   const startNewChat = () => {
//     setCurrentSessionId(null);
//     setMessages([]);
//   };

//   const deleteChat = (e: React.MouseEvent, id: string) => {
//     e.stopPropagation();
//     const updated = sessions.filter(s => s.id !== id);
//     setSessions(updated);
//     if (currentSessionId === id) {
//       setCurrentSessionId(null);
//       setMessages([]);
//     }
//   };

//   const sendMessage = async () => {
//     if (!input.trim()) return;
//     const userMsg = { role: 'user', content: input };
//     let activeId = currentSessionId || Date.now().toString();
//     const isNew = !currentSessionId;
//     if (isNew) setCurrentSessionId(activeId);
//     const updatedMessages = [...messages, userMsg];
//     setMessages(updatedMessages);
//     setInput('');
//     const newTitle = updatedMessages.length === 1 ? input.slice(0, 25) : (sessions.find(s => s.id === activeId)?.title || "New Chat");
//     try {
//       const res = await axios.post('/api/chat', {
//         history: messages, message: input, model_id: model
//       });
//       const finalMsgs = [...updatedMessages, { role: 'assistant', content: res.data.answer.replace(/\*\*/g, '') }];
//       setMessages(finalMsgs);
//       if (isNew) setSessions([{ id: activeId, title: newTitle, messages: finalMsgs }, ...sessions]);
//       else setSessions(sessions.map(s => s.id === activeId ? { ...s, title: newTitle, messages: finalMsgs } : s));
//     } catch (e: any) {
//       setMessages([...updatedMessages, { role: 'assistant', content: "Backend Error." }]);
//     }
//   };

//   return (
//     <div className="flex h-screen w-full bg-[#0D0D0D] text-white overflow-hidden relative">
      
//       {/* Background Animation - YE AB FIXED HAI AUR Z-INDEX 0 PE HAI */}
//       <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
//         <h1 className="text-[120px] font-black text-[#00F2FF] opacity-[0.08] animate-pulse select-none tracking-widest uppercase">
//           BYTETECK
//         </h1>
//       </div>

//       {/* Sidebar - Z-INDEX 20 */}
//       <div className={`${isSidebarOpen ? 'w-72' : 'w-0'} bg-[#1C1C1C]/90 backdrop-blur-md flex flex-col border-r border-white/10 transition-all duration-300 overflow-hidden z-20`}>
//         <div className="p-4 flex justify-between items-center">
//           <div className="text-xl font-bold">BYTETECK</div>
//           <button onClick={() => setIsSidebarOpen(false)} className="text-2xl hover:text-red-400 transition-colors">×</button>
//         </div>
//         <div className="px-4 mb-4">
//           <button onClick={startNewChat} className="w-full bg-[#333] py-2 rounded-lg hover:bg-[#444] font-medium">+ New Chat</button>
//         </div>
//         <div className="flex-1 overflow-y-auto px-4 space-y-2">
//           {sessions.map(s => (
//             <div key={s.id} onClick={() => { setCurrentSessionId(s.id); setMessages(s.messages); }} 
//                  className={`group flex justify-between items-center p-3 rounded-lg cursor-pointer hover:bg-[#333] ${currentSessionId === s.id ? 'bg-[#333]' : ''}`}>
//               <span className="truncate w-40 text-sm">{s.title}</span>
//               <button onClick={(e) => deleteChat(e, s.id)} className="text-red-400 opacity-0 group-hover:opacity-100 font-bold px-2">✕</button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Chat Area - Z-INDEX 10, TRANSPARENT BG */}
//       <div className="flex-1 flex flex-col relative z-10 bg-transparent">
//         {!isSidebarOpen && (
//           <button onClick={() => setIsSidebarOpen(true)} className="absolute top-4 left-4 z-20 bg-[#242424] px-4 py-2 rounded-lg border border-white/10 hover:bg-[#333]">Menu</button>
//         )}
        
//         <div className="flex-1 overflow-y-auto p-6 space-y-4">
//           {messages.map((m, i) => (
//             <div key={i} className={`p-4 rounded-xl max-w-[80%] shadow-lg ${m.role === 'user' ? 'bg-[#2A2A2A]/80 ml-auto' : 'bg-[#1A1A1A]/80 border border-white/10'}`}>
//               {m.content}
//             </div>
//           ))}
//           <div ref={messagesEndRef} />
//         </div>

//         {/* Input Area - SEMI-TRANSPARENT */}
//         <div className="p-4 bg-transparent">
//           <div className="flex gap-2 p-3 bg-[#1A1A1A]/90 backdrop-blur rounded-2xl border border-white/10">
//             <input className="flex-1 bg-transparent outline-none px-2" placeholder="Ask ByteTeck..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} />
//             <select className="bg-[#2A2A2A] text-xs px-2 rounded-lg cursor-pointer outline-none hover:bg-[#333]" onChange={e => setModel(e.target.value)}>
//               <option value="gemini-3.5-flash">3.5 Flash</option>
//               <option value="gemini-3.5-pro">3.5 Pro</option>
//               <option value="gemini-3.1-flash-lite">3.1 Flash Lite</option>
//               <option value="gemini-2.5-flash">2.5 Flash</option>
//             </select>
//             <button onClick={sendMessage} className="bg-white text-black px-6 py-2 rounded-xl font-bold hover:bg-gray-200">SEND</button>
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
  const [model, setModel] = useState("gemini-3.5-flash");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const startNewChat = () => {
    setCurrentSessionId(null);
    setMessages([]);
  };

  const deleteChat = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const updated = sessions.filter(s => s.id !== id);
    setSessions(updated);
    if (currentSessionId === id) {
      setCurrentSessionId(null);
      setMessages([]);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    let activeId = currentSessionId || Date.now().toString();
    const isNew = !currentSessionId;
    if (isNew) setCurrentSessionId(activeId);
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    const newTitle = updatedMessages.length === 1 ? input.slice(0, 25) : (sessions.find(s => s.id === activeId)?.title || "New Chat");
    try {
      // const res = await axios.post('/api/chat', {
      //   history: messages, message: input, model_id: model
      // });
      const res = await axios.post('/api/chat', {
        history: messages, message: input, model_id: model
      });
        
      const finalMsgs = [...updatedMessages, { role: 'assistant', content: res.data.answer.replace(/\*\*/g, '') }];
      setMessages(finalMsgs);
      if (isNew) setSessions([{ id: activeId, title: newTitle, messages: finalMsgs }, ...sessions]);
      else setSessions(sessions.map(s => s.id === activeId ? { ...s, title: newTitle, messages: finalMsgs } : s));
    } catch (e: any) {
      setMessages([...updatedMessages, { role: 'assistant', content: "Backend Error." }]);
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#0D0D0D] text-white overflow-hidden relative">
      
      {/* Sidebar - Z-INDEX 20 */}
      <div className={`${isSidebarOpen ? 'w-72' : 'w-0'} bg-[#1C1C1C]/90 backdrop-blur-md flex flex-col border-r border-white/10 transition-all duration-300 overflow-hidden z-20 flex-shrink-0`}>
        <div className="p-4 flex justify-between items-center">
          <div className="text-xl font-bold">BYTETECK</div>
          <button onClick={() => setIsSidebarOpen(false)} className="text-2xl hover:text-red-400 transition-colors">×</button>
        </div>
        <div className="px-4 mb-4">
          <button onClick={startNewChat} className="w-full bg-[#333] py-2 rounded-lg hover:bg-[#444] font-medium">+ New Chat</button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 space-y-2">
          {sessions.map(s => (
            <div key={s.id} onClick={() => { setCurrentSessionId(s.id); setMessages(s.messages); }} 
                 className={`group flex justify-between items-center p-3 rounded-lg cursor-pointer hover:bg-[#333] ${currentSessionId === s.id ? 'bg-[#333]' : ''}`}>
              <span className="truncate w-40 text-sm">{s.title}</span>
              <button onClick={(e) => deleteChat(e, s.id)} className="text-red-400 opacity-0 group-hover:opacity-100 font-bold px-2">✕</button>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area - Z-INDEX 10, Yeh ab sidebar ke baad bachi hui poori jagah lega aur background text sirf iske andar center rahega */}
      <div className="flex-1 flex flex-col relative z-10 bg-transparent overflow-hidden">
        
        {/* Background Watermark Text - Sirf Chat Area ke andar centered */}
        {/* Background Watermark Text - Opacity 40 */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 px-6">
          <h1 className="text-[75px] font-black text-gray-500 opacity-40 select-none tracking-widest uppercase text-center">
            BYTETECK
          </h1>
        </div>

        {!isSidebarOpen && (
          <button onClick={() => setIsSidebarOpen(true)} className="absolute top-4 left-4 z-20 bg-[#242424] px-4 py-2 rounded-lg border border-white/10 hover:bg-[#333]">Menu</button>
        )}
        
        <div className="flex-1 overflow-y-auto p-6 space-y-4 relative z-10">
          {messages.map((m, i) => (
            <div key={i} className={`p-4 rounded-xl max-w-[80%] shadow-lg ${m.role === 'user' ? 'bg-[#2A2A2A]/90 ml-auto' : 'bg-[#1A1A1A]/90 border border-white/10'}`}>
              {m.content}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-transparent relative z-10">
          <div className="flex gap-2 p-3 bg-[#1A1A1A]/95 backdrop-blur rounded-2xl border border-white/10 max-w-4xl mx-auto w-full">
            <input className="flex-1 bg-transparent outline-none px-2" placeholder="Ask ByteTeck..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} />
            <select className="bg-[#2A2A2A] text-xs px-2 rounded-lg cursor-pointer outline-none hover:bg-[#333]" onChange={e => setModel(e.target.value)}>
              <option value="gemini-3.5-flash">3.5 Flash</option>
              <option value="gemini-3.5-pro">3.5 Pro</option>
              <option value="gemini-3.1-flash-lite">3.1 Flash Lite</option>
              <option value="gemini-2.5-flash">2.5 Flash</option>
            </select>
            <button onClick={sendMessage} className="bg-white text-black px-6 py-2 rounded-xl font-bold hover:bg-gray-200">SEND</button>
          </div>
        </div>

      </div>
    </div>
  );
}
