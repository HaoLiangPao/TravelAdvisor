import unittest
from ...Models.User import User

class TestUser(unittest.TestCase):
    
    def test_construction(self):
        user = User("123@gmail.com", "123")
        result = user.email
        expect = "123@gmail.com"
        self.assertEqual(result, expect)
    
if __name__ == "__main__":
    unittest.main()
