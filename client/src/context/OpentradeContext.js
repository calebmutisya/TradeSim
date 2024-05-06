import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export const OpentradeContext= createContext()

export default function OpentradeProvider({children}) {

    const [opentrades, setOpentrades] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchOpentrades();
    }, []);

    const fetchOpentrades = () => {
        fetch('/opentrades', {
            method: 'GET',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch open trades');
                }
                return response.json();
            })
            .then(data => {
                setOpentrades(data);
            })
            .catch(error => {
                console.error('Error fetching open trades:', error);
            });
    };

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
                    text: `Trade ID: ${data.id}`,
                });
                fetchOpentrades(); // Refresh opentrades after adding a new trade
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
                fetchOpentrades(); // Refresh opentrades after deleting a trade
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
        deleteOpentrade,
        fetchOpentrades
    }

  return (
    <OpentradeContext.Provider value={contextData}>
        {children}
    </OpentradeContext.Provider>
  )
}
