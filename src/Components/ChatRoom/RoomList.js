import React from 'react'
import { Collapse, Typography, Button } from 'antd'
import styled from 'styled-components';
import { PlusSquareOutlined } from '@ant-design/icons'
import { AppContext } from '../../Context/AppProvider';

const { Panel } = Collapse;

const PanelStyled = styled(Panel)`
    %%% {
        .ant-collapse-content-box {
            padding: 0 40px;
        }

        .add-room {
            color: #fff;
            padding: 0;
        }
    }
`;

const LinkStyled = styled(Typography.Link)`
    display: block;
    margin-bottom: 5px;
    color: #313131;
`

const RoomListHeader = styled.div`
    display: flex;
    justify-content: space-between;
`

export default function RoomList() {
    const { rooms, setIsAddRoomVisible, setSelectedRoomId } = React.useContext(AppContext);

    const handleAddRoom = () => {
        setIsAddRoomVisible(true);
    }

    return (
        <Collapse ghost defaultActiveKey={['1']}>
            <PanelStyled header="Room List" key="1">
                <RoomListHeader>
                    <Typography.Text>Chats</Typography.Text>
                    <Button
                        type="text"
                        icon={<PlusSquareOutlined />}
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

            </PanelStyled>
        </Collapse>
    )
}
