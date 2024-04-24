from flask import request, jsonify, Blueprint
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup

mkt_bp = Blueprint('mkt_bp', __name__)

chrome_options = Options()
chrome_options.add_argument("--headless")  # Run Chrome in headless mode

# Initialize WebDriver outside of route handler function
driver = webdriver.Chrome(options=chrome_options)

@mkt_bp.route('/api/market-price/<currency_pair>', methods=['GET'])
def get_market_price(currency_pair):
    # Set up the URL based on the currency pair
    url = f"https://www.dailyfx.com/{currency_pair.lower()}"

    try:
        # Fetch the URL
        driver.get(url)

        # Wait for div element with the specified class to appear
        wait = WebDriverWait(driver, 10)  # Adjust timeout as needed
        div_element = wait.until(EC.presence_of_element_located((By.CLASS_NAME, "dfx-singleInstrument__price")))

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

# No need for driver.quit() here as the WebDriver is initialized outside of the route handler
