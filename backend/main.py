from fastapi import FastAPI
import google.generativeai as genai
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os


app = FastAPI()


  
@app.get("/")
async def root():
    return {"status": "ok"}