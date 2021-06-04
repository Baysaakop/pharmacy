import { Breadcrumb, Col, Input, List, Row, Typography, message, Tag, Radio, Space } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import axios from "axios";
import api from "../api";

const { CheckableTag } = Tag

function ProductList (props) {

    const [categories, setCategories] = useState([])
    const [selectedTags, setSelectedTags] = useState([])
    const [tags, setTags] = useState([])
    const [items, setItems] = useState()

    useEffect(() => {
        getProducts()
        getCategories()
        getTags()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    function getProducts () {
        axios({
            method: 'GET',
            url: `${api.items}/`,            
        }).then(res => {            
            console.log(res.data.results)
            setItems(res.data.results)
        }).catch(err => {
            message.error("Хуудсыг дахин ачааллана уу")
        })
    }

    function getCategories () {
        axios({
            method: 'GET',
            url: `${api.categories}/`            
        }).then(res => {            
            setCategories(res.data.results)
        }).catch(err => {
            message.error("Хуудсыг дахин ачааллана уу")
        })
    }

    function getTags () {
        axios({
            method: 'GET',
            url: `${api.tags}/`            
        }).then(res => {            
            setTags(res.data.results)
        }).catch(err => {
            message.error("Хуудсыг дахин ачааллана уу")
        })
    }

    function selectTag (tag, checked) {
        const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
        setSelectedTags(nextSelectedTags)
    }

    return (
        <div style={{ padding: '0px 10%' }}>    
            <Breadcrumb style={{ margin: '24px 0' }}>
                <Breadcrumb.Item>
                    <Link to="/">
                        Нүүр хуудас
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    Эмийн сан
                </Breadcrumb.Item>
            </Breadcrumb>
            <Row gutter={[16, 16]} style={{ margin: '24px 0' }}>
                <Col span={6} style={{ padding: ' 0 24px 0 0' }}>
                    <div style={{ width: '100%', border: '1px solid #f0f0f0', padding: '16px' }}>
                        <Typography.Title level={5}>Нэрээр хайх:</Typography.Title>
                        <Input />
                        <Typography.Title level={5} style={{ marginTop: '16px' }}>Ангилал:</Typography.Title>
                        <Radio.Group>
                            <Space direction="vertical">
                                {categories ? categories.map(cat => (
                                    <Radio value={cat.id}>{cat.name}</Radio>
                                )) : <></>}
                            </Space>
                        </Radio.Group>
                        <Typography.Title level={5} style={{ marginTop: '16px' }}>Tags:</Typography.Title>
                        {tags ? tags.map(tag => (
                            <CheckableTag
                                key={tag.id}
                                checked={selectedTags ? selectedTags.indexOf(tag.id) > -1 : false}
                                onChange={checked => selectTag(tag.id, checked)}
                            >
                                {tag.name}
                            </CheckableTag>
                        )) : <></>}
                        <Typography.Title level={5} style={{ marginTop: '16px' }}>Үйлдвэрлэгч:</Typography.Title>                        
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
                        dataSource={items ? items : undefined}
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