import React from 'react'
import { Row, Col } from 'antd'
import UserInfo from './UserInfo'
import RoomList from './RoomList'
import styled from 'styled-components'


const SideBarStyled = styled.div`
    background: #b2b2b2;
    color: #fff;
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
