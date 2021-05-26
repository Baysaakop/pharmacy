import { Breadcrumb, Col, Input, List, Row, Typography } from "antd";
import CheckableTag from "antd/lib/tag/CheckableTag";
import { useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

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
        tag: 'Feminene products',
        price: '$40.00',
        info: 'Etiam dignissim mattis fermentum. Quisque aliquet semper nisl at feugiat. Aliquam erat volutpat. Nulla dolor ligula, fermentum id dignissim ac, aliquet sagittis ex. Nulla tincidunt purus non felis interdum, et venenatis lectus imperdiet. Cras tincidunt tristique purus sollicitudin condimentum. Nulla tempus magna at justo faucibus efficitur. Mauris lobortis mi in magna aliquam, non bibendum ipsum pellentesque.',
    },
    {
        id: 6,
        title: 'Product 6',
        tag: 'Beauty items',
        price: '$99.99',
        info: 'Etiam dignissim mattis fermentum. Quisque aliquet semper nisl at feugiat. Aliquam erat volutpat. Nulla dolor ligula, fermentum id dignissim ac, aliquet sagittis ex. Nulla tincidunt purus non felis interdum, et venenatis lectus imperdiet. Cras tincidunt tristique purus sollicitudin condimentum. Nulla tempus magna at justo faucibus efficitur. Mauris lobortis mi in magna aliquam, non bibendum ipsum pellentesque.',
    },
    {
        id: 7,
        title: 'Product 7',
        tag: 'Seasonal products',
        price: '$2.99',
        info: 'Etiam dignissim mattis fermentum. Quisque aliquet semper nisl at feugiat. Aliquam erat volutpat. Nulla dolor ligula, fermentum id dignissim ac, aliquet sagittis ex. Nulla tincidunt purus non felis interdum, et venenatis lectus imperdiet. Cras tincidunt tristique purus sollicitudin condimentum. Nulla tempus magna at justo faucibus efficitur. Mauris lobortis mi in magna aliquam, non bibendum ipsum pellentesque.',
    },
    {
        id: 8,
        title: 'Product 8',
        tag: 'Household cleaning',
        price: '$14.58',
        info: 'Etiam dignissim mattis fermentum. Quisque aliquet semper nisl at feugiat. Aliquam erat volutpat. Nulla dolor ligula, fermentum id dignissim ac, aliquet sagittis ex. Nulla tincidunt purus non felis interdum, et venenatis lectus imperdiet. Cras tincidunt tristique purus sollicitudin condimentum. Nulla tempus magna at justo faucibus efficitur. Mauris lobortis mi in magna aliquam, non bibendum ipsum pellentesque.',
    },
];

const tags = ['OTC/VMS', 'Personal Hygiene', 'Food and beverages', 'Skin care items', 'Feminene products', 'Beauty items', 'Seasonal products', 'Household cleaning'];

function ProductList (props) {

    const [selectedTags, setSelectedTags] = useState([])

    function selectTag (tag, checked) {
        const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
        setSelectedTags(nextSelectedTags)
    }

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
            <Row gutter={[16, 16]} style={{ margin: '24px 0' }}>
                <Col span={6} style={{ padding: ' 0 24px 0 0' }}>
                    <div style={{ width: '100%', border: '1px solid #f0f0f0', padding: '16px' }}>
                        <Typography.Title level={5}>Search by name:</Typography.Title>
                        <Input />
                        <Typography.Title level={5} style={{ marginTop: '16px' }}>Tags:</Typography.Title>
                        {tags.map(tag => (
                            <CheckableTag
                                key={tag}
                                checked={selectedTags ? selectedTags.indexOf(tag) > -1 : false}
                                onChange={checked => selectTag(tag, checked)}
                            >
                                {tag}
                            </CheckableTag>
                        ))}
                        <Typography.Title level={5} style={{ marginTop: '16px' }}>Brand:</Typography.Title>
                        <Typography.Title level={5} style={{ marginTop: '16px' }}>Price:</Typography.Title>
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
                                <ProductCard item={item} action={true} />
                            </List.Item>
                        )}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default ProductList