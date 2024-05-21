from flask import request, jsonify, Blueprint
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup

mkt_bp = Blueprint('mkt_bp', __name__)

# Initialize Chrome options
chrome_options = Options()
chrome_options.add_argument("--headless")  # Run Chrome in headless mode
chrome_options.add_argument("--disable-gpu")  # Disable GPU usage to save resources
chrome_options.add_argument("--no-sandbox")  # Disable sandbox for better performance

# Initialize WebDriver outside of route handler function
driver = webdriver.Chrome(options=chrome_options)

# Dictionary to store WebDriver instances for different currency pairs
drivers = {}

@mkt_bp.route('/api/market-price/<currency_pair>', methods=['GET'])
def get_market_price(currency_pair):
    # Set up the URL based on the currency pair
    url = f"https://www.dailyfx.com/{currency_pair.lower()}"

    try:
        # Reuse existing WebDriver instance if available
        if currency_pair not in drivers:
            drivers[currency_pair] = webdriver.Chrome(options=chrome_options)
        
        # Fetch the URL
        driver = drivers[currency_pair]
        driver.get(url)

        # Wait for div element with the specified class to appear
        wait = WebDriverWait(driver, 10)  # Adjust timeout as needed
        div_element = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "div.dfx-singleInstrument__price[data-type='bid']")))

        # Parse the HTML content
        soup = BeautifulSoup(driver.page_source, "html.parser")

        # Find the div element with the specified class
        div_element = soup.find("div", class_="dfx-singleInstrument__price", attrs={"data-type": "bid"})

        # Extract the market price
        if div_element:
            market_price = div_element.get("data-value")
            return jsonify({'marketPrice': market_price})
        else:
            return jsonify({'error': 'Market price not found'})
    except Exception as e:
        return jsonify({'error': str(e)})

# Cleanup function to quit all WebDriver instances
def cleanup():
    for driver in drivers.values():
        driver.quit()

# Register cleanup function to be executed when the server shuts down
import atexit
atexit.register(cleanup)


# <div class="dfx-singleInstrument__price dfx-rate dfx-font-size-3 font-weight-bold text-right dfx-singleInstrument__bid" data-stream-type="price" data-stream-delay="0" data-symbol="AUDUSD" data-market-id="AUDUSD" data-type="bid" data-change-scale="-2" data-unscaling-factor="10000" data-unscaled-decimals="5" data-value="0.66675">
# </div>