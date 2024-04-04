import React, { useEffect, useRef, memo } from 'react';

function Calendar(){
    const container = useRef();

    useEffect(
        () => {
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-events.js";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = `
            {
                "colorTheme": "dark",
                "isTransparent": false,
                "width": "500",
                "height": "400",
                "locale": "en",
                "importanceFilter": "-1,0,1",
                "countryFilter": "ar,au,br,ca,cn,fr,de,in,id,it,jp,kr,mx,ru,sa,za,tr,gb,us,eu"
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

export default memo(Calendar);

// <!-- TradingView Widget BEGIN -->
// <div class="tradingview-widget-container">
//   <div class="tradingview-widget-container__widget"></div>
//   <div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span class="blue-text">Track all markets on TradingView</span></a></div>
//   <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-events.js" async>
//   {
//   "colorTheme": "dark",
//   "isTransparent": false,
//   "width": "600",
//   "height": "400",
//   "locale": "en",
//   "importanceFilter": "-1,0,1",
//   "countryFilter": "ar,au,br,ca,cn,fr,de,in,id,it,jp,kr,mx,ru,sa,za,tr,gb,us,eu"
// }
//   </script>
// </div>
// <!-- TradingView Widget END -->
