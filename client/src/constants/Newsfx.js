import React, { useEffect, useRef, memo } from 'react';

function Newsfx(){
    const container = useRef();

    useEffect(
        () => {
        const script = document.createElement("script");
        script.src="https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = `
            {
                "feedMode": "market",
                "market": "forex",
                "isTransparent": false,
                "displayMode": "regular",
                "width": "100%",
                "height": "100%",
                "colorTheme": "dark",
                "locale": "en"
            }`;
        container.current.appendChild(script);
        },
        []
    );

    return (
        <div class="tradingview-widget-container" ref={container}>
            <div class="tradingview-widget-container__widget"></div>
            <div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/markets/currencies/news/" rel="noopener nofollow" target="_blank"><span class="blue-text">Get More Detailed News !!!</span></a>
            </div>
        </div>
    );
}

export default memo(Newsfx);



// <!-- TradingView Widget BEGIN -->
// <div class="tradingview-widget-container">
//   <div class="tradingview-widget-container__widget"></div>
//   <div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span class="blue-text">Track all markets on TradingView</span></a></div>
//   <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-timeline.js" async>
//   {
//   "feedMode": "market",
//   "market": "forex",
//   "isTransparent": false,
//   "displayMode": "regular",
//   "width": 400,
//   "height": 550,
//   "colorTheme": "dark",
//   "locale": "en"
// }
//   </script>
// </div>
// <!-- TradingView Widget END -->