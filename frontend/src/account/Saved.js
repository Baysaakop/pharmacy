import { Divider, Typography, List } from "antd"
import { useState } from "react";
import ProductCard from "../product/ProductCard";

function Saved (props) {    

    const [items, setItems] = useState(props.items)

    function onRemove (data) {
        setItems(data)
    }

    return (
        <div style={{ padding: '16px', border: '1px solid #000' }}>
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
                dataSource={items}
                renderItem={item => (
                    <List.Item>
                        <ProductCard item={item} user={props.user} type="favorite" onRemove={onRemove} />
                    </List.Item>
                )}
            />
        </div>
    )
}

export default Saved