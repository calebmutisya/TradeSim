import { createContext, useState, useEffect, useContext, useCallback } from 'react'
import Swal from 'sweetalert2'
import { UserContext } from './UserContext'


export const OpentradeContext= createContext()

export default function OpentradeProvider({children}) {

    const [opentrades, setOpentrades] = useState([]);
    const { authToken } = useContext(UserContext);

    

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

    useEffect(() => {
        if (authToken) {
          fetchUserOpentrades();
        }
    }, [authToken, fetchUserOpentrades]);

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
                Swal.fire({
                    icon: 'success',
                    title: 'Trade Market Price Edited Successfully',
                });
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
            Swal.fire({
                icon: 'success',
                title: 'Trade PNL Edited Successfully',
            });
            fetchUserOpentrades(); 
        })
        .catch(error => {
            console.error('Error editing opentrade pnl:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to edit trade PNL. Please try again later.',
            });
        });
    };


    const deleteOpentrade = (opentradeId) => {
        fetch(`/opentrades/${opentradeId}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete opentrade');
                }
                return response.json();
            })
            .then(data => {
                Swal.fire({
                    icon: 'success',
                    title: 'Trade Deleted Successfully',
                    text: data.message,
                });
                fetchUserOpentrades(); // Refresh opentrades after deleting a trade
            })
            .catch(error => {
                console.error('Error deleting opentrade:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to delete trade. Please try again later.',
                });
            });
    };


    const contextData={
        opentrades,
        addOpentrade,
        editOpentradeMp,
        editPnltrade,
        editOpentrade,
        deleteOpentrade,
        fetchUserOpentrades
    }

  return (
    <OpentradeContext.Provider value={contextData}>
        {children}
    </OpentradeContext.Provider>
  )
}
