from flask import request, jsonify, Blueprint
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup
import logging
import atexit

# Initialize the Flask blueprint
mkt_bp = Blueprint('mkt_bp', __name__)

# Initialize Chrome options
chrome_options = Options()
chrome_options.add_argument("--headless")  # Run Chrome in headless mode
chrome_options.add_argument("--disable-gpu")  # Disable GPU usage to save resources
chrome_options.add_argument("--no-sandbox")  # Disable sandbox for better performance
chrome_options.add_argument("--disable-dev-shm-usage")  # Overcome limited resource problems

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize WebDriver dictionary to store instances
drivers = {}

def get_driver():
    """Get or create a WebDriver instance."""
    options = Options()
    options.add_argument("--headless")
    options.add_argument("--disable-gpu")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    return webdriver.Chrome(options=options)

@mkt_bp.route('/api/market-price/<currency_pair>', methods=['GET'])
def get_market_price(currency_pair):
    url = f"https://www.dailyfx.com/{currency_pair.lower()}"

    if currency_pair not in drivers:
        drivers[currency_pair] = get_driver()
    driver = drivers[currency_pair]

    try:
        driver.get(url)

        # Wait for the specific div element to appear
        wait = WebDriverWait(driver, 10)  # Adjust timeout as needed
        wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "div.dfx-singleInstrument__price[data-type='bid']")))

        # Parse the HTML content
        soup = BeautifulSoup(driver.page_source, "html.parser")

        # Find the div element with the specified class and attribute
        div_element = soup.find("div", class_="dfx-singleInstrument__price", attrs={"data-type": "bid"})

        # Extract the market price
        if div_element:
            market_price = div_element.get("data-value")
            logger.info(f"Market price for {currency_pair} fetched successfully: {market_price}")
            return jsonify({'marketPrice': market_price})
        else:
            logger.error(f"Market price for {currency_pair} not found")
            return jsonify({'error': 'Market price not found'})
    except Exception as e:
        logger.exception(f"Error fetching market price for {currency_pair}: {str(e)}")
        # Reinitialize the WebDriver session if it's invalid
        if isinstance(e, selenium.common.exceptions.InvalidSessionIdException):
            drivers[currency_pair].quit()
            drivers[currency_pair] = get_driver()
        return jsonify({'error': str(e)})

# Cleanup function to quit all WebDriver instances
def cleanup():
    for driver in drivers.values():
        driver.quit()
    logger.info("All WebDriver instances have been closed")

# Register cleanup function to be executed when the server shuts down
atexit.register(cleanup)
