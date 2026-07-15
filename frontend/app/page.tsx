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


'use client';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function Home() {
  const [sessions, setSessions] = useState<{ id: string; title: string; messages: any[] }[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [model, setModel] = useState("models/gemini-2.0-flash");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const startNewChat = () => {
    const newSession = { id: Date.now().toString(), title: "New Chat", messages: [] };
    setSessions([newSession, ...sessions]);
    setCurrentSessionId(newSession.id);
    setMessages([]);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    if (!currentSessionId) startNewChat();
    
    const userMsg = { role: 'user', content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');

    try {
      const res = await axios.post('https://byteteck-backend.onrender.com/chat', { 
        history: messages, message: input, model_id: model 
      });
      const aiMsg = { role: 'assistant', content: res.data.answer.replace(/\*\*/g, '') };
      setMessages([...newMessages, aiMsg]);
    } catch (e) {
      setMessages([...newMessages, { role: 'assistant', content: "Model limit reached. Please select a different model." }]);
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#0D0D0D] text-white p-4">
      <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full">
        <div className="flex-1 overflow-y-auto space-y-4 p-4">
          {messages.map((m, i) => (
            <div key={i} className={`p-4 rounded-xl ${m.role === 'user' ? 'bg-[#2A2A2A] ml-auto' : 'bg-transparent'}`}>
              {m.content}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex gap-2 p-3 bg-[#1A1A1A] rounded-2xl border border-white/10">
          <input className="flex-1 bg-transparent outline-none px-2" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} />
          <select className="bg-[#2A2A2A] text-xs px-2 rounded-lg" onChange={e => setModel(e.target.value)}>
            <option value="models/gemini-2.0-flash">2.0 Flash</option>
            <option value="models/gemini-3.5-flash">3.5 Flash</option>
            <option value="models/gemini-flash-latest">Flash Latest</option>
          </select>
          <button onClick={sendMessage} className="bg-white text-black px-4 py-2 rounded-xl text-sm font-bold">SEND</button>
        </div>
      </div>
    </div>
  );
}