import { Carousel } from 'antd';
import React from 'react';
// import axios from 'axios';  
// import api from '../api';
// import { Link } from 'react-router-dom';

const contentStyle = {
    height: '360px',
    color: '#fff',
    lineHeight: '280px',
    textAlign: 'center',
    background: '#364d79',
};

function Home (props) {    
    // const [data, setData] = useState();

    // useEffect(() => {
    //     axios({
    //         method: 'GET',
    //         url: `${api.items}/`
    //     }).then(res => {            
    //         setData(res.data)
    //     }).catch(err => {
    //         console.log(err.message)
    //     })        
    // }, [])   

    function onChange(a, b, c) {
        console.log(a, b, c);
    }

    return (
        <div>
            <Carousel afterChange={onChange} style={{ zIndex: '1' }}>
                <div>
                    <h3 style={contentStyle}>1</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>2</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>3</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>4</h3>
                </div>
            </Carousel>
            {/* <List
                style={{ 
                    marginTop: '24px'                    
                }}
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 6,
                    xxl: 8,
                }}
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <Link to={`items/${item.id}`}>
                            <Card className="card-item" title={item.name}>                        
                                <Typography.Paragraph ellipsis={{ rows: 5 }}>
                                    {item.description}
                                </Typography.Paragraph>
                            </Card>
                        </Link>
                    </List.Item>
                )}
            /> */}
        </div>
    )
}

export default Home;