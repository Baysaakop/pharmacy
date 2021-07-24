import React, { useEffect, useState } from 'react';
import { Button, Grid, Menu, Badge, Tooltip, Tag, Avatar, Typography, Input, Statistic } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { BellOutlined, CloseCircleOutlined, CoffeeOutlined, CrownOutlined, DatabaseOutlined, EditOutlined, HeartOutlined, InfoCircleOutlined, MailOutlined, MenuOutlined, PhoneOutlined, QuestionCircleOutlined, ReadOutlined, ShopOutlined, ShoppingCartOutlined, StarOutlined, ThunderboltOutlined, UserOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import axios from 'axios';
import api from '../api';
import './Menu.css'
import logo from './logo.png';

const { SubMenu } = Menu;
const { useBreakpoint } = Grid;

const styleHeaderWeb = {
    display: 'flex',
    justifyContent: 'space-between', 
    alignItems: 'center',
    padding: '0 10%',
    height: '80px',        
    color: '#000'
}

const styleHeaderMobile = {
    display: 'flex',
    justifyContent: 'space-between', 
    alignItems: 'center',
    padding: '5%',
    height: '80px',
}

const styleMenuWeb = {
    height: '100%',
    background: 'rgba(0, 0, 0, 0)',
    borderBottom: '0'
}

function CustomMenu (props) {    
    const screens = useBreakpoint()
    const [current, setCurrent] = useState('home')
    const [collapsed, setCollapsed] = useState(true)
    const [user, setUser] = useState()    
    const [cart, setCart] = useState([])

    useEffect(() => {
        const menuItem = props.location.pathname.toString().split('/')[1]
        setCurrent(menuItem === '' ? 'home' : menuItem)
        if (props.token && props.token !== null && !user) {
            getUser()
        }
        if (props.cart && props.cart !== null && props.cart.length !== cart.length) {
            setCart(props.cart)
            getUser()
        }
    }, [props.location, props.token, props.cart]) // eslint-disable-line react-hooks/exhaustive-deps

    function getUser () {
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
            console.log(err.message)
        })
    }    

    const handleMenuClick = (e) => {               
        setCurrent(e.key);
        setCollapsed(true);        
    };

    const handleMenuCollapsed = () => {
        setCollapsed(!collapsed);
    }     

    return (
        <div className="menu">              
            {screens.xs ? (
                <div>
                    <div style={styleHeaderMobile}>
                        <Link to="/">
                            <Avatar size={48} src={logo} style={{ marginBottom: '8px', marginRight: '4px' }} />
                            <Typography.Text style={{ fontWeight: 'bold', fontSize: '24px', marginRight: '16px' }}>Ирмүүн аз</Typography.Text>
                        </Link>
                        <Button type="primary" onClick={handleMenuCollapsed} style={ props.darkMode ? { background: '#161b22', color: '#fff', border: '1px solid #fff' } : { background: '#fff', color: '#000', border: '1px solid #000' }}>
                            <MenuOutlined />
                        </Button>
                    </div>
                    <Menu 
                        theme="light"
                        mode="inline" 
                        hidden={collapsed} 
                        onClick={handleMenuClick}
                        selectedKeys={[current]}
                    >                
                        <Menu.Item key="about" style={{ fontSize: '16px' }} icon={<InfoCircleOutlined />} >
                            <Link to="/about">Бидний тухай</Link>
                        </Menu.Item>             
                        <Menu.Item key="products" style={{ fontSize: '16px' }} icon={<ShopOutlined />}>
                            <Link to="/products">Эмийн сан</Link>
                        </Menu.Item>
                        <Menu.Item key="help" style={{ fontSize: '16px' }} icon={<ReadOutlined />}>
                            <Link to="/help">Мэдээлэл</Link>
                        </Menu.Item>
                        <Menu.Item key="contact" style={{ fontSize: '16px' }} icon={<PhoneOutlined />}>
                            <Link to="/contact">Холбогдох</Link>
                        </Menu.Item>      
                        <Menu.Item key="saved" style={{ fontSize: '16px' }} icon={<HeartOutlined />}>
                            <Link to="/profile?key=saved" style={{ width: '100%' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>Хадгалсан бүтээгдэхүүн</div>
                                    <Avatar shape="square" style={{ background: 'red', color: 'white' }}>
                                    {user && user.profile.favorite.length ? user.profile.favorite.length : 0}
                                    </Avatar>
                                </div>
                            </Link>
                        </Menu.Item>      
                        <Menu.Item key="cart" style={{ fontSize: '16px' }} icon={<ShoppingCartOutlined />}>
                            <Link to="/profile?key=cart" style={{ width: '100%' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>Таны сагс</div>
                                    <Avatar shape="square" style={{ background: 'red', color: 'white' }}>
                                    {user && user.profile.cart.length ? user.profile.cart.length : 0}
                                    </Avatar>
                                </div>
                            </Link>
                        </Menu.Item>      
                        { user ? (
                            <Menu.Item key="profile" style={{ fontSize: '16px' }} icon={<UserOutlined />}>
                                <Link to="/profile" style={{ width: '100%' }}>
                                    Профайл
                                </Link>
                            </Menu.Item>    
                        ) : (
                            <Menu.Item key="login" style={{ fontSize: '16px' }} icon={<UserOutlined />}>
                                <Link to="/login" style={{ width: '100%' }}>
                                    Нэвтрэх
                                </Link>
                            </Menu.Item>   
                        )}  
                        {/* <Menu.Item key="brandproducts">
                            <Link to="/brandproducts">
                                <Tag color="#e84118" style={{ fontSize: '16px', padding: '8px' }}>                                    
                                Брэнд бүтээгдэхүүн
                                </Tag>
                            </Link>
                        </Menu.Item> */}                        
                    </Menu>
                </div>
            ) : (
                <div>
                    <div style={{ height: '80px', width: '100%', borderBottom: '1px solid #dedede', padding: '0 10%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div className="logo">
                            <Link to="/">
                                <Avatar size={48} src={logo} style={{ marginBottom: '8px', marginRight: '4px' }} />
                                <Typography.Text style={{ fontWeight: 'bold', fontSize: '24px', marginRight: '16px' }}>Ирмүүн аз</Typography.Text>
                            </Link>
                        </div>
                        <div className="user" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Input.Search placeholder="Бүтээгдэхүүн хайх..." style={{ width: '300px' }} />
                            <Link to="/profile?key=saved">
                                <Badge count={user && user.profile.favorite.length ? user.profile.favorite.length : 0} overflowCount={9} size="default" >
                                    <Tooltip title="Хадгалсан бүтээгдэхүүн">                                               
                                        <Button size="middle" icon={<HeartOutlined />} style={{ marginLeft: '12px' }} />                                                                    
                                    </Tooltip>
                                </Badge>
                            </Link>                                               
                            <Link to="/profile?key=cart">
                                <Badge count={user && user.profile.cart.length ? user.profile.cart.length : 0} overflowCount={9} size="default" >
                                    <Tooltip title="Таны сагс">
                                        <Button size="middle" icon={<ShoppingCartOutlined />} style={{ marginLeft: '12px' }} />                                        
                                    </Tooltip>
                                </Badge>
                            </Link>                        
                            { user ? (
                                <>
                                    {/* {parseInt(user.profile.role) < 3 ? (
                                        <Link to="/admin">
                                            <Tooltip title="Ажилтан">                                           
                                                <Button size="middle" icon={<DatabaseOutlined />} style={{ marginLeft: '12px' }} />
                                            </Tooltip>
                                        </Link>
                                    ) : (<></>)} */}
                                    <Link to="/profile">
                                        <Tooltip title="Профайл">                                        
                                            <Button danger type="primary" size="middle" icon={<UserOutlined />} style={{ marginLeft: '12px' }} />
                                        </Tooltip>
                                    </Link> 
                                    <div style={{ marginLeft: '12px' }}>
                                        <div style={{ margin: 0, color: '#8e8e8e', fontSize: '12px' }}>Таны хэтэвч</div>      
                                        <div style={{ margin: 0, fontWeight: 'bold' }}>₮8,213</div>                       
                                    </div>                                                   
                                </>
                            ) : (
                                <Link to="/login">
                                    <Tooltip title="Нэвтрэх">
                                        <Button size="middle" icon={<UserOutlined />} style={{ marginLeft: '12px' }}>Нэвтрэх</Button>                                                
                                    </Tooltip>
                                </Link>  
                            )}                                                                     
                        </div>
                    </div>
                    <div style={{ height: '40px', width: '100%', padding: '0 10%', border: 0 }}>
                        <Menu                         
                            mode="horizontal" 
                            onClick={handleMenuClick} 
                            selectedKeys={[current]}        
                            style={{ lineHeight: '36px', border: 0 }}                 
                        >   
                            <Menu.Item key="brandproducts" style={{ margin: 0 }}>
                                <Link to="/brandproducts">
                                    <Tag color="#e84118" style={{ fontSize: '14px', padding: '3px 8px' }}>                                    
                                    <StarOutlined style={{ marginRight: '4px' }} /> Брэнд бүтээгдэхүүн
                                    </Tag>
                                </Link>
                            </Menu.Item>         
                            <Menu.Item key="about" icon={<InfoCircleOutlined />} >
                                <Link to="/about">Бидний тухай</Link>
                            </Menu.Item>             
                            <Menu.Item key="products" icon={<ShopOutlined />} >
                                <Link to="/products">Эмийн сан</Link>
                            </Menu.Item>
                            <Menu.Item key="help" icon={<ReadOutlined />}>
                                <Link to="/help">Мэдээлэл</Link>
                            </Menu.Item>
                            <Menu.Item key="contact" icon={<PhoneOutlined />}>
                                <Link to="/contact">Холбогдох</Link>
                            </Menu.Item>                 
                        </Menu>
                    </div>                    
                </div>
            )}                        
        </div>
    )
}

const mapStateToProps = state => {
    return {
        token: state.token,
        cart: state.cart
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())        
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomMenu));