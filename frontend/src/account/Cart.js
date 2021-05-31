import { Divider, Typography, message, List, Space } from "antd"
import React, { useEffect, useState } from "react"
import axios from "axios"; 
import api from "../api";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";

const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

function Cart (props) {
    const [cart, setCart] = useState()

    useEffect(() => {   
        getCart()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    function getCart () {
        axios({
            method: 'GET',
            url: `${api.carts}?token=${props.token}`,            
        }).then(res => {        
            if (res.data.count > 0) {       
                console.log(res.data.results[0])                 
                setCart(res.data.results[0])
            } else {
                setCart(undefined)
            }
        }).catch(err => {
            message.error("Хуудсыг дахин ачааллана уу")
        })     
    }

    return (
        <div style={{ padding: '16px', border: '1px solid #f0f2f5' }}>
            <Typography.Title level={4}>Сагсан дах бүтээгдэхүүнүүд</Typography.Title>
            <Divider />
            <List
                itemLayout="vertical"
                size="large"
                dataSource={cart && cart.items ? cart.items : undefined}
                renderItem={item => (
                    <List.Item 
                        key={item.id}
                        actions={[
                            <IconText icon={PlusOutlined} text="Нэмэх" key="list-vertical-plus" />,
                            <IconText icon={MinusOutlined} text="Хасах" key="list-vertical-minus" />,                            
                            <IconText icon={DeleteOutlined} text="Устгах" key="list-vertical-delete" />,                            
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
                        Үнэ: {item.item.price}₮ X Тоо: {item.count} ширхэг = Нийт: {item.item.price * item.count}₮
                    </List.Item>
                )}
            />
        </div>
    )
}

export default Cart