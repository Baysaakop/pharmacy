import { BranchesOutlined, HeartOutlined, InfoCircleOutlined, ShoppingCartOutlined, ShoppingOutlined, StarOutlined, TagOutlined } from "@ant-design/icons";
import { Typography, Breadcrumb, Row, Col, Button, InputNumber, Rate, List } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

const data = [    
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

function ProductDetail (props) {

    const [id, setId] = useState()

    useEffect(() => {
        setId(props.match.params.id)
    }, [props.match.params.id])

    return (
        <div style={{ padding: '24px 10%' }}>    
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to="/">
                        Home
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to="/products">
                        Products
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>                   
                    {`Product ${id ? id : ''}`}
                </Breadcrumb.Item>
            </Breadcrumb>
            <Row gutter={[16, 16]} style={{ margin: '24px 0', padding: '24px 0' }}>
                <Col span={8} style={{ padding: 0 }}>
                    <img alt="example" src="http://ipharm.axiomthemes.com/wp-content/uploads/2019/02/7-min1.jpg" style={{ width: '100%', height: 'auto' }} />
                </Col>
                <Col span={16} style={{ padding: '0 0 0 32px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <Typography.Title level={2}>{`Product ${id ? id : ''}`}</Typography.Title>                            
                        </div>
                        <div>
                            <Typography.Title level={3}>BRAND</Typography.Title>
                        </div>
                    </div>
                    <InfoCircleOutlined style={{ fontSize: '18px', marginRight: '8px' }} />
                    <Typography.Text style={{ fontSize: '18px' }}>Description:</Typography.Text>
                    <Typography.Paragraph>
                        Etiam dignissim mattis fermentum. Quisque aliquet semper nisl at feugiat. Aliquam erat volutpat. Nulla dolor ligula, fermentum id dignissim ac, aliquet sagittis ex. Nulla tincidunt purus non felis interdum, et venenatis lectus imperdiet. Cras tincidunt tristique purus sollicitudin condimentum. Nulla tempus magna at justo faucibus efficitur. Mauris lobortis mi in magna aliquam, non bibendum ipsum pellentesque.
                    </Typography.Paragraph>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>                        
                        <div>
                            <TagOutlined style={{ fontSize: '18px', marginRight: '8px' }} />
                            <Typography.Text style={{ fontSize: '18px' }}>Price:</Typography.Text>
                            <Typography.Title level={3} style={{ margin: '0', color: '#34495e' }}>$10.99</Typography.Title>
                        </div>
                        <div>
                            <BranchesOutlined style={{ fontSize: '18px', marginRight: '8px' }} />
                            <Typography.Text style={{ fontSize: '18px' }}>Category:</Typography.Text>
                            <Typography.Text style={{ display: 'block' }}>- Health, Care</Typography.Text>
                        </div>
                        <div>
                            <StarOutlined style={{ fontSize: '18px', marginRight: '8px', marginTop: '16px' }} />
                            <Typography.Text style={{ fontSize: '18px' }}>Rating:</Typography.Text>
                            <div>
                                <Rate allowHalf value={4.5}/>
                                <span className="ant-rate-text">- 4.5</span>
                            </div>
                        </div>
                    </div>                                                                                
                    <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <div style={{ marginRight: '8px' }}>
                            <Typography.Text style={{ fontSize: '18px' }}>Quantity:</Typography.Text>
                            <InputNumber size="large" min={1} max={20} style={{ marginLeft: '8px' }} />          
                        </div>                        
                        <Button type="ghost" size="large" icon={<ShoppingCartOutlined />} style={{ marginRight: '8px' }}>Add to cart</Button>
                        <Button type="ghost" size="large" icon={<ShoppingOutlined />} style={{ marginRight: '8px' }}>Buy now</Button>
                        <Button type="ghost" size="large" icon={<HeartOutlined />} style={{ marginRight: '8px' }}>Add to favorites</Button>
                    </div>
                </Col>
            </Row>
            <Typography.Title level={4}>Reviews:</Typography.Title>
            <Typography.Paragraph>
                Sed ut tempus nisi. Morbi vel accumsan nunc. Suspendisse rhoncus urna odio, accumsan egestas ipsum porta eu. Nullam non odio vitae sapien ultrices dignissim. Fusce eu metus tincidunt, sagittis leo sit amet, fringilla felis. Pellentesque vehicula fringilla nunc eget consequat. Cras diam augue, vestibulum eget aliquam sit amet, sagittis scelerisque diam. Aliquam erat volutpat. Sed a quam id ex pharetra auctor eget ac sem. Vivamus interdum, orci sed vestibulum venenatis, velit orci faucibus libero, ut viverra libero tortor dictum tellus.
            </Typography.Paragraph>
            <Typography.Title level={4}>Similar products:</Typography.Title>
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
        </div>
    )
}

export default ProductDetail