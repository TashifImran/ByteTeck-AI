from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai 
from dotenv import load_dotenv
import os

load_dotenv()

client = genai.Client(api_key=os.getenv("GOOGLE_API_KEY"))

# Sare models jo tumhara backend support karega
ALLOWED_MODELS = [
    "models/gemini-2.0-flash",
    "models/gemini-2.5-flash",
    "models/gemini-3.1-flash-lite",
    "models/gemini-3.5-flash",
    "models/gemini-flash-latest"
]

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

@app.post("/chat")
async def chat(data: ChatRequest):
    # Model ID validate karo
    model_id = data.model_id if data.model_id in ALLOWED_MODELS else "models/gemini-2.0-flash"
    
    try:
        response = client.models.generate_content(
            model=model_id,
            contents=data.message,
            config=genai.types.GenerateContentConfig(
                system_instruction="You are ByteTeck AI, created by Tashif Imran. Be helpful and professional."
            )
        )
        return {"answer": response.text}
    except Exception as e:
        return {"answer": "Model limit reached or error occurred. Please try again."}

@app.get("/")
async def root():
    return {"status": "Backend is running"}