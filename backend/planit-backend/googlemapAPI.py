# pip install googlemaps
# pip install prettyprint

from .extensions import mongo
from .Models.Location import Location
import googlemaps
import pprint
import time
import requests
import random

# define my api_key -- GoogleMapAPI
API_KEY = "AIzaSyCGK-PEKgnOj4ilFbm2cw7cwi2btYwWXIQ"
# define my api_key -- SygicAPI
Sygic_API = "MiFCBUZaa078n2SuYEf4r6JFV5l9l0rJ1OfgyDQv"
Sygic_API2 = "GMH5swhpCA3g1mvvykU5s7worRP1GTywaNrQUC0X"

# way to get locations from Sygic API with requests
SygicHeaders = {"x-api-key":Sygic_API}
placeListURL = 'https://api.sygictravelapi.com/1.1/en/places/list'
placeDetailURL = 'https://api.sygictravelapi.com/1.1/en/places/'
openTimeURL = 'https://api.sygictravelapi.com/1.1/en/places/poi:530/opening-hours'
SygicHeadersOld = {"x-api-key":Sygic_API}
SygicHeadersNew = {"x-api-key":Sygic_API2}




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
        result = result + gmaps.places_nearby(location = coordinate, radius = 1000*trip_filter['radius'], type = "tourist_attraction", keyword = i)['results']
    return result

def parsingLocation(location_list):
    pidTotype = dict()
    pidToloc = dict()
    for i in location_list:
        query = validateLocation(i.get('name') + ' ' + i.get('vicinity'))
        pidToloc[i.get('place_id')] = Location(i.get('name'), query[0], query[1].get('lat'), query[1].get('lng'))
        pidTotype[i.get('place_id')] = i.get('types')
    return pidTotype, pidToloc

def crawlLocationsSygic(coordinate, preference_list, trip_filter, max_act):
    result = []
    for i in preference_list:
        # Sygic has limited categories, one way we could do is put this as the options in preference setting. hardcode for now
        categories = "sightseeing|traveling|discovering|shopping|eating|sports|hiking|relaxing|playing|going_out"
        query = i
        area = coordinate + "," + str(int(trip_filter['radius']) * 1000) # convert km unit to m unit
        params = {"area":area, "categories":categories, "query":query,"limit":20} # only look for 3 iterms per preference
        response = requests.get(placeListURL, params=params, headers=SygicHeadersNew).json().get("data").get("places")
        # get attributes we want
        result += response
    # we could use some random algorithum or optimize algorithum (such as: seperate restaruent with others etc.)
    random.shuffle(result)
    if int(max_act) > len(result):
        place = result
        subPlaces = None
    else:
        places = result[:int(max_act)]
        subPlaces = result[int(max_act):]
    print('crawl palces finished...')
    return places, subPlaces

def parsingLocationSygic(places, start, end):
    parsed_list = []
    for response in places:
        #placeID = place.get('id')
        #placeDetailURL = 'https://api.sygictravelapi.com/1.1/en/places/' + placeID
        #response = requests.get(placeDetailURL, headers=SygicHeaders).json().get('data').get('place')
        # some places dont have a reasonable duratino in Sygic database, so we multiply the original value by 10
        if response.get('duration') < 600:
            duration = response.get('duration') * 10
        else:
            duration = response.get('duration')
        # some places dont have a perex, show the default error message to the user
        if response.get('perex') is None:
            perex = "Sorry! The description of this place is currently not availabel, will be implemented soon"
        else:
            perex = response.get('perex')
        params = {"from":start[:-6], "to":end[:-6], "id":response.get("id")}
        # get google query
        loc = response.get('location')
        coordinate = str(loc.get('lat')) + ", " + str(loc.get('lng'))
        print(coordinate)
        print(response.get('name'))
        googleobj = gmaps.places_nearby(location = coordinate, radius = 1000, keyword = response.get('address')).get('results')[0]
        print(googleobj)
        # get API response
        openTime = requests.get(openTimeURL, params = params, headers=SygicHeadersNew).json().get('data')
        parsed_place = {
            'id':response.get('id'),
            'name':response.get('name'),
            'name_suffix':response.get('name_suffix'),
            'location':response.get('location'),
            'duration':duration, # average time people spent in this place
            'perex':perex, # please include this perex in detail page
            'thumbnail_url':response.get('thumbnail_url'), # please get thumbnails from this url in detail page
            'url':response.get('url'), # a url to the SygicMap webpage, we can also show this in the detail when we have time for this feature (maybe can be used in Navigation)
            'email':response.get('email'),
            'phone':response.get('phone'),
            'address':response.get('address'),
            # in a form of {\d{4}-\d{2}-\d{2}: [{opening: ,closing: }], (more date)}
            # string(~\d{2}:\d{2}:\d{2}~)h:m:s (24h) format.
            'open':openTime.get('opening_hours').get(start[:-6])[0].get('opening'),
            'close':openTime.get('opening_hours').get(start[:-6])[0].get('closing'),
            'vicinity':googleobj.get('vicinity'),
            'photo':googleobj.get('photos')[0].get('photo_reference')
        }
        parsed_list.append(parsed_place)
    print('parsinglocation finished...')
    return parsed_list

def durationCalculation(time1, time2):
    '''
    return the duration between time2 and time1 where time1 is earlier than time2
    '''
    hour1 = int(time1[11:-3])
    hour2 = int(time2[11:-3])
    minu1 = int(time1[14:])
    minu2 = int(time2[14:])
    hour = hour2 - hour1
    minu = minu2 - minu1
    # 14:11 - 12:10 = 02:01 = 2* 3600 + 1 * 60
    if hour * minu > 0:
        result = hour * 3600 + minu * 60
    # not possible that end time is earlier than start time
    # 14:11 - 15:22 = 1 * 3600 - 11 * 60
    else:
        result = hour * 3600 - minu * 60
    return result

#help function
def timeFormatConverter(t):
    '''(int) -> string
    given a time t < 10, return a string with '0t'
    otherwise, return 't'
    '''
    if t < 10:
        result = '0' + str(t)
    else:
        result = str(t)
    return result

#help function, to add duration (in seconds) to start-over time in format hh:mm
# input format: "yyyy-mm-dd hh:mm"
def timeCalculator(time, duration):
    date = int(time[8:11])
    minu = (duration // 60 ) % 60
    hours = (duration // 60) // 60
    timeHour = int(time[11:-3])
    timeMinu = int(time[-2:])
    timeHour += hours
    timeMinu += minu
    # 60 minutes is 1 hour
    if (timeMinu >= 60):
        timeHour += timeMinu // 60
        timeMinu = timeMinu % 60
    if (timeHour > 24):
        timeHour = timeHour % 24
        date += timeHour // 24
    # keep time format consistent
    timeHourStr = timeFormatConverter(timeHour)
    timeMinuStr = timeFormatConverter(timeMinu)
    dateStr = time[:8] + timeFormatConverter(date)
    return dateStr + " " + timeHourStr + ":" + timeMinuStr

def TimeItineraryFactory(parsed_list, start, end):
    # final Itinerary with time attributes and other info about the place
    Itinerary = []
    print('123')
    for place in parsed_list:
        place['startTimeTrip'] = start
        print(start)
        if not (timeCalculator(start, place.get('duration'))) > end:
            place['endTimeTrip'] = timeCalculator(place['startTimeTrip'], place['duration'])
            start = timeCalculator(start, place.get('duration'))
        else:
            duration = durationCalculation(start, end)
            place['duration'] = duration
            place['endTimeTrip'] = end
        Itinerary.append(place)
    #print(Itinerary)
    print('TimeItineraryFactory finished...')
    return Itinerary