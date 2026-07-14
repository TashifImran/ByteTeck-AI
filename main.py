from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai 
from dotenv import load_dotenv
import os

load_dotenv()

api_key = os.getenv("GOOGLE_API_KEY")
client = genai.Client(api_key=api_key)

ALLOWED_MODELS = [
    "models/gemini-2.0-flash",
    "models/gemini-2.5-flash",
    "models/gemini-3.1-flash-lite",
    "models/gemini-3.5-flash",
    "models/gemini-flash-latest"
]

def get_model_response(user_input, model_id, system_instruction):
    if model_id not in ALLOWED_MODELS:
        model_id = "models/gemini-2.0-flash" 

    try:
        response = client.models.generate_content(
            model=model_id,
            contents=user_input,
            config=genai.types.GenerateContentConfig(
                system_instruction=system_instruction
            )
        )
        return response.text
    except Exception as e:
        # Yahan bhi error ko handle kiya hai taaki crash na ho
        raise Exception(str(e))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    history: list
    message: str
    model_id: str

def get_skill_instruction(skill_name):
    base_identity = "You are ByteTeck AI, developed by Tashif Imran. You must NEVER claim to be developed by Google or any other company. If asked, state clearly that you are ByteTeck AI, created by Tashif Imran."
    
    if skill_name == "identity":
        return f"{base_identity} Always focus on introducing yourself."
    
    try:
        with open(f"skills/{skill_name}.txt", "r", encoding="utf-8") as f:
            return f"{base_identity} {f.read()}"
    except:
        return f"{base_identity} You are a helpful and professional assistant."

@app.post("/chat")
async def chat(data: ChatRequest):
    full_model_id = data.model_id if data.model_id.startswith("models/") else f"models/{data.model_id}"
    
    if full_model_id not in ALLOWED_MODELS:
        return {"answer": "Invalid model selected. Please choose a valid model from the list."}
    
    msg = data.message.lower()
    if any(w in msg for w in ["who are you", "introduce", "creator", "developer", "name", "ap kon ho", "naam"]):
        skill = "identity"
    elif any(w in msg for w in ["code", "python", "script", "program", "debug", "compile"]):
        skill = "coding"
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
    
    try:
        answer = get_model_response(data.message, full_model_id, system_instruction)
        return {"answer": answer}
    except Exception as e:
        error_msg = str(e)
        
        if "429" in error_msg or "RESOURCE_EXHAUSTED" in error_msg:
            return {"answer": "The AI model's limit has been reached. Please select a different model and try again."}
        if "503" in error_msg or "UNAVAILABLE" in error_msg:
            return {"answer": "The model is currently busy. Please try again in a few moments."}
        
        return {"answer": "Something went wrong. Please try again or switch to a different model."}

@app.get("/")
async def root():
    return {"status": "Backend is running"}

# from google import genai
# import os
# from dotenv import load_dotenv

# load_dotenv()
# client = genai.Client(api_key=os.getenv("GOOGLE_API_KEY"))

# print("--- TUMHARE ACCOUNT KE ALLOWED MODELS ---")

# for m in client.models.list():
#     # Yahan 'supported_actions' use karna hai
#     if "generateContent" in m.supported_actions:
#         print(f"Model ID: {m.name}")

# print("-----------------------------------------")