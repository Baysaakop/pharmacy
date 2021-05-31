import React from 'react';
import { Button, Divider, Result, Typography } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import { Redirect } from 'react-router';
import { CloseOutlined } from '@ant-design/icons';

const Logout = (props) => {    
    
    const onClick = () => {                
        props.logout();               
    };

    if (!props.token) {
        return <Redirect to="/" />
    }

    return (
        <div style={{ padding: '16px', border: '1px solid #f0f2f5' }}>
            <Typography.Title level={4}>Системээс гарах</Typography.Title>
            <Divider />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
                <Result
                        status="warning"
                        title="Системээс гарахдаа итгэлтэй байна уу?"
                        extra={
                            <Button danger size="large" type="primary" icon={<CloseOutlined />} onClick={onClick}>
                                Гарах
                            </Button>
                        }
                    />
            </div>          
        </div>   
    );
};

const mapStateToProps = (state) => {
    return {          
        token: state.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);