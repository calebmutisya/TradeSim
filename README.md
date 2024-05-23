# TradeSim
#### A Forex Paper Trading Web Application, 23/06/2024
### **BY Caleb Musau Mutisya
## Description
 - TradeSim is a paper trading forex web app that helps traders take trades using virtual funds.

## Setup/Installation Requirements
- Clone this repository using the command: git clone https://github.com/calebmutisya/TradeSim.git
- Open Terminal and navigate to the cloned folder by typing cd "folder path"
- Open the Folder with VS Code.
- There are two folders client & server.
- To start the server cd into server in terminal and run python3 app.py (this will activate the server)
- Then open another terminal window and cd into the client folder. Run npm install then npm start.
- In your package.json file insert proxy as below:
    "proxy": "server url",
- All fetch routes in context files should start as below.
    eg.fetch('/opentrades')
- The project will be ready to run.

NB: The project database is deployed in render ensure to configure your db in app.py to start with a local sqlite database and run migrations to insert the appropriate tables and relationships.



## Features
A user can:
 - Register an account.
 - Login to their accounts.
 - Logout of their accounts.
 - Edit their profile details and upload profile image.
 - Reset their password.
 - Access all forex pair charts.
 - Take buy and sell trades which support Takeprofit and Stoploss levels.
 - Can access all their open trades and the profit or loss.
 - Can edit their open trade takeprofit and stop loss.
 - Can close their trades or have takeprofit and stoplevels triggered to minimize loss.
 - Access all of their closed trades.
 - Can receive an analysis of their perfomance and rank among all users.
 - Can reset their trading account to the default 10,000 dollars capital which also deletes all trade history.
 - Can receive latest news on major forex pairs.
 - Access a forex economic calendar.

 ## Live server
 - You can view the web live on [Frontend](https://leafy-otter-831027.netlify.app/)
 - You can view the backend routes on [Backend](https://opentableweb.onrender.com)

 ## Limitations.
 - The application faces the issue of incorrect market prices being scraped from the source website(dailyfx.com). Instead of the last quoted price the daily high or low may be scraped instead.
 - The use of web scraping rather than using a restful api was to enable more features and also avoid limitations on requests imposed by api's which would have been costly to pay for.

## Technologies Used
 - React, Javascript
 - Flask,Python & SQLite
 - BeautifulSoup and Selenium were instrumental in scraping data.
 - HTML and CSS.

## Support and contact details
 - mutisyacalebmusau@gmail.com
 - +254741050611

### License
MIT License

Copyright (c) 2024 Caleb Musau Mutisya

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

