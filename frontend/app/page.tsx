'use client';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [model, setModel] = useState('gemini-3.5-flash'); // Default model set kiya hai
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logic
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    try {
      // Railway URL (Ya local development ke liye localhost)
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      
      const res = await axios.post(`${API_URL}/chat`, {
        history: messages,
        message: input,
        model_id: model // Backend ab khud handle karega
      });
      
      setMessages((prev) => [...prev, { role: 'assistant', content: res.data.answer }]);
    } catch (error) {
      console.error("Error connecting to backend:", error);
      alert("Backend connection error! Check if Railway is live.");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-950 text-white p-4">
      {/* Model Selector */}
      <select 
        className="bg-gray-800 p-2 rounded-lg mb-4 border border-gray-700 text-white" 
        value={model}
        onChange={(e) => setModel(e.target.value)}
      >
        <option value="gemini-3.5-flash">Gemini 3.5 Flash</option>
        <option value="gemini-3.1-flash-lite">Gemini 3.1 Flash Lite</option>
        <option value="gemini-2.5-flash">Gemini 2.5 Flash</option>
        <option value="gemini-2.0-flash">Gemini 2.0 Flash</option>
      </select>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 mb-4 bg-gray-900 rounded-xl shadow-inner">
        {messages.map((m, i) => (
          <div key={i} className={`p-3 rounded-lg max-w-[80%] ${m.role === 'user' ? 'bg-blue-600 ml-auto' : 'bg-gray-700'}`}>
            {m.content}
          </div>
        ))}
      </div>

      {/* Input Capsule */}
      <div className="flex gap-2 p-2 bg-gray-800 rounded-full items-center border border-gray-700">
        <input 
          className="flex-1 bg-transparent px-4 outline-none text-white"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Message ByteTeck AI..."
        />
        <button onClick={sendMessage} className="bg-blue-500 px-6 py-2 rounded-full hover:bg-blue-400 transition">
          Send
        </button>
      </div>
    </div>
  );
}