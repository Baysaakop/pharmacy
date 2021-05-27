import { WarningOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, notification, Popconfirm, Row, Select, Typography, message } from "antd";
import ImageUpload from '../components/ImageUpload'
import axios from "axios";
import api from "../api";
import { useState, useEffect } from "react";

function ProductAdd (props) {

    const [form] = Form.useForm()
    const [image, setImage] = useState()
    const [categories, setCategories] = useState([])
    const [companies, setCompanies] = useState([])
    const [tags, setTags] = useState([])

    useEffect(() => {
        getCategories()
        getCompanies()
        getTags()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    function getCategories () {
        axios({
            method: 'GET',
            url: `${api.categories}/`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${props.token}`            
            }        
        }).then(res => {
            setCategories(res.data.results)
        }).catch(err => {
            message.error("Хуудсыг дахин ачааллана уу")
        })
    }
    function getCompanies () {
        axios({
            method: 'GET',
            url: `${api.companies}/`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${props.token}`            
            }        
        }).then(res => {
            setCompanies(res.data.results)
        }).catch(err => {
            message.error("Хуудсыг дахин ачааллана уу")
        })
    }   

    function getTags () {
        axios({
            method: 'GET',
            url: `${api.tags}/`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${props.token}`            
            }        
        }).then(res => {
            setTags(res.data.results)
        }).catch(err => {
            message.error("Хуудсыг дахин ачааллана уу")
        })
    }

    function onFinish (values) {
        console.log(values)
        var formData = new FormData();
        formData.append('name', values.name);
        if (values.description) {
            formData.append('description', values.description);
        }
        if (values.ingredients) {
            formData.append('ingredients', values.ingredients);
        }
        if (values.usage) {
            formData.append('usage', values.usage);
        }
        if (values.caution) {
            formData.append('caution', values.caution);
        }
        if (values.price) {
            formData.append('price', values.price);
        }
        if (values.company) {
            formData.append('company', values.company);
        }
        if (values.category) {
            formData.append('category', values.category);
        }
        if (values.tag) {
            formData.append('tag', values.tag);
        }
        if (image) {
            formData.append('image', image)
        }        
        formData.append('token', props.token)
        axios({
            method: 'POST',
            url: `${api.items}/`,
            data: formData,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${props.token}`            
            }
        }).then(res => {   
            if (res.status === 201) {            
                notification['success']({
                    message: 'Амжилттай',
                    description: `${values.name} бүтээгдэхүүн амжилттай нэмэгдлээ.`
                })              
                form.resetFields()
                setImage(undefined)                
            }
        }).catch(err => {
            notification['error']({
                message: 'Амжилтгүй',
                description: `${values.name} бүтээгдэхүүн нэмэгдсэнгүй. Дахин оролдоно уу.`
            })
        })
    }

    const onImageSelected = (path) => {
        setImage(path);
    } 

    return (
        <div>
            <Typography.Title level={4}>Бүтээгдэхүүн нэмэх</Typography.Title>
            <Typography.Text type="warning"><WarningOutlined /> Бүтээгдэхүүн нэмэхийн өмнө тухайн бүтээгдэхүүн өмнө бүртгэгдсэн эсэхийг шалгана уу!</Typography.Text>
            <Form 
                form={form} 
                layout="vertical" 
                onFinish={onFinish}
                style={{ marginTop: '16px', border: '1px solid #dedede', padding: '16px' }}
            >
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item name="name" label="Нэр"  rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="code" label="Код"  rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="description" label="Тайлбар">
                            <Input.TextArea rows={4} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="ingredients" label="Найрлага">
                            <Input.TextArea rows={4} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="usage" label="Хэрэглэх заавар">
                            <Input.TextArea rows={4} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="caution" label="Анхааруулга">
                            <Input.TextArea rows={4} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item name="price" label="Үнэ">
                            <Input suffix="₮" />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item name="company" label="Компани">
                            <Select                                
                                placeholder="Компани сонгох"
                                optionFilterProp="children"
                            >
                                { companies ? companies.map(com => (
                                    <Select.Option key={com.id}>{com.name}</Select.Option>
                                )) : <></> }
                            </Select>          
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item name="category" label="Төрөл">
                            <Select          
                                mode="multiple"                      
                                placeholder="Төрөл сонгох"
                                optionFilterProp="children"                                
                            >
                                { categories ? categories.map(cat => (
                                    <Select.Option key={cat.id}>{cat.name}</Select.Option>
                                )) : <></>}
                            </Select>           
                        </Form.Item>
                    </Col>                    
                    <Col span={6}>
                        <Form.Item name="tag" label="Таг">
                            <Select                      
                                mode="multiple"          
                                placeholder="Таг сонгох"
                                optionFilterProp="children"                
                            >
                                { tags ? tags.map(tag => (
                                    <Select.Option key={tag.id}>{tag.name}</Select.Option>
                                )) : <></>}
                            </Select>     
                        </Form.Item>        
                    </Col>
                </Row>               
                <Form.Item name="image" label="Зураг">
                    <ImageUpload image={image} onImageSelected={onImageSelected} height="200px" width="200px" />     
                </Form.Item>
                <Popconfirm title="Хадгалах уу?" onConfirm={form.submit} okText="Тийм" cancelText="Үгүй">
                    <Button type="primary" style={{ marginRight: '8px' }}>Хадгалах</Button>
                </Popconfirm>                
            </Form>
        </div>
    )
}

export default ProductAdd