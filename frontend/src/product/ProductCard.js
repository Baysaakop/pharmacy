import { EllipsisOutlined, HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Card, Tooltip, Typography, Modal, Rate } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

function ProductCard (props) {

    const [visible, setVisible] = useState(false)

    return (
        <div>            
            <Card     
                hoverable
                size="small"           
                style={{ width: '100%' }}
                cover={
                    <Link to={`/products/${props.item.id}`}>
                        <img alt="example" src="http://ipharm.axiomthemes.com/wp-content/uploads/2019/02/7-min1.jpg" style={{ width: '100%', height: 'auto' }} />
                    </Link>
                }                
                actions={ props.action ? [
                    <Tooltip title="Add to favorite">
                        <HeartOutlined key="love" />
                    </Tooltip>,
                    <Tooltip title="Add to cart">
                        <ShoppingCartOutlined key="cart" />
                    </Tooltip>,
                    <Tooltip title="Read description">
                        <EllipsisOutlined key="ellip" onClick={() => setVisible(true)} />
                    </Tooltip>,                                        
                ] : <></>}
            >
                <Link to={`/products/${props.item.id}`}>
                    <Card.Meta 
                        title={props.item.title}
                        description={props.item.tag}
                    />
                    <div style={{ textAlign: 'center' }}>
                        <Rate disabled allowHalf value={4} style={{ fontSize: '16px' }} />                    
                        <Typography.Title level={4} style={{ margin: '8px 0 0 0', color: '#34495e' }}>{props.item.price}</Typography.Title>
                    </div>
                </Link>
                <Modal title={props.item.title} visible={visible} onOk={() => setVisible(false)} onCancel={() => setVisible(false)}>
                    <Typography.Title level={5}>Description:</Typography.Title>
                    <Typography.Paragraph>{props.item.info}</Typography.Paragraph>
                </Modal>
            </Card>            
        </div>
    )
}

export default ProductCard