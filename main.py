import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai 

client = genai.Client(api_key=os.environ.get("GOOGLE_API_KEY"))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ALLOWED_MODELS = ["models/gemini-3.5-flash", "models/gemini-3.1-flash-lite", "models/gemini-2.5-flash"]

class ChatRequest(BaseModel):
    history: list
    message: str
    model_id: str

def get_skill_instruction(skill_name):
    try:
        with open(f"skills/{skill_name}.txt", "r", encoding="utf-8") as f:
            return f.read()
    except:
        with open("skills/mentor.txt", "r", encoding="utf-8") as f:
            return f.read()

def get_model_response(history, user_input, model_id):
    msg = user_input.lower()
    
    # --- YEH RAHA OPTIMIZED IF-ELIF ROUTING ---
    if any(w in msg for w in ["code", "python", "script", "program", "debug", "compile"]):
        skill = "coding"
    elif any(w in msg for w in ["who are you", "introduce", "creator", "developer", "name"]):
        skill = "identity"
    elif any(w in msg for w in ["picture", "image", "draw", "generate", "photo"]):
        skill = "pictures"
    elif any(w in msg for w in ["ads", "advertisement", "marketing", "promotion", "campaign"]):
        skill = "ads"
    elif any(w in msg for w in ["write", "copy", "blog", "article", "content"]):
        skill = "copywriter"
    elif any(w in msg for w in ["research", "search", "find", "look up", "info"]):
        skill = "research"
    else:
        skill = "mentor"
    
    system_instruction = get_skill_instruction(skill)
    
    response = client.models.generate_content(
        model=model_id,
        contents=user_input,
        config={"system_instruction": system_instruction}
    )
    return response.text

@app.post("/chat")
async def chat(data: ChatRequest):
    full_model_id = data.model_id if data.model_id.startswith("models/") else f"models/{data.model_id}"
    if full_model_id not in ALLOWED_MODELS:
        raise HTTPException(status_code=400, detail="Invalid model!")
        
    try:
        answer = get_model_response(data.history, data.message, full_model_id)
        return {"answer": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))