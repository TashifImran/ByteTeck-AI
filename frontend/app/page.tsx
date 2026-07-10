'use client';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [model, setModel] = useState('gemini-3.5-flash');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await axios.post(`${API_URL}/chat`, {
        history: messages,
        message: input,
        model_id: model
      });
      
      // Clean up response: remove markdown asterisks
      const cleanAnswer = res.data.answer.replace(/\*\*/g, '');
      setMessages((prev) => [...prev, { role: 'assistant', content: cleanAnswer }]);
    } catch (error: any) {
      console.error("Error:", error);
      const errorMsg = error.response?.data?.detail || "This model is not responding. Switch to another model and try again.";
      setMessages((prev) => [...prev, { role: 'assistant', content: errorMsg }]);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-950 text-white p-4">
      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 mb-4 bg-gray-900 rounded-xl shadow-inner">
        {messages.map((m, i) => (
          <div key={i} className={`p-3 rounded-lg max-w-[80%] ${m.role === 'user' ? 'bg-blue-600 ml-auto' : 'bg-gray-700'}`}>
            {m.content}
          </div>
        ))}
      </div>

      {/* Input Capsule - Final Optimized Layout */}
      <div className="flex gap-2 p-2 bg-gray-800 rounded-full items-center border border-gray-700">
        
        {/* Input Box: flex-1 takes all available middle space */}
        <input 
          className="flex-1 bg-transparent px-4 outline-none text-white text-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Message ByteTeck AI..."
        />

        {/* Model Selector: Fixed width on the right */}
        <select 
          className="bg-gray-900 text-xs p-2 rounded-full border border-gray-600 outline-none text-gray-300 cursor-pointer w-28 text-center"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        >
          <option value="gemini-3.5-flash">3.5 Flash</option>
          <option value="gemini-3.1-flash-lite">3.1 Flash</option>
          <option value="gemini-2.5-flash">2.5 Flash</option>
        </select>

        {/* Send Button */}
        <button 
          onClick={sendMessage} 
          className="bg-blue-600 px-6 py-2 rounded-full hover:bg-blue-500 transition text-sm font-medium"
        >
          Send
        </button>
      </div>
    </div>
  );
}