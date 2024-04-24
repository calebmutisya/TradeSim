from flask import request, jsonify, Blueprint
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
import time

mkt_bp = Blueprint('mkt_bp', __name__)

@mkt_bp.route('/api/market-price/<currency_pair>', methods=['GET'])
def get_market_price(currency_pair):
    # Set up Chrome options to run in headless mode
    chrome_options = Options()
    chrome_options.add_argument("--headless")  # Run Chrome in headless mode
    
    # Set up the URL based on the currency pair
    url = f"https://www.dailyfx.com/{currency_pair.lower()}"
    
    try:
        # Start WebDriver
        driver = webdriver.Chrome(options=chrome_options)
        
        # Fetch the URL
        driver.get(url)
        
        # Wait for page to load
        time.sleep(5)  # Adjust as needed
        
        # Parse the HTML content
        soup = BeautifulSoup(driver.page_source, "html.parser")
        
        # Find the div element with the specified class
        div_element = soup.find("div", class_="dfx-singleInstrument__price")
        
        # Extract the market price
        if div_element:
            market_price = div_element.get("data-value")
            return jsonify({'marketPrice': market_price})
        else:
            return jsonify({'error': 'Market price not found'})
    except Exception as e:
        return jsonify({'error': str(e)})
    finally:
        # Quit WebDriver
        if driver:
            driver.quit()
