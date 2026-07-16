# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# from google import genai 
# from dotenv import load_dotenv
# import os

# load_dotenv()

# client = genai.Client(api_key=os.getenv("GOOGLE_API_KEY"))

# # Sare models jo tumhara backend support karega
# ALLOWED_MODELS = [
#     "gemini-3.5-flash",
#     "gemini-3.5-pro",
#     "gemini-3.1-flash-lite",
#     "gemini-2.5-flash"
# ]
# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# class ChatRequest(BaseModel):
#     history: list
#     message: str
#     model_id: str

# @app.post("/chat")
# async def chat(data: ChatRequest):
#     # Model ID validate karo
#     model_id = data.model_id if data.model_id in ALLOWED_MODELS else "gemini-3.5-flash"
    
#     try:
#         response = client.models.generate_content(
#             model=model_id,
#             contents=data.message,
#             config=genai.types.GenerateContentConfig(
#                 system_instruction="You are ByteTeck AI, created by Tashif Imran. Be helpful and professional."
#             )
#         )
#         return {"answer": response.text}
#     except Exception as e:
#         return {"answer": "Model limit reached or error occurred. Please try again."}

# @app.get("/")
# async def root():
#     return {"status": "Backend is running"}

# ---------------------------------------------------------
# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# import os
# from dotenv import load_dotenv

# # load_dotenv() 

# app = FastAPI()
# app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

# # Client ko yahan initialize mat karo, function ke andar karo
# # def get_genai_client():
# #     from google import genai
# #     return genai.Client(api_key=os.getenv("GOOGLE_API_KEY"))





from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from dotenv import load_dotenv
from config import API_KEY

# Local computer par `.env` file load karne ke liye
load_dotenv()

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

# def get_genai_client():
#     from google import genai
#     # Pehle system environment variable check karega, agar nahi mila toh .env se uthayega
#     api_key = os.getenv("GEMINI_API_KEY")
#     return genai.Client(api_key=api_key)

def get_genai_client():
    from google import genai
    return genai.Client(api_key=API_KEY)


ALLOWED_MODELS = ["gemini-3.5-flash", "gemini-3.5-pro", "gemini-3.1-flash-lite", "gemini-2.5-flash"]

class ChatRequest(BaseModel):
    history: list
    message: str
    model_id: str

@app.post("/chat")
async def chat(data: ChatRequest):
    model_id = data.model_id if data.model_id in ALLOWED_MODELS else "gemini-3.5-flash"
    try:
        client = get_genai_client()
        response = client.models.generate_content(
            model=model_id,
            contents=data.message
        )
        return {"answer": response.text}
    except Exception as e:
        return {"answer": "Backend error: " + str(e)}

@app.get("/")
async def root():
    return {"status": "Backend is running"}

