import os
import sys
from convex import ConvexClient
from dotenv import load_dotenv

# Add parent dir to path to import app modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

load_dotenv()

class ConvexService:
    def __init__(self):
        self.url = os.getenv("CONVEX_URL")
        if not self.url:
            # Fallback to the one we know
            self.url = "https://vibrant-spoonbill-564.eu-west-1.convex.cloud"
        
        self.client = ConvexClient(self.url)

    def store_memo(self, memo_data):
        """
        Stores an investment memo in Convex.
        memo_data is a dict matching the 'memos:store' mutation args.
        """
        try:
            memo_id = self.client.mutation("memos:store", memo_data)
            print(f"✅ Memo stored in Convex: {memo_id}")
            return memo_id
        except Exception as e:
            print(f"❌ Error storing memo in Convex: {e}")
            return None

    def log_activity(self, action, details=None, user_id=None):
        """
        Logs activity to Convex activityLog.
        """
        try:
            self.client.mutation("activity:log", {
                "action": action,
                "details": details,
                "userId": user_id
            })
        except Exception as e:
            print(f"❌ Error logging activity to Convex: {e}")

# If run directly, test the connection
if __name__ == "__main__":
    service = ConvexService()
    print(f"Connected to Convex at: {service.url}")
    # Test a simple query or mutation if possible
    # result = service.client.query("memos:listRecent", {"limit": 1})
    # print(f"Test query result: {result}")
