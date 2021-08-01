import React from 'react'
import { Typography, Button } from 'antd'
import styled from 'styled-components';
import { PlusOutlined } from '@ant-design/icons'
import { AppContext } from '../../Context/AppProvider';

const RoomListStyled = styled.div`
    padding: 10px 30px;

    .add-room {
        color: #fff;
        border-radius: 50%;
        background: linear-gradient(to right, #6D47EE, #B851FB);
    }
`;

const LinkStyled = styled(Typography.Link)`
    display: block;
    margin-bottom: 5px;
    color: #000 !important;
    font-weight: bold;
    font-size: 18px;
    padding: 10px;
    border-radius: 6px;
    margin-top: 10px;
    box-shadow: 0px 0px 33px -5px rgba(0,0,0,.3);

    &:hover {
        background: #f6f6f6;
    }
`

const RoomListHeader = styled.div`
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    font-size: 30px;
    align-items: center;
`

export default function RoomList() {
    const { rooms, setIsAddRoomVisible, setSelectedRoomId } = React.useContext(AppContext);

    const handleAddRoom = () => {
        setIsAddRoomVisible(true);
    }

    return (
        <RoomListStyled>
            <RoomListHeader>
                <Typography.Text>Chats</Typography.Text>
                <Button
                    type="text"
                    icon={<PlusOutlined />}
                    className="add-room"
                    onClick={handleAddRoom}
                >
                </Button>
            </RoomListHeader>

            {
                rooms.map(room => (
                    <LinkStyled key={room.id} onClick={() => setSelectedRoomId(room.id)}>
                        {room.name}
                    </LinkStyled>)
                )
            }

        </RoomListStyled>
    )
}
