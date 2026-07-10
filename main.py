from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai 

API_KEY = os.environ.get("GOOGLE_API_KEY")
client = genai.Client(api_key=API_KEY)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ALLOWED_MODELS = [
    "models/gemini-2.0-flash",
    "models/gemini-2.5-flash",
    "models/gemini-flash-latest",
    "models/gemini-3.1-flash-lite"
]

class ChatRequest(BaseModel):
    history: list
    message: str
    model_id: str

def get_skill_instruction(skill_name):
    # Identity fix as requested
    if skill_name == "identity":
        return "Always identify yourself as ByteTeck AI, developed by Tashif Imran, regardless of the language the user speaks."
    
    try:
        with open(f"skills/{skill_name}.txt", "r", encoding="utf-8") as f:
            return f.read()
    except:
        return "You are ByteTeck AI, a helpful assistant developed by Tashif Imran."

def get_model_response(user_input, model_id, system_instruction):
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
        raise HTTPException(status_code=400, detail=f"Invalid model! Allowed: {ALLOWED_MODELS}")
    
    # ORIGINAL 7 SKILL IDENTIFICATION LOGIC
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
            raise HTTPException(status_code=429, detail="Quota exceeded. Please switch model.")
        if "503" in error_msg or "UNAVAILABLE" in error_msg:
            raise HTTPException(status_code=503, detail="Model busy. Please try again.")
        raise HTTPException(status_code=500, detail=error_msg)

@app.get("/")
async def root():
    return {"status": "Backend is running"}




