from sqlalchemy import create_engine
from sqlalchemy.orm import Session

connection_url = "postgresql://postgres:teste123@localhost:5432/mapfeature"
engine = create_engine(connection_url, echo=True)

session = Session(engine)
