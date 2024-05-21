import React from 'react'

export default function Guide() {
  return (
    <div>
      <h3>How to Trade</h3>
      <div>
        <h4>What is Forex Trading</h4>
        <div>
          <img/>
          <p>
            Forex trading is ...
          </p>
        </div>
      </div>
      <div>
        <h4>How to Buy or Sell</h4>
        <div>
          <img/>
          <p>
            To intiate a buy trade first select a forex pair and ensure its chart is displayed. Once selected market price will be visible. Insert lot size, Take profit and Stop Loss.<br/>
            For a buy trade ensure takeprofit is higher than market price and stoploss lower than marketprice.<br/>
            The vice versa applies for a sell trade. Take profit is lower than marketprice and stoploss is higher than marketprice.<br/>
            Once all above is taken into consideration press buy or sell button.
          </p>
        </div>
      </div>
      <div>
        <h4>How to Edit Takeprofit or Stoploss</h4>
        <div>
          <img/>
          <p>
            To edit a trades takeprofit or stoploss click on the three dots to the far left of a trade and an edit tab will popup where you can make changes.
          </p>
        </div>
      </div>
      <div>
        <h4>How to close a Trade</h4>
        <div>
          <img/>
          <p>
            To close a trade click on the x button to the far right of the trade and you trade will be closed.
          </p>
        </div>
      </div>
    </div>
  )
}
