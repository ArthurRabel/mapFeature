from fastapi import FastAPI
from fastapi.templating import Jinja2Templates
from starlette.requests import Request
from starlette.responses import RedirectResponse
from fastapi.encoders import jsonable_encoder
from backEnd.connectDB import session
from backEnd.models import Features
from shapely.geometry import Point, LineString, Polygon

application = FastAPI()

templates = Jinja2Templates(directory="backEnd/templates")

@application.get("/")
def home(request: Request):
    return templates.TemplateResponse("home/index.html", {"request": request})

@application.get("/mapfeature/")
def mapfeature(request: Request):
    return templates.TemplateResponse("mapFeature/index.html", {"request": request})

@application.post("/mapfeature/post/")
async def featurePost(request: Request):
    json_data = await request.json()

    coordinatesList = json_data['coordinates']

    if len(coordinatesList) == 1:
        coordinatesFeature = Point(coordinatesList[0]).wkt
    elif len(coordinatesList) == 2:
        coordinatesFeature = LineString(coordinatesList).wkt
    elif len(coordinatesList) > 2:
        coordinatesFeature = Polygon(coordinatesList).wkt

    feature = Features(name=json_data['name'], description=json_data['description'], coordinates=coordinatesFeature)

    session.add(feature)
    session.commit()

    return RedirectResponse(url="/mapfeature/", status_code=303)

@application.delete("/mapfeature/delete/")
async def featurePost(request: Request):
    requestJson = await request.json()

    feature = session.query(Features).filter(Features.id == requestJson['id']).first()
    session.delete(feature)
    session.commit()

    return RedirectResponse(url="/mapfeature/", status_code=303)

@application.get("/mapfeature/get/")
async def featureGet(request: Request):
    features = session.query(Features).all()
    return jsonable_encoder([feature.to_dict() for feature in features])