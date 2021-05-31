import { CarOutlined, HeartOutlined, ShopOutlined, ShoppingCartOutlined, ShoppingOutlined } from "@ant-design/icons";
import { Typography, Breadcrumb, Row, Col, Button, InputNumber, Rate, message, Divider, Tag, notification } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import ProductCard from "./ProductCard";
// import InfiniteCarousel from 'react-leaf-carousel';
import axios from "axios"; 
import api from "../api";
import { connect } from 'react-redux';

function ProductDetail (props) {

    const [item, setItem] = useState()
    const [cart, setCart] = useState()
    const [favorite, setFavorite] = useState()
    const [count, setCount] = useState(1)

    useEffect(() => {
        axios({
            method: 'GET',
            url: `${api.items}/${props.match.params.id}/`,            
        }).then(res => {            
            setItem(res.data)
        }).catch(err => {
            message.error("Хуудсыг дахин ачааллана уу")
        })        
        if (props.token) {
            getFavorite()
            getCart()
        }
    }, [props.match.params.id]) // eslint-disable-line react-hooks/exhaustive-deps

    function getFavorite () {
        axios({
            method: 'GET',
            url: `${api.favorites}?token=${props.token}`,            
        }).then(res => {        
            if (res.data.count > 0) {                        
                setFavorite(res.data.results[0])
            } else {
                setFavorite(undefined)
            }
        }).catch(err => {
            message.error("Хуудсыг дахин ачааллана уу")
        })     
    }

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

    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    function getCategory (categories) {
        let res = []
        categories.forEach(element => {
            res.push(element.name)
        })
        return res.toString()
    }

    function addToSaved () {
        if (props.token) {  
            if (favorite) {                
                axios({
                    method: 'PUT',
                    url: `${api.favorites}/${favorite.id}/`,
                    data: {
                        item: item.id,
                        token: props.token
                    }
                }).then(res => {                    
                    if (favorite.items.find(x => x.id === item.id)) {
                        notification['warning']({
                            message: 'Жагсаалтаас хасагдлаа.',
                            description:
                              `'${item.name}' бүтээгдэхүүн таны хадгалсан бүтээгдэхүүнүүдийн жагсаалтаас хасагдлаа.`,
                        });
                    } else {
                        notification['success']({
                            message: 'Амжилттай хадгаллаа.',
                            description:
                              `'${item.name}' бүтээгдэхүүн таны хадгалсан бүтээгдэхүүнүүдийн жагсаалтад нэмэгдлээ.`,
                        });
                    }
                    setFavorite(res.data)
                }).catch(err => {
                    console.log(err)
                })
            } else {
                axios({
                    method: 'POST',
                    url: `${api.favorites}/`,
                    data: {
                        item: item.id, 
                        token: props.token
                    }
                }).then(res => {                    
                    setFavorite(res.data)
                    notification['success']({
                        message: 'Амжилттай хадгаллаа.',
                        description:
                          `'${item.name}' бүтээгдэхүүн таны хадгалсан бүтээгдэхүүнүүдийн жагсаалтад нэмэгдлээ.`,
                    });
                }).catch(err => {
                    console.log(err)
                })
            }            
        } else {
            props.history.push('/login')
        }
    }

    function addToCart() {        
        if (props.token) {  
            if (cart) {                
                axios({
                    method: 'PUT',
                    url: `${api.carts}/${cart.id}/`,
                    data: {
                        item: item.id,
                        count: count,
                        token: props.token
                    }
                }).then(res => {                                        
                    setCart(res.data)
                    notification['success']({
                        message: 'Сагсанд нэмэгдлээ.',
                        description: `'${item.name}' бүтээгдэхүүн таны сагсанд нэмэгдлээ.`,
                    });
                }).catch(err => {
                    console.log(err)
                })
            } else {
                axios({
                    method: 'POST',
                    url: `${api.carts}/`,
                    data: {
                        item: item.id, 
                        count: count,
                        token: props.token
                    }
                }).then(res => {                    
                    setCart(res.data)
                    notification['success']({
                        message: 'Сагсанд нэмэгдлээ.',
                        description: `'${item.name}' бүтээгдэхүүн таны сагсанд нэмэгдлээ.`,
                    });
                }).catch(err => {
                    console.log(err)
                })
            }            
        } else {
            props.history.push('/login')
        }
    }

    return (
        <div style={{ padding: '0px 10%' }}>    
            {item ? (
                <>
                    <Breadcrumb style={{ margin: '24px 0' }}>
                        <Breadcrumb.Item>
                            <Link to="/">
                                Нүүр хуудас
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to="/products">
                                Бүтээгдэхүүн
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>                   
                            {item.name}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
                        <Col span={8} style={{ padding: 0 }}>
                            <div style={{ border: '1px solid #dedede', width: '100%', padding: '32px' }}>
                                <img alt={item.name} src={item.image} style={{ width: '100%', height: 'auto' }} />
                            </div>
                        </Col>
                        <Col span={16} style={{ padding: '0 0 0 32px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <Typography.Title level={3} style={{ margin: 0 }}>{item.name}</Typography.Title>                            
                                    <Typography.Text type="secondary" style={{ fontSize: '16px' }}>{getCategory(item.category)}</Typography.Text>
                                </div>
                                <div>
                                    {/* <Typography.Title level={3}>{item.company.image}</Typography.Title> */}
                                    <img alt={item.company} src={item.company.image} style={{ height: '40px', width: 'auto', objectFit: 'scale-down' }} />
                                </div>
                            </div>                            
                            <Divider style={{ margin: '16px 0' }} />
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>                        
                                <div>                                    
                                    <Typography.Title level={5} style={{ margin: '0' }}>Үнэ:</Typography.Title>
                                    <Typography.Title level={2} style={{ margin: '0' }}>{formatNumber(item.price)}₮</Typography.Title>
                                </div>                                
                                <div>                                                                        
                                    <Typography.Title level={5} style={{ margin: '0' }}>Үнэлгээ:</Typography.Title>
                                    <div>
                                        <Rate allowHalf value={item.rating / 10}/>
                                        <span className="ant-rate-text" style={{ fontWeight: 'bold' }}>- {item.rating / 10}</span>
                                    </div>
                                </div>
                            </div>                            
                            <Divider style={{ margin: '16px 0' }} />                                                                                                                                                                  
                            <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>                                                       
                                <div style={{ marginRight: '8px' }}>
                                    <Typography.Text style={{ fontSize: '18px' }}>Тоо:</Typography.Text>
                                    <InputNumber value={count} size="large" min={1} max={100} style={{ marginLeft: '8px' }} onChange={(val) => setCount(val)} />          
                                </div>                                 
                                <Button type="ghost" size="large" icon={<ShoppingCartOutlined />} style={{ marginRight: '8px' }} onClick={addToCart} >                                    
                                    {/* { cart && cart.items.find(x => x.item.id === item.id) ? `(${cart.items.find(x => x.item.id === item.id).count}) Сагсанд нэмэх` : 'Сагсанд хийх' } */}
                                    Сагсанд хийх
                                </Button>
                                <Button type="primary" size="large" icon={<ShoppingOutlined />} style={{ marginRight: '8px' }}>Захиалах</Button>                                
                                <Button danger type="primary" size="large" icon={<HeartOutlined />} style={{ marginRight: '8px' }} onClick={addToSaved}>
                                    { favorite && favorite.items.find(x => x.id === item.id) ? 'Хадгалсан' : 'Хадгалах' }                                    
                                </Button>
                            </div>
                            <Divider style={{ margin: '16px 0' }} />
                            {item.tag.map(tag => {
                                return (
                                    <Tag>{tag.name}</Tag>
                                )                                
                            })}
                            <Row gutter={[8, 8]} style={{ marginTop: '16px' }}>
                                <Col span={12}>
                                    <div style={{ border: '1px solid #dedede', width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', padding: '16px 8px' }}>
                                        <div>
                                            <CarOutlined style={{ fontSize: '24px' }} />
                                        </div>
                                        <div style={{ marginLeft: '16px' }}>
                                            <Typography.Text>Бүтээгдэхүүнээ захиалаад 24-48 цагийн дотор хүргэлтээр авах боломжтой.</Typography.Text>
                                        </div>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div style={{ border: '1px solid #dedede', width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', padding: '16px 8px' }}>
                                        <div>
                                            <ShopOutlined style={{ fontSize: '24px' }} />
                                        </div>
                                        <div style={{ marginLeft: '16px' }}>
                                            <Typography.Text>Бүтээгдэхүүнээ захиалаад өөрт ойр байрлах салбар дээрээс очиж авах боломжтой.</Typography.Text>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <div style={{ marginTop: '24px' }}>
                        <Typography.Title level={4} style={{ margin: 0 }}>Бүтээгдэхүүний мэдээлэл:</Typography.Title>
                        <Typography.Paragraph>
                            {item.description}                                
                        </Typography.Paragraph>
                        <Typography.Title level={5} style={{ margin: 0 }}>Найрлага:</Typography.Title>
                        <Typography.Paragraph>
                            {item.ingredients}                                
                        </Typography.Paragraph>
                        <Typography.Title level={5} style={{ margin: 0 }}>Хэрэглэх заавар:</Typography.Title>
                        <Typography.Paragraph>
                            {item.usage}                                
                        </Typography.Paragraph>
                        <Typography.Title level={5} style={{ margin: 0 }}>Хадгалах нөхцөл:</Typography.Title>
                        <Typography.Paragraph>
                            {item.caution}                                
                        </Typography.Paragraph>
                        <Typography.Title level={5} style={{ margin: 0 }}>Анхааруулга:</Typography.Title>
                        <Typography.Paragraph>
                            {item.caution}                                
                        </Typography.Paragraph>
                    </div>                    
                </>
            ) : (
                <></>
            )}            
        </div>
    )
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

export default connect(mapStateToProps)(ProductDetail)