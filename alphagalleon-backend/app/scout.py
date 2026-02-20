import os
import httpx
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class Scout:
    BASE_URL = "https://api.upstox.com/v2"

    def __init__(self):
        self.access_token = os.getenv("UPSTOX_ACCESS_TOKEN")
        if not self.access_token:
            raise ValueError("UPSTOX_ACCESS_TOKEN not found in environment variables.")
        
        self.headers = {
            "Authorization": f"Bearer {self.access_token}",
            "Accept": "application/json"
        }

    def _get(self, endpoint, params=None):
        url = f"{self.BASE_URL}{endpoint}"
        try:
            with httpx.Client() as client:
                response = client.get(url, headers=self.headers, params=params)
                response.raise_for_status()
                return response.json()
        except httpx.HTTPStatusError as e:
            raise Exception(f"Upstox API Error: {e.response.status_code} - {e.response.text}")
        except httpx.RequestError as e:
            raise Exception(f"Network Error: {e}")

    def get_ltp(self, symbol: str):
        """
        Fetch Last Traded Price (LTP) for a symbol.
        Symbol format: NSE_EQ|INE002A01018
        """
        endpoint = "/market-quote/ltp"
        params = {"symbol": symbol}
        data = self._get(endpoint, params)
        if data and "data" in data:
            if symbol in data["data"]:
                return data["data"][symbol]["last_price"]
            # Check if there is only one key in data["data"] and return it if it matches loosely or just return first
            # Since we query one symbol, usually we get one key back.
            if len(data["data"]) == 1:
                key = next(iter(data["data"]))
                return data["data"][key]["last_price"]
        return None

    def get_ohlc(self, symbol: str, interval: str = "1d"):
        """
        Fetch OHLC data for a symbol.
        Interval: 1d, 1w, 1m, I1, I5, I10, I15, I30, I60
        Symbol format: NSE_EQ|INE002A01018
        """
        endpoint = "/market-quote/ohlc"
        params = {"symbol": symbol, "interval": interval}
        data = self._get(endpoint, params)
        if data and "data" in data:
             if symbol in data["data"]:
                 return data["data"][symbol]["ohlc"]
             if len(data["data"]) == 1:
                 key = next(iter(data["data"]))
                 return data["data"][key]["ohlc"]
        return None

    def get_quote(self, symbol: str):
        """
        Fetch full quote for a symbol.
        Symbol format: NSE_EQ|INE002A01018
        """
        endpoint = "/market-quote/quotes"
        params = {"symbol": symbol}
        data = self._get(endpoint, params)
        if data and "data" in data:
            if symbol in data["data"]:
                return data["data"][symbol]
            if len(data["data"]) == 1:
                key = next(iter(data["data"]))
                return data["data"][key]
        return None
