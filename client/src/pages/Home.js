import React from 'react'
import '../css/Home.css'
import banner from '../assets/homebanner.png'
import goldstar from '../assets/goldstar.svg'
import lily from '../assets/Lily.svg'
import card1 from '../assets/card1.png'
import card2 from '../assets/card2.png'
import card3 from '../assets/card3.png'
import practice from '../assets/practice.png'

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
      <div className='cardssect'>
        <div className='card'>
          <div class="cardbg"></div>
          <div class="cardbg2"></div>
          <div className='imgslot'>
            <img className='cardimg' src={card1}/>
          </div>
          <p className='p4'>Learn And Improve Your <br/> Tradng Skills</p>
        </div>
        <div className='card'>
          <div class="cardbg"></div>
          <div class="cardbg2"></div>
          <div className='imgslot'>
            <img className='cardimg' src={card2}/>
          </div>
          <p className='p4'>Test Different Trading Strategies</p>
        </div>
        <div className='card'>
          <div class="cardbg"></div>
          <div class="cardbg2"></div>
          <div className='imgslot'>
            <img className='cardimg' src={card3}/>
          </div>
          <p className='p4'>Gain confidence in Your <br/> Tradng Decisions</p>
        </div>
      </div>
      <div className='practice'>
        <div className='practice2'>
          <img className='banner3' src={practice}/>
          <div className='card2'>
            <p className='p5'>Start Practicing Today</p>
            <p className='p6'>“TradeSim is the best paper trading web app I've used. It's user-friendly and provides a realistic trading experience.” -<br/> Leah Gonzalez</p>
            <button className='b1'>JOIN US</button>
          </div>
        </div>
      </div>
    </div>
  )
}
