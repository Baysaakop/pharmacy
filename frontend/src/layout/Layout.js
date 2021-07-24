import React from 'react';
import { Grid, Button, Layout, Tooltip, Typography, Row, Col } from 'antd';
import CustomMenu from '../components/Menu';
import './Layout.css';
import { FacebookFilled, InstagramOutlined, YoutubeFilled } from '@ant-design/icons';

const { useBreakpoint } = Grid;
const { Header, Content, Footer } = Layout;

function CustomLayout (props) {    

    const screens = useBreakpoint()

    return(
        <Layout>
            <Header>
                <CustomMenu {...props} />                
            </Header>
            <Content style={{ minHeight: '80vh' }}>                                     
                <div className="content-item" style={ screens.lg ? { padding: '24px 10%' } : { padding: '24px 5%' }}>
                    {props.children}                    
                </div>                
            </Content>
            <Footer>
                <div style={ screens.lg ? { padding: '32px 10%' } : { padding: '24px 5%' }}>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={24} md={24} lg={12}>
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
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={12} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Typography.Text style={{ fontSize: '16px', fontWeight: 'bold' }}>© 2021 Ирмүүн Аз. </Typography.Text>
                            <Typography.Text style={{ fontSize: '16px' }}>Зохиогчийн эрх хуулиар хамгаалагдсан.</Typography.Text>
                        </Col>
                    </Row>                 
                </div>                
            </Footer>
        </Layout>
    );  
};

export default CustomLayout;