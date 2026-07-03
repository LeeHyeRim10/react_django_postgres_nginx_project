import React, { useEffect } from 'react'
import {Modal, Form, Input, InputNumber, Select, Button} from "antd"


const ProductModal = ({open, setOpen, initialValues, onSubmit}) => {
    const [form] = Form.useForm()
    useEffect(()=> {
        if(open) {
            if (initialValues) {
                form.setFieldsValue(initialValues)
            }else {
                form.resetFields()
            }
        }
    }, [open, initialValues, form])

    const onFinish = async (productObj) => {
        await onSubmit(productObj)
        setOpen(false)
        form.resetFields()
    }

  return (
    <Modal 
        title={null} 
        open={open} 
        onCancel={() => {
            setOpen(false)
            form.resetFields()
        }}
        footer={null}
        width={700}
        centered
    >
        <Form
            form={form}
            layout='vertical'
            onFinish={onFinish} // onSubmit
            size='large'
        >
            <Form.Item
                label="상품명"
                name="product_name"
                rules={[{required: true, message: "상품명 입력하세요"}]}
            >
                <Input placeholder='ex) 악세사리'/>
            </Form.Item>

            <Form.Item
                label="색상"
                name="color"
                rules={[{required: true, message: "색상 선택하세요"}]}
            >
                <Select placeholder='색상 선택' 
                        options={[
                            {value: "black", label:"black"},
                            {value: "white", label:"white"},
                            {value: "red", label:"red"},
                            {value: "blue", label:"blue"},
                        ]}/>
            </Form.Item>

            <Form.Item
                label="단가"
                name="price"
                rules={[{required: true, message: "단가 입력하세요"}]}
            >
                <InputNumber placeholder='ex) 40000'/>
            </Form.Item>

            <Form.Item
                label="판매가"
                name="sale_price"
                rules={[{required: true, message: "판매가 입력하세요"}]}
            >
                <InputNumber placeholder='ex) 80000'/>
            </Form.Item>

            <Form.Item
                label="카테고리"
                name="product_category_code"
                rules={[{required: true, message: "카테고리 선택하세요"}]}
            >
                <Select placeholder='카테고리 선택' 
                        options={[
                            {value: "E1", label:"E1"},
                            {value: "E2", label:"E2"},
                            {value: "E3", label:"E3"},
                            {value: "A1", label:"A1"},
                            {value: "A2", label:"A2"},
                        ]}/>
            </Form.Item>

            <Form.Item>
                <Button 
                    type='primary' 
                    htmlType='submit' 
                    block 
                    size='large' 
                    style={{height: "48px", borderRadius:"10ox", fontWeight:"bold"}}
                >
                    {initialValues ? "수정하기" : "등록하기"}</Button>
            </Form.Item>
        </Form>
      
    </Modal>
  )
}

export default ProductModal
