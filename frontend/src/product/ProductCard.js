import { EllipsisOutlined, HeartOutlined, ShoppingCartOutlined, StarFilled } from "@ant-design/icons";
import { Card, Tooltip, Typography, Modal, message, notification } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; 
import api from "../api";
import { connect } from 'react-redux';

function ProductCard (props) {

    const [visible, setVisible] = useState(false)
    const [cart, setCart] = useState()
    const [favorite, setFavorite] = useState()

    useEffect(() => {       
        if (props.token) {
            getFavorite()
            getCart()
        }
    }, [props.token]) // eslint-disable-line react-hooks/exhaustive-deps

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

    function addToSaved () {
        if (props.token) {  
            if (favorite) {                
                axios({
                    method: 'PUT',
                    url: `${api.favorites}/${favorite.id}/`,
                    data: {
                        item: props.item.id,
                        token: props.token
                    }
                }).then(res => {                    
                    if (favorite.items.find(x => x.id === props.item.id)) {
                        notification['warning']({
                            message: 'Жагсаалтаас хасагдлаа.',
                            description:
                              `'${props.item.name}' бүтээгдэхүүн таны хадгалсан бүтээгдэхүүнүүдийн жагсаалтаас хасагдлаа.`,
                        });
                    } else {
                        notification['success']({
                            message: 'Амжилттай хадгаллаа.',
                            description:
                              `'${props.item.name}' бүтээгдэхүүн таны хадгалсан бүтээгдэхүүнүүдийн жагсаалтад нэмэгдлээ.`,
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
                        item: props.item.id, 
                        token: props.token
                    }
                }).then(res => {                    
                    setFavorite(res.data)
                    notification['success']({
                        message: 'Амжилттай хадгаллаа.',
                        description:
                          `'${props.item.name}' бүтээгдэхүүн таны хадгалсан бүтээгдэхүүнүүдийн жагсаалтад нэмэгдлээ.`,
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
                        item: props.item.id,
                        count: 1,
                        token: props.token
                    }
                }).then(res => {                                        
                    setCart(res.data)
                    notification['success']({
                        message: 'Сагсанд нэмэгдлээ.',
                        description: `'${props.item.name}' бүтээгдэхүүн таны сагсанд нэмэгдлээ.`,
                    });
                }).catch(err => {
                    console.log(err)
                })
            } else {
                axios({
                    method: 'POST',
                    url: `${api.carts}/`,
                    data: {
                        item: props.item.id, 
                        count: 1,
                        token: props.token
                    }
                }).then(res => {                    
                    setCart(res.data)
                    notification['success']({
                        message: 'Сагсанд нэмэгдлээ.',
                        description: `'${props.item.name}' бүтээгдэхүүн таны сагсанд нэмэгдлээ.`,
                    });
                }).catch(err => {
                    console.log(err)
                })
            }            
        } else {
            props.history.push('/login')
        }
    }

    function getCategory (categories) {
        let res = []
        categories.forEach(element => {
            res.push(element.name)
        })
        return res.toString()
    }

    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    return (
        <div>            
            <Card     
                hoverable
                size="small"           
                style={{ width: '100%' }}
                cover={
                    <Link to={`/products/${props.item.id}`}>
                        <img alt={props.item.name} src={props.item.image} style={{ width: '100%', height: 'auto' }} />
                    </Link>
                }                
                actions={ props.action ? [
                    favorite && favorite.items.find(x => x.id === props.item.id) ? (
                        <Tooltip title="Хадгалсан">
                            <HeartOutlined style={{ color: '#EA2027' }} key="save" onClick={addToSaved} />
                        </Tooltip>
                    ) : (
                        <Tooltip title="Хадгалах">
                            <HeartOutlined key="save" onClick={addToSaved} />
                        </Tooltip>
                    ),               
                    cart && cart.items.find(x => x.item.id === props.item.id) ? (                        
                        <Tooltip title="Сагсанд байгаа">
                            <ShoppingCartOutlined style={{ color: '#000' }} key="cart" onClick={addToCart} />
                        </Tooltip>                        
                    ) : (
                        <Tooltip title="Сагслах">
                            <ShoppingCartOutlined key="cart" onClick={addToCart} />
                        </Tooltip>
                    ),                         
                    <Tooltip title="Дэлгэрэнгүй">
                        <EllipsisOutlined key="ellip" onClick={() => setVisible(true)} />
                    </Tooltip>,                                        
                ] : <></>}
            >
                <Link to={`/products/${props.item.id}`}>
                    <Card.Meta 
                        title={props.item.name}    
                        description={getCategory(props.item.category)}                    
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>                        
                        <div>
                            <Typography.Title level={5} style={{ margin: '0', color: '#000' }}>{formatNumber(props.item.price)}₮</Typography.Title>
                        </div>
                        <div>
                            <StarFilled style={{ color: '#f9ca24' }} />
                            <Typography.Text> {props.item.rating / 10}</Typography.Text>
                        </div>
                    </div>
                </Link>
                <Modal title={props.item.name} visible={visible} onOk={() => setVisible(false)} onCancel={() => setVisible(false)}>
                    <Typography.Title level={5}>Тайлбар:</Typography.Title>
                    <Typography.Paragraph>
                        {props.item.description}
                    </Typography.Paragraph>
                    <Typography.Title level={5} style={{ margin: 0 }}>Найрлага:</Typography.Title>
                    <Typography.Paragraph>
                        {props.item.ingredients}                                
                    </Typography.Paragraph>
                    <Typography.Title level={5} style={{ margin: 0 }}>Хэрэглэх заавар:</Typography.Title>
                    <Typography.Paragraph>
                        {props.item.usage}                                
                    </Typography.Paragraph>
                    <Typography.Title level={5} style={{ margin: 0 }}>Хадгалах нөхцөл:</Typography.Title>
                    <Typography.Paragraph>
                        {props.item.caution}                                
                    </Typography.Paragraph>
                    <Typography.Title level={5} style={{ margin: 0 }}>Анхааруулга:</Typography.Title>
                    <Typography.Paragraph>
                        {props.item.caution}                                
                    </Typography.Paragraph>
                </Modal>
            </Card>            
        </div>
    )
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

export default connect(mapStateToProps)(ProductCard)