class Itinerary:
    def __init__(self, schedule, user, date, vicinity, loctotime):
        self.__schedule = schedule
        self.__user = user
        self.__date = date
        self.__vicinity = vicinity
        self.__locationtotime = loctotime
    
    def getUser(self):
        return self.__user
    
    def getDate(self):
        return self.__date
    
    def getVicinity(self):
        return self.__date
    
    def getSchedule(self):
        return self.__schedule
    
    def setUser(self, user):
        self.__user = user
    
    def setDate(self, date):
        self.__date = date
    
    def setVicinity(self, vic):
        self.__vicinity = vic
    
    def setScheduleu(self, schedule):
        self.__schedule = schedule

    def DeleteActivity(self, name):
        for i in self.__schedule:
            if i.name == name:
                time = self.__locationtotime.get(i)
                self.__schedule.remove(i)
                break
        return time



