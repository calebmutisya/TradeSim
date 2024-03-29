import React from 'react'
import '../css/Home.css'
import banner from '../assets/homebanner.png'
import goldstar from '../assets/goldstar.svg'
import lily from '../assets/Lily.svg'

export default function Home() {
  return (
    <div>
      <div>
        <div className='image'>
          <img className='banner' src={banner}/>
          <div className='txtsect'>
            <p className='p1'>
              Practice Trading Without Risking<br/>
              Real money
            </p>
            <p className='p2'>
              Welcome  to TradeSim, the ultimate paper trading web app for forex  instruments.<br/> Test your trading strategies and improve your skills  without the risk of losing real money.
            </p>
            <button className='b1'>EXPLORE MARKETS</button>
            <div className='rating'>
              <div>
                <img src={goldstar}/>
                <img src={goldstar}/>
                <img src={goldstar}/>
                <img src={goldstar}/>
                <img src={goldstar}/>
              </div>
              <div><span>|</span>Risk-Free Trading</div>
              <div><span>|</span>Realistic Market Conditions</div>
            </div>
            <div className='recommend'>
              <p className='p3'>
              “TradeSim has been a game-changer for me. I can practice trading  without risking <br/>real money and test my strategies in a realistic  environment.”
              </p>
              <div className='lily'>
                <img src={lily}/>Lily Wong
              </div>
            </div>
          </div>
        </div>
        
      </div>
      <div>Cards</div>
      <div>Start Practising</div>
    </div>
  )
}
