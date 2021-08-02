import React from 'react'
import { Button, Avatar, Typography } from 'antd'
import styled from 'styled-components'
import { auth } from '../../firebase/config';
import { AuthContext } from '../../Context/AuthProvider';

const WrapperStyled = styled.div`

    .background {
        padding: 12px 30px;
        display: flex;
        justify-content: space-between;
        border-radius: 0 0 6px 6px;
        box-shadow: 0px 26px 33px -5px rgba(200,200,200,.7);
        width: 96%;
        margin: 0 15px;
    }

    .user {
        display: flex;
        align-items: center;
    }

    .username {
        color: #656565;
        margin-left: 5px;
        font-weight: bold;
    }

    .logout-btn {
        color: #fff;
        background: linear-gradient(to right, #6D47EE, #B851FB);
        border-radius: 8px;
    }
`;

export default function UserInfo() {
    const { user: { displayName, photoURL } } = React.useContext(AuthContext);

    return (
        <WrapperStyled>
            <div className="background">
                <div className="user">
                    <Avatar src={photoURL}>
                        {photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}
                    </Avatar>
                    <Typography.Text className="username">
                        {displayName}
                    </Typography.Text>
                </div>
                <div>
                    <Button
                        className="logout-btn"
                        onClick={() => auth.signOut()}>
                        Sign out
                    </Button>
                </div>
            </div>
        </WrapperStyled>
    )
}
