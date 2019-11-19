import unittest
from ...Models.Feedback import Feedback

class TestFeedback(unittest.TestCase):
    
    def test_getEmail(self):
        fb = Feedback("123@gmail.com", 5, "I love this trip")
        result = fb.getEmail()
        expect = "123@gmail.com"
        self.assertEqual(result, expect)

    def test_getRating(self):
        fb = Feedback("123@gmail.com", 5, "I love this trip")
        result = fb.getRating()
        expect = 5
        self.assertEqual(result, expect)
    
    def test_getComment(self):
        fb = Feedback("123@gmail.com", 5, "I love this trip")
        result = fb.getComment()
        expect = "I love this trip"
        self.assertEqual(result, expect)
    
if __name__ == "__main__":
    unittest.main()
