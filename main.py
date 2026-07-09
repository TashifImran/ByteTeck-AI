from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from google import genai
from google.genai import types
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

load_dotenv()

# Client initialize
API_KEY = os.getenv("GOOGLE_API_KEY") 
client = genai.Client(api_key=API_KEY)

# FIXED: Tumhari list se valid models
ALLOWED_MODELS = [
    "models/gemini-3.5-flash", 
    "models/gemini-3.1-flash-lite", 
    "models/gemini-2.0-flash", 
    "models/gemini-2.5-flash"
]

def load_skill_prompt(skill_name):
    file_path = os.path.join("skills", f"{skill_name}.txt")
    if os.path.exists(file_path):
        with open(file_path, "r", encoding="utf-8") as f:
            return f.read().strip()
    return "You are an expert AI assistant."

def get_system_instruction(user_input):
    text = user_input.lower()
    if any(w in text for w in ["who are you", "introduce", "creator", "developer", "name"]): return load_skill_prompt("Identity")
    if any(w in text for w in ["code", "script", "python", "java", "function"]): return load_skill_prompt("coding")
    if any(w in text for w in ["ad", "sell", "marketing", "advertisement"]): return load_skill_prompt("adds")
    if any(w in text for w in ["email", "write", "copy", "content"]): return load_skill_prompt("copywriter")
    if any(w in text for w in ["picture", "image", "art", "photo", "draw"]): return load_skill_prompt("picture")
    if any(w in text for w in ["research", "data", "summary", "find", "search"]): return load_skill_prompt("research")
    return load_skill_prompt("mentor")

def get_model_response(history, user_input, model_id):
    # FIXED: Agar frontend se bina 'models/' prefix ke aaye, toh fix kar do
    if not model_id.startswith("models/"):
        model_id = f"models/{model_id}"
        
    instruction = get_system_instruction(user_input)
    
    formatted_history = []
    for m in history:
        role = "user" if m['role'] == "user" else "model"
        formatted_history.append(types.Content(
            role=role,
            parts=[types.Part.from_text(text=m['content'])]
        ))
    
    response = client.models.generate_content(
        model=model_id,
        contents=formatted_history + [types.Content(role="user", parts=[types.Part.from_text(text=user_input)])],
        config=types.GenerateContentConfig(system_instruction=instruction)
    )
    return response.text

class ChatRequest(BaseModel):
    history: list
    message: str
    model_id: str

@app.post("/chat")
async def chat(data: ChatRequest):
    # FIXED: Prefix check karne ke liye logic
    full_model_id = data.model_id if data.model_id.startswith("models/") else f"models/{data.model_id}"
    
    if full_model_id not in ALLOWED_MODELS:
        raise HTTPException(status_code=400, detail=f"Invalid model! Available: {ALLOWED_MODELS}")
        
    try:
        answer = get_model_response(data.history, data.message, full_model_id)
        return {"answer": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))