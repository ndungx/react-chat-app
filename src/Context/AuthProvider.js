import React, { useState } from 'react'
import { auth } from '../firebase/config';
import { useHistory } from 'react-router-dom';
import { Spin } from 'antd';

export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
    const [user, setUser] = useState({});
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);

    React.useEffect(() => {
        const unsubscibed = auth.onAuthStateChanged((user) => {
            console.log({ user });
            if (user) {
                const { uid, displayName, photoURL, email } = user;
                setUser({
                    uid, displayName, photoURL, email
                });
                setIsLoading(false);
                history.push('/');
            } else {
                history.push('/login');
            }
        });

        //clean function
        return () => {
            unsubscibed();
        }
    }, [history]);

    return (
        <AuthContext.Provider value={{ user }}>
            {isLoading ? <Spin /> : children}
        </AuthContext.Provider>
    )
}
