import { EllipsisOutlined, HeartOutlined, ShoppingCartOutlined, StarFilled } from "@ant-design/icons";
import { Card, Tooltip, Typography, Modal } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

function ProductCard (props) {

    const [visible, setVisible] = useState(false)

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
                        <img alt={props.item.name} src={props.item.image} style={{ width: '100%', height: 'auto' }} />
                    </Link>
                }                
                actions={ props.action ? [
                    <Tooltip title="Хадгалах">
                        <HeartOutlined key="save" />
                    </Tooltip>,
                    <Tooltip title="Сагслах">
                        <ShoppingCartOutlined key="cart" />
                    </Tooltip>,
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

export default ProductCard