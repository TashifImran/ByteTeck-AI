import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from google import genai

app = FastAPI()

# Naye aur official SDK ka client initialize
client = genai.Client()

# Allowed Models ki list jo aapne di hai
ALLOWED_MODELS = [
    "gemini-3.5-flash", 
    "gemini-3.5-pro", 
    "gemini-3.1-flash-lite", 
    "gemini-2.5-flash"
]

# Skill Keywords Mapping
SKILL_MAP = {
    "ads": "ads", "advertisement": "ads", "marketing": "ads", "campaign": "ads", "promotion": "ads", "facebook ads": "ads", "google ads": "ads",
    "code": "coding", "python": "coding", "develop": "coding", "javascript": "coding", "nextjs": "coding", "backend": "coding", "frontend": "coding", "programming": "coding", "debug": "coding", "api": "coding", "script": "coding",
    "write": "copywriter", "copywrite": "copywriter" , "content": "copywriter", "blog": "copywriter", "copy": "copywriter", "article": "copywriter", "essay": "copywriter", "email": "copywriter", "draft": "copywriter", "caption": "copywriter",
    "who are you": "identity", "what is your name": "identity", "name": "identity", "about yourself": "identity", "creator": "identity", "tashif": "identity", "tashif imran": "identity", "your identity": "identity", "kisnay banaya": "identity", "ap kon": "identity",
    "image": "pictures", "photo": "pictures", "picture": "pictures", "generate": "pictures", "design": "pictures", "graphic": "pictures", "visual": "pictures", "art": "pictures", "photoshop": "pictures",
    "research": "research", "data": "research", "search": "research", "find": "research", "information": "research", "analyze": "research", "analysis": "research", "facts": "research", "study": "research", "investigate": "research"
}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str
    model: str = "gemini-2.5-flash"  # Default model agar frontend se na aaye

def get_skill_instruction(message: str) -> str:
    msg_lower = message.lower()
    skill_name = "mentor"

    for keyword, s_name in SKILL_MAP.items():
        if keyword in msg_lower:
            skill_name = s_name
            break

    base_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(base_dir, "skills", f"{skill_name}.txt")
    fallback_path = os.path.join(base_dir, "skills", "mentor.txt")

    try:
        target_path = file_path if os.path.exists(file_path) else fallback_path
        with open(target_path, "r", encoding="utf-8") as f:
            return f.read()
    except Exception:
        return "You are a helpful ByteTeck AI assistant developed by Tashif Imran."

@app.post("/api/chat")
async def chat(data: ChatRequest):
    try:
        # Security check: Agar koi ghalat model bhej de toh default wala use ho
        selected_model = data.model if data.model in ALLOWED_MODELS else "gemini-2.5-flash"
        
        instruction = get_skill_instruction(data.message)

        response = client.models.generate_content(
            model=selected_model,
            contents=data.message,
            config={
                'system_instruction': instruction
            }
        )
        return {"answer": response.text}

    except Exception as e:
        return {"answer": f"Backend Error: {str(e)}"}

