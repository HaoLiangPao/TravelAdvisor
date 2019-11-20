import unittest
from ...Models.Filter import Filter

class TestFilter(unittest.TestCase):
    
    def test_getEmail(self):
        flt = Filter("123@gmail.com")
        result = flt.getEmail()
        expect = "123@gmail.com"
        self.assertEqual(result, expect)
    
if __name__ == "__main__":
    unittest.main()
