from typing import Optional
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import uvicorn
import os
from dotenv import load_dotenv

# Import our internal modules
from app.schemas import Ticker, FundamentalData, InvestmentMemo
from app.brain import Brain
from app.convex_service import ConvexService

# Load environment variables
load_dotenv()

app = FastAPI(title="AlphaGalleon API", version="0.1.0")

# Initialize Engines
brain_engine = Brain()
convex_service = ConvexService()

class MemoRequest(BaseModel):
    ticker: str
    price: float
    market_cap: float
    pe: float
    sector: str
    revenue_growth: float
    profit_growth: float
    debt_equity: float
    roe: float
    promoter_holding: float
    news: str

@app.get("/")
def read_root():
    return {"message": "AlphaGalleon HQ Online"}

@app.post("/brain/memo", response_model=InvestmentMemo)
def create_memo(request: MemoRequest):
    """
    Generate an Investment Memo using The Brain (Gemini 1.5 Flash).
    """
    # 1. Construct the internal data model
    ticker_obj = Ticker(
        symbol=request.ticker,
        name=request.ticker, # For now same as symbol
        sector=request.sector,
        current_price=request.price,
        market_cap=request.market_cap,
        pe_ratio=request.pe
    )
    
    fund_data = FundamentalData(
        ticker=ticker_obj,
        revenue_growth_3y=request.revenue_growth,
        profit_growth_3y=request.profit_growth,
        debt_to_equity=request.debt_equity,
        roe=request.roe,
        promoter_holding=request.promoter_holding,
        recent_news_summary=request.news
    )
    
    # 2. Call The Brain
    try:
        memo = brain_engine.generate_memo(fund_data)
        
        # 3. Store in Convex (Async/Background ideally, but simple for now)
        convex_service.store_memo({
            "symbol": memo.ticker_symbol,
            "verdict": memo.recommendation.upper(),
            "confidence": memo.confidence_score,
            "summary": memo.thesis_summary,
            "reasoning": f"BULLS: {', '.join(memo.bull_case)}\nBEARS: {', '.join(memo.bear_case)}\nVALUATION: {memo.valuation_verdict}",
            "priceAtGeneration": request.price
        })
        
        convex_service.log_activity(
            action="GENERATE_MEMO",
            details=f"Generated memo for {memo.ticker_symbol} with {memo.recommendation.upper()} verdict."
        )

        return memo
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
