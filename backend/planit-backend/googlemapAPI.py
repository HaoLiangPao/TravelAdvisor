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

# find a location if existed
#geocode_result = gmaps.geocode('1 Hayes Lane, North York')
geocode_result = gmaps.geocode('New York')
pprint.pprint(geocode_result)
