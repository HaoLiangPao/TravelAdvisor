# pip install googlemaps
# pip install prettyprint

from .extensions import mongo

import googlemaps
import pprint
import time

# define my api_key
API_KEY = "AIzaSyCGK-PEKgnOj4ilFbm2cw7cwi2btYwWXIQ"

# define client
gmaps = googlemaps.Client(key=API_KEY)


def addPlace(*prefs, location, radiusSearch):
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

# find a location if existed
#geocode_result = gmaps.geocode('1 Hayes Lane, North York')
geocode_result = gmaps.geocode('New York')
pprint.pprint(geocode_result)
