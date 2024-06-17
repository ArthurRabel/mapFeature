from connectDB import session
from modelsDB import PointTable, LineTable, PolygonTable
from shapely.geometry import Point, LineString, Polygon

def delete_feature(idFeature):
    if(session.query(PointTable).filter(PointTable.id == idFeature).first()):
        session.delete(session.query(PointTable).filter(PointTable.id == idFeature).first())
    elif(session.query(LineTable).filter(LineTable.id == idFeature).first()):
        session.delete(session.query(LineTable).filter(LineTable.id == idFeature).first())
    elif(session.query(PolygonTable).filter(PolygonTable.id == idFeature).first()):
        session.delete(session.query(PolygonTable).filter(PolygonTable.id == idFeature).first())    
    session.commit()

def save_feature(name, description, coordinates):
    if len(coordinates) == 1:
        session.add(PointTable(name=name, description=description, coordinates=Point(coordinates[0]).wkt))
    elif len(coordinates) == 2:
        session.add(LineTable(name=name, description=description, coordinates=LineString(coordinates).wkt))
    elif len(coordinates) > 2:
        session.add(PolygonTable(name=name, description=description, coordinates=Polygon(coordinates).wkt))
    session.commit()

def get_features():
    features = session.query(PointTable).all()
    features.extend(session.query(LineTable).all())
    features.extend(session.query(PolygonTable).all())
    return [feature.to_dict() for feature in features]