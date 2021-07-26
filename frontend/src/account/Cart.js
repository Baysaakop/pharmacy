import { Divider, Typography, List, Button, message, Row, Col, Form, Input, Checkbox, Avatar } from "antd"
import React, { useEffect, useState } from "react"
import axios from "axios"; 
import api from "../api";
import { Link } from "react-router-dom";
import { CarOutlined, DeleteOutlined, GoldOutlined, MinusOutlined, MobileOutlined, PlusOutlined, ShoppingOutlined } from "@ant-design/icons";

function Cart (props) {
    const [form] = Form.useForm()
    const [amount, setAmount] = useState(0)
    const [items, setItems] = useState()
    const [useBonus, setUseBonus] = useState(false)
    const [bonus, setBonus] = useState(0)

    useEffect(() => {   
        setItems(props.items)   
        getAmount(props.items)          
        form.setFieldsValue({
            phone_number: props.user.profile.phone_number,
            address: getAddress(props.user.profile.address)
        })
    }, [props.items]) // eslint-disable-line react-hooks/exhaustive-deps

    function getAmount(cartitems) {
        let total = 0
        cartitems.forEach(element => {
            total += element.item.price * element.count
        });
        setAmount(total)
    }

    function onPlus (item) {              
        if (item.count + 1 < 100) {              
            axios({
                method: 'PUT',
                url: `${api.profiles}/${props.user.profile.id}/`,
                headers: {
                    'Content-Type': 'application/json',                                              
                },
                data: {
                    cart: true,
                    mode: 'add',
                    item: item.item.id,
                    count: 1                                               
                }
            })            
            .then(res => {
                if (res.status === 200 || res.status === 201) {                                                      
                    setItems(res.data.cart)
                    getAmount(res.data.cart)
                }                                                         
            })
            .catch(err => {                      
                console.log(err.message)         
                message.error("Алдаа гарлаа. Дахин оролдоно уу.")            
            })             
        }
    }

    function onMinus (item) {
        if (item.count - 1 > 0) {
            axios({
                method: 'PUT',
                url: `${api.profiles}/${props.user.profile.id}/`,
                headers: {
                    'Content-Type': 'application/json',                                              
                },
                data: {
                    cart: true,
                    mode: 'sub',
                    item: item.item.id,
                    count: 1                                               
                }
            })            
            .then(res => {
                if (res.status === 200 || res.status === 201) {                                                      
                    setItems(res.data.cart)
                    getAmount(res.data.cart)
                }                                                         
            })
            .catch(err => {                      
                console.log(err.message)         
                message.error("Алдаа гарлаа. Дахин оролдоно уу.")            
            }) 
        }        
    }

    function onDelete (item) {
        axios({
            method: 'PUT',
            url: `${api.profiles}/${props.user.profile.id}/`,
            headers: {
                'Content-Type': 'application/json',                                              
            },
            data: {
                cart: true,
                mode: 'delete',
                item: item.item.id,
                count: 1                                               
            }
        })            
        .then(res => {
            if (res.status === 200 || res.status === 201) {                                                      
                setItems(res.data.cart)
                getAmount(res.data.cart)
            }                                                         
        })
        .catch(err => {                      
            console.log(err.message)         
            message.error("Алдаа гарлаа. Дахин оролдоно уу.")            
        }) 
    }

    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    function onChangeBonus (e) {        
        let nums = e.target.value.match(/\d/g)             
        if (nums === null) {
            setBonus(0)
        } else {                        
            let num = nums.join("") 
            if (parseInt(num) < 0) {
                setBonus(0)
            } else if (parseInt(num) > 7319) {
                setBonus(7319)
            } else {
                setBonus(parseInt(num))
            }
        }        
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

    function onFinish (values) {
        console.log(values)
    }

    return (
        <div style={{ background: '#fff', borderRadius: '2px', padding: '16px' }}>        
            <Typography.Title level={4} style={{ margin: 0 }}>Таны сагс</Typography.Title>            
            <Divider />
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={24} lg={16}>
                    <List
                        itemLayout="vertical"
                        size="large"
                        dataSource={items}
                        renderItem={item => (                           
                            <List.Item 
                                key={item.id}
                                actions={[
                                    <Button type="text" icon={<PlusOutlined />} onClick={() => onPlus(item)}>Нэмэх</Button>,
                                    <Button type="text" icon={<MinusOutlined />} onClick={() => onMinus(item)}>Хасах</Button>,
                                    <Button danger type="text" icon={<DeleteOutlined />} onClick={() => onDelete(item)}>Устгах</Button>,                                            
                                ]}
                                extra={
                                    <img
                                        width={100}
                                        alt="logo"
                                        src={item.item.images.length > 0 ? item.item.images[0].image : undefined}
                                    />
                                }
                            >
                                <List.Item.Meta                                            
                                    title={<Link to={`products/${item.item.id}`}><strong>{item.item.name}</strong></Link>}
                                    description={item.item.company && item.item.company !== null ? item.item.company.name : undefined}
                                />
                                <p>
                                Үнэ: {formatNumber(item.item.price)}₮ X {item.count} = <span style={{ fontWeight: 'bold' }}>{formatNumber(item.item.price * item.count)}₮</span>
                                </p>
                            </List.Item>
                        )}
                    />  
                    <div style={{ border: '1px solid #dedede', width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', padding: '16px 8px', marginTop: '16px' }}>
                        <div><Avatar size={64} icon={<CarOutlined />} style={{ background: '#dedede', color: '#000', marginRight: '16px' }} /></div>
                        <div><Typography.Text>14:00 цагаас өмнө захиалсан бүтээгдэхүүн тухайн өдөртөө хүргэгдэх бөгөөд 14:00 цагаас хойш захиалсан бүтээгдэхүүн дараа өдөртөө багтан танд хүргэгдэх болно.</Typography.Text></div>
                    </div>
                </Col>
                <Col xs={24} sm={24} md={24} lg={8}>
                    <Typography.Title level={5} style={{ margin: 0 }}>Нийт төлбөр: {formatNumber(amount)}₮</Typography.Title>
                    <Typography.Title level={5} style={{ margin: 0 }}>Төлөх дүн: {formatNumber(amount - parseInt(bonus))}₮</Typography.Title>                    
                    <Form form={form} layout="vertical" onFinish={onFinish} style={{ marginTop: '8px' }}>
                        <Checkbox checked={useBonus} onChange={() => setUseBonus(!useBonus)} style={{ marginBottom: '16px' }}>Урамшууллын оноо ашиглах</Checkbox>
                        { useBonus === true ?
                            <>                                
                                <Form.Item name="bonus" label="Ашиглах дүн: (7,319₮ хүртэл)">
                                    <Input 
                                        value={bonus} 
                                        prefix={<GoldOutlined style={{ color: '#a1a1a1' }} />} 
                                        suffix="₮"
                                        style={{ width: '100%', textAlign: 'right' }} 
                                        onChange={onChangeBonus} 
                                    />                
                                </Form.Item>            
                            </>
                        : <></> }
                        <Form.Item name="phone_number" label="Утасны дугаар:" rules={[{ required: true, message: 'Утасны дугаараа оруулна уу!' }]}>                                             
                            <Input prefix={<MobileOutlined style={{ color: '#a1a1a1' }} />} style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item name="address" label="Хүргүүлэх хаяг:" rules={[{ required: true, message: 'Хүргүүлэх хаягаа оруулна уу!' }]}>                                             
                            <Input.TextArea rows={4} />       
                        </Form.Item>
                        <Form.Item name="info" label="Нэмэлт мэдээлэл:">                                             
                            <Input.TextArea rows={4} />       
                        </Form.Item>
                        <Button block type="primary" icon={<ShoppingOutlined />} onClick={form.submit}>Захиалах</Button>
                    </Form>
                </Col>
            </Row>                                      
        </div>
    )
}

export default Cart