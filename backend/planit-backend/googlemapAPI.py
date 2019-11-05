# pip install googlemaps
# pip install prettyprint

from .extensions import mongo
from .Models.Location import Location
import googlemaps
import pprint
import time
import requests

# define my api_key -- GoogleMapAPI
API_KEY = "AIzaSyCGK-PEKgnOj4ilFbm2cw7cwi2btYwWXIQ"
# define my api_key -- SygicAPI
Sygic_API = "MiFCBUZaa078n2SuYEf4r6JFV5l9l0rJ1OfgyDQv"

# define client
gmaps = googlemaps.Client(key=API_KEY)



def addPlace(prefs, location, radiusSearch):
    # search type 1: nearSearch
    # run search one time per each pref in prefs
    for pref in prefs:
        # define our search
        places_result = gmaps.places_nearby(location = str(location[0]) + str(location[1]),
        radius = radiusSearch, open_now = True, type = "restaurant", keyword = pref)
        # put the location info searched into database
        for places in places_result['results']:
            addPlaceDB(places)
        # if more than one page of results searched
        #if nextPageToken != None:
        #    places_result = gmaps.places_nearby(page_token = places_result['next_page_token']


# help function: add ID, Name, Lng, Lat info to database as 'interested places'
def addPlaceDB(places):
    # go through the places found based on the preference list
    for place in places['results']:
        placeID = place['place_id']
        placeName = place['name']
        lng = place['geometry']['location']['lng']
        lat = place['geometry']['location']['lng']
        mongo.db.interestingPlaces.insert(
            {'placeName': placeName, 'placeID': placeID, 'lat': lat, 'lng': lng})

# define our search
#places_result = gmaps.places_nearby(location = "43.785231, -79.187713", radius = 20000, open_now = True, type = "restaurant", keyword = 'Fried Chicken')
# pprint.pprint(geocode_result)


# result = gmaps.geocode('new york')
# result_dict = result.pop(0)
# print(type(result_dict["geometry"]["location"]))

def validateLocation(location):
    # find a location if existed
    geocode_result = gmaps.geocode(location)
    if len(geocode_result) == 0:
        return None
    result_dict = geocode_result.pop(0)
    address = result_dict["formatted_address"]
    location = result_dict["geometry"]["location"]
    result = [address, location]
    return result

def crawlLocations(coordinate, preference_list, trip_filter):
    result = []
    for i in preference_list:
        # way to get locations from Google API
        result = result + gmaps.places_nearby(location = coordinate, radius = trip_filter['radius'], type = "tourist_attraction", keyword = i)['results']
    return result

def parsingLocation(location_list):
    pidTotype = dict()
    pidToloc = dict()
    for i in location_list:
        query = validateLocation(i.get('name') + ' ' + i.get('vicinity'))
        pidToloc[i.get('place_id')] = Location(i.get('name'), query[0], query[1].get('lat'), query[1].get('lng'))
        pidTotype[i.get('place_id')] = i.get('types')
    return pidTotype, pidToloc
