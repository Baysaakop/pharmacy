import { useEffect, useState } from "react";
import { Button, Form, Select, Input } from 'antd';
import axios from "axios";
import api from "../api";

const { Option } = Select

function AddressForm (props) {
    const [form] = Form.useForm()    
    const [cities, setCities] = useState()
    const [districts, setDistricts] = useState()    

    useEffect(() => {        
        getCities()            
        if (props.address) {
            getDisctricts(props.address.city.id.toString())        
        }
    }, [props.address])

    function getCities () {
        axios({
            method: 'GET',
            url: `${api.cities}/`,            
        }).then(res => {
            setCities(res.data.results)            
        }).catch(err => {
            console.log(err.message)
        })
    }

    function getDisctricts (target) {
        let url = `${api.districts}?city=${parseInt(target)}`
        axios({
            method: 'GET',
            url: url,    
        }).then(res => {
            setDistricts(res.data.results)
        }).catch(err => {
            console.log(err.message)
        })
    }

    function onSelectCity(id) {                           
        getDisctricts(id)
    }

    function onFinish (values) {
        console.log(values)
    }

    return (
        <div>            
            <Form 
                form={form} 
                layout="vertical" 
                onFinish={onFinish}
                initialValues={ props.address ? {
                    city: props.address.city.id.toString(),
                    district: props.address.district.id.toString(),
                    section: props.address.section.toString(),
                    address: props.address.address.toString()
                } : undefined}        
            >
                <Form.Item name="city" label="Хот" rules={[{ required: true }]}>
                    <Select                                
                        placeholder="Хот сонгох"
                        optionFilterProp="children"
                        onSelect={onSelectCity}
                    >
                        { cities ? cities.map(city => (
                            <Option key={city.id}>{city.name}</Option>
                        )) : <></> }
                    </Select>          
                </Form.Item>
                <Form.Item name="district" label="Дүүрэг"  rules={[{ required: true }]}>
                    <Select                                
                        placeholder="Дүүрэг сонгох"
                        optionFilterProp="children"                             
                    >
                        { districts ? districts.map(district => (
                            <Option key={district.id}>{district.name}</Option>
                        )) : <></> }
                    </Select>          
                </Form.Item>                        
                <Form.Item name="section" label="Хороо">
                    <Input />
                </Form.Item>                            
                <Form.Item name="address" label="Байр, тоот (бусад)" rules={[{ required: true }]}>
                    <Input.TextArea rows={6} />
                </Form.Item>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>                    
                    <Button type="primary" onClick={form.submit}>Хадгалах</Button>                                     
                </div>                
            </Form>
        </div>
    )
}

export default AddressForm;