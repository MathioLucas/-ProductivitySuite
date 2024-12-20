from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from transformers import pipeline

# Initialize AI models
summarizer = pipeline("summarization")
grammar_corrector = pipeline("text2text-generation", model="t5-small")
text_generator = pipeline("text-generation", model="gpt2")

router = APIRouter(
    prefix="/ai-assistant",
    tags=["AI Assistant"]
)

# Request and Response Schemas
class TextInput(BaseModel):
    text: str

class AIResponse(BaseModel):
    output: str

# Endpoints
@router.post("/summarize", response_model=AIResponse)
def summarize_text(input_data: TextInput):
    try:
        summary = summarizer(input_data.text, max_length=50, min_length=25, do_sample=False)
        return {"output": summary[0]['summary_text']}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/correct", response_model=AIResponse)
def correct_grammar(input_data: TextInput):
    try:
        correction = grammar_corrector(f"grammar: {input_data.text}", max_length=60, do_sample=False)
        return {"output": correction[0]['generated_text']}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/generate", response_model=AIResponse)
def generate_text(input_data: TextInput):
    try:
        generated = text_generator(input_data.text, max_length=50, num_return_sequences=1)
        return {"output": generated[0]['generated_text']}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
