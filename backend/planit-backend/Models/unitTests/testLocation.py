import unittest
from ...Models.Location import Location

class TestLocation(unittest.TestCase):
    
    def test_getName(self):
        loc = Location("UTSC", "1265 Military Trail", 123, 456)
        result = loc.getName()
        expect = "UTSC"
        self.assertEqual(result, expect)
    
    def test_getAddress(self):
        loc = Location("UTSC", "1265 Military Trail", 123, 456)
        result = loc.getAddress()
        expect = "1265 Military Trail"
        self.assertEqual(result, expect)
    
    def test_getLatitude(self):
        loc = Location("UTSC", "1265 Military Trail", 123, 456)
        result = loc.getLatitude()
        expect = 123
        self.assertEqual(result, expect)
    
    def test_getLongitude(self):
        loc = Location("UTSC", "1265 Military Trail", 123, 456)
        result = loc.getLongitude()
        expect = 456
        self.assertEqual(result, expect)
    
if __name__ == "__main__":
    unittest.main()
