# pip install googlemaps
# pip install prettyprint

import googlemaps
import pprint
import time

# define my api_key
API_KEY = "AIzaSyCGK-PEKgnOj4ilFbm2cw7cwi2btYwWXIQ"

# define client
gmaps = googlemaps.Client(key=API_KEY)

# define our search
#places_result = gmaps.places_nearby(location = "43.785231, -79.187713", radius = 20000, open_now = True, type = "restaurant", keyword = 'Fried Chicken')
# pprint.pprint(geocode_result)

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
