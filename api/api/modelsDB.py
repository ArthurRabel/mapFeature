from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import Integer, String, MetaData
from geoalchemy2 import Geometry

metadata = MetaData()

class Base(DeclarativeBase):
   __abstract__ = True
   id: Mapped[int] = mapped_column(Integer, primary_key=True)
   name: Mapped[str] = mapped_column(String(50))
   description: Mapped[str] = mapped_column(String(255))
    
   def to_dict(self):
      return {
         "id": self.id,
         "name": self.name,
         "description": self.description,
         "coordinates": str(self.coordinates)
      }

class PointTable(Base):
    __tablename__ = 'points'
    coordinates: Mapped[Geometry] = mapped_column(Geometry(geometry_type="POINT", srid=4326))

class LineTable(Base):
    __tablename__ = 'lines'
    coordinates: Mapped[Geometry] = mapped_column(Geometry(geometry_type="LINE", srid=4326))

class PolygonTable(Base):
    __tablename__ = 'polygons'
    coordinates: Mapped[Geometry] = mapped_column(Geometry(geometry_type="POLYGON", srid=4326))