import React, { createContext, useState, useEffect } from 'react';
import { validateToken } from '../service/auth.service';
import { errorCodes } from '../component/utils/constant';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            validateToken({ token })
                .then((response) => {
                    if (response.status === errorCodes.Unauthorized) {
                        localStorage.removeItem('token');
                        setIsAuthenticated(false);
                    } else {
                        setIsAuthenticated(true);
                    }
                })
                .catch(() => setIsAuthenticated(false));
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    // Setter function to set isAuthenticated
    const setAuth = (value) => {
        setIsAuthenticated(value);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };
