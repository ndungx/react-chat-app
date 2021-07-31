import React from 'react';
import { Row, Col, Button, Typography } from 'antd';
import firebase, { auth } from '../../firebase/config'
import { addDocument, generateKeywords } from '../../firebase/services';

const { Title } = Typography

const fbProvider = new firebase.auth.FacebookAuthProvider();

export default function Login() {
    const handleFacebookLogin = async () => {
        const { additionalUserInfo, user } = await auth.signInWithPopup(fbProvider);

        if (additionalUserInfo) {
            addDocument('users', {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                providerId: additionalUserInfo.providerId,
                keywords: generateKeywords(user.displayName)
            });
        }
    };

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
