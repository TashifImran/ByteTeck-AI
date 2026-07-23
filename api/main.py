# import os
# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# from google import genai

# app = FastAPI()

# client = genai.Client()

# ALLOWED_MODELS = [
#     "gemini-3.5-flash", 
#     "gemini-3.5-pro", 
#     "gemini-3.1-flash-lite", 
#     "gemini-2.5-flash"
# ]

# SKILL_MAP = {
#     "byteteck": "company",
#     "bytetech": "company",
#     "byte teck": "company",
#     "digital byteteck": "company",
#     "about byteteck": "company",
#     "what is byteteck": "company",
#     "byteteck kya hai": "company",
#     "founder": "company",
#     "office": "company",
#     "tell about byteteck": "company",
#     "location": "company",
#     "services": "company",
#     "company": "company",
#     "about us": "company",
#     "who owns byteteck": "company",
#     "ads": "ads",
#     "marketing": "ads",
#     "code": "coding",
#     "python": "coding",
#     "developer": "identity",
#     "who are you": "identity",
#     "tashif": "identity"
# }

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# class ChatRequest(BaseModel):
#     message: str
#     model: str = "gemini-2.5-flash"
#     history: list = []  

# def get_skill_instruction(message: str) -> str:
#     msg_lower = message.lower()
#     skill_name = "mentor"  # Default agar kuch match na ho

#     # Check loop
#     for keyword, s_name in SKILL_MAP.items():
#         if keyword in msg_lower:
#             skill_name = s_name
#             print(f"✅ Keyword Matched: '{keyword}' --> Assigned Skill: '{skill_name}'")
#             break

#     base_dir = os.path.dirname(os.path.abspath(__file__))
#     file_path = os.path.join(base_dir, "skills", f"{skill_name}.txt")
#     fallback_path = os.path.join(base_dir, "skills", "mentor.txt")

#     print(f"📂 Looking for file at: {file_path}")

#     try:
#         if os.path.exists(file_path):
#             with open(file_path, "r", encoding="utf-8") as f:
#                 content = f.read()
#                 print(f"🎉 SUCCESS: Read file '{skill_name}.txt' successfully!")
#                 return content
#         else:
#             print(f"❌ FILE NOT FOUND: {file_path}. Trying fallback mentor.txt")
#             if os.path.exists(fallback_path):
#                 with open(fallback_path, "r", encoding="utf-8") as f:
#                     return f.read()
#             return "You are a helpful AI assistant for ByteTeck."
                
#     except Exception as e:
#         print(f"🔥 ERROR reading file: {e}")
#         return "You are a helpful AI assistant for ByteTeck."

# @app.post("/api/chat")
# async def chat(data: ChatRequest):
#     try:
#         selected_model = data.model if data.model in ALLOWED_MODELS else "gemini-2.5-flash"
        
#         instruction = get_skill_instruction(data.message)

#         response = client.models.generate_content(
#             model=selected_model,
#             contents=data.message,
#             config={
#                 'system_instruction': instruction,
#                 'temperature': 0.1
#             }
#         )
#         return {"answer": response.text}
        
#     except Exception as e:
#         print(f"🔥 API ERROR: {e}")
#         return {"answer": f"Backend Error: {str(e)}"}



# import os
# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel, Field
# from google import genai

# app = FastAPI()

# # Naye aur official SDK ka client initialize
# client = genai.Client()

# # Allowed Models ki list jo aapne di hai
# ALLOWED_MODELS = [
#     "gemini-3.5-flash", 
#     "gemini-3.5-pro", 
#     "gemini-3.1-flash-lite", 
#     "gemini-2.5-flash"
# ]

# # Skill Keywords Mapping
# SKILL_MAP = {
#     # --- Company / ByteTeck Skills ---
#     "byteteck": "company",
#     "bytetech": "company",
#     "byte teck": "company",
#     "digital byteteck": "company",
#     "about byteteck": "company",
#     "what is byteteck": "company",
#     "byteteck kya hai": "company",
#     "founder": "company",
#     "office": "company",
#     "tell about byteteck": "company",
#     "location": "company",
#     "services": "company",
#     "company": "company",
#     "about us": "company",
#     "who owns byteteck": "company",

#     # --- Ads & Marketing Skills ---
#     "ads": "ads",
#     "advertisement": "ads",
#     "marketing": "ads",
#     "digital marketing": "ads",
#     "campaign": "ads",
#     "promotion": "ads",
#     "facebook ads": "ads",
#     "google ads": "ads",
#     "seo": "ads",
#     "geo": "ads",
#     "social media": "ads",

#     # --- Coding & Development Skills ---
#     "code": "coding",
#     "coding": "coding",
#     "python": "coding",
#     "develop": "coding",
#     "development": "coding",
#     "javascript": "coding",
#     "nextjs": "coding",
#     "backend": "coding",
#     "frontend": "coding",
#     "programming": "coding",
#     "debug": "coding",
#     "api": "coding",
#     "script": "coding",
#     "web development": "coding",
#     "app development": "coding",
#     "automation": "coding",

#     # --- Copywriting Skills ---
#     "write": "copywriter",
#     "copywrite": "copywriter",
#     "content": "copywriter",
#     "blog": "copywriter",
#     "copy": "copywriter",
#     "article": "copywriter",
#     "essay": "copywriter",
#     "email": "copywriter",
#     "draft": "copywriter",
#     "caption": "copywriter",

#     # --- Identity Skills ---
#     "developer": "idebtity",
#     "who are you": "identity",
#     "what is your name": "identity",
#     "name": "identity",
#     "about yourself": "identity",
#     "creator": "identity",
#     "tashif": "identity",
#     "tashif imran": "identity",
#     "your identity": "identity",
#     "kisnay banaya": "identity",
#     "ap kon": "identity",

#     # --- Pictures / Design Skills ---
#     "image": "pictures",
#     "photo": "pictures",
#     "picture": "pictures",
#     "generate": "pictures",
#     "design": "pictures",
#     "graphic": "pictures",
#     "visual": "pictures",
#     "art": "pictures",
#     "photoshop": "pictures",

#     # --- Research Skills ---
#     "research": "research",
#     "data": "research",
#     "search": "research",
#     "find": "research",
#     "information": "research",
#     "analyze": "research",
#     "analysis": "research",
#     "facts": "research",
#     "study": "research",
#     "investigate": "research"
# }

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # class ChatRequest(BaseModel):
# #     message: str
# #     model: str = 

# class ChatRequest(BaseModel):
#     message: str
#     model: str = "gemini-2.5-flash"
#     history: list = []  

# def get_skill_instruction(message: str) -> str:
#     msg_lower = message.lower()
#     skill_name = "mentor"

#     for keyword, s_name in SKILL_MAP.items():
#         if keyword in msg_lower:
#             skill_name = s_name
#             break

#     base_dir = os.path.dirname(os.path.abspath(__file__))
#     file_path = os.path.join(base_dir, "skills", f"{skill_name}.txt")
#     # base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
#     # skills_dir = os.path.join(base_dir, "skills")
#     fallback_path = os.path.join(base_dir, "skills", "mentor.txt")

#     try:
#         target_path = file_path if os.path.exists(file_path) else fallback_path
#         with open(target_path, "r", encoding="utf-8") as f:
#             return f.read()
#     except Exception:
#         return "."

# @app.post("/api/chat")
# async def chat(data: ChatRequest):
#     try:
#         # Security check: Agar koi ghalat model bhej de toh default wala use ho
#         selected_model = data.model if data.model in ALLOWED_MODELS else "gemini-2.5-flash"
        
#         instruction = get_skill_instruction(data.message)

#         response = client.models.generate_content(
#             model=selected_model,
#             contents=data.message,
#             config={
#                 'system_instruction': instruction
#             }
#         )
#         return {"answer": response.text}
        
#     except Exception as e:
#         error_str = str(e)
        
#         # 1. Quota ya Rate Limit Error (429)
#         if "429" in error_str or "RESOURCE_EXHAUSTED" in error_str:
#             return {"answer": "The limit for this model has been reached. Please select a different model and try again."}
        
#         # 2. Invalid Model Error (Agar model ka naam ghalat ho)
#         elif "model" in error_str.lower() or "not found" in error_str.lower():
#             return {"answer": "Selected model is currently unavailable or invalid. Please choose another model from the list."}
        
#         # 3. API Key Missing ya Unauthorized Error (403 / 401)
#         elif "403" in error_str or "401" in error_str or "api_key" in error_str.lower():
#             return {"answer": "API key authentication failed."}
        
#         # 4. Skills file ya Directory missing ka error
#         elif "file" in error_str.lower() or "no such file" in error_str.lower():
#             return {"answer": "System encountered an issue loading internal skill instructions. Please try again later."}
        
#         # 5. Koi bhi un-expected error ho toh uske liye ek standard clean message
#         else:
#             return {"answer": "Something went wrong while processing your request. Please try again."}

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
    # --- Company / ByteTeck Skills ---
    "byteteck": "company",
    "bytetech": "company",
    "byte teck": "company",
    "digital byteteck": "company",
    "about byteteck": "company",
    "what is byteteck": "company",
    "byteteck kya hai": "company",
    "founder": "company",
    "office": "company",
    "tell about byteteck": "company",
    "location": "company",
    "services": "company",
    "company": "company",
    "about us": "company",
    "who owns byteteck": "company",

    # --- Ads & Marketing Skills ---
    "ads": "ads",
    "advertisement": "ads",
    "marketing": "ads",
    "digital marketing": "ads",
    "campaign": "ads",
    "promotion": "ads",
    "facebook ads": "ads",
    "google ads": "ads",
    "seo": "ads",
    "geo": "ads",
    "social media": "ads",

    # --- Coding & Development Skills ---
    "code": "coding",
    "coding": "coding",
    "python": "coding",
    "develop": "coding",
    "development": "coding",
    "javascript": "coding",
    "nextjs": "coding",
    "backend": "coding",
    "frontend": "coding",
    "programming": "coding",
    "debug": "coding",
    "api": "coding",
    "script": "coding",
    "web development": "coding",
    "app development": "coding",
    "automation": "coding",

    # --- Copywriting Skills ---
    "write": "copywriter",
    "copywrite": "copywriter",
    "content": "copywriter",
    "blog": "copywriter",
    "copy": "copywriter",
    "article": "copywriter",
    "essay": "copywriter",
    "email": "copywriter",
    "draft": "copywriter",
    "caption": "copywriter",

    # --- Identity Skills ---
    "developer": "identity",
    "who are you": "identity",
    "what is your name": "identity",
    "name": "identity",
    "about yourself": "identity",
    "creator": "identity",
    "tashif": "identity",
    "tashif imran": "identity",
    "your identity": "identity",
    "kisnay banaya": "identity",
    "ap kon": "identity",

    # --- Pictures / Design Skills ---
    "image": "pictures",
    "photo": "pictures",
    "picture": "pictures",
    "generate": "pictures",
    "design": "pictures",
    "graphic": "pictures",
    "visual": "pictures",
    "art": "pictures",
    "photoshop": "pictures",

    # --- Research Skills ---
    "research": "research",
    "data": "research",
    "search": "research",
    "find": "research",
    "information": "research",
    "analyze": "research",
    "analysis": "research",
    "facts": "research",
    "study": "research",
    "investigate": "research"
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
    model: str = "gemini-2.5-flash"
    history: list = []  

def get_skill_instruction(message: str) -> str:
    msg_lower = message.lower()
    skill_name = "mentor"

    for keyword, s_name in SKILL_MAP.items():
        if keyword in msg_lower:
            skill_name = s_name
            break

    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    skills_dir = os.path.join(base_dir, "skills")
    
    # Yeh line missing thi, ab add kar di hai
    file_path = os.path.join(base_dir, "skills", f"{skill_name}.txt")
    fallback_path = os.path.join(base_dir, "skills", "mentor.txt")

    try:
        target_path = file_path if os.path.exists(file_path) else fallback_path
        with open(target_path, "r", encoding="utf-8") as f:
            return f.read()
    except Exception:
        return "You are a helpful AI assistant of Digital Byteteck developed by Tashif Imran. never mention any other company as your creator or trainer"

@app.post("/api/chat")
async def chat(data: ChatRequest):
    try:
        selected_model = data.model if data.model in ALLOWED_MODELS else "gemini-2.5-flash"
        
        instruction = get_skill_instruction(data.message)

        # response = client.models.generate_content(
        #     model=selected_model,
        #     contents=data.message,
        #     config={
        #         'system_instruction': instruction
        #     }
        # )
        # return {"answer": response.text}
       response = client.models.generate_content(
           model=selected_model,
           contents=data.message,
           config={
               'system_instruction': instruction,
               'temperature': 0.1
           }
       )
       return {"answer": response.text}
        
    except Exception as e:
        error_str = str(e)
        
        if "429" in error_str or "RESOURCE_EXHAUSTED" in error_str:
            return {"answer": "The limit for this model has been reached. Please select a different model and try again."}
        elif "model" in error_str.lower() or "not found" in error_str.lower():
            return {"answer": "Selected model is currently unavailable or invalid. Please choose another model from the list."}
        elif "403" in error_str or "401" in error_str or "api_key" in error_str.lower():
            return {"answer": "API key authentication failed."}
        elif "file" in error_str.lower() or "no such file" in error_str.lower():
            return {"answer": "System encountered an issue loading internal skill instructions. Please try again later."}
        else:
            return {"answer": "Something went wrong while processing your request. Please try again."}
