from fastapi import FastAPI
import google.generativeai as genai
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os


app = FastAPI()

load_dotenv()

api_key = os.getenv("GEMINI_KEY")
genai.configure(api_key=api_key)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Set up the model
generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 0,
  "max_output_tokens": 8192,
}

safety_settings = [
  {
    "category": "HARM_CATEGORY_HARASSMENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_HATE_SPEECH",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
]

model = genai.GenerativeModel(model_name="gemini-1.5-pro-latest",
                              generation_config=generation_config,
                              safety_settings=safety_settings)


class Text(BaseModel):
    text: str

@app.post("/")
async def root(text: Text):
    print(text.text)
    textToVerify = "input: " + text.text
    prompt_parts = [
    "Você é um avaliador de mensagens e categoriza essas mensagens com verdadeiras, mentirosas ou opiniões com os seguinte labels: Verdadeira=News, Mentirosa=Fake, Opiniões=Opinião.",
    "input: O homem pisou em Marte",
    "output: Fake",
    "input: Brasil é um país na América Latina",
    "output: News",
    "input:Eu gosto de sorvete",
    "output: Opinião",
    textToVerify,
    "output: ",
    ]

    response = model.generate_content(prompt_parts)
    return {"message": response.text}
  
@app.get("/")
async def root():
    return {"status": "ok"}