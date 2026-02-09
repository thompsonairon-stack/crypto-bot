import requests
import pandas as pd
from ta.momentum import RSIIndicator
from ta.trend import EMAIndicator

def fetch_candles(symbol="BTC-USD", granularity=900):
    try:
        url = f"https://api.exchange.coinbase.com/products/{symbol}/candles?granularity={granularity}"
        headers = {"User-Agent": "CryptoSignal/1.0"}
        r = requests.get(url, headers=headers)
        data = r.json()
        if isinstance(data, dict): return pd.DataFrame()
        df = pd.DataFrame(data, columns=["time","low","high","open","close","volume"])
        df['time'] = pd.to_datetime(df['time'], unit='s')
        df = df.sort_values("time")
        return df
    except:
        return pd.DataFrame()

def add_indicators(df):
    if df.empty: return df
    df['RSI'] = RSIIndicator(df['close'], window=14).rsi()
    df['EMA50'] = EMAIndicator(df['close'], window=50).ema_indicator()
    df['EMA200'] = EMAIndicator(df['close'], window=200).ema_indicator()
    return df
