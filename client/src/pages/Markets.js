import React, { useState, useEffect, useContext} from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import '../css/Markets.css'
import { fxpairs } from '../constants/constants'
import fire from '../assets/fire.svg'
import robot from '../assets/robot.svg'
import cross from '../assets/cross.svg'
import dots from '../assets/dots.svg'
import coin from '../assets/coin.png'
import copy from '../assets/copy.png'
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
  const { opentrades, closedtrades, editOpentradeMp,editPnltrade,editOpentrade,deleteOpentrade, fetchUserOpentrades, setOpentrades }=useContext(OpentradeContext)
  
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
      const response = await axios.get(`http://127.0.0.1:5000/api/market-price/${currencyPair}`);
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
          const response = await axios.get(`http://127.0.0.1:5000/api/market-price/${apiSymbol}`);
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
        const marketPrice = parseFloat(marketData.marketPrice);

        // Check if stopLoss and takeProfit are filled
        if (isNaN(stopLoss) || isNaN(takeProfit)) {
          Swal.fire({
              icon: 'error',
              title: 'Missing Values',
              text: 'Both Stop Loss and Take Profit values must be filled.',
          });
          return;
        }

        // Validate takeProfit and stopLoss based on the trade position
        if (position === 'BUY') {
            if (takeProfit <= marketPrice) {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid Take Profit',
                    text: 'For a buy trade, the take profit must be higher than the market price.',
                });
                return;
            }
            if (stopLoss >= marketPrice) {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid Stop Loss',
                    text: 'For a buy trade, the stop loss must be lower than the market price.',
                });
                return;
            }
        } else if (position === 'SELL') {
            if (takeProfit >= marketPrice) {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid Take Profit',
                    text: 'For a sell trade, the take profit must be lower than the market price.',
                });
                return;
            }
            if (stopLoss <= marketPrice) {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid Stop Loss',
                    text: 'For a sell trade, the stop loss must be higher than the market price.',
                });
                return;
            }
        }

        const opentradeData = {
            currency_pair: apiSymbol.toUpperCase(),
            position,
            tp: takeProfit,
            ep: marketPrice,
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

        fetch('http://127.0.0.1:5000/opentrades', requestOptions)
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
    const marketPrice = parseFloat(selectedTrade.ep);  // Assuming selectedTrade.ep is the market price
    const position = selectedTrade.position;

    if (newTP !== '') {
        const takeProfit = parseFloat(newTP);

        // Validate takeProfit based on the trade position
        if (position === 'BUY' && takeProfit <= marketPrice) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Take Profit',
                text: 'For a buy trade, the take profit must be higher than the market price.',
            });
            return;
        } else if (position === 'SELL' && takeProfit >= marketPrice) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Take Profit',
                text: 'For a sell trade, the take profit must be lower than the market price.',
            });
            return;
        }

        newData.tp = takeProfit;
    }

    if (newSL !== '') {
        const stopLoss = parseFloat(newSL);

        // Validate stopLoss based on the trade position
        if (position === 'BUY' && stopLoss >= marketPrice) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Stop Loss',
                text: 'For a buy trade, the stop loss must be lower than the market price.',
            });
            return;
        } else if (position === 'SELL' && stopLoss <= marketPrice) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Stop Loss',
                text: 'For a sell trade, the stop loss must be higher than the market price.',
            });
            return;
        }

        newData.sl = stopLoss;
    }

    if (selectedTrade && Object.keys(newData).length > 0) {
        editOpentrade(selectedTrade.id, newData);
        hideTab();
    }
  };


  // Inside the useEffect hook, automatically save PNL after it's calculated
  
  useEffect(() => {
    const interval = setInterval(async () => {
      if (currentUser && opentrades.length > 0) {
        for (let i = 0; i < opentrades.length; i++) {
          const trade = opentrades[i];
          try {
            const updatedTrade = await calculatePNL(trade);
            await checkTakeProfitAndStopLoss(updatedTrade);
          } catch (error) {
            console.error('Error processing trade:', error);
          }
        }
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [currentUser, opentrades]);

  const calculatePNL = async (trade) => {
    try {
      const currencyPairLowerCase = trade.currency_pair.toLowerCase();
      const response = await fetch(`http://127.0.0.1:5000/api/market-price/${currencyPairLowerCase}`);
      if (!response.ok) {
        throw new Error('Failed to fetch market price');
      }
      const data = await response.json();
      const marketPrice = parseFloat(data.marketPrice);

      if (isNaN(marketPrice)) {
        throw new Error('Market price is NaN');
      }

      const entryPrice = parseFloat(trade.ep);
      const takeProfit = parseFloat(trade.tp);
      const stopLoss = parseFloat(trade.sl);
      const position = trade.position;
      const lot = trade.lot * 100000;
      let pnl = 0;

      if (position === 'BUY') {
        if (marketPrice <= stopLoss) {
          pnl = (stopLoss - entryPrice) * lot;
        } else if (marketPrice >= takeProfit) {
          pnl = (takeProfit - entryPrice) * lot;
        } else {
          pnl = (marketPrice - entryPrice) * lot;
        }
      } else if (position === 'SELL') {
        if (marketPrice >= stopLoss) {
          pnl = (entryPrice - stopLoss) * lot;
        } else if (marketPrice <= takeProfit) {
          pnl = (entryPrice - takeProfit) * lot;
        } else {
          pnl = (entryPrice - marketPrice) * lot;
        }
      }

      await editPnltrade(trade.id, { pnl: pnl.toFixed(2) });

      const updatedTrade = { ...trade, pnl: pnl.toFixed(2), marketPrice: marketPrice };

      setOpentrades(prevOpentrades =>
        prevOpentrades.map(prevTrade =>
          prevTrade.id === trade.id ? updatedTrade : prevTrade
        )
      );

      return updatedTrade;
    } catch (error) {
      console.error('Error editing trade PNL:', error);
      return trade;
    }
  };

  const checkTakeProfitAndStopLoss = async (trade) => {
    try {
      const marketPrice = parseFloat(trade.marketPrice);
      console.log(`Checking trade ${trade.id}: Market Price: ${marketPrice}`);
      const entryPrice = parseFloat(trade.ep);
      const takeProfit = parseFloat(trade.tp);
      const stopLoss = parseFloat(trade.sl);
      const position = trade.position;
      let shouldCloseTrade = false;
      let closingPNL = 0;
  
      if (position === 'BUY') {
        if (marketPrice >= takeProfit) {
          console.log(`Closing BUY trade ${trade.id} at take profit: ${takeProfit}`);
          closingPNL = (takeProfit - entryPrice) * trade.lot * 100000;
          shouldCloseTrade = true;
        } else if (marketPrice <= stopLoss) {
          console.log(`Closing BUY trade ${trade.id} at stop loss: ${stopLoss}`);
          closingPNL = (stopLoss - entryPrice) * trade.lot * 100000;
          shouldCloseTrade = true;
        }
      } else if (position === 'SELL') {
        if (marketPrice <= takeProfit) {
          console.log(`Closing SELL trade ${trade.id} at take profit: ${takeProfit}`);
          closingPNL = (entryPrice - takeProfit) * trade.lot * 100000;
          shouldCloseTrade = true;
        } else if (marketPrice >= stopLoss) {
          console.log(`Closing SELL trade ${trade.id} at stop loss: ${stopLoss}`);
          closingPNL = (entryPrice - stopLoss) * trade.lot * 100000;
          shouldCloseTrade = true;
        }
      }
  
      if (shouldCloseTrade) {
        console.log(`Trade ${trade.id} should be closed with PNL: ${closingPNL.toFixed(2)}`);
        await editPnltrade(trade.id, { pnl: closingPNL.toFixed(2) });
  
        await deleteOpentrade(trade.id, trade);
      }
    } catch (error) {
      console.error('Error checking take profit and stop loss:', error);
    }
  };

  const handleCopyClick = () => {
    if (marketData) {
      navigator.clipboard.writeText(marketData.marketPrice)
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Market price copied to clipboard',
            timer: 1000, // Set the timer to automatically close the alert after 2 seconds
            timerProgressBar: true, // Show a progress bar for the timer
            showConfirmButton: false // Hide the "OK" button
          });
        })
        .catch((error) => {
          console.error('Error copying to clipboard: ', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to copy market price to clipboard'
          });
        });
    }
  }
  
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
              MARKET PRICE: {marketData.marketPrice} <img className='copy' src={copy} onClick={handleCopyClick}/>
              <br/>
              <span className='refresh'>
                Refreshes every 10 seconds<br/>
                Error may occcur due to scraping source.
              </span>
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
              {currentUser ? (
                <>
                <img className='coin' src={coin}/> {currentUser.capital}
                </>
              ):(
                <>
                <img className='coin' src={coin}/> 9,000
                </>
              )}
            </div>
            <button className='tradebtn1'>Closed Trades</button>
            {currentUser ? (
              <div className='tradeslot1'>
                { Array.isArray(closedtrades) && closedtrades.map((trade, index)=>(
                  
                    <div className='slot5cont' key={index}>
                      <div className='slot5'>{trade.currency_pair}</div>
                      <div className={trade.position === 'BUY' ? 'slotbuy' : 'slotsell'}>{trade.position}</div>
                      <div className={trade.pnl >= 0 ? 'slotbuy' : 'slotsell'}><span className='white'>PNL:</span> {trade.pnl}</div>
                      <div className='slot6'>{new Date(trade.open_date).toLocaleDateString()}</div>
                    </div>
                ))}
              </div>
            ):(
              <p className='message1'>Please login to view Closed Trades</p>
            )}
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
                { Array.isArray(opentrades) && opentrades.map((trade, index) => (
                  <div className='trade1' key={index}>
                    <img className='dots' src={dots} onClick={() => showTab(trade)}/>
                    <div className='currency'>{trade.currency_pair}</div>
                    <div className={trade.position === 'BUY' ? 'position' : 'position2'}>{trade.position}</div>
                    <div className='tp'>TP: {trade.tp}</div>
                    <div className='sl'>SL: {trade.sl}</div>
                    <div className='lot'>LOT: {trade.lot}</div>
                    <div className={trade.pnl >= 0 ? 'pnl' : 'pnl2'}>PNL: ${trade.pnl}</div>
                    <img className='cross' src={cross} onClick={() => deleteOpentrade(trade.id, trade)} />
                  </div>
                ))}
                </div>
              ) : (
                <p className='message1'>Please login to view Open Trades</p>
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