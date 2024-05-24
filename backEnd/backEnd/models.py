from sqlalchemy import Table, Column, Integer, String, MetaData, inspect
from geoalchemy2 import Geometry
from backEnd.connectDB import metadata, engine

if not inspect(engine).has_table('features'):
   Table(
      'features', metadata, 
      Column('id', Integer, primary_key=True), 
      Column('name', String), 
      Column('description', String),
      Column('coordinates', Geometry('GEOMETRY'), srid=4326)
   )
   metadata.create_all(engine)

