# marketprice.py
from flask import request, jsonify, Blueprint
import requests

# Initialize the Flask blueprint
mkt_bp = Blueprint('mkt_bp', __name__)

# Configure API settings
url = "https://forex-apised1.p.rapidapi.com/live-rates"
headers = {
    "X-RapidAPI-Key": "5da39432d5msh638a3467e6aea60p18535bjsn7237558d5eb0",
    "X-RapidAPI-Host": "forex-apised1.p.rapidapi.com"
}

@mkt_bp.route('/api/market-price/<currency_pair>', methods=['GET'])
def get_market_price(currency_pair):
    # Parse the currency pair to separate base and quote currencies
    base_currency, quote_currency = currency_pair.split('-')
    
    # Define the query string for the API request
    querystring = {"currency_codes": quote_currency.upper(), "base_currency_code": base_currency.upper()}

    try:
        response = requests.get(url, headers=headers, params=querystring)
        data = response.json()
        
        if data['success']:
            rate = data['rates'][quote_currency.upper()]['rate']
            formatted_rate = round(rate, 5)
            return jsonify({'marketPrice': formatted_rate})
        else:
            return jsonify({'error': 'Failed to fetch market price from API', 'details': data['errors']}), 500

    except Exception as e:
        return jsonify({'error': str(e)}), 500
