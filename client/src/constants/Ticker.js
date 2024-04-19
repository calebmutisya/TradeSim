import React, { useEffect, useRef, memo } from 'react';

function TickerWidget({symbol}) {
    const container = useRef();
  
    useEffect(
      () => {
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = `
          {
            "symbols": [
                {
                  "description": "EUR/USD",
                  "proName": "PEPPERSTONE:EURUSD"
                },
                {
                  "description": "USD/JPY",
                  "proName": "PEPPERSTONE:USDJPY"
                },
                {
                  "description": "GBP/USD",
                  "proName": "PEPPERSTONE:GBPUSD"
                },
                {
                  "description": "USD/CHF",
                  "proName": "PEPPERSTONE:USDCHF"
                },
                {
                  "description": "AUD/USD",
                  "proName": "PEPPERSTONE:AUDUSD"
                },
                {
                  "description": "USD/CAD",
                  "proName": "PEPPERSTONE:USDCAD"
                },
                {
                  "description": "NZD/USD",
                  "proName": "PEPPERSTONE:NZDUSD"
                },
                {
                  "description": "GBP/JPY",
                  "proName": "PEPPERSTONE:GBPJPY"
                },
                {
                  "description": "AUD/NZD",
                  "proName": "PEPPERSTONE:AUDNZD"
                },
                {
                  "description": "EUR/GBP",
                  "proName": "PEPPERSTONE:EURGBP"
                },
                {
                  "description": "CHF/JPY",
                  "proName": "PEPPERSTONE:CHFJPY"
                },
                {
                  "description": "GBP/CAD",
                  "proName": "PEPPERSTONE:GBPCAD"
                },
                {
                  "description": "AUD/JPY",
                  "proName": "PEPPERSTONE:AUDJPY"
                }
              ],
            "showSymbolLogo": true,
            "isTransparent": false,
            "displayMode": "adaptive",
            "colorTheme": "dark",
            "locale": "en"
          }`;
        container.current.appendChild(script);
      },
      [symbol]
    );
  
    return (
        <div className="tradingview-widget-container" ref={container} >
            <div class="tradingview-widget-container__widget">
            </div>
        </div>
    );
}
  
export default memo(TickerWidget);


//   <!-- TradingView Widget BEGIN -->
//   <div class="tradingview-widget-container">
//     <div class="tradingview-widget-container__widget"></div>
//     <div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span class="blue-text">Track all markets on TradingView</span></a></div>
//     <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js" async>
//     {
//     "symbols": [
//       {
//         "description": "EUR/USD",
//         "proName": "PEPPERSTONE:EURUSD"
//       },
//       {
//         "description": "USD/JPY",
//         "proName": "PEPPERSTONE:USDJPY"
//       },
//       {
//         "description": "GBP/USD",
//         "proName": "PEPPERSTONE:GBPUSD"
//       },
//       {
//         "description": "USD/CHF",
//         "proName": "PEPPERSTONE:USDCHF"
//       },
//       {
//         "description": "AUD/USD",
//         "proName": "PEPPERSTONE:AUDUSD"
//       },
//       {
//         "description": "USD/CAD",
//         "proName": "PEPPERSTONE:USDCAD"
//       },
//       {
//         "description": "NZD/USD",
//         "proName": "PEPPERSTONE:NZDUSD"
//       },
//       {
//         "description": "GBP/JPY",
//         "proName": "PEPPERSTONE:GBPJPY"
//       },
//       {
//         "description": "AUD/NZD",
//         "proName": "PEPPERSTONE:AUDNZD"
//       },
//       {
//         "description": "EUR/GBP",
//         "proName": "PEPPERSTONE:EURGBP"
//       },
//       {
//         "description": "CHF/JPY",
//         "proName": "PEPPERSTONE:CHFJPY"
//       },
//       {
//         "description": "GBP/CAD",
//         "proName": "PEPPERSTONE:GBPCAD"
//       },
//       {
//         "description": "AUD/JPY",
//         "proName": "PEPPERSTONE:AUDJPY"
//       }
//     ],
//     "showSymbolLogo": true,
//     "isTransparent": false,
//     "displayMode": "adaptive",
//     "colorTheme": "dark",
//     "locale": "en"
//   }
//     </script>
//   </div>
//   <!-- TradingView Widget END -->