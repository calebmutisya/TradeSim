import React, { useState } from 'react';
import '../css/Markets.css'
import { fxpairs } from '../constants/constants'
import fire from '../assets/fire.svg'
import watchlist from '../assets/watchlist.svg'
import star from '../assets/star.svg'
import TradingViewWidget from '../constants/TradingViewWidget';


export default function Markets() {

  const [selectedSymbol, setSelectedSymbol] = useState(null);

  const handlePairClick = (symbol) => {
    setSelectedSymbol(symbol);
  }

  return (
    <div className='market'>
      <div className='chartsec'>
        <div className='fxlist'>
          <div className='btns'>
            <div className='bm'><img src={fire}/>FXPAIRS</div>
            <div className='bm'><img src={watchlist}/>WATCHLIST</div>
          </div>
          <div className='pairscont'>
            {fxpairs.map((fxpair)=>(
              <div className='fxs' key={fxpair} onClick={() => handlePairClick(`PEPPERSTONE:${fxpair.pair1}${fxpair.pair2}`)}>
                <div><img className='star' src={star}/></div>
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
              <p className='instructions'>Please select a symbol to see its chart</p>
          )}
        </div>
        <div className='buynsell'>
          <p className='p9'>MARKET PRICE: 1.53637</p>
          <div className='buysec'>
            <button className='buy'>Buy</button>
            <input className='lotinput' placeholder='Input Lot' type='number' min={0.01} max={11.00}/>
            <button className='sell'>Sell</button>
          </div>
          <div className=' stoploss'>
            <div className='label'>StopLoss</div>
            <div className='numslot'><input type='number' min={0}/></div>
          </div>
          <div className='stoploss'>
            <div className='label'>Take Profit</div>
            <div className='numslot'><input type='number' min={0}/></div>
          </div>
          <div className='ordersec'>
            <p className='p9'>ORDER PRICE</p>
            <div className='stoploss'>
              <div className='label'>Buy@ </div>
              <div className='numslot'><input type='number' min={0}/></div>
            </div>
            <div className='stoploss'>
              <div className='label'>Sell@</div>
              <div className='numslot'><input type='number' min={0}/></div>
            </div>
            <div></div>
          </div>
          <hr/>
        </div>
      </div>
      <div>
        <div>Trades</div>
        <div>Heat Map</div>
      </div>
    </div>
  )
}