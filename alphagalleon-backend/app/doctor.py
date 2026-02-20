import json
import google.generativeai as genai
from typing import List
from .doctor_schema import PortfolioItem, PortfolioDiagnosis
import os

class Doctor:
    def __init__(self):
        if "GOOGLE_API_KEY" in os.environ:
             genai.configure(api_key=os.environ["GOOGLE_API_KEY"])
             self.model = genai.GenerativeModel('gemini-2.5-flash')
        else:
             print("Warning: GOOGLE_API_KEY not found. Doctor will run in mock mode if needed.")
             self.model = None

    def diagnose_portfolio(self, portfolio: List[PortfolioItem], risk_appetite: str = "moderate") -> PortfolioDiagnosis:
        if not self.model:
            raise ValueError("Doctor not initialized. Missing API Key.")
        
        # Format the portfolio for the prompt
        portfolio_str = "\n".join([
            f"- {item.ticker}: {item.allocation_percent}% (Buy: {item.avg_buy_price}, Current: {item.current_price})"
            for item in portfolio
        ])

        prompt = f"""
        You are AlphaGalleon's 'Doctor' - an expert portfolio manager who ruthlessly analyzes retail portfolios.
        
        Analyze this portfolio for a '{risk_appetite}' investor.
        Identify concentration risks, sector overlap, bad stocks, and missed opportunities.
        
        Portfolio:
        {portfolio_str}
        
        Output strictly in JSON format matching this schema:
        {{
            "overall_health_score": 0-100,
            "risk_level": "low" | "moderate" | "high" | "extreme",
            "diversification_verdict": "...",
            "sector_exposure": ["sector 1", "sector 2"],
            "red_flags": ["bad stock 1", "overexposed to sector X"],
            "green_flags": ["good stock 1", "balanced allocation"],
            "actionable_fixes": ["sell X", "buy Y", "reduce Z"],
            "projected_performance": "..."
        }}
        """
        
        try:
            response = self.model.generate_content(prompt, generation_config={"response_mime_type": "application/json"})
            raw_json = response.text
            parsed = json.loads(raw_json)
            
            return PortfolioDiagnosis(**parsed)
        except Exception as e:
            print(f"Error diagnosing portfolio: {e}")
            raise e
