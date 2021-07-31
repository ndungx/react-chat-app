import { Form, Input, Modal } from 'antd'
import React, { useContext, useState } from 'react'
import { AppContext } from '../../Context/AppProvider';
import { AuthContext } from '../../Context/AuthProvider';
import { addDocument } from '../../firebase/services';

export default function AddRoomModal() {
    const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext);
    const { user: { uid } } = useContext(AuthContext);
    const [form] = Form.useForm();

    const handleOk = () => {
        //add new room to firestore
        console.log({ FormData: form.getFieldsValue() });
        addDocument('rooms', { ...form.getFieldValue(), members: [uid] });

        //reset form value
        form.resetFields();

        setIsAddRoomVisible(false);
    }

    const handleCancel = () => {
        //reset form value
        form.resetFields();
        
        setIsAddRoomVisible(false);
    }

    return (
        <div>
            <Modal
                title="Add room"
                visible={isAddRoomVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <Form.Item label="Room name" name='name'>
                        <Input placeholder="Enter room name" />
                    </Form.Item>
                    <Form.Item label="Room description" name='description' >
                        <Input.TextArea placeholder="Enter room description" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
