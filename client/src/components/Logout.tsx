import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
    const navigate = useNavigate();

    const handleLogOut = () => {
        // Clear the token from local storage
        localStorage.removeItem('token');

        // Redirect to the login page
        navigate('/login');
    };

    return (
        <div className="mt-6 w-full bg-white p-6 rounded-lg">
          <button 
            onClick={handleLogOut}
            className="bg-purple-600 text-white rounded-md p-2 font-bold hover:bg-purple-700 transition-colors duration-3"
          >
            Log Out
          </button>
        </div>
    );
};

export default Logout;
