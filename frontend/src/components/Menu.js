import React, { useEffect, useState } from 'react';
import { Button, Grid, Menu, Badge, Tooltip, Tag, Avatar, Input, Dropdown } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { DatabaseOutlined, GlobalOutlined, HeartOutlined, InfoCircleOutlined, MenuOutlined, PhoneOutlined, ReadOutlined, ShopOutlined, ShoppingCartOutlined, StarOutlined, PercentageOutlined, UserOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import axios from 'axios';
import api from '../api';
import logo from './logo.png';

const { useBreakpoint } = Grid;

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
                    <div style={{ height: '80px', width: '100%', borderBottom: '1px solid #dedede', padding: '0 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Link to="/">
                            <div className="logo" style={{ display: 'flex', justifyContent: 'flex-start', alignContent: 'center' }}>                            
                                <div>
                                    <Avatar size={48} src={logo} style={{ marginBottom: '8px', marginRight: '4px' }} />
                                </div>
                                <div>                                    
                                    <div style={{ margin: 0, fontWeight: 'bold', fontSize: '24px', color: 'black' }}>???????????? ????</div>                       
                                    <div style={{ margin: 0, color: '#8e8e8e', fontSize: '12px', marginTop: '-8px' }}>???? ???????????????????? ????????????</div>       
                                </div>                                                                                                                                   
                            </div>
                        </Link>
                        <Button type="primary" onClick={handleMenuCollapsed} style={ props.darkMode ? { background: '#161b22', color: '#fff', border: '1px solid #fff' } : { background: '#fff', color: '#000', border: '1px solid #000' }}>
                            <MenuOutlined />
                        </Button>
                    </div>
                    <div style={{ height: '40px', width: '100%', padding: '0 5%', border: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <Input.Search placeholder="????????..." style={{ width: '180px' }} />                                                          
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Dropdown overlay={
                                <Menu selectedKeys={['mn']}>
                                    <Menu.Item key="mn">
                                        <Tag>MN</Tag>????????????                                       
                                    </Menu.Item>
                                    <Menu.Item key="en">
                                        <Tag>EN</Tag>English
                                    </Menu.Item>
                                </Menu>
                            }>
                                <Button size="middle" icon={<GlobalOutlined />} style={{ marginLeft: '8px' }} />                                                                    
                            </Dropdown>                                                                      
                            { user ? (
                                <>                               
                                    <Link to="/profile">
                                        <Tooltip title="??????????????">                                        
                                            <Button danger type="primary" size="middle" icon={<UserOutlined />} style={{ marginLeft: '8px' }} />
                                        </Tooltip>
                                    </Link> 
                                    <div style={{ marginLeft: '4px' }}>
                                        <div style={{ margin: 0, color: '#8e8e8e', fontSize: '12px' }}>???????? ????????????</div>      
                                        <div style={{ margin: 0, fontWeight: 'bold' }}>???8,213</div>                       
                                    </div>                                                   
                                </>
                            ) : (
                                <Link to="/login">
                                    <Tooltip title="??????????????">
                                        <Button size="middle" icon={<UserOutlined />} style={{ marginLeft: '8px' }}>??????????????</Button>                                                
                                    </Tooltip>
                                </Link>  
                            )} 
                        </div>                        
                    </div>
                    <Menu 
                        theme="light"
                        mode="inline" 
                        hidden={collapsed} 
                        onClick={handleMenuClick}
                        selectedKeys={[current]}
                    >                
                        <Menu.Item key="about" style={{ fontSize: '16px' }} icon={<InfoCircleOutlined />} >
                            <Link to="/about">???????????? ??????????</Link>
                        </Menu.Item>             
                        <Menu.Item key="products" style={{ fontSize: '16px' }} icon={<ShopOutlined />}>
                            <Link to="/products">?????????? ??????</Link>
                        </Menu.Item>
                        <Menu.Item key="help" style={{ fontSize: '16px' }} icon={<ReadOutlined />}>
                            <Link to="/help">????????????????</Link>
                        </Menu.Item>
                        <Menu.Item key="contact" style={{ fontSize: '16px' }} icon={<PhoneOutlined />}>
                            <Link to="/contact">??????????????????</Link>
                        </Menu.Item>      
                        <Menu.Item key="saved" style={{ fontSize: '16px' }} icon={<HeartOutlined />}>
                            <Link to="/profile?key=saved" style={{ width: '100%' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>?????????????????? ????????????????????????</div>
                                    <Avatar shape="square" style={{ background: 'red', color: 'white' }}>
                                    {user && user.profile.favorite.length ? user.profile.favorite.length : 0}
                                    </Avatar>
                                </div>
                            </Link>
                        </Menu.Item>      
                        <Menu.Item key="cart" style={{ fontSize: '16px' }} icon={<ShoppingCartOutlined />}>
                            <Link to="/profile?key=cart" style={{ width: '100%' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>???????? ????????</div>
                                    <Avatar shape="square" style={{ background: 'red', color: 'white' }}>
                                    {user && user.profile.cart.length ? user.profile.cart.length : 0}
                                    </Avatar>
                                </div>
                            </Link>
                        </Menu.Item>      
                        <Menu.Item key="brandproducts" style={{ fontSize: '16px', background: '#e84118', color: '#fff' }} icon={<StarOutlined />}>
                            <Link to="/brandproducts" style={{ color: '#fff' }}>?????????? ????????????????????????</Link>
                        </Menu.Item>                          
                    </Menu>
                </div>
            ) : (
                <div>
                    <div style={{ height: '80px', width: '100%', borderBottom: '1px solid #dedede', padding: '0 10%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Link to="/">
                            <div className="logo" style={{ display: 'flex', justifyContent: 'flex-start', alignContent: 'center' }}>                            
                                <div>
                                    <Avatar size={48} src={logo} style={{ marginBottom: '8px', marginRight: '4px' }} />
                                </div>
                                <div>                                    
                                    <div style={{ margin: 0, fontWeight: 'bold', fontSize: '24px', color: 'black' }}>???????????? ????</div>                       
                                    <div style={{ margin: 0, color: '#8e8e8e', fontSize: '12px', marginTop: '-8px' }}>???? ???????????????????? ????????????</div>       
                                </div>                                                                                                                                   
                            </div>
                        </Link>
                        <div className="contact">                            
                            <div style={{ margin: 0, fontWeight: 'bold', fontSize: '20px', color: 'black' }}>7607-7722</div>                       
                            <div style={{ margin: 0, color: '#8e8e8e', fontSize: '12px', marginTop: '-8px' }}>???????????? ?????????? ????????????</div>       
                        </div>
                        <div className="user" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Input.Search placeholder="???????????????????????? ????????..." style={{ width: '400px' }} />                                                         
                            <Dropdown overlay={
                                <Menu selectedKeys={['mn']}>
                                    <Menu.Item key="mn">
                                        <Tag>MN</Tag>????????????                                       
                                    </Menu.Item>
                                    <Menu.Item key="en">
                                        <Tag>EN</Tag>English
                                    </Menu.Item>
                                </Menu>
                            }>
                                <Button size="middle" icon={<GlobalOutlined />} style={{ marginLeft: '12px' }} />                                                                    
                            </Dropdown>                            
                            <Link to="/profile?key=saved">
                                <Badge count={user && user.profile.favorite.length ? user.profile.favorite.length : 0} overflowCount={9} size="default" >
                                    <Tooltip title="?????????????????? ????????????????????????">                                               
                                        <Button size="middle" icon={<HeartOutlined />} style={{ marginLeft: '12px' }} />                                                                    
                                    </Tooltip>
                                </Badge>
                            </Link>                                               
                            <Link to="/profile?key=cart">
                                <Badge count={user && user.profile.cart.length ? user.profile.cart.length : 0} overflowCount={9} size="default" >
                                    <Tooltip title="???????? ????????">
                                        <Button size="middle" icon={<ShoppingCartOutlined />} style={{ marginLeft: '12px' }} />                                        
                                    </Tooltip>
                                </Badge>
                            </Link>                        
                            { user ? (
                                <>
                                    {parseInt(user.profile.role) < 3 ? (
                                        <Link to="/admin">
                                            <Tooltip title="??????????????">                                           
                                                <Button size="middle" icon={<DatabaseOutlined />} style={{ marginLeft: '12px' }} />
                                            </Tooltip>
                                        </Link>
                                    ) : (<></>)}
                                    <Link to="/profile">
                                        <Tooltip title="??????????????">                                        
                                            <Button type="primary" size="middle" icon={<UserOutlined />} style={{ marginLeft: '12px', background: '#2ed573', border: 0 }} />
                                        </Tooltip>
                                    </Link> 
                                    <div style={{ marginLeft: '12px' }}>
                                        <div style={{ margin: 0, color: '#8e8e8e', fontSize: '12px' }}>???????? ????????????</div>      
                                        <div style={{ margin: 0, fontWeight: 'bold' }}>???8,213</div>                       
                                    </div>                                                   
                                </>
                            ) : (
                                <Link to="/login">
                                    <Tooltip title="??????????????">
                                        <Button size="middle" icon={<UserOutlined />} style={{ marginLeft: '12px' }}>??????????????</Button>                                                
                                    </Tooltip>
                                </Link>  
                            )}                                                                     
                        </div>
                    </div>
                    <div style={{ height: '40px', width: '100%', padding: '0 10%', border: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Menu                         
                            mode="horizontal" 
                            onClick={handleMenuClick} 
                            selectedKeys={[current]}        
                            style={{ lineHeight: '36px', border: 0 }}                 
                        >   
                            <Menu.Item key="brandproducts" style={{ margin: 0 }}>
                                <Link to="/brandproducts">
                                    <Tag color="#2ed573" style={{ fontSize: '14px', padding: '3px 8px' }}>                                    
                                    <StarOutlined style={{ marginRight: '4px' }} /> ?????????? ????????????????????????
                                    </Tag>
                                </Link>
                            </Menu.Item>         
                            <Menu.Item key="about" icon={<InfoCircleOutlined />} >
                                <Link to="/about">???????????? ??????????</Link>
                            </Menu.Item>             
                            <Menu.Item key="products" icon={<ShopOutlined />} >
                                <Link to="/products">?????????? ??????</Link>
                            </Menu.Item>
                            <Menu.Item key="help" icon={<ReadOutlined />}>
                                <Link to="/help">????????????????</Link>
                            </Menu.Item>
                            <Menu.Item key="contact" icon={<PhoneOutlined />}>
                                <Link to="/contact">??????????????????</Link>
                            </Menu.Item>                 
                        </Menu>
                        <div>
                            <Button type="text" icon={<PercentageOutlined />}>??????????????</Button>                            
                        </div>
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