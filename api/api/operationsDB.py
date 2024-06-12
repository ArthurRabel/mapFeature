from connectDB import session
from modelsDB import Features
from shapely.geometry import Point, LineString, Polygon


def delete_feature(idFeature):
    feature = session.query(Features).filter(Features.id == idFeature).first()
    session.delete(feature)
    session.commit()

def save_feature(name, description, coordinates):
    if len(coordinates) == 1:
        coordinatesFeature = Point(coordinates[0]).wkt
    elif len(coordinates) == 2:
        coordinatesFeature = LineString(coordinates).wkt
    elif len(coordinates) > 2:
        coordinatesFeature = Polygon(coordinates).wkt

    feature = Features(name=name, description=description, coordinates=coordinatesFeature)
    session.add(feature)
    session.commit()

def get_features():
    features = session.query(Features).all()
    print(len(features))  # Add this line to check the length of the features list
    return [feature.to_dict() for feature in features]