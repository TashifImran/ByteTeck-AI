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
    // Sidebar band nahi hoga
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
      // Yahan apna Render wala Live URL daalna jab deploy ho jaye
      const res = await axios.post('https://byteteck-backend.onrender.com/chat', { 
        history: messages, 
        message: input, 
        model_id: model 
      });
      const aiMsg = { role: 'assistant', content: res.data.answer.replace(/\*\*/g, '') };
      setMessages([...newMessages, aiMsg]);
      setSessions(prev => prev.map(s => s.id === (currentSessionId || s.id) ? { ...s, messages: [...newMessages, aiMsg], title: input.substring(0, 20) } : s));
    } catch (e) { alert("Server Error! Please check if the backend is running."); }
    // Sidebar band karne wali line yahan se hata di hai
  };

  return (
    <div className="flex h-screen w-full bg-[#0D0D0D] text-white font-sans overflow-hidden">
      
      {/* SIDEBAR */}
      <div className={`${isSidebarOpen ? 'w-72' : 'w-0'} fixed md:relative z-40 h-full bg-[#242424] transition-all duration-300 flex flex-col overflow-hidden border-r border-white/5`}>
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
      <div className="flex-1 flex flex-col relative bg-transparent w-full overflow-hidden">
        
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
          <h1 className="text-[clamp(40px,8vw,110px)] font-black text-white opacity-[0.15] uppercase select-none text-center px-4 animate-pulse">
            BYTETECK
          </h1>
        </div>

        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="absolute top-5 left-5 z-50 p-2 hover:bg-white/10 rounded-full transition-all">
           {isSidebarOpen ? '◀ Close' : '▶ Menu'}
        </button>

        <div className="relative z-10 flex-1 overflow-y-auto p-4 md:p-10 space-y-8">
           {messages.map((m, i) => (
             <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
               <div className={`p-4 md:p-5 rounded-3xl max-w-[95%] md:max-w-[85%] text-[15px] md:text-[17px] font-medium leading-7 ${m.role === 'user' ? 'bg-[#2A2A2A] text-white' : 'bg-transparent text-gray-100'}`}>
                 {m.content}
               </div>
             </div>
           ))}
           <div ref={messagesEndRef} />
        </div>

        <div className="p-4 md:p-6 relative z-20">
          <div className="w-full max-w-3xl mx-auto flex gap-2 md:gap-3 p-2 md:p-3 bg-[#1A1A1A] rounded-3xl border border-white/10 items-center shadow-2xl">
            <input className="flex-1 bg-transparent px-2 md:px-4 py-2 outline-none text-sm md:text-base font-medium" placeholder="Ask ByteTeck..." 
                   value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} />
            <select className="bg-[#2A2A2A] text-[10px] md:text-xs font-bold px-2 md:px-4 py-2 rounded-xl outline-none" onChange={e => setModel(e.target.value)}>
              <option value="models/gemini-2.0-flash">2.0 Flash</option>
              <option value="models/gemini-2.5-flash">2.5 Flash</option>
              <option value="models/gemini-3.1-flash-lite">3.1 Lite</option>
              <option value="models/gemini-3.5-flash">3.5 Flash</option>
              <option value="models/gemini-flash-latest">Flash Latest</option>
            </select>
            <button onClick={sendMessage} className="bg-white text-black px-4 md:px-6 py-2 rounded-xl font-black text-xs md:text-sm hover:bg-gray-200">SEND</button>
          </div>
        </div>
      </div>
    </div>
  );
}