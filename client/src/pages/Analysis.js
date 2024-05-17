import React, { useState, useEffect, useContext} from 'react';
import axios from 'axios';
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

  const { currentUser,authToken, allUsers } = useContext(UserContext);
  const { closedtrades }=useContext(OpentradeContext);
  const [userTrades, setUserTrades] = useState({});
  const [userWinRates, setUserWinRates] = useState({});
  const [userRank, setUserRank] = useState(null);

  // Ensure closedtrades is an array
  const isClosedTradesArray = Array.isArray(closedtrades);

  // Calculate the number of trades with positive PNL
  const winningTrades = isClosedTradesArray ? closedtrades.filter(trade => trade.pnl > 0) : [];

  // Calculate the winning rate as a percentage
  const winningRate = isClosedTradesArray && closedtrades.length > 0 ? (winningTrades.length / closedtrades.length) * 100 : 0;

  useEffect(() => {
    const fetchTrades = async (userId) => {
      try {
        const response = await axios.get(`/closedtrades/${userId}`);
        return Array.isArray(response.data) ? response.data : [];
      } catch (error) {
        console.error(`Error fetching trades for user ${userId}:`, error);
        return [];
      }
    };

    const fetchAllUserTrades = async () => {
      const tradesData = {};
      const winRatesData = {};
      for (const user of allUsers) {
        const trades = await fetchTrades(user.id);
        tradesData[user.id] = trades.length;
        const winningTrades = Array.isArray(trades) ? trades.filter(trade => trade.pnl > 0) : [];
        const winRate = trades.length > 0 ? (winningTrades.length / trades.length) * 100 : 0;
        tradesData[user.id] = trades.length;
        winRatesData[user.id] = winRate;
      }
      setUserTrades(tradesData);
      setUserWinRates(winRatesData);
    };

    const calculateUserRank = () => {
      const sortedUsers = [...allUsers].sort((a, b) => b.capital - a.capital);
      const rank = sortedUsers.findIndex(user => user.id === currentUser.id) + 1;
      setUserRank(rank);
    };

    if (allUsers.length > 0) {
      fetchAllUserTrades();
      calculateUserRank();
    }
  }, [allUsers, currentUser]);

  return (
    <div className='analysis'>
      <div className='cardcont'>
        <div className='analysiscard'>
          <img className='dollar' src={dollar}/>
          <div className='cash'>
            { currentUser ? (
              <>
              {currentUser.capital}
              </>

            ):(
              <>
              10000</>
            )}
          </div>
          <div className='cardname'>Capital</div>
        </div>
        <div className='analysiscard'>
          {currentUser ?(
            <>
              <img className='dollar' src={rate}/>
              <div className='cash'>{winningRate.toFixed(2)}%</div>
              <div className='cardname'>Winning Rate</div>
            </>
          ):(
            <>
            <img className='dollar' src={rate}/>
            <div className='cash'>72%</div>
            <div className='cardname'>Winning Rate</div>
            </>
          )}
        </div>
        <div className='analysiscard'>
          <img className='dollar' src={graph}/>
          <div className='cash'>
            { currentUser ? (
              <>
              {closedtrades.length}
              </>
            ):(
              <>12</>
            )}
          </div>
          <div className='cardname'>Trades Made</div>
        </div>
        <div className='analysiscard'>
          <img className='dollar' src={rank}/>
          <div className='cash'>{userRank !== null ? userRank : '15'}</div>
          <div className='cardname'>Rank</div>
        </div>
      </div>
      <div className='analysislog'>
        <div className='pasttrades'>
          <div className='contname'>Trades Log</div>
            { currentUser ? (
              <div className='ranksec'>
                { Array.isArray(closedtrades) && closedtrades.map((trade,index)=>(
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
              <p className='message1'>Please Login to view Closed Trades</p>
            )}
        </div>
        <div className='rankcont'>
          <div className='contname2'>Rankings</div>
          { currentUser ? (
            <div className='ranksec'>
              { allUsers.map((user, index)=>(
                 <div className='rankdet' key={index}>
                  <div className='rankno'>{index + 1}</div>
                  <img src={profimg} alt='Profile'/>
                  <div className='name'>{user.username}</div>
                  <div className='tradesnums'>Trades Made: {userTrades[user.id] || 0}</div>
                  <div className='winrate'>Win Rate: {userWinRates[user.id] !== undefined ? userWinRates[user.id].toFixed(2) : 'N/A'}%</div>
                  <div className='capital'>$ {user.capital}</div>
                </div>
              ))}
            </div>
          ):(
            <p className='message1'>Please Login to view Rankings</p>
          )}
        </div>
      </div>
    </div>
  )
}
