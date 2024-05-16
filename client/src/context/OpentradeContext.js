import { createContext, useState, useEffect, useContext, useCallback } from 'react'
import Swal from 'sweetalert2'
import { UserContext } from './UserContext'


export const OpentradeContext= createContext()

export default function OpentradeProvider({children}) {

    const [opentrades, setOpentrades] = useState([]);
    const [closedtrades, setClosedTrades] = useState([]);
    const { authToken, currentUser, updateUserCapital } = useContext(UserContext);

    const fetchUserOpentrades = useCallback(() => {
        fetch('/opentrades/user', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch user open trades');
            }
            return response.json();
        })
        .then(data => {
            setOpentrades(data);
        })
        .catch(error => {
            console.error('Error fetching user open trades:', error);
        });
    },[authToken]);

    const fetchClosedTrades = useCallback(() => {
        // Fetch closed trades from the backend
        fetch('/closedtrades', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch closed trades');
            }
            return response.json();
        })
        .then(data => {
            setClosedTrades(data); // Update state with fetched closed trades
        })
        .catch(error => {
            console.error('Error fetching closed trades:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to fetch closed trades. Please try again later.',
            });
        });
    }, [authToken]);

    useEffect(() => {
        if (authToken) {
          fetchUserOpentrades();
          fetchClosedTrades();
        }
    }, [authToken, fetchUserOpentrades, fetchClosedTrades]);


    const addOpentrade = (opentradeData) => {
        fetch('/opentrades', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(opentradeData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add opentrade');
                }
                return response.json();
            })
            .then(data => {
                Swal.fire({
                    icon: 'success',
                    title: 'Trade Added Successfully',
                });
                fetchUserOpentrades(); 
            })
            .catch(error => {
                console.error('Error adding opentrade:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to add trade. Please try again later.',
                });
            });
    };

    const editOpentrade = (opentradeId, newData) => {
        fetch(`/opentrades/${opentradeId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(newData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to edit opentrade');
            }
            return response.json();
        })
        .then(data => {
            Swal.fire({
                icon: 'success',
                title: 'Trade Edited Successfully',
            });
            fetchUserOpentrades(); 
        })
        .catch(error => {
            console.error('Error editing opentrade:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to edit trade. Please try again later.',
            });
        });
    };

    const editOpentradeMp = (opentradeId, newMp) => {
        fetch(`/opentrades/${opentradeId}/mp`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({ mp: newMp }), // Send the new market price in the request body
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to edit opentrade market price');
                }
                return response.json();
            })
            .then(data => {
                // Swal.fire({
                //     icon: 'success',
                //     title: 'Trade Market Price Edited Successfully',
                // });
                fetchUserOpentrades(); // Refresh opentrades after editing the market price
            })
            .catch(error => {
                console.error('Error editing opentrade market price:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to edit trade market price. Please try again later.',
                });
            });
    };

    const editPnltrade = (opentradeId, newData) => {
        fetch(`/opentrades/${opentradeId}/pnl`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(newData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to edit opentrade pnl');
            }
            return response.json();
        })
        .then(data => {
            // Swal.fire({
            //     icon: 'success',
            //     title: 'Trade PNL Edited Successfully',
            // });
            fetchUserOpentrades(); 
        })
        .catch(error => {
            console.error('Error editing opentrade pnl:', error);
            // Swal.fire({
            //     icon: 'error',
            //     title: 'Error',
            //     text: 'Failed to edit trade PNL. Please try again later.',
            // });
        });
    };


    const deleteOpentrade = (tradeId, tradeData) => {
        fetch(`/opentrades/${tradeId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authToken}`
            },
        })
        .then(response => {
            if (!response.ok) {
              throw new Error('Failed to Close Trade');
            }
            // Calculate new capital by adding the trade's pnl to the current capital
            const newCapital = currentUser.capital + tradeData.pnl;
            // Update user's capital
            updateUserCapital(newCapital);
            // Construct closed trade data
            const closedTradeData = {
              // Assuming you have the necessary data for closed trades
              // Modify or add properties as needed
                user_id: currentUser.id,
                currency_pair: tradeData.currency_pair,
                position: tradeData.position,
                tp: tradeData.tp,
                ep: tradeData.ep,
                sl: tradeData.sl,
                mp: tradeData.mp,
                lot: tradeData.lot,
                pnl: tradeData.pnl,
                open_date: new Date(tradeData.open_date).toISOString()
              // Add more properties based on your closed trade data requirements
            };
            // Add the closed trade
            addClosedTrade(closedTradeData);
            fetchUserOpentrades();
            fetchClosedTrades();
            return response.json();
          })
            .then(data => {
                Swal.fire({
                    icon: 'success',
                    title: 'Trade Closed Successfully',
                    text: data.message,
                });
                // fetchUserOpentrades(); 
                // fetchClosedTrades();
            })
            .catch(error => {
                console.error('Error Closing Trade:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to Close Trade. Please try again later.',
                });
            });
    };

    // Function to add a closed trade
    const addClosedTrade = (closedTradeData) => {
        fetch('/closedtrades', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(closedTradeData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add closed trade');
            }
            return response.json();
        })
        .then(data => {
            Swal.fire({
                icon: 'success',
                title: 'Closed Trade Added Successfully',
            });
            // Optionally, you can perform additional actions
            // For example, refresh the list of open trades
            fetchUserOpentrades(); 
        })
        .catch(error => {
            console.error('Error adding closed trade:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to add closed trade. Please try again later.',
            });
        });
    };

    const contextData={
        opentrades,
        closedtrades,
        addOpentrade,
        editOpentradeMp,
        editPnltrade,
        editOpentrade,
        deleteOpentrade,
        fetchUserOpentrades,
        fetchClosedTrades,
        addClosedTrade
    }

  return (
    <OpentradeContext.Provider value={contextData}>
        {children}
    </OpentradeContext.Provider>
  )
}
