from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from operationsDB import save_feature, delete_feature, get_features

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://0.0.0.0:80"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "DELETE", "OPTIONS"],
    allow_headers=["Content-Type"],
)

@app.get("/feature/")
async def featureGet():
    features = get_features()
    return jsonable_encoder(features)

class ResponseFeature(BaseModel):
    name: str
    description: str
    coordinates: list

@app.post("/feature/")
async def featurePost(responseFeature: ResponseFeature):
    save_feature(responseFeature.name, responseFeature.description, responseFeature.coordinates)
    return {'message': 'Feature posted successfully'}

@app.delete("/feature/{idfeature}")
async def featureDelete(idfeature: int):
    delete_feature(idfeature)
    return {'message': 'Feature deleted successfully'}