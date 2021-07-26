import { CarOutlined, HeartOutlined, ShopOutlined, ShoppingCartOutlined, ShoppingOutlined } from "@ant-design/icons";
import { Grid, Typography, Breadcrumb, Row, Col, Button, InputNumber, message, Divider, Tag, notification, Carousel, Avatar } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import InfiniteCarousel from 'react-leaf-carousel';
import axios from "axios"; 
import api from "../api";
import { connect } from 'react-redux';
import blank from './blank.jpg'

const { useBreakpoint } = Grid

function ProductDetail (props) {
    const screens = useBreakpoint()
    const [item, setItem] = useState()    
    const [count, setCount] = useState(1)
    const [user, setUser] = useState()
    const [favorite, setFavorite] = useState()
    const [cart, setCart] = useState()
    const [suggestedItems, setSuggestedItems] = useState()

    useEffect(() => {
        axios({
            method: 'GET',
            url: `${api.items}/${props.match.params.id}/`,            
        }).then(res => {            
            console.log(res.data)
            setItem(res.data)
        }).catch(err => {
            message.error("Хуудсыг дахин ачааллана уу")
        })        
        if (props.token) {
            getUser()
        }
        getSuggestedProducts()
    }, [props.match.params.id]) // eslint-disable-line react-hooks/exhaustive-deps    

    function getUser() {
        axios({
            method: 'GET',
            url: api.profile,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${props.token}`
            }
        }).then(res => {                           
            setUser(res.data)
            setFavorite(res.data.profile.favorite)
            setCart(res.data.profile.cart)
        }).catch(err => {
            console.log(err)
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

    function getSuggestedProducts() {
        axios({
            method: 'GET',
            url: api.items           
        }).then(res => {                        
            setSuggestedItems(res.data.results)            
        }).catch(err => {
            message.error("Хуудсыг дахин ачааллана уу")
        })
    }

    function addToSaved () {
        if (user) {  
            axios({
                method: 'PUT',
                url: `${api.profiles}/${user.profile.id}/`,
                headers: {
                    'Content-Type': 'application/json',                                              
                },
                data: {
                    favorite: true,
                    item: item.id                           
                }
            })            
            .then(res => {
                if (res.status === 200 || res.status === 201) {            
                    if (res.data.favorite.find(x => x.id === item.id)) {
                        notification['success']({
                            message: 'Бүтээгдэхүүнийг хадгаллаа.',
                            description: `'${item.name}' бүтээгдэхүүн таны хадгалсан бүтээгдэхүүнүүдийн жагсаалтад нэмэгдлээ.`,
                        });
                    } else {
                        notification['warning']({
                            message: 'Бүтээгдэхүүнийг хаслаа.',
                            description: `'${item.name}' бүтээгдэхүүн таны хадгалсан бүтээгдэхүүнүүдийн жагсаалтаас хасагдлаа.`,
                        });
                    }
                    setFavorite(res.data.favorite)                              
                }                                                         
            })
            .catch(err => {                      
                console.log(err.message)         
                message.error("Алдаа гарлаа. Дахин оролдоно уу.")            
            })             
        } else {
            props.history.push('/login')            
        }        
    }

    function addToCart(mode) {       
        if (user) {  
            axios({
                method: 'PUT',
                url: `${api.profiles}/${user.profile.id}/`,
                headers: {
                    'Content-Type': 'application/json',                                              
                },
                data: {
                    cart: true,
                    mode: mode,
                    item: item.id,
                    count: count                           
                }
            })            
            .then(res => {
                if (res.status === 200 || res.status === 201) {              
                    if (res.data.cart.find(x => x.item.id === item.id)) {
                        notification['success']({
                            message: 'Сагсанд нэмэгдлээ.',
                            description: `'${item.name}' бүтээгдэхүүн таны сагсанд нэмэгдлээ.`,
                        });
                    } else {
                        notification['warning']({
                            message: 'Сагснаас хасагдлаа.',
                            description: `'${item.name}' бүтээгдэхүүн сагснаас хасагдлаа.`,
                        });
                    }      
                    setCart(res.data.cart)                              
                }                                                         
            })
            .catch(err => {                      
                console.log(err.message)         
                message.error("Алдаа гарлаа. Дахин оролдоно уу.")            
            })             
        } else {
            props.history.push('/login')            
        }         
    }    

    function getSliderCount() {
        if (screens.xxl) {
            return 8
        } else if (screens.xl) {
            return 6
        } else if (screens.lg) {
            return 5
        } else if (screens.md) {
            return 4
        } else if (screens.sm) {
            return 3
        } else if (screens.xs) {
            return 2
        }
    }

    return (
        <div>    
            {item ? (
                <>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to="/">
                                Нүүр хуудас
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to="/products">
                                Эмийн сан
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>                   
                            {item.name}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <Row gutter={[48, 16]} style={{ marginTop: '24px', marginLeft: 0, marginRight: 0, padding: '24px', background: '#fff' }}>
                        <Col xs={24} sm={24} md={24} lg={10}>
                            {item.images.length > 0 ?
                                <Carousel autoplay>
                                    {item.images.map(element => (
                                        <div>
                                            <img alt={element.image} src={element.image} style={{ width: '100%', height: 'auto' }} />
                                        </div>
                                    ))}
                                </Carousel>              
                            : 
                                <img alt={item.name} src={blank} style={{ width: '100%', height: 'auto' }} />
                            }
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={14} style={{ padding: 0 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <Typography.Title level={3} style={{ margin: 0 }}>{item.name}</Typography.Title>                            
                                    <Typography.Text type="secondary" style={{ fontSize: '16px' }}>{getCategory(item.category)}</Typography.Text>
                                </div>
                                <div>
                                    {/* <Typography.Title level={3}>{item.company ? item.company : undefined}</Typography.Title>  */}
                                    <Tag color="#2d2d2d" style={{ fontSize: '16px' }}>Dseabi</Tag>                                   
                                </div>
                            </div>                            
                            <Divider style={{ margin: '16px 0' }} />
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>                        
                                <div>                                    
                                    <Typography.Title level={5} style={{ margin: '0' }}>Үнэ:</Typography.Title>
                                    <Typography.Title level={2} style={{ margin: '0' }}>{formatNumber(item.price)}₮</Typography.Title>
                                </div>                                
                            </div>                            
                            <Divider style={{ margin: '16px 0' }} />                                                                                                                                                                                                                          
                            <Typography.Text style={{ fontSize: '18px' }}>Тоо:</Typography.Text>
                            <InputNumber value={count} size="large" min={1} max={100} style={{ margin: '0 8px 8px 8px' }} onChange={(val) => setCount(val)} />                                                                       
                            {cart && cart.find(x => x.item.id === item.id) ? (
                                <Button type="ghost" size="large" icon={<ShoppingCartOutlined />} style={{ margin: '0 8px 8px 0' }} onClick={() => addToCart("delete")} >Сагснаас гаргах</Button>
                            ) : (
                                <Button type="ghost" size="large" icon={<ShoppingCartOutlined />} style={{ margin: '0 8px 8px 0' }} onClick={() => addToCart("create")} >Сагсанд хийх</Button>
                            )}                            
                            <Link to="/profile?key=cart">
                                <Button type="primary" size="large" icon={<ShoppingOutlined />} style={{ margin: '0 8px 8px 0' }}>Захиалах</Button>                                
                            </Link>                            
                            <Button danger type="primary" size="large" icon={<HeartOutlined />} style={{ margin: '0 8px 8px 0' }} onClick={addToSaved}>
                                { favorite && favorite.find(x => x.id === item.id) ? 'Хадгалсан' : 'Хадгалах' }                                    
                            </Button>
                            <Link to={`/productshop/${item.id}`}>
                                <Button type="ghost" size="large" icon={<ShopOutlined />} style={{ margin: '0 8px 8px 0' }}>Зарагдаж буй салбарууд</Button>                            
                            </Link>
                            <Divider style={{ margin: '16px 0' }} />
                            {item.tag.map(tag => {
                                return (
                                    <Tag>{tag.name}</Tag>
                                )                                
                            })}
                            <div style={{ border: '1px solid #dedede', width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', padding: '16px 8px', marginTop: '16px' }}>
                                <div><Avatar size={64} icon={<CarOutlined />} style={{ background: '#dedede', color: '#000', marginRight: '16px' }} /></div>
                                <div><Typography.Text>14:00 цагаас өмнө захиалсан бүтээгдэхүүн тухайн өдөртөө хүргэгдэх бөгөөд 14:00 цагаас хойш захиалсан бүтээгдэхүүн дараа өдөртөө багтан танд хүргэгдэх болно.</Typography.Text></div>
                            </div>
                            {/* <div style={{ border: '1px solid #dedede', width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', padding: '16px 8px', marginTop: '16px' }}>
                                <div><Avatar size={64} icon={<CreditCardOutlined />} style={{ background: '#dedede', color: '#000', marginRight: '16px' }} /></div>
                                <div><Typography.Text>14:00 цагаас өмнө захиалсан бүтээгдэхүүн тухайн өдөртөө хүргэгдэх бөгөөд 14:00 цагаас хойш захиалсан бүтээгдэхүүн дараа өдөртөө багтан танд хүргэгдэх болно.</Typography.Text></div>
                            </div>                             */}
                        </Col>
                    </Row>
                    <div style={{ marginTop: '24px', padding: '24px', background: '#fff' }}>
                        <Typography.Title level={5} style={{ margin: 0 }}>Бүтээгдэхүүний мэдээлэл:</Typography.Title>
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
                    <Typography.Title level={4} style={{ marginTop: '24px' }}>Төстэй бүтээгдэхүүнүүд:</Typography.Title>
                    <div>                        
                        {suggestedItems ? (
                            <InfiniteCarousel                    
                                dots={false}
                                showSides={true}
                                sidesOpacity={.5}
                                sideSize={.1}
                                slidesToScroll={2}
                                slidesToShow={getSliderCount()}
                                scrollOnDevice={true}                    
                            >
                                {suggestedItems.map(item => {
                                    return (
                                        <ProductCard history={props.history} item={item} user={user} type="" />
                                    )
                                })}
                            </InfiniteCarousel>
                        ) : (
                            <></>
                        )}            
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