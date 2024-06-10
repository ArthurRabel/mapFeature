from sqlalchemy import create_engine
from sqlalchemy.orm import Session
import os

connection_url = "postgresql://" + os.environ.get('API_USERNAME') + ":" + os.environ.get('API_PASSWORD') + "@localhost:5432/mapfeature"
engine = create_engine(connection_url, echo=True)

session = Session(engine)