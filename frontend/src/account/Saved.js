import { Divider, Typography, message, List } from "antd"
import { useEffect, useState } from "react"
import axios from "axios"; 
import api from "../api";
import ProductCard from "../product/ProductCard";

function Saved (props) {

    const [favorite, setFavorite] = useState()
    
    useEffect(() => {   
        getFavorite()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    function getFavorite () {
        axios({
            method: 'GET',
            url: `${api.favorites}?token=${props.token}`,            
        }).then(res => {        
            if (res.data.count > 0) {                        
                console.log(res.data.results[0])
                setFavorite(res.data.results[0])
            } else {
                setFavorite(undefined)
            }
        }).catch(err => {
            message.error("Хуудсыг дахин ачааллана уу")
        })     
    }

    return (
        <div style={{ padding: '16px', border: '1px solid #f0f2f5' }}>
            <Typography.Title level={4}>Хадгалсан бүтээгдэхүүнүүд</Typography.Title>
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
                dataSource={favorite && favorite.items ? favorite.items : undefined}
                renderItem={item => (
                    <List.Item>
                        <ProductCard item={item} action={true} />
                    </List.Item>
                )}
            />
        </div>
    )
}

export default Saved