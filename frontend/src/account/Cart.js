import { Divider, Typography, message, List } from "antd"
import { useEffect, useState } from "react"
import axios from "axios"; 
import api from "../api";

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
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 1,
                    md: 2,
                    lg: 3,
                    xl: 4,
                    xxl: 5,
                }}
                dataSource={cart && cart.items ? cart.items : undefined}
                renderItem={item => (
                    <List.Item>
                        <Typography.Title level={4}>
                            {item.item.name}
                        </Typography.Title>
                        <Typography.Text>
                            Тоо ширхэг: {item.count}
                        </Typography.Text>
                    </List.Item>
                )}
            />
        </div>
    )
}

export default Cart