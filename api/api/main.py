from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from shapely.geometry import Point, LineString, Polygon
from fastapi.middleware.cors import CORSMiddleware
from connectDB import session
from modelsDB import Features

app = FastAPI()

class ReponseFeature(BaseModel):
    name: str
    description: str
    coordinates: list

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://0.0.0.0:80"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "DELETE", "OPTIONS"],
    allow_headers=["Content-Type"],
)

@app.get("/api/get/")
async def featureGet():
    features = session.query(Features).all()
    return jsonable_encoder([feature.to_dict() for feature in features])

@app.post("/api/post/")
async def featurePost(reponseFeature: ReponseFeature):
    coordinatesList = reponseFeature.coordinates

    if len(coordinatesList) == 1:
        coordinatesFeature = Point(coordinatesList[0]).wkt
    elif len(coordinatesList) == 2:
        coordinatesFeature = LineString(coordinatesList).wkt
    elif len(coordinatesList) > 2:
        coordinatesFeature = Polygon(coordinatesList).wkt

    feature = Features(name=reponseFeature.name, description=reponseFeature.description, coordinates=coordinatesFeature)

    session.add(feature)
    session.commit()

    return reponseFeature

@app.delete("/api/delete/{idfeature}")
async def featureDelete(idfeature):
    feature = session.query(Features).filter(Features.id == idfeature).first()
    session.delete(feature)
    session.commit()

    return idfeature