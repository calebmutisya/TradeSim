import React, { useState, useEffect, useContext} from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import '../css/Markets.css'
import { fxpairs } from '../constants/constants'
import fire from '../assets/fire.svg'
import robot from '../assets/robot.svg'
import cross from '../assets/cross.svg'
import dots from '../assets/dots.svg'
import coin from '../assets/coin.png'
import TradingViewWidget from '../constants/TradingViewWidget';
import Heatmap from '../constants/Heatmap';
import Calendar from '../constants/Calendar';
import { UserContext } from '../context/UserContext';
import { OpentradeContext } from '../context/OpentradeContext';
import Swal from 'sweetalert2'


export default function Markets() {

  const [selectedSymbol, setSelectedSymbol] = useState(null);
  const [apiSymbol,setApiSymbol] = useState('eur-usd');
  const [marketData, setMarketData] = useState(null);
  const [selectedTrade, setSelectedTrade] = useState(null);

  const { currentUser,authToken } = useContext(UserContext);
  const { opentrades, editOpentradeMp,editPnltrade,editOpentrade,deleteOpentrade, fetchUserOpentrades, setOpentrades }=useContext(OpentradeContext)
  
  const [showEdit, setShowEdit] = useState(false)
  const [newTP, setNewTP] = useState('');
  const [newSL, setNewSL] = useState('');


  const showTab = (trade) => {
    setSelectedTrade(trade);
    setShowEdit(true);
    // Initialize newTP and newSL with current TP and SL values from the selected trade
    setNewTP(trade.tp.toString());
    setNewSL(trade.sl.toString());
  };

  const hideTab=()=>{
    setShowEdit(false);
  }
  
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

  const handleBuySell = (position) => {
    if (marketData && currentUser && authToken) {
        const lotInput = document.querySelector('.lotinput');
        const stopLossInput = document.querySelector('.stoploss-input');
        const takeProfitInput = document.querySelector('.takeprofit-input');

        const lot = parseFloat(lotInput.value);
        const stopLoss = parseFloat(stopLossInput.value);
        const takeProfit = parseFloat(takeProfitInput.value);

        const opentradeData = {
            currency_pair: apiSymbol.toUpperCase(),
            position,
            tp: takeProfit,
            ep: marketData.marketPrice,
            sl: stopLoss,
            lot,
        };

        // Include JWT token in the request headers
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(opentradeData),
        };

        fetch('/opentrades', requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add opentrade');
                }
                return response.json();
            })
            .then(data => {
                Swal.fire({
                    icon: 'success',
                    title: 'Trade Added Successfully',
                });
                fetchUserOpentrades(); // Refresh opentrades after adding a new trade
            })
            .catch(error => {
                console.error('Error adding opentrade:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to add trade. Please try again later.',
                });
            });
    }
  };

  const handleSave = () => {
    const newData = {};
    if (newTP !== '') {
      newData.tp = parseFloat(newTP);
    }
    if (newSL !== '') {
      newData.sl = parseFloat(newSL);
    }
    if (selectedTrade && Object.keys(newData).length > 0) {
      editOpentrade(selectedTrade.id, newData);
      hideTab();
    }
  };

  // Inside the useEffect hook, automatically save PNL after it's calculated
  useEffect(() => {
    const interval = setInterval(async () => {
        // Check if there's an authenticated user
        if (currentUser && opentrades.length > 0) {
            // Save PNL for each trade after it's calculated
            for (let i = 0; i < opentrades.length; i++) {
                const trade = opentrades[i];
                try {
                    const currencyPairLowerCase = trade.currency_pair.toLowerCase();
                    const response = await fetch(`/api/market-price/${currencyPairLowerCase}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch market price');
                    }
                    const data = await response.json();
                    const marketPrice = parseFloat(data.marketPrice);
                    console.log('Market price for', currencyPairLowerCase, ':', marketPrice);
                    await editOpentradeMp(trade.id, marketPrice);
                    console.log('Trade market price edited successfully');
                    await calculatePNL(trade);
                } catch (error) {
                    console.error('Error editing trade market price:', error);
                }
            }
        }
    }, 60000); // Execute every minute (60000 milliseconds)

    // Cleanup function to clear the interval on component unmount or when opentrades changes
    return () => clearInterval(interval);
  }, [currentUser, opentrades]);


  // Inside the calculatePNL function
  const calculatePNL = async (trade) => {
    try {
      // Fetch the market price for the trade's currency pair
      const currencyPairLowerCase = trade.currency_pair.toLowerCase();
      const response = await fetch(`/api/market-price/${currencyPairLowerCase}`);
      if (!response.ok) {
        throw new Error('Failed to fetch market price');
      }
      const data = await response.json();
      const marketPrice = parseFloat(data.marketPrice);

      // Calculate pnl based on the entry price and market price
      const entryPrice = parseFloat(trade.ep);
      const position = trade.position;
      const lot = trade.lot * 100000;
      let pnl = 0;

      if (position === 'BUY') {
        pnl = (marketPrice - entryPrice) * lot;
      } else if (position === 'SELL') {
        pnl = (entryPrice - marketPrice) * lot;
      }
      // Call editPnltrade to update PNL in the backend
      await editPnltrade(trade.id, { pnl: pnl.toFixed(2) });
      console.log('Trade PNL edited successfully');
      
      // Update the trade object with the new PNL
      const updatedTrade = { ...trade, pnl: pnl.toFixed(2) };

      // Update the opentrades state with the updated trade object
      setOpentrades(prevOpentrades => prevOpentrades.map(prevTrade => {
        if (prevTrade.id === trade.id) {
          return updatedTrade;
        } else {
          return prevTrade;
        }
      }));

      // Return the calculated PNL
      return pnl.toFixed(2);
    } catch (error) {
      console.error('Error editing trade PNL:', error);
      return ''; // Return an empty string or handle the error accordingly
    }
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
            <button className='buy' onClick={() => handleBuySell('BUY')}>Buy</button>
            <input className='lotinput' placeholder='Lot: 0.01-10' type='number' min={0.01} max={11.00}/>
            <button className='sell' onClick={() => handleBuySell('SELL')}>Sell</button>
          </div>
          <div className=' mpstoploss'>
            <div className='mplabel'>StopLoss</div>
            <div className='numslot'><input className='stoploss-input' type='number' min={0}/></div>
          </div>
          <div className='mpstoploss'>
            <div className='mplabel'>Take Profit</div>
            <div className='numslot'><input className='takeprofit-input' type='number' min={0}/></div>
          </div>
          <hr/>
          <div>
            <div className='walletcont'>
              <img className='coin' src={coin}/> 10,000
            </div>
            <button className='tradebtn1' >Closed Trades</button>
            <div className='tradeslot1'>
              <div className='slot5cont'>
                <div className='slot5'>EUR-USD</div>
                <div className='slot5'>BUY</div>
                <div className='slot5'>PNL: $ 100</div>
                <div className='slot5'>13-05-2023</div>
              </div>
              <div className='slot5cont'>
                <div className='slot5'>EUR-USD</div>
                <div className='slot5'>BUY</div>
                <div className='slot5'>PNL: $ 100</div>
                <div className='slot5'>13-05-2023</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mytrades'>
        <div className='tradelog'>
          <div className='tradebtns'>
            <button className='tradebtn1' >Open Trades</button>
          </div>
          <div className='tradedata'>
            <div className='tab1'>
            {currentUser ? (
              <div>
                {selectedTrade && (
                  <div className={showEdit ? 'edittrade visible' : 'edittrade'}>
                    <div className='crossed'>
                      <img className='cross' src={cross} onClick={hideTab}/>
                    </div>
                    <p className='entryslot'>Position: {selectedTrade.position}  EntryPrice: {selectedTrade.ep}</p>
                    <label>TP:</label>
                    <input
                      placeholder='Take profit'
                      type='number'
                      value={newTP}
                      onChange={(e) => setNewTP(e.target.value)}
                    />
                    <label>SL:</label>
                    <input
                      placeholder='Stop Loss'
                      type='number'
                      value={newSL}
                      onChange={(e) => setNewSL(e.target.value)}
                    />
                    <button onClick={handleSave}>SAVE</button>
                  </div>
                )}
                {opentrades.map((trade, index) => (
                  <div className='trade1' key={index}>
                    <img className='dots' src={dots} onClick={() => showTab(trade)}/>
                    <div className='currency'>{trade.currency_pair}</div>
                    <div className='position'>{trade.position}</div>
                    <div className='tp'>TP: {trade.tp}</div>
                    <div className='sl'>SL: {trade.sl}</div>
                    <div className='lot'>LOT: {trade.lot}</div>
                    <div className='pnl'>PNL: ${trade.pnl}</div>
                    <img className='cross' src={cross} onClick={() => deleteOpentrade(trade.id, trade)} />
                  </div>
                ))}
                </div>
              ) : (
                <p className='message1'>Please login to view your trades</p>
              )}
            </div>
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