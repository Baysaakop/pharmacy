import React from 'react';
import { Button, Layout, Tooltip, Typography } from 'antd';
import CustomMenu from '../components/Menu';
import './Layout.css';
import { FacebookFilled, InstagramOutlined, YoutubeFilled } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

function CustomLayout (props) {    
    return(
        <Layout>
            <Header>
                <CustomMenu {...props} />                
            </Header>
            <Content>                                     
                <div className="content-item">
                    {props.children}                    
                </div>                
            </Content>
            <Footer>
                <div style={{ padding: '40px 10%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <Typography.Text style={{ fontSize: '16px', fontWeight: 'bold' }}>Ирмүүн Аз 2021. </Typography.Text>
                        <Typography.Text style={{ fontSize: '16px' }}>Зохиогчийн эрх хуулиар хамгаалагдсан.</Typography.Text>                        
                    </div>
                    <div>
                        <Typography.Text style={{ fontSize: '16px', marginRight: '8px' }}>Сошиал сувгууд:</Typography.Text>
                        <Tooltip title="Facebook">
                            <Button type="text" icon={<FacebookFilled />} style={{ marginRight: '8px' }} size="large" /> 
                        </Tooltip>
                        <Tooltip title="Instagram">
                            <Button type="text" icon={<InstagramOutlined />} style={{ marginRight: '8px' }} size="large" /> 
                        </Tooltip>
                        <Tooltip title="YouTube">
                            <Button type="text" icon={<YoutubeFilled />} size="large" /> 
                        </Tooltip>
                    </div>                   
                </div>                
            </Footer>
        </Layout>
    );  
};

export default CustomLayout;