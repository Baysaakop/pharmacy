import { Grid, Breadcrumb, Button, Result,  Row, Col, Typography, Avatar, Statistic, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import api from '../api';
import AccountDetail from './AccountDetail';
import { CloseCircleOutlined, GoldOutlined, HeartOutlined, ScheduleOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import Saved from './Saved';
import Logout from './Logout';
import Cart from './Cart';

const { useBreakpoint } = Grid;

function Profile (props) {
    const screens = useBreakpoint()
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

    return (
        <div style={{ margin: '24px 10%' }}>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <a href="/">Нүүр хуудас</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    Профайл
                </Breadcrumb.Item>
            </Breadcrumb>
            <div className="container" style={{ margin: '24px 0' }}>
            {user ? (
                <Row gutter={[16, 16]}>
                    <Col span={6}>
                        <div style={{ backgroundColor: '#f0f2f5', padding: '16px' }}>
                            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '16px' }}>
                                <Avatar size={48} style={{ backgroundColor: '#FFF', color: '#000', border: '2px solid #000', fontWeight: 'bold' }}>{user.username.toString().slice(0, 1)}</Avatar>
                                <div style={{ marginLeft: '16px' }}>
                                    <Typography.Title level={4} style={{ margin: 0 }}>{user.username}</Typography.Title>
                                    <Typography.Text>{user.email}</Typography.Text>
                                </div>
                            </div>                                                
                            <Statistic title="Таны бонус" value={5130} suffix="оноо" prefix={<GoldOutlined />} />       
                            <Menu mode="inline" defaultSelectedKeys={key} style={{ backgroundColor: 'rgba(0, 0, 0, 0)', marginTop: '16px' }} onClick={onSelect}>
                                <Menu.Item icon={<UserOutlined style={{ fontSize: '18px' }} />} key="1">Хувийн мэдээлэл</Menu.Item>
                                <Menu.Item icon={<HeartOutlined style={{ fontSize: '18px' }} />} key="2">Хадгалсан</Menu.Item>
                                <Menu.Item icon={<ShoppingCartOutlined style={{ fontSize: '18px' }} />} key="3">Сагс</Menu.Item>
                                <Menu.Item icon={<ScheduleOutlined style={{ fontSize: '18px' }} />} key="4">Захиалгын түүх</Menu.Item>
                                <Menu.Item icon={<CloseCircleOutlined style={{ fontSize: '18px' }} />} key="5">Гарах</Menu.Item>
                            </Menu>
                        </div>
                    </Col>
                    <Col span={18}>
                        { key === "1" ?
                            <AccountDetail user={user} token={props.token} />
                        : key === "2" ?
                            <Saved items={user.profile.favorite} user={user} />
                        : key === "3" ? 
                            <Cart items={user.profile.cart} user={user} />
                        : key === "4" ?
                            <Typography.Title>Order history</Typography.Title>
                        : key === "5" ? 
                            <Logout />
                        : <></>}
                    </Col>
                </Row>
                // <Tabs tabPosition={screens.xs ? "top" : "left"} style={{ minHeight: '80vh', padding: '8px' }}>
                //     <Tabs.TabPane tab="Account details" key="1">
                //         <div style={{ padding: '8px' }}>
                //             <AccountDetail user={user ? user : undefined} token={props.token} />
                //         </div>
                //     </Tabs.TabPane>
                //     <Tabs.TabPane tab="User activity" key="2">
                //         <div style={{ padding: '8px' }}>User activity</div>                        
                //     </Tabs.TabPane>
                //     <Tabs.TabPane tab="Data" key="3">
                //         <div style={{ padding: '8px' }}>Data</div>        
                //     </Tabs.TabPane>
                // </Tabs>                
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