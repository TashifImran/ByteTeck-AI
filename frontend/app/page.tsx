// 'use client';
// import { useState, useRef, useEffect } from 'react';
// import axios from 'axios';

// export default function Home() {
//   const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
//   const [input, setInput] = useState('');
//   const [model, setModel] = useState("gemini-2.0-flash");
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
//       const errorMsg = error.response?.data?.detail || "Backend connection failed. Check uvicorn!";
//       setMessages((prev) => [...prev, { role: 'assistant', content: errorMsg }]);
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-950 text-white p-4">
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
//           className="bg-gray-900 text-xs p-2 rounded-full border border-gray-600 outline-none text-gray-300 cursor-pointer w-32 text-center"
//           value={model}
//           onChange={(e) => setModel(e.target.value)}
//         >
//           <option value="gemini-2.0-flash">2.0 Flash</option>
//           <option value="gemini-2.5-flash">2.5 Flash</option>
//           <option value="gemini-flash-latest">Flash Latest</option>
//           <option value="gemini-3.1-flash-lite">3.1 Lite</option>
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


'use client';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [model, setModel] = useState("gemini-2.0-flash");
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
      const res = await axios.post('http://127.0.0.1:8000/chat', {
        history: messages,
        message: input,
        model_id: model
      });
      
      const cleanAnswer = res.data.answer ? res.data.answer.replace(/\*\*/g, '') : "No response from AI";
      setMessages((prev) => [...prev, { role: 'assistant', content: cleanAnswer }]);
      
    } catch (error: any) {
      console.error("Error details:", error);
      
      let userFriendlyMessage = "System is currently unavailable. Please check your backend connection.";
      
      if (error.response?.status === 429 || error.response?.status === 503) {
        userFriendlyMessage = "⚠️ The selected model is busy. Please try selecting a different model from the dropdown menu and try again.";
      } else if (error.response?.data?.detail) {
        userFriendlyMessage = error.response.data.detail;
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: userFriendlyMessage }]);
    }
  };

  return (
    <div className="flex flex-col h-[600px] max-w-3xl mx-auto bg-gray-950 text-white p-4 border border-gray-800 rounded-2xl mt-10">
      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 mb-4 bg-gray-900 rounded-xl shadow-inner">
        {messages.map((m, i) => (
          <div key={i} className={`p-3 rounded-lg max-w-[80%] ${m.role === 'user' ? 'bg-blue-600 ml-auto' : 'bg-gray-700'}`}>
            {m.content}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="flex gap-2 p-2 bg-gray-800 rounded-full items-center border border-gray-700">
        <input 
          className="flex-1 bg-transparent px-4 outline-none text-white text-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Message ByteTeck AI..."
        />

        <select 
          className="bg-gray-900 text-xs p-2 rounded-full border border-gray-600 outline-none text-gray-300 cursor-pointer w-32 text-center"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        >
          <option value="gemini-2.0-flash">2.0 Flash</option>
          <option value="gemini-2.5-flash">2.5 Flash</option>
          <option value="gemini-flash-latest">Flash Latest</option>
          <option value="gemini-3.1-flash-lite">3.1 Lite</option>
        </select>

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