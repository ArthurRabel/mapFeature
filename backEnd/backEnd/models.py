from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import Integer, String, MetaData
from geoalchemy2 import Geometry
from backEnd.connectDB import engine

metadata = MetaData()

class Base(DeclarativeBase):
   pass

class Features(Base):
   __tablename__ = 'features'
   id: Mapped[int] = mapped_column(Integer, primary_key=True)
   name: Mapped[str] = mapped_column(String(50))
   description: Mapped[str] = mapped_column(String(255))
   coordinates: Mapped[Geometry] = mapped_column(Geometry(geometry_type="GEOMETRY", srid=4326))

   def to_dict(self):
      return {
         "id": self.id,
         "name": self.name,
         "description": self.description,
         "coordinates": str(self.coordinates)
      }

Features.metadata.create_all(engine)