import React, { useState, useEffect, useContext} from 'react';
import '../css/Analysis.css'
import '../css/Markets.css'
import dollar from '../assets/dollar.svg'
import rate from '../assets/rate.svg'
import graph from '../assets/graph.svg'
import rank from '../assets/rank.svg'
import profimg from '../assets/profimg.png'
import { UserContext } from '../context/UserContext';
import { OpentradeContext } from '../context/OpentradeContext';

export default function Analysis() {

  const { currentUser,authToken } = useContext(UserContext);
  const { opentrades, closedtrades, editOpentradeMp,editPnltrade,editOpentrade,deleteOpentrade, fetchUserOpentrades, setOpentrades }=useContext(OpentradeContext)


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
            { currentUser ? (
              <div className='ranksec'>
                { closedtrades.map((trade,index)=>(
                  <div className='logdetails' key={index}>
                    <div className='date'>{new Date(trade.open_date).toLocaleDateString()}</div>
                    <div className='pastpair'>{trade.currency_pair}</div>
                    <div className='pastposition'>{trade.position}</div>
                    <div className='takeprofit'>TP: {trade.tp}</div>
                    <div className='stoploss'>SL: {trade.sl}</div>
                    <div className='profit'>PNL: {trade.pnl}</div>
                  </div>
                ))}
              </div>
            ):(
              <p className='message1'>Please login to view Closed Trades</p>
            )}
        </div>
        <div className='rankcont'>
          <div className='contname2'>Rankings</div>
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
