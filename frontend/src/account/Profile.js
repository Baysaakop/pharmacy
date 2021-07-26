import { Breadcrumb, Button, Result,  Row, Col, Typography, Avatar, Menu, Rate } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import api from '../api';
import AccountDetail from './AccountDetail';
import { CloseCircleOutlined, GoldOutlined, HeartOutlined, ScheduleOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import Saved from './Saved';
import Logout from './Logout';
import Cart from './Cart';
import OrderHistory from './OrderHistory';

const percentages = ['2%', '3%', '4%', '5%', '6%'];

function Profile (props) {    
    const [user, setUser] = useState()
    const [key, setKey] = useState("1")

    useEffect(() => {        
        let key = props.location.search.split("=")[1]
        if (key === "saved") {
            setKey("2")
        }
        else if (key === "cart") {
            setKey("3")
        } else {
            setKey("1")
        }
        axios({
            method: 'GET',
            url: api.profile,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${props.token}`
            }
        }).then(res => {           
            console.log(res.data) 
            setUser(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [props.token, props.location.search])

    function onSelect (e) {
        setKey(e.key)
    }

    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <a href="/">Нүүр хуудас</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    Профайл
                </Breadcrumb.Item>
            </Breadcrumb>
            <div className="container" style={{ marginTop: '24px' }}>
            {user ? (
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={24} lg={6}>
                        <div style={{ background: '#fff', borderRadius: '2px', padding: '16px' }}>
                            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '16px' }}>                                
                                <Avatar size={48} shape="square" icon={<UserOutlined />} style={{ background: '#2ed573' }} />
                                <div style={{ marginLeft: '16px' }}>
                                    <Typography.Title level={4} style={{ margin: 0 }}>{user.username}</Typography.Title>
                                    <Typography.Text>{user.email}</Typography.Text>
                                </div>
                            </div>                             
                            <Typography.Title level={5} style={{ margin: 0 }}>Урамшууллын хувь</Typography.Title>                                               
                            <Rate disabled count={5} value={4} tooltips={percentages} />                            
                            <span className="ant-rate-text" style={{ fontWeight: 'bold' }}>- 5%</span>
                            <Typography.Title level={5} style={{ margin: 0 }}>Урамшууллын оноо</Typography.Title>  
                            <Typography.Title level={4} style={{ margin: 0 }}><GoldOutlined /> {formatNumber(7319)}</Typography.Title>                                                                         
                            <Menu mode="inline" defaultSelectedKeys={key} style={{ backgroundColor: 'rgba(0, 0, 0, 0)', marginTop: '16px' }} onClick={onSelect}>
                                <Menu.Item icon={<UserOutlined style={{ fontSize: '18px' }} />} key="1">Хувийн мэдээлэл</Menu.Item>
                                <Menu.Item icon={<HeartOutlined style={{ fontSize: '18px' }} />} key="2">Хадгалсан</Menu.Item>
                                <Menu.Item icon={<ShoppingCartOutlined style={{ fontSize: '18px' }} />} key="3">Сагс</Menu.Item>
                                <Menu.Item icon={<ScheduleOutlined style={{ fontSize: '18px' }} />} key="4">Захиалгын түүх</Menu.Item>
                                <Menu.Item icon={<CloseCircleOutlined style={{ fontSize: '18px' }} />} key="5">Гарах</Menu.Item>
                            </Menu>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={18}>
                        { key === "1" ?
                            <AccountDetail user={user} token={props.token} />
                        : key === "2" ?
                            <Saved items={user.profile.favorite} user={user} />
                        : key === "3" ? 
                            <Cart items={user.profile.cart} user={user} />                            
                        : key === "4" ?
                            <OrderHistory user={user} />
                        : key === "5" ? 
                            <Logout />
                        : <></>}
                    </Col>
                </Row>                           
            ) : (
                <Result
                    status="403"
                    title="Хуудас үзэх боломжгүй."
                    subTitle="Та эхлээд системд нэвтэрч орно уу."
                    extra={<Button type="primary" href="/login">Нэвтрэх</Button>}
                />
            )}
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

export default connect(mapStateToProps)(Profile)