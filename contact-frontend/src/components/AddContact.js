import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Space, Modal } from 'antd'
const AddContact = props => {
  const { isModalOpen, setIsModalOpen, updateRecord, updateContactHanler } = props
  const [loader, setLoader] = useState(false)
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm()
  useEffect(() => {
      form.setFieldsValue(updateRecord)
  }, [updateRecord])
  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const onFinish = values => {
     const isupate =  updateContactHanler(values)
     if(isupate)
     {
      debugger
      form.resetFields()
     }
  }
  const onReset = () => {
    form.resetFields()
  }
  const onFill = () => {
    form.setFieldsValue({ note: 'Hello world!', gender: 'male' })
  }
 

  return (
    <>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} name="control-hooks" onFinish={onFinish} style={{ maxWidth: 600 }}>
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input size="small" />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input size="small" />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true }]}>
            <Input size="small" />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={loader}>
                Submit
              </Button>
              <Button htmlType="button" onClick={onReset}>
                Reset
              </Button>
              <Button type="link" htmlType="button" onClick={onFill}>
                Fill form
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
export default AddContact
