import { Divider, Typography, message, List, Button, Steps } from "antd"
import React, { useEffect, useState } from "react"
import axios from "axios"; 
import api from "../api";
import { CarOutlined, CheckOutlined, CreditCardOutlined, DeleteOutlined, DoubleRightOutlined, MinusOutlined, PlusOutlined, ShoppingCartOutlined } from "@ant-design/icons";

function Cart (props) {
    const [cart, setCart] = useState()
    const [amount, setAmount] = useState(0)

    useEffect(() => {   
        getCart()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    function getCart () {
        axios({
            method: 'GET',
            url: `${api.carts}?token=${props.token}`,            
        }).then(res => {        
            if (res.data.count > 0) {                                       
                let result = res.data.results[0]
                let n = 0
                result.items.forEach(x => {
                    n = n + (x.item.price * x.count)
                })
                setAmount(n)
                setCart(result)
            } else {
                setCart(undefined)
            }
        }).catch(err => {
            message.error("Хуудсыг дахин ачааллана уу")
        })     
    }

    function onPlus (item) {              
        if (item.count + 1 < 100) {  
            axios({
                method: 'PUT',
                url: `${api.cartitems}/${item.id}/`,
                data: {
                    item: item.id,
                    count: item.count + 1,
                    token: props.token
                }
            })
            .then(res => {
                getCart()
            })
            .catch(err => {
                console.log(err.message)
            })
        }
    }

    function onMinus (item) {
        if (item.count - 1 > 0) {
            axios({
                method: 'PUT',
                url: `${api.cartitems}/${item.id}/`,
                data: {
                    item: item.id,
                    count: item.count - 1,
                    token: props.token
                }
            })
            .then(res => {
                getCart()
            })
            .catch(err => {
                console.log(err.message)
            })
        }        
    }

    return (
        <div style={{ padding: '16px', border: '1px solid #f0f2f5' }}>
            <Steps>
                <Steps.Step status="process" title="Сагс" icon={<ShoppingCartOutlined />} />
                <Steps.Step status="wait" title="Хүргэлт" icon={<CarOutlined />} />
                <Steps.Step status="wait" title="Төлбөр" icon={<CreditCardOutlined />} />
                <Steps.Step status="wait" title="Дуусгах" icon={<CheckOutlined />} />
            </Steps>
            <Divider />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <Typography.Title level={4} style={{ margin: 0 }}>Сагс</Typography.Title>
                </div>
                <div>
                    <Typography.Title level={4} style={{ margin: 0 }}>Нийт төлбөр: {amount}₮</Typography.Title> 
                </div>
            </div>            
            <Divider />
            <List
                itemLayout="vertical"
                size="large"
                dataSource={cart && cart.items ? cart.items : undefined}
                renderItem={item => (                           
                    <List.Item 
                        key={item.id}
                        actions={[
                            <Button type="text" icon={<PlusOutlined />} onClick={() => onPlus(item)}>Нэмэх</Button>,
                            <Button type="text" icon={<MinusOutlined />} onClick={() => onMinus(item)}>Хасах</Button>,
                            <Button type="text" icon={<DeleteOutlined />}>Устгах</Button>,                                            
                        ]}
                        extra={
                            <img
                                width={100}
                                alt="logo"
                                src={item.item.image}
                            />
                        }
                    >
                        <List.Item.Meta                                            
                            title={<a href={item.item.id}>{item.item.name}</a>}
                            description={item.item.company.name}
                        />
                        <p>
                        Үнэ: {item.item.price}₮ X {item.count} ш = <span style={{ fontWeight: 'bold' }}>{item.item.price * item.count}₮ (Нийт)</span>
                        </p>
                    </List.Item>
                )}
            />                
            <Button type="primary" icon={<DoubleRightOutlined />} style={{ margin: '8px 0 0 16px' }}>Үргэлжлүүлэх</Button>            
        </div>
    )
}

export default Cart