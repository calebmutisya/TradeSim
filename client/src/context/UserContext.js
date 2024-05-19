import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export const UserContext= createContext()

export default function UserProvider({children})
 {
    const [authToken, setAuthToken] = useState(()=> sessionStorage.getItem("authToken")? sessionStorage.getItem("authToken"): null )
    const [currentUser, setCurrentUser] = useState(null)
    const [allUsers, setAllUsers] = useState([])

    const navigate = useNavigate()

    // Function to add a new user
    function addUser(username, email, password) {
        fetch('/addusers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add user');
            }
            return response.json();
        })
        .then(data => {
            // Handle success
            // For example, show a success message
            Swal.fire({
                icon: 'success',
                title: 'User Added Successfully',
                text: 'User has been successfully added!',
            });
            // Optionally, you can perform additional actions, such as redirecting
            // For example, redirect to a different page
            navigate('/');
        })
        .catch(error => {
            // Handle error
            console.error('Error adding user:', error);
            // For example, show an error message
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to add user. Please try again later.',
            });
        });
    }

    // Function to log in a user
    function login(username, password) {
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to log in');
            }
            return response.json();
        })
        .then(data => {
            // Handle success
            // For example, store authentication token
            setAuthToken(data.access_token);
            sessionStorage.setItem("authToken", data.access_token);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Login successful.',
                showConfirmButton: false,
                timer: 1500,
            })
            // Optionally, you can perform additional actions, such as redirecting
            // For example, redirect to a different page
            navigate('/');
        })
        .catch(error => {
            // Handle error
            console.error('Error logging in:', error);
            // For example, show an error message
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to log in. Please check your credentials and try again.',
            });
        });
    }

    // Function to log out a user
    function logout() {
        fetch('/logout', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to log out');
            }
            return response.json();
        })
        .then(data => {
            // Handle success
            // For example, clear authentication token
            setAuthToken(null);
            sessionStorage.removeItem("authToken");
            // Optionally, you can perform additional actions, such as redirecting
            // For example, redirect to the login page
            navigate('/');
        })
        .catch(error => {
            // Handle error
            console.error('Error logging out:', error);
            // For example, show an error message
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to log out. Please try again later.',
            });
        });
    }

    // Get authenticated user information
    useEffect(() => {
        if (authToken) {
            fetch('/authenticated_user', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${authToken}`
                },
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                return response.json();
            })
            .then(data => {
                // Handle success
                // For example, set current user state
                setCurrentUser(data);
            })
            .catch(error => {
                // Handle error
                console.error('Error fetching user data:', error);
                // Optionally, you can clear current user state
                setCurrentUser(null);
            });
        } else {
            setCurrentUser(null);
        }
    }, [authToken]);

    // Function to fetch a single user's data
    function fetchUser() {
        fetch('/singleuser', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            return response.json();
        })
        .then(data => {
            setCurrentUser(data);
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            setCurrentUser(null);
        });
    }

    function fetchAllUsers(){
        fetch('/users', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            return response.json()
        })
        .then(data => {
            setAllUsers(data)
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            setAllUsers([]);
        });
    }

    // Function to update user's capital
    function updateUserCapital(newCapital) {
        fetch('/users/capital', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({
                capital: newCapital
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update user capital');
            }
            return response.json();
        })
        .then(data => {
            // Handle success
            // For example, show a success message
            // Swal.fire({
            //     icon: 'success',
            //     title: 'User Capital Updated Successfully',
            //     text: 'User capital has been successfully updated!',
            // });
            // Optionally, you can perform additional actions
            // For example, update current user state
            setCurrentUser(prevUser => ({
                ...prevUser,
                capital: newCapital
            }));
        })
        .catch(error => {
            // Handle error
            console.error('Error updating user capital:', error);
            // For example, show an error message
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to update user capital. Please try again later.',
            });
        });
    }

    // Function to update user details
    function updateUser(data) {
        fetch('/users', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update user');
                }
                return response.json();
            })
            .then(data => {
                Swal.fire({
                    icon: 'success',
                    title: 'User Updated Successfully',
                    text: 'User details have been successfully updated!',
                });
                setCurrentUser(prevUser => ({
                    ...prevUser,
                    ...data
                }));
            })
            .catch(error => {
                console.error('Error updating user:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to update user. Please try again later.',
                });
            });
    }


    // Fetch user data when component mounts or when authToken changes
    useEffect(() => {
        if (authToken) {
            fetchUser();
            fetchAllUsers();
        } else {
            setCurrentUser(null);
            setAllUsers([]);
        }
    }, [authToken]);

    const contextData={addUser, login, logout, authToken, currentUser, updateUserCapital, allUsers, updateUser}

  return (
    <UserContext.Provider value={contextData}>
        {children}
    </UserContext.Provider>
  )
}

