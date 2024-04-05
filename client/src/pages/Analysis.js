import React from 'react'
import '../css/Analysis.css'
import dollar from '../assets/dollar.svg'
import rate from '../assets/rate.svg'
import graph from '../assets/graph.svg'
import rank from '../assets/rank.svg'
import profimg from '../assets/profimg.png'

export default function Analysis() {
  return (
    <div className='analysis'>
      <div className='cardcont'>
        <div className='analysiscard'>
          <img className='dollar' src={dollar}/>
          <div className='cash'>1000.00</div>
          <div className='cardname'>Profit/Loss</div>
        </div>
        <div className='analysiscard'>
          <img className='dollar' src={rate}/>
          <div className='cash'>72%</div>
          <div className='cardname'>Winning Rate</div>
        </div>
        <div className='analysiscard'>
          <img className='dollar' src={graph}/>
          <div className='cash'>12</div>
          <div className='cardname'>Trades Made</div>
        </div>
        <div className='analysiscard'>
          <img className='dollar' src={rank}/>
          <div className='cash'>15</div>
          <div className='cardname'>Rank</div>
        </div>
      </div>
      <div className='analysislog'>
        <div className='pasttrades'>
          <div className='contname'>Trades Log</div>
          <div className='logdetails'>
            <div className='date'>25 March 2024</div>
            <div className='pastpair'>EUR/USD</div>
            <div className='pastposition'>BUY</div>
            <div className='takeprofit'>TP:156.676</div>
            <div className='stoploss'>SL: 132.378</div>
            <div className='profit'>PNL: 120.00</div>
          </div>
          <div className='logdetails'>
            <div className='date'>25 March 2024</div>
            <div className='pastpair'>EUR/USD</div>
            <div className='pastposition'>BUY</div>
            <div className='takeprofit'>TP:156.676</div>
            <div className='stoploss'>SL: 132.378</div>
            <div className='profit'>PNL: -120.00</div>
          </div>
          <div className='logdetails'>
            <div className='date'>25 March 2024</div>
            <div className='pastpair'>EUR/USD</div>
            <div className='pastposition'>BUY</div>
            <div className='takeprofit'>TP:156.676</div>
            <div className='stoploss'>SL: 132.378</div>
            <div className='profit'>PNL: -120.00</div>
          </div>
          <div className='logdetails'>
            <div className='date'>25 March 2024</div>
            <div className='pastpair'>EUR/USD</div>
            <div className='pastposition'>BUY</div>
            <div className='takeprofit'>TP:156.676</div>
            <div className='stoploss'>SL: 132.378</div>
            <div className='profit'>PNL: -120.00</div>
          </div>
          <div className='logdetails'>
            <div className='date'>25 March 2024</div>
            <div className='pastpair'>EUR/USD</div>
            <div className='pastposition'>BUY</div>
            <div className='takeprofit'>TP:156.676</div>
            <div className='stoploss'>SL: 132.378</div>
            <div className='profit'>PNL: -120.00</div>
          </div>
        </div>
        <div className='rankcont'>
          <div className='contname'>Rankings</div>
          <div className='ranksec'>
            <div className='rankdet'>
              <div className='rankno'>1</div>
              <img src={profimg}/>
              <div className='name'>Molly Whitaker</div>
              <div className='tradesnums'>Trades Made: 56</div>
              <div className='winrate'>Win Rate: 90%</div>
              <div className='capital'>$ 50000</div>
            </div>
            <div className='rankdet'>
              <div className='rankno'>1</div>
              <img src={profimg}/>
              <div className='name'>Molly Whitaker</div>
              <div className='tradesnums'>Trades Made: 56</div>
              <div className='winrate'>Win Rate: 90%</div>
              <div className='capital'>$ 50000</div>
            </div>
            <div className='rankdet'>
              <div className='rankno'>1</div>
              <img src={profimg}/>
              <div className='name'>Molly Whitaker</div>
              <div className='tradesnums'>Trades Made: 56</div>
              <div className='winrate'>Win Rate: 90%</div>
              <div className='capital'>$ 50000</div>
            </div>
            <div className='rankdet'>
              <div className='rankno'>1</div>
              <img src={profimg}/>
              <div className='name'>Whitaker</div>
              <div className='tradesnums'>Trades Made: 56</div>
              <div className='winrate'>Win Rate: 90%</div>
              <div className='capital'>$ 50000</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
