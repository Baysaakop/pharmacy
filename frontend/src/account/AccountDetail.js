import React, { useState } from 'react';
import { Form, Input, Popconfirm, Button, message, Row, Col, DatePicker, Typography, Divider, Modal } from 'antd';
import { UserOutlined, MobileOutlined, MailOutlined, CheckOutlined, EnvironmentOutlined } from '@ant-design/icons';
import axios from 'axios';
import api from '../api';
import moment from 'moment';
import AddressForm from '../components/AddressForm';

function AccountDetail (props) {
    const [form] = Form.useForm()
    const [visible, setVisible] = useState(false)
    const [address, setAddress] = useState()

    function onFinish (values) {                          
        var formData = new FormData();
        if (values.username) {
            formData.append('username', values.username)
        } 
        if (values.last_name) {
            formData.append('last_name', values.last_name);        
        }               
        if (values.first_name) {
            formData.append('first_name', values.first_name);        
        }        
        if (values.phone_number) { 
            formData.append('phone_number', values.phone_number);        
        }        
        if (values.birth_date) {
            let date = new Date(moment(values.birth_date));
            formData.append('birth_date', date.getFullYear().toString() + "-" + (date.getMonth() + 1).toString() + "-" + date.getDate().toString());        
        }        
        if (address) {
            formData.append('address', true)
            formData.append('city', address.city)
            formData.append('district', address.district)
            formData.append('section', address.section)
            formData.append('address', address.address)
        }        
        axios({
            method: 'PUT',
            url: `${api.profiles}/${props.user.profile.id}/`,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': props.token                          
            },
            data: formData
        })            
        .then(res => {
            if (res.status === 200 || res.status === 201) {
                message.info("Хадгаллаа.")   
            }                                                         
        })
        .catch(err => {                      
            console.log(err.message)         
            message.error("Алдаа гарлаа. Дахин оролдоно уу.")            
        })          
    }

    function getAddress (address_obj) {
        if (!address_obj || address_obj == null) {
            return ""
        }
        let result = address_obj.city.name + ", " + address_obj.district.name + " дүүрэг"
        if (address_obj.section) {
            result = result + ", " + address_obj.section + "-р хороо"
        }
        if (address_obj.address) {
            result = result + ", " + address_obj.address
        }        
        return result
    }

    function changeAddress (values, address_text) {        
        setAddress(values)
        form.setFieldsValue({
            address: address_text
        })
        setVisible(false)
    }

    return (
        <div>            
            <Form layout="vertical" form={form} onFinish={onFinish} style={{ padding: '16px', border: '1px solid #000' }}>
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
                    <Col span={24}>
                        <Form.Item name="address" label="Хаяг:">                            
                            <Input                                 
                                disabled
                                prefix={<EnvironmentOutlined style={{ color: '#a1a1a1' }} />} 
                                suffix={<Button type="primary" onClick={() => setVisible(true)}>Засах</Button>}
                                defaultValue={getAddress(props.user.profile.address)}                                                                                
                            />                            
                        </Form.Item>  
                    </Col>
                </Row>              
                <Modal
                    title="Хаяг оруулах"
                    visible={visible}
                    footer={false}                                        
                    onCancel={() => setVisible(false)}
                >
                    <AddressForm address={props.user.profile.address ? props.user.profile.address : undefined} changeAddress={changeAddress} />
                </Modal>                                              
                <Form.Item>                                                                  
                    <Popconfirm title="Хадгалах уу？" okText="Тийм" cancelText="Үгүй" onConfirm={form.submit}>
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