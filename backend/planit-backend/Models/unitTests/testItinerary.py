import unittest
from ...Models.Itinerary import Itinerary

class TestItinerary(unittest.TestCase):
    
    def test_getUser(self):
        itin = Itinerary(None,"123@gmail.com", None, None, None)
        result = itin.getUser()
        expect = "123@gmail.com"
        self.assertEqual(result, expect)
    
if __name__ == "__main__":
    unittest.main()
