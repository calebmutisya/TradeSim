import React, { useEffect, useRef, memo } from 'react';

function Heatmap(){
    const container = useRef();

    useEffect(
        () => {
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-forex-heat-map.js";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = `
            {
                "width": 600,
                "height": 380,
                "currencies": [
                    "EUR",
                    "USD",
                    "JPY",
                    "GBP",
                    "CHF",
                    "AUD",
                    "CAD",
                    "NZD"
                ],
                "isTransparent": false,
                "colorTheme": "dark",
                "locale": "en",
                "backgroundColor": "#1D222D"
            }`;
        container.current.appendChild(script);
        },
        []
    );

    return(
        <div class="tradingview-widget-container" ref={container}>
            <div class="tradingview-widget-container__widget"></div>
            <div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span class="blue-text">Track all markets on TradingView</span></a></div>
        </div>
    )
}

export default memo(Heatmap);

// <!-- TradingView Widget BEGIN -->
// <div class="tradingview-widget-container">
//   <div class="tradingview-widget-container__widget"></div>
//   <div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span class="blue-text">Track all markets on TradingView</span></a></div>
//   <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-forex-heat-map.js" async>
//   {
//   "width": 550,
//   "height": 400,
//   "currencies": [
//     "EUR",
//     "USD",
//     "JPY",
//     "GBP",
//     "CHF",
//     "AUD",
//     "CAD",
//     "NZD",
//     "CNY"
//   ],
//   "isTransparent": false,
//   "colorTheme": "dark",
//   "locale": "en",
//   "backgroundColor": "#1D222D"
// }
//   </script>
// </div>
// <!-- TradingView Widget END -->