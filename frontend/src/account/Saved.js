import { Divider, Typography, List } from "antd"
import ProductCard from "../product/ProductCard";

function Saved (props) {    

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
                dataSource={props.items}
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