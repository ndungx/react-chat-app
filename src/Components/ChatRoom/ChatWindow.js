import { UserAddOutlined } from '@ant-design/icons'
import React, { useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Button, Avatar, Tooltip, Input, Form, Alert } from 'antd'
import Message from './Message'
import { AppContext } from '../../Context/AppProvider'
import { addDocument } from '../../firebase/services'
import { AuthContext } from '../../Context/AuthProvider'
import useFirestore from '../../hooks/useFirestore'

const HeaderStyled = styled.div`
    display: flex;
    justify-content: space-between;
    height: 56px;
    padding: 0 32px;
    align-items: center;
    border-bottom: 1px solid rgb(230, 230, 230);

    .header {
        &__info {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        &__title {
            margin: 0;
            font-weight: bold;
        }

        &__description {
            font-size: 12px;
        }
    }
`

const ButtonGroupStyled = styled.div`
    display: flex;
    align-items: center;
`

const WrapperStyled = styled.div`
    height: 100vh;
    box-shadow: 0px 0px 33px -5px rgba(0,0,0,.3);
    border-radius: 8px;
    margin-left: 15px;
`

const ContentStyled = styled.div`
    height: calc(100% - 56px);
    display: flex;
    flex-direction: column;
    padding: 11px;
    justify-content: flex-end;
`

const FormStyled = styled(Form)`
    display: flex;
    justtify-content: space-between;
    align-items: center;
    padding: 2px 2px 2px 0;
    border: 1px solid rgb(230, 230, 230);
    border-radius: 2px;

    .ant-form-item {
        flex: 1;
        margin-bottom: 0;
    }
`

const MessageListStyled = styled.div`
    max-height: 100%;
    overflow-y: auto;
    padding: 0 16px;
`

const ButtonStyled = styled(Button)`
    background: linear-gradient(to right, #6D47EE, #B851FB);
    border-radius: 6px;
    color: #fff;

    &:hover {
        background: linear-gradient(to right, #6D47EE, #B851FB);
        color: #fff;
    }
`

export default function ChatWindow() {
    const {
        selectedRoom, members, setIsInviteMemberVisible
    } = useContext(AppContext);
    const [inputValue, setInputValue] = useState('');
    const [form] = Form.useForm();
    const {
        user: { uid, photoURL, displayName }
    } = useContext(AuthContext);
    const inputRef = useRef(null);
    const messageListRef = useRef(null);


    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleOnSubmit = () => {
        if (inputValue.length > 0) {
            addDocument('messages', {
                text: inputValue,
                uid,
                photoURL,
                roomId: selectedRoom.id,
                displayName
            });

            setInputValue('');

            form.resetFields(['message']);

            //focus input after send message
            if (inputRef?.current) {
                setTimeout(() => {
                    inputRef.current.focus();
                });
            }
        }
    }

    const condition = React.useMemo(() => ({
        fieldName: 'roomId',
        operator: '==',
        compareValue: selectedRoom.id
    }), [selectedRoom.id]);

    const messages = useFirestore('messages', condition);

    useEffect(() => {
        //scroll to bottom after message added to chat room
        if (messageListRef?.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight + 50;
        }
    }, [messages]);

    return (
        <WrapperStyled>
            {
                selectedRoom.id ? (
                    <>
                        <HeaderStyled>
                            <div className="header__info">
                                <p className="header__title">{selectedRoom.name}</p>
                                <span className="header__description">
                                    {selectedRoom.description}
                                </span>
                            </div>
                            <ButtonGroupStyled>
                                <Button
                                    type="text"
                                    icon={<UserAddOutlined />}
                                    onClick={() => setIsInviteMemberVisible(true)}
                                >
                                    Add user
                                </Button>
                                <Avatar.Group size="small" maxCount={2}>
                                    {
                                        members.map(member => (
                                            <Tooltip title={member.displayName} key={member.id}>
                                                <Avatar src={member.photoURL}>
                                                    {members.photoURL ? '' : member.displayName?.charAt(0).toUpperCase()}
                                                </Avatar>
                                            </Tooltip>
                                        ))
                                    }
                                </Avatar.Group>
                            </ButtonGroupStyled>
                        </HeaderStyled>
                        <ContentStyled>
                            <MessageListStyled ref={messageListRef}>
                                {
                                    messages.map(message => (
                                        <Message
                                            key={message.id}
                                            text={message.text}
                                            photoURL={message.photoURL}
                                            displayName={message.displayName}
                                            createdAt={message.createdAt}
                                        />
                                    ))
                                }
                            </MessageListStyled>
                            <FormStyled form={form}>
                                <Form.Item name="message">
                                    <Input
                                        ref={inputRef}
                                        onChange={handleInputChange}
                                        onPressEnter={handleOnSubmit}
                                        placeholder="Type a message..."
                                        bordered={false}
                                        autoComplete="off"
                                        value={inputValue}
                                    />
                                </Form.Item>
                                <ButtonStyled onClick={handleOnSubmit}>
                                    Send
                                </ButtonStyled>
                            </FormStyled>
                        </ContentStyled>
                    </>
                ) : (
                    <Alert
                        message="No room selected"
                        type="info"
                        showIcon
                        style={{ margin: 5, marginLeft: 16, marginRight: 16 }}
                        closable
                    />
                )
            }
        </WrapperStyled>
    );
}
