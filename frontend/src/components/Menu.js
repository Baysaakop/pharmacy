import React, { useEffect, useState } from 'react';
import { Button, Grid, Menu, Badge, Tooltip } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { BellOutlined, CloseCircleOutlined, CoffeeOutlined, EditOutlined, HeartOutlined, MailOutlined, MenuOutlined, QuestionCircleOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import axios from 'axios';
import api from '../api';
import './Menu.css'

const { SubMenu, Item } = Menu;
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

const styleMenuItem = {
    fontSize: '18px'    
}

function CustomMenu (props) {    
    const screens = useBreakpoint();
    const [current, setCurrent] = useState('home');
    const [collapsed, setCollapsed] = useState(true);      
    const [user, setUser] = useState();

    useEffect(() => {
        const menuItem = props.location.pathname.toString().split('/')[1]
        setCurrent(menuItem === '' ? 'home' : menuItem)
        if (props.token && props.token !== null && !user) {
            axios({
                method: 'GET',
                url: api.profile,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${props.token}`
                }
            }).then(res => {                    
                setUser(res.data)
            }).catch(err => {
                console.log(err.message)
            })
        }
    }, [props.location, props.token]) // eslint-disable-line react-hooks/exhaustive-deps

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
                            <div style={{ color: '#000', fontSize: '24px', fontWeight: 'bold' }}>                        
                                LOGO                        
                            </div>        
                        </Link>
                        <Button type="primary" onClick={handleMenuCollapsed} style={ props.darkMode ? { background: '#161b22', color: '#fff', border: '1px solid #fff' } : { background: '#fff', color: '#000', border: '1px solid #000' }}>
                            <MenuOutlined />
                        </Button>
                    </div>
                    <Menu 
                        theme={props.darkMode ? "dark" : "light"} 
                        mode="inline" 
                        hidden={collapsed} 
                        onClick={handleMenuClick}
                        selectedKeys={[current]}
                    >                
                        <Item key="items" icon={<CoffeeOutlined style={{ fontSize: '18px' }} />} style={styleMenuItem} >
                            <Link to="/items">Items</Link>
                        </Item>
                        <Item key="help" icon={<QuestionCircleOutlined style={{ fontSize: '18px' }} />} style={styleMenuItem} >
                            <Link to="/help">Help</Link>
                        </Item>
                        <Item key="contact" icon={<MailOutlined style={{ fontSize: '18px' }} />} style={styleMenuItem}>
                            <Link to="/contact">Contact</Link>
                        </Item>                   
                        { user && user !== null ? (
                            <SubMenu key="account" icon={<UserOutlined style={{ fontSize: '18px' }} />} style={styleMenuItem} title={user.username}>
                                <Item key="profile" style={styleMenuItem} icon={<UserOutlined style={{ fontSize: '16px' }} />}>
                                    <a href="/profile">Profile</a>                
                                </Item>
                                <Item key="notification" style={styleMenuItem} icon={<BellOutlined style={{ fontSize: '16px' }} />}>
                                    <a href="/notification">Notification</a>
                                </Item>
                                <Item key="newpost" style={styleMenuItem} icon={<EditOutlined style={{ fontSize: '16px' }} />}>
                                    <a href="/newpost">New Post</a>
                                </Item>            
                                <Item key="logout" style={styleMenuItem} icon={<CloseCircleOutlined style={{ fontSize: '16px' }} />}>
                                    <a href="logout">Log Out</a>
                                </Item>   
                            </SubMenu> 
                        ) : (
                            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '16px' }}>
                                <Button href="/login" size="large" type="default" style={ props.darkMode ? { background: '#161b22', color: '#fff', fontSize: '18px', marginRight: '8px' } : { fontSize: '18px', marginRight: '8px' }}>Login</Button>
                                <Button href="/signup" size="large" type="primary" style={{ fontSize: '18px' }}>Sign Up</Button>
                            </div>
                        ) }                                                                             
                    </Menu>
                </div>
            ) : (
                <div style={styleHeaderWeb}>
                    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Link to="/">
                            <div style={{ color: '#000', fontSize: '28px', fontWeight: 'bold', marginRight: '24px' }}>                        
                                ЛОГО                        
                            </div>        
                        </Link>
                        <Menu 
                            theme="light"
                            mode="horizontal" 
                            onClick={handleMenuClick} 
                            selectedKeys={[current]} 
                            style={styleMenuWeb}
                        >   
                            <Menu.Item key="about" style={styleMenuItem} >
                                <Link to="/about">Бидний тухай</Link>
                            </Menu.Item>             
                            <Menu.Item key="products" style={styleMenuItem} >
                                <Link to="/products">Бүтээгдэхүүн</Link>
                            </Menu.Item>
                            <Menu.Item key="help" style={styleMenuItem} >
                                <Link to="/help">Мэдээлэл</Link>
                            </Menu.Item>
                            <Menu.Item key="contact" style={styleMenuItem}>
                                <Link to="/contact">Холбоо барих</Link>
                            </Menu.Item>                                                                      
                        </Menu>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <div style={{ marginRight: '16px' }}>
                            <Tooltip title="Хадгалсан">
                                <Button size="large" type="text" icon={<HeartOutlined />} />
                            </Tooltip>
                        </div>                        
                        <div style={{ marginRight: '16px' }}>
                            <Badge count={0} overflowCount={9} size="default" >
                                <Tooltip title="Сагс">
                                    <Button size="large" type="text" icon={<ShoppingCartOutlined />} />
                                </Tooltip>
                            </Badge>
                        </div> 
                        { user ? (
                            <Link to="/profile">
                                <Tooltip title="Профайл">
                                    <Button size="large" type="text" style={{ width: '40px', height: '40px', fontWeight: 'bold' }}>{user.username.toString().slice(0, 1)}</Button>  
                                </Tooltip>
                            </Link>
                        ) : (
                            <Link to="/login">
                                <Tooltip title="Нэвтрэх">
                                    <Button size="large" type="text" icon={<UserOutlined />} />                                                
                                </Tooltip>
                            </Link>  
                        )}                                                                     
                    </div>
                </div>
            )}                        
        </div>
    )
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())        
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomMenu));