import React from 'react';
import { Row, Col, Button, Typography } from 'antd';
import firebase, { auth } from '../../firebase/config'

const { Title } = Typography

const fbProvider = new firebase.auth.FacebookAuthProvider();

export default function Login() {
    const handleFacebookLogin = () => {
        auth.signInWithPopup(fbProvider);
    }

    return (
        <div>
            <Row justify='center' style={{ height: 800 }}>
                <Col span={8}>
                    <Title style={{ textAlign: 'center' }} level={3}>
                        Fun Chat
                    </Title>
                    <Button style={{ width: '100%', marginBottom: 5 }}>
                        Login with Google
                    </Button>
                    <Button style={{ width: '100%' }} onClick={handleFacebookLogin}>
                        Login with Facebook
                    </Button>
                </Col>
            </Row>
        </div>
    );
}
