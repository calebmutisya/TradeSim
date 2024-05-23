import React from 'react'
import '../css/Guide.css'
import buynsell from '../assets/buynsell.png'
import opentrade from '../assets/opentrade.png'
import edittrade from '../assets/edittrade.png'
import closedtrade from '../assets/closedtrade.png'

export default function Guide() {
  return (
    <div className='guide'>
      <h2>How to Trade</h2>
      <div className='topic'>
        <h4>What is Forex Trading</h4>
        <div>
          <div className='videocont'>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/NhFlqFVBmxc?si=IekCny0eZxmr31ue" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
          <p>
          Foreign exchange (forex) trading is the process of buying one currency and selling another with the goal of making a profit from the trade.
          </p>
        </div>
      </div>
      <div className='topic'>
        <h4>How to Buy or Sell</h4>
        <div>
          <div className='imagecont'>
            <img className='editimg' src={buynsell}/>
          </div>
          <p>
            To intiate a buy trade first select a forex pair and ensure its chart is displayed. Once selected market price will be visible. Insert lot size, Take profit and Stop Loss.
            <br/>
            For a buy trade ensure takeprofit is higher than market price and stoploss lower than marketprice.<br/>
            The vice versa applies for a sell trade. Take profit is lower than marketprice and stoploss is higher than marketprice.
            <br/>
            Once all above is taken into consideration press buy or sell button.
            <br/>
            Takeprofit and stoploss levels are put in place to mitigate risk and allow you to maximize profit while minimizing loss.
          </p>
        </div>
      </div>
      <div className='topic'>
        <h4>How to Edit Takeprofit or Stoploss</h4>
        <div>
          <div className='imagecont'>
            <img className='editimg' src={edittrade}/>
          </div>
          <p>
            To edit a trades takeprofit or stoploss click on the three dots to the far left of a trade and an edit tab will popup where you can make changes.
          </p>
        </div>
      </div>
      <div className='topic'>
        <h4>How to close a Trade</h4>
        <div>
          <div className='imagecont'>
            <img className='editimg' src={opentrade}/>
          </div>
          <p>
            To close a trade click on the x button to the far right of the trade and you trade will be closed.
          </p>
          <div className='imagecont'>
            <img className='editimg' src={closedtrade}/>
          </div>
        </div>
      </div>
    </div>
  )
}
