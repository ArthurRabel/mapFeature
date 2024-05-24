import os
from fastapi import FastAPI
from fastapi.templating import Jinja2Templates
from starlette.requests import Request
from starlette.responses import RedirectResponse
from backEnd.connectDB import metadata, session, engine
from shapely.geometry import Point, LineString, Polygon
from sqlalchemy import Table, insert
from geoalchemy2 import WKTElement


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backEnd.settings')

application = FastAPI()

templates = Jinja2Templates(directory="backEnd/templates")

@application.get("/")
def home(request: Request):
    return templates.TemplateResponse("home/index.html", {"request": request})

@application.get("/mapfeature/")
def mapfeature(request: Request):
    return templates.TemplateResponse("mapFeature/index.html", {"request": request})

@application.post("/mapfeature/post/")
async def featurepush(request: Request):
    json_data = await request.json()

    coordinates = json_data['coordinates']

    if len(coordinates) == 1:
        coordinatesFeature = WKTElement(Point(coordinates[0]).wkt, srid=4326)
    if len(coordinates) == 2:
        coordinatesFeature = WKTElement(LineString(coordinates).wkt, srid=4326)
    if len(coordinates) > 2:
        coordinatesFeature = WKTElement(Polygon(coordinates).wkt, srid=4326)

    new_feature = {
        'name':json_data['name'],
        'description':json_data['description'],
        'coordinates':coordinatesFeature,
    }

    features = Table('features', metadata, autoload_with=engine)

    submitDB = insert(features).values(new_feature)

    with engine.connect() as connection:
        connection.execute(submitDB)

    return RedirectResponse(url="/mapfeature/", status_code=303)