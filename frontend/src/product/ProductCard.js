import { EllipsisOutlined, HeartOutlined, ShoppingCartOutlined, StarFilled } from "@ant-design/icons";
import { Card, Tooltip, Typography, Modal, message, notification } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; 
import api from "../api";

function ProductCard (props) {
    const [visible, setVisible] = useState(false)

    function addToSaved () {
        if (props.user) {  
            axios({
                method: 'PUT',
                url: `${api.profiles}/${props.user.profile.id}/`,
                headers: {
                    'Content-Type': 'application/json',                                              
                },
                data: {
                    favorite: true,
                    item: props.item.id,
                    count: 1,
                    token: props.token
                }
            })            
            .then(res => {
                if (res.status === 200 || res.status === 201) {
                    console.log(res)                    
                }                                                         
            })
            .catch(err => {                      
                console.log(err.message)         
                message.error("Алдаа гарлаа. Дахин оролдоно уу.")            
            }) 
            // if (favorite) {                
            //     axios({
            //         method: 'PUT',
            //         url: `${api.favorites}/${favorite.id}/`,
            //         data: {
            //             item: props.item.id,
            //             token: props.token
            //         }
            //     }).then(res => {                    
            //         if (favorite.items.find(x => x.id === props.item.id)) {
            //             notification['warning']({
            //                 message: 'Жагсаалтаас хасагдлаа.',
            //                 description:
            //                   `'${props.item.name}' бүтээгдэхүүн таны хадгалсан бүтээгдэхүүнүүдийн жагсаалтаас хасагдлаа.`,
            //             });
            //         } else {
            //             notification['success']({
            //                 message: 'Амжилттай хадгаллаа.',
            //                 description:
            //                   `'${props.item.name}' бүтээгдэхүүн таны хадгалсан бүтээгдэхүүнүүдийн жагсаалтад нэмэгдлээ.`,
            //             });
            //         }
            //         setFavorite(res.data)
            //     }).catch(err => {
            //         console.log(err)
            //     })
            // } else {
            //     axios({
            //         method: 'POST',
            //         url: `${api.favorites}/`,
            //         data: {
            //             item: props.item.id, 
            //             token: props.token
            //         }
            //     }).then(res => {                    
            //         setFavorite(res.data)
            //         notification['success']({
            //             message: 'Амжилттай хадгаллаа.',
            //             description:
            //               `'${props.item.name}' бүтээгдэхүүн таны хадгалсан бүтээгдэхүүнүүдийн жагсаалтад нэмэгдлээ.`,
            //         });
            //     }).catch(err => {
            //         console.log(err)
            //     })
            // }            
        } else {
            props.history.push('/login')
        }
    }

    function addToCart() {        
        // if (props.token) {                       
        //     if (cart) {                
        //         axios({
        //             method: 'PUT',
        //             url: `${api.carts}/${cart.id}/`,
        //             data: {
        //                 item: props.item.id,
        //                 count: 1,
        //                 token: props.token
        //             }
        //         }).then(res => {                                        
        //             setCart(res.data)
        //             notification['success']({
        //                 message: 'Сагсанд нэмэгдлээ.',
        //                 description: `'${props.item.name}' бүтээгдэхүүн таны сагсанд нэмэгдлээ.`,
        //             });
        //         }).catch(err => {
        //             console.log(err)
        //         })
        //     } else {
        //         axios({
        //             method: 'POST',
        //             url: `${api.carts}/`,
        //             data: {
        //                 item: props.item.id, 
        //                 count: 1,
        //                 token: props.token
        //             }
        //         }).then(res => {                    
        //             setCart(res.data)
        //             notification['success']({
        //                 message: 'Сагсанд нэмэгдлээ.',
        //                 description: `'${props.item.name}' бүтээгдэхүүн таны сагсанд нэмэгдлээ.`,
        //             });
        //         }).catch(err => {
        //             console.log(err)
        //         })
        //     }            
        // } else {
        //     props.history.push('/login')
        // }
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
                        <img alt={props.item.name} src={props.item.images[0].image} style={{ width: '100%', height: 'auto' }} />
                    </Link>
                }                
                actions={ props.action ? [
                    props.user && props.user.profile.favorite.find(x => x.id === props.item.id) ? (
                        <Tooltip title="Хадгалсан">
                            <HeartOutlined style={{ color: '#EA2027' }} key="save" onClick={addToSaved} />
                        </Tooltip>
                    ) : (
                        <Tooltip title="Хадгалах">
                            <HeartOutlined key="save" onClick={addToSaved} />
                        </Tooltip>
                    ),               
                    props.user && props.user.profile.cart.find(x => x.item.id === props.item.id) ? (                        
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

export default (ProductCard)