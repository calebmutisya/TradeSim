import React, { useState, useEffect} from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import '../css/Markets.css'
import { fxpairs } from '../constants/constants'
import fire from '../assets/fire.svg'
import robot from '../assets/robot.svg'
import cross from '../assets/cross.svg'
import dots from '../assets/dots.svg'
import TradingViewWidget from '../constants/TradingViewWidget';
import Heatmap from '../constants/Heatmap';
import Calendar from '../constants/Calendar';


export default function Markets() {

  const [selectedSymbol, setSelectedSymbol] = useState(null);
  const [apiSymbol,setApiSymbol] = useState('eur-usd');
  const [marketData, setMarketData] = useState(null);
  
  const fetchMarketPrice = async (currencyPair) => {
    try {
      const response = await axios.get(`/api/market-price/${currencyPair}`);
      setMarketData(response.data);
    } catch (error) {
      console.error('Error fetching market price:', error);
    }
  };

  useEffect(() => {
    // Fetch market price when apiSymbol changes
    const fetchMarketPriceAndUpdate = async () => {
      if (selectedSymbol && apiSymbol) {
        try {
          const response = await axios.get(`/api/market-price/${apiSymbol}`);
          setMarketData(response.data);
        } catch (error) {
          console.error('Error fetching market price:', error);
        }
      }
    };

    // Call the fetchMarketPriceAndUpdate function immediately
    fetchMarketPriceAndUpdate();

    // Setup interval to fetch market price every 30 seconds if a symbol is selected
    const intervalId = setInterval(() => {
      fetchMarketPriceAndUpdate();
    }, 15000);

    // Clean up the interval when the component unmounts or when a new symbol is selected
    return () => clearInterval(intervalId);
  }, [apiSymbol, selectedSymbol]);

  const handlePairClick = (symbol) => {
    setSelectedSymbol(symbol);
  };

  const handleApiClick = (apiSymbol) => {
    setApiSymbol(apiSymbol);
  };

  return (
    <div className='market'>
      <div className='chartsec'>
        <div className='fxlist'>
          <div className='btns'>
            <div className='bm'><img src={fire}/>FXPAIRS</div>
          </div>
          <div className='pairscont'>
            {fxpairs.map((fxpair, index)=>(
              <div className='fxs' key={index} 
              onClick={() => {
                handlePairClick(`PEPPERSTONE:${fxpair.pair1}${fxpair.pair2}`);
                handleApiClick(`${fxpair.pair1.toLowerCase()}-${fxpair.pair2.toLowerCase()}`);
              }}
              >
                <div><img src={fxpair.img1}/></div>
                <div>{fxpair.pair1}</div>
                <div className='slash'>|</div>
                <div><img src={fxpair.img2}/></div>
                <div>{fxpair.pair2}</div>
              </div>
            ))}
          </div>
        </div>
        <div className='chart'>
          {selectedSymbol ? (
              <TradingViewWidget key={selectedSymbol} symbol={selectedSymbol} />
            ) : (
              <div>
                <p className='instructions'>Please select a symbol to see its chart</p>
                <div className='robosec'>
                  <img className='robot' src={robot}/>
                </div>
              </div>
          )}
        </div>
        <div className='buynsell'>
          {marketData && (
            <p className="p9">
              MARKET PRICE: {marketData.marketPrice}
              <br/>
              <span className='refresh'>Refreshes every 30 seconds</span>
            </p>
            
          )}
          <div className='buysec'>
            <button className='buy'>Buy</button>
            <input className='lotinput' placeholder='Lot: 0.01-10' type='number' min={0.01} max={11.00}/>
            <button className='sell'>Sell</button>
          </div>
          <div className=' mpstoploss'>
            <div className='mplabel'>StopLoss</div>
            <div className='numslot'><input type='number' min={0}/></div>
          </div>
          <div className='mpstoploss'>
            <div className='mplabel'>Take Profit</div>
            <div className='numslot'><input type='number' min={0}/></div>
          </div>
          <div className='ordersec'>
            <p className='p9'>ORDER PRICE</p>
            <div className='orderprice'>
              <button className='buyat'>Buy@ </button>
              <input className='orderinput' type='number' min={0}/>
            </div>
            <div className='orderprice'>
              <button className='sellat'>Sell@</button>
              <input className='orderinput' type='number' min={0}/>
            </div>
          </div>
          <hr/>
        </div>
      </div>
      <div className='mytrades'>
        <div className='tradelog'>
          <div className='tradebtns'>
            <button className='tradebtn1'>Open Trades</button>
            <button className='tradebtn2'>Closed Trades</button>
          </div>
          <div className='tradedata'>
            <div className='trade1'>
              <img className='dots' src={dots}/>
              <div className='currency'>EUR/USD</div>
              <div className='position'>BUY</div>
              <div className='tp'>TP: 000.000</div>
              <div className='sl'>SL: 000.000</div>
              <div className='lot'>LOT: 0.01</div>
              <div className='pnl'>PNL: 120.21</div>
              <img className='cross' src={cross}/>
            </div>
            <div className='trade1'>
              <img className='dots' src={dots}/>
              <div className='currency'>EUR/USD</div>
              <div className='position'>BUY</div>
              <div className='tp'>TP: 000.000</div>
              <div className='sl'>SL: 000.000</div>
              <div className='lot'>LOT: 0.01</div>
              <div className='pnl'>PNL: 120.21</div>
              <img className='cross' src={cross}/>
            </div>
            <div className='trade1'>
              <img className='dots' src={dots}/>
              <div className='currency'>EUR/USD</div>
              <div className='position'>BUY</div>
              <div className='tp'>TP: 000.000</div>
              <div className='sl'>SL: 000.000</div>
              <div className='lot'>LOT: 0.01</div>
              <div className='pnl'>PNL: 120.21</div>
              <img className='cross' src={cross}/>
            </div>
            <div>Trade2</div>
          </div>
        </div>
        <div className='tview'>
          <div className='heatmap'>
            <p>Shows off a snapshot of currency market action. This widget lets you spot strong and weak currencies and see how they compare to each other, all in real-time.</p>
            <Heatmap/>
          </div>
          <div className='calendar'>
            <p>Keep an eye on key upcoming economic events, announcements, and news. Plus, set up filters in a few clicks, selecting for event importance and affected currencies.</p>
            <Calendar/>
          </div>
        </div>
      </div>
    </div>
  )
}