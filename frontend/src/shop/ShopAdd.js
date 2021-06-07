import { useEffect, useState } from "react";
import { PlusOutlined, WarningOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, notification, Row, Select, Tooltip, Typography } from "antd";
import axios from "axios";
import api from "../api";
import ImageUpload from '../components/ImageUpload'

function ShopAdd (props) {

    const [form] = Form.useForm()
    const [cities, setCities] = useState()
    const [districts, setDistricts] = useState()    
    const [city, setCity] = useState("1")
    const [district, setDistrict] = useState()    
    const [image, setImage] = useState()

    useEffect(() => {
        if (!cities) {
            getCities()    
        } 
        getDisctricts()
    }, [city])

    function getCities () {
        axios({
            method: 'GET',
            url: `${api.cities}/`,            
        }).then(res => {
            setCities(res.data.results)            
        }).catch(err => {
            console.log(err.message)
        })
    }

    function getDisctricts () {
        let url = city ? `${api.districts}?city=${parseInt(city)}` : `${api.districts}/`
        axios({
            method: 'GET',
            url: url,    
        }).then(res => {
            setDistricts(res.data.results)
        }).catch(err => {
            console.log(err.message)
        })
    }

    function onSelectCity(id) {        
        setCity(id)        
    }

    function onSelectDistrict(id) {        
        setDistrict(id)        
    }

    const onImageSelected = (path) => {
        setImage(path);
    } 

    function onFinish (values) {
        axios({
            method: 'POST',
            url: `${api.shops}/`,
            data: {
                name: values.name,
                description: values.description ? values.description: '',
                token: props.token
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${props.token}`            
            }
        }).then(res => {
            if (res.status === 201) {
                notification['success']({
                    message: 'Амжилттай',
                    description: `${values.name} төрөл амжилттай нэмэгдлээ.`
                })
                form.resetFields()
            }
        }).catch(err => {
            notification['error']({
                message: 'Амжилтгүй',
                description: `${values.name} төрөл нэмэгдсэнгүй. Дахин оролдоно уу.`
            })
        })
    }

    return (
        <div>
            <Typography.Title level={4}>Салбар нэмэх</Typography.Title>
            <Typography.Text type="warning"><WarningOutlined /> Салбар нэмэхийн өмнө тухайн төрөл өмнө бүртгэгдсэн эсэхийг шалгана уу!</Typography.Text>
            <Form 
                form={form} 
                layout="vertical" 
                onFinish={onFinish}
                style={{ marginTop: '16px', border: '1px solid #dedede', padding: '16px', width: '800px' }}            
                initialValues={{ 'city': city }}    
            >
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item name="name" label="Нэр"  rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="phone_number" label="Утасны дугаар" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="image" label="Зураг">
                            <ImageUpload image={image} onImageSelected={onImageSelected} height="228px" width="376px" />     
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="city" label="Хаяг (Хот)"  rules={[{ required: true }]}>
                            <Select                                
                                placeholder="Хот сонгох"
                                optionFilterProp="children"
                                onSelect={onSelectCity}
                            >
                                { cities ? cities.map(city => (
                                    <Select.Option key={city.id}>{city.name}</Select.Option>
                                )) : <></> }
                            </Select>          
                        </Form.Item>
                        <Form.Item name="district" label="Хаяг (Дүүрэг)"  rules={[{ required: true }]}>
                            <Select                                
                                placeholder="Дүүрэг сонгох"
                                optionFilterProp="children"         
                                onSelect={onSelectDistrict}                       
                            >
                                { districts ? districts.map(district => (
                                    <Select.Option key={district.id}>{district.name}</Select.Option>
                                )) : <></> }
                            </Select>          
                        </Form.Item>                        
                        <Form.Item name="section" label="Хаяг (Хороо)">
                            <Input />
                        </Form.Item>                            
                        <Form.Item name="address" label="Хаяг" rules={[{ required: true }]}>
                            <Input.TextArea rows={6} />
                        </Form.Item>
                    </Col>
                </Row>
                
                <Button type="primary" onClick={form.submit}>Хадгалах</Button>
            </Form>
        </div>
    )
}

export default ShopAdd