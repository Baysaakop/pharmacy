import { BranchesOutlined, HeartOutlined, InfoCircleOutlined, ShoppingCartOutlined, ShoppingOutlined, StarOutlined, TagOutlined } from "@ant-design/icons";
import { Typography, Breadcrumb, Row, Col, Button, InputNumber, Rate } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import InfiniteCarousel from 'react-leaf-carousel';
import Avatar from "antd/lib/avatar/avatar";

const data = [    
    {
        id: 1,
        title: 'Product 1',
        tag: 'OTC/VMS',
        price: '$24.99',
        info: 'Etiam dignissim mattis fermentum. Quisque aliquet semper nisl at feugiat. Aliquam erat volutpat. Nulla dolor ligula, fermentum id dignissim ac, aliquet sagittis ex. Nulla tincidunt purus non felis interdum, et venenatis lectus imperdiet. Cras tincidunt tristique purus sollicitudin condimentum. Nulla tempus magna at justo faucibus efficitur. Mauris lobortis mi in magna aliquam, non bibendum ipsum pellentesque.',
    },
    {
        id: 2,
        title: 'Product 2',
        tag: 'Personal Hygiene',
        price: '$11.99',
        info: 'Etiam dignissim mattis fermentum. Quisque aliquet semper nisl at feugiat. Aliquam erat volutpat. Nulla dolor ligula, fermentum id dignissim ac, aliquet sagittis ex. Nulla tincidunt purus non felis interdum, et venenatis lectus imperdiet. Cras tincidunt tristique purus sollicitudin condimentum. Nulla tempus magna at justo faucibus efficitur. Mauris lobortis mi in magna aliquam, non bibendum ipsum pellentesque.',
    },
    {
        id: 3,
        title: 'Product 3',
        tag: 'Food and beverages',
        price: '$6.99',
        info: 'Etiam dignissim mattis fermentum. Quisque aliquet semper nisl at feugiat. Aliquam erat volutpat. Nulla dolor ligula, fermentum id dignissim ac, aliquet sagittis ex. Nulla tincidunt purus non felis interdum, et venenatis lectus imperdiet. Cras tincidunt tristique purus sollicitudin condimentum. Nulla tempus magna at justo faucibus efficitur. Mauris lobortis mi in magna aliquam, non bibendum ipsum pellentesque.',
    },
    {
        id: 4,
        title: 'Product 4',
        tag: 'Skin care items',
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
            <Row gutter={[16, 16]} style={{ margin: '24px 0' }}>
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
                            <Typography.Text style={{ display: 'block' }}>- Household cleaning</Typography.Text>
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
            <Row gutter={[16, 16]}>
                <Col span={6} style={{ padding: '0 16px' }}>
                    <Rate value={4} disabled style={{ fontSize: '14px' }} />
                    <Typography.Paragraph agraph>
                    Sed ut tempus nisi. Morbi vel accumsan nunc. Suspendisse rhoncus urna odio, accumsan egestas ipsum porta eu. Nullam non odio vitae sapien ultrices dignissim.
                    </Typography.Paragraph>
                    <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Avatar size={48} src="https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTc5ODc1NTM4NjMyOTc2Mzcz/gettyimages-693134468.jpg" />
                        <div style={{ marginLeft: '8px' }}>
                            <Typography.Title level={5} style={{ margin: 0 }}>
                                Tom Cruise
                            </Typography.Title>
                            <Typography.Text type="secondary">May 25th, 2021</Typography.Text>
                        </div>
                    </div>
                </Col>
                <Col span={6} style={{ padding: '0 16px' }}>
                    <Rate value={4} disabled style={{ fontSize: '14px' }} />
                    <Typography.Paragraph agraph>
                    Sed ut tempus nisi. Morbi vel accumsan nunc. Suspendisse rhoncus urna odio, accumsan egestas ipsum porta eu. Nullam non odio vitae sapien ultrices dignissim.
                    </Typography.Paragraph>
                    <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Avatar size={48} src="https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTc5ODc1NTM4NjMyOTc2Mzcz/gettyimages-693134468.jpg" />
                        <div style={{ marginLeft: '8px' }}>
                            <Typography.Title level={5} style={{ margin: 0 }}>
                                Tom Cruise
                            </Typography.Title>
                            <Typography.Text type="secondary">May 25th, 2021</Typography.Text>
                        </div>
                    </div>
                </Col>
                <Col span={6} style={{ padding: '0 16px' }}>
                    <Rate value={4} disabled style={{ fontSize: '14px' }} />
                    <Typography.Paragraph agraph>
                    Sed ut tempus nisi. Morbi vel accumsan nunc. Suspendisse rhoncus urna odio, accumsan egestas ipsum porta eu. Nullam non odio vitae sapien ultrices dignissim.
                    </Typography.Paragraph>
                    <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Avatar size={48} src="https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTc5ODc1NTM4NjMyOTc2Mzcz/gettyimages-693134468.jpg" />
                        <div style={{ marginLeft: '8px' }}>
                            <Typography.Title level={5} style={{ margin: 0 }}>
                                Tom Cruise
                            </Typography.Title>
                            <Typography.Text type="secondary">May 25th, 2021</Typography.Text>
                        </div>
                    </div>
                </Col>
                <Col span={6} style={{ padding: '0 16px' }}>
                    <Rate value={4} disabled style={{ fontSize: '14px' }} />
                    <Typography.Paragraph agraph>
                    Sed ut tempus nisi. Morbi vel accumsan nunc. Suspendisse rhoncus urna odio, accumsan egestas ipsum porta eu. Nullam non odio vitae sapien ultrices dignissim.
                    </Typography.Paragraph>
                    <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Avatar size={48} src="https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTc5ODc1NTM4NjMyOTc2Mzcz/gettyimages-693134468.jpg" />
                        <div style={{ marginLeft: '8px' }}>
                            <Typography.Title level={5} style={{ margin: 0 }}>
                                Tom Cruise
                            </Typography.Title>
                            <Typography.Text type="secondary">May 25th, 2021</Typography.Text>
                        </div>
                    </div>
                </Col>
            </Row>
            <Typography.Paragraph>
                 
            </Typography.Paragraph>
            <Typography.Title level={4}>Similar products:</Typography.Title>            
            <InfiniteCarousel                    
                dots={false}
                showSides={true}
                sidesOpacity={.5}
                sideSize={.1}
                slidesToScroll={2}
                slidesToShow={4}
                scrollOnDevice={true}
            >
                {data.map(item => {
                    return (
                        <ProductCard item={item} />
                    )
                })}
            </InfiniteCarousel>
        </div>
    )
}

export default ProductDetail