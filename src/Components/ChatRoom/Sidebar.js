import React from 'react'
import { Row, Col } from 'antd'
import UserInfo from './UserInfo'
import RoomList from './RoomList'
import styled from 'styled-components'


const SideBarStyled = styled.div`
    background: #fff;
    color: #000;
    height: 100vh;
`;
export default function Sidebar() {
    return (
        <SideBarStyled>
            <Row>
                <Col span={24}>
                    <UserInfo />
                </Col>
                <Col span={24}>
                    <RoomList />
                </Col>
            </Row>
        </SideBarStyled>
    )
}
