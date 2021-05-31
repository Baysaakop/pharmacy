import React from 'react';
import { Form, Input, Popconfirm, Button, message, Row, Col, DatePicker, Typography, Divider } from 'antd';
import { UserOutlined, MobileOutlined, MailOutlined, CheckOutlined } from '@ant-design/icons';
import axios from 'axios';
import api from '../api';
import moment from 'moment';

function AccountDetail (props) {
    const [form] = Form.useForm();    

    function onFinish (values) {                          
        var formData = new FormData();
        if (values.username) {
            formData.append('username', values.username)
        } 
        if (values.first_name) {
            formData.append('last_name', values.last_name);        
        }               
        if (values.last_name) {
            formData.append('first_name', values.first_name);        
        }        
        if (values.phone_number) { 
            formData.append('phone_number', values.phone_number);        
        }        
        if (values.birth_date) {
            let date = new Date(moment(values.birth_date));
            formData.append('birth_date', date.getFullYear().toString() + "-" + (date.getMonth() + 1).toString() + "-" + date.getDate().toString());        
        }                
        axios({
            method: 'PUT',
            url: `${api.users}/${props.user.id}/`,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': props.token                          
            },
            data: formData
        })            
        .then(res => {
            if (res.status === 200 || res.status === 201) {
                message.info("Saved successfully.")   
            }                                                         
        })
        .catch(err => {                      
            console.log(err.message)      
            message.error("Error has occured. Please try again later.")
        })          
    }

    return (
        <div>            
            <Form layout="vertical" form={form} onFinish={onFinish} style={{ padding: '16px', border: '1px solid #f0f2f5' }}>
                <Typography.Title level={4}>Хувийн мэдээлэл шинэчлэх</Typography.Title>
                <Divider />
                <Row gutter={[16, 0]}>
                    <Col xs={24} sm={24} md={8}>
                        <Form.Item name="email" label="И-мэйл:">
                            <Input disabled prefix={<MailOutlined style={{ color: '#a1a1a1' }} />} defaultValue={props.user.email} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8}>
                        <Form.Item name="username" label="Хэрэглэгчийн нэр:">
                            <Input prefix={<UserOutlined style={{ color: '#a1a1a1' }} />} defaultValue={props.user.username ? props.user.username : undefined} />
                        </Form.Item>   
                    </Col>
                    <Col xs={24} sm={24} md={8}>
                        <Form.Item name="phone_number" label="Утасны дугаар:">
                            <Input prefix={<MobileOutlined style={{ color: '#a1a1a1' }} />} defaultValue={props.user.profile.phone_number ? props.user.profile.phone_number : undefined} />
                        </Form.Item> 
                    </Col>
                </Row>           
                <Row gutter={[16, 0]}>
                    <Col xs={24} sm={24} md={8}>
                        <Form.Item name="last_name" label="Овог:">
                            <Input prefix={<UserOutlined style={{ color: '#a1a1a1' }} />} defaultValue={props.user.last_name ? props.user.last_name : undefined} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8}>
                        <Form.Item name="first_name" label="Нэр:">
                            <Input prefix={<UserOutlined style={{ color: '#a1a1a1' }} />} defaultValue={props.user.first_name ? props.user.first_name : undefined} />
                        </Form.Item>  
                    </Col>
                    <Col xs={24} sm={24} md={8}>
                        <Form.Item name="birth_date" label="Төрсөн өдөр:">
                            <DatePicker style={{ width: '100%' }} defaultValue={props.user.profile.birth_date ? moment(props.user.profile.birth_date, "YYYY-MM-DD") : undefined} />
                        </Form.Item> 
                    </Col>
                </Row>                                                                                                       
                {/* <Form.Item name="role" label="Role:">
                    <Input prefix={<LockOutlined style={{ color: '#a1a1a1' }} />} disabled defaultValue={props.user.profile.role === "1" ? "Admin" : props.user.profile.role === "2" ? "Moderator" : "User"} />
                </Form.Item> */}
                <Form.Item>                                                                  
                    <Popconfirm title="Are you sure to update your account？" okText="Yes" cancelText="No" onConfirm={form.submit}>
                        <Button type="primary" icon={<CheckOutlined />} >
                            Хадгалах
                        </Button>
                    </Popconfirm>                                                                                                            
                </Form.Item>         
            </Form>
        </div>
    )
};

export default AccountDetail;