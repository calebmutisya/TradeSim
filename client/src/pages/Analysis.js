import React from 'react'
import '../css/Analysis.css'
import dollar from '../assets/dollar.svg'
import rate from '../assets/rate.svg'
import graph from '../assets/graph.svg'
import rank from '../assets/rank.svg'

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
      <div>
        <div>Trades Log</div>
        <div>Rankings</div>
      </div>
    </div>
  )
}
