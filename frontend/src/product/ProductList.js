import { Breadcrumb, Checkbox, Col, Input, List, Row, Typography } from "antd";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

const data = [
    {
        id: 1,
        title: 'Product 1',
        tag: 'Vitamin',
        price: '$24.99',
        info: 'Etiam dignissim mattis fermentum. Quisque aliquet semper nisl at feugiat. Aliquam erat volutpat. Nulla dolor ligula, fermentum id dignissim ac, aliquet sagittis ex. Nulla tincidunt purus non felis interdum, et venenatis lectus imperdiet. Cras tincidunt tristique purus sollicitudin condimentum. Nulla tempus magna at justo faucibus efficitur. Mauris lobortis mi in magna aliquam, non bibendum ipsum pellentesque.',
    },
    {
        id: 2,
        title: 'Product 2',
        tag: 'Medicine',
        price: '$11.99',
        info: 'Etiam dignissim mattis fermentum. Quisque aliquet semper nisl at feugiat. Aliquam erat volutpat. Nulla dolor ligula, fermentum id dignissim ac, aliquet sagittis ex. Nulla tincidunt purus non felis interdum, et venenatis lectus imperdiet. Cras tincidunt tristique purus sollicitudin condimentum. Nulla tempus magna at justo faucibus efficitur. Mauris lobortis mi in magna aliquam, non bibendum ipsum pellentesque.',
    },
    {
        id: 3,
        title: 'Product 3',
        tag: 'Beauty',
        price: '$6.99',
        info: 'Etiam dignissim mattis fermentum. Quisque aliquet semper nisl at feugiat. Aliquam erat volutpat. Nulla dolor ligula, fermentum id dignissim ac, aliquet sagittis ex. Nulla tincidunt purus non felis interdum, et venenatis lectus imperdiet. Cras tincidunt tristique purus sollicitudin condimentum. Nulla tempus magna at justo faucibus efficitur. Mauris lobortis mi in magna aliquam, non bibendum ipsum pellentesque.',
    },
    {
        id: 4,
        title: 'Product 4',
        tag: 'Treatment',
        price: '$7.50',
        info: 'Etiam dignissim mattis fermentum. Quisque aliquet semper nisl at feugiat. Aliquam erat volutpat. Nulla dolor ligula, fermentum id dignissim ac, aliquet sagittis ex. Nulla tincidunt purus non felis interdum, et venenatis lectus imperdiet. Cras tincidunt tristique purus sollicitudin condimentum. Nulla tempus magna at justo faucibus efficitur. Mauris lobortis mi in magna aliquam, non bibendum ipsum pellentesque.',
    },
    {
        id: 5,
        title: 'Product 5',
        tag: 'Medications',
        price: '$40.00',
        info: 'Etiam dignissim mattis fermentum. Quisque aliquet semper nisl at feugiat. Aliquam erat volutpat. Nulla dolor ligula, fermentum id dignissim ac, aliquet sagittis ex. Nulla tincidunt purus non felis interdum, et venenatis lectus imperdiet. Cras tincidunt tristique purus sollicitudin condimentum. Nulla tempus magna at justo faucibus efficitur. Mauris lobortis mi in magna aliquam, non bibendum ipsum pellentesque.',
    },
    {
        id: 6,
        title: 'Product 6',
        tag: 'Care, Health',
        price: '$99.99',
        info: 'Etiam dignissim mattis fermentum. Quisque aliquet semper nisl at feugiat. Aliquam erat volutpat. Nulla dolor ligula, fermentum id dignissim ac, aliquet sagittis ex. Nulla tincidunt purus non felis interdum, et venenatis lectus imperdiet. Cras tincidunt tristique purus sollicitudin condimentum. Nulla tempus magna at justo faucibus efficitur. Mauris lobortis mi in magna aliquam, non bibendum ipsum pellentesque.',
    },
    {
        id: 7,
        title: 'Product 7',
        tag: 'Treatment',
        price: '$2.99',
        info: 'Etiam dignissim mattis fermentum. Quisque aliquet semper nisl at feugiat. Aliquam erat volutpat. Nulla dolor ligula, fermentum id dignissim ac, aliquet sagittis ex. Nulla tincidunt purus non felis interdum, et venenatis lectus imperdiet. Cras tincidunt tristique purus sollicitudin condimentum. Nulla tempus magna at justo faucibus efficitur. Mauris lobortis mi in magna aliquam, non bibendum ipsum pellentesque.',
    },
    {
        id: 8,
        title: 'Product 8',
        tag: 'Care, Health',
        price: '$14.58',
        info: 'Etiam dignissim mattis fermentum. Quisque aliquet semper nisl at feugiat. Aliquam erat volutpat. Nulla dolor ligula, fermentum id dignissim ac, aliquet sagittis ex. Nulla tincidunt purus non felis interdum, et venenatis lectus imperdiet. Cras tincidunt tristique purus sollicitudin condimentum. Nulla tempus magna at justo faucibus efficitur. Mauris lobortis mi in magna aliquam, non bibendum ipsum pellentesque.',
    },
];

function ProductList (props) {
    return (
        <div style={{ padding: '24px 10%' }}>    
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to="/">
                        Home
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    Products
                </Breadcrumb.Item>
            </Breadcrumb>
            <Row gutter={[16, 16]} style={{ margin: '24px 0', padding: '24px 0' }}>
                <Col span={6} style={{ paddingRight: '24px' }}>
                    <div style={{ width: '100%', border: '1px solid #f0f0f0', padding: '16px' }}>
                        <Typography.Title level={5}>Search by name:</Typography.Title>
                        <Input />
                        <Typography.Title level={5} style={{ marginTop: '16px' }}>Categories:</Typography.Title>
                        <div>
                            <Checkbox>Vitamin</Checkbox>
                        </div>
                        <div>
                            <Checkbox>Medicine</Checkbox>
                        </div>
                        <div>
                            <Checkbox>Beauty</Checkbox>
                        </div>
                        <div>
                            <Checkbox>Health</Checkbox>
                        </div>
                        <div>
                            <Checkbox>Care</Checkbox>
                        </div>
                        <div>
                            <Checkbox>Treatment</Checkbox>
                        </div>
                    </div>                    
                </Col>
                <Col span={18} style={{ padding: 0 }}>
                    <List
                        grid={{
                            gutter: 16,
                            xs: 2,
                            sm: 2,
                            md: 3,
                            lg: 4,
                            xl: 4,
                            xxl: 6,
                        }}
                        dataSource={data}
                        renderItem={item => (
                            <List.Item>
                                <ProductCard item={item} />
                            </List.Item>
                        )}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default ProductList