import React, { useState } from 'react'
import { auth } from '../firebase/config';
import { useHistory } from 'react-router-dom';
import { Spin } from 'antd';
import styled from 'styled-components';

export const AuthContext = React.createContext();

const SpinStyled = styled(Spin)`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 50vh;
`

export default function AuthProvider({ children }) {
    const [user, setUser] = useState({});
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);

    React.useEffect(() => {
        const unsubscibed = auth.onAuthStateChanged((user) => {
            if (user) {
                const { uid, displayName, photoURL, email } = user;
                setUser({
                    uid, displayName, photoURL, email
                });
                setIsLoading(false);
                history.push('/');
                return;
            }
            setIsLoading(false);
            history.push('/login');
        });

        //clean function
        return () => {
            unsubscibed();
        }
    }, [history]);

    return (
        <AuthContext.Provider value={{ user }}>
            {isLoading ? <SpinStyled size='large' /> : children}
        </AuthContext.Provider>
    )
}
