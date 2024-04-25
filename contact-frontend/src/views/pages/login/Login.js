import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Input } from 'antd'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import axios from 'axios'

const Login = () => {
  const [error, setError] = useState()
  const history = useNavigate()
  const [form] = Form.useForm()
  useEffect(()=>{
    setTimeout(() => {
      setError('')
    }, 2000);
  },[error])
  const onFinish = async values => {
    try {
      if (values.email && values.password) {
        const response = await axios.post('https://node-project-1rxs4g8lq-muhammad-asifs-projects-52f85f4e.vercel.app/api/users/login', {
          email: values.email,
          password: values.password,
        })
        if (response.status) {
          const token = await response?.data?.accessToken
          localStorage.setItem('token', token)
          history('/dashboard')
        }
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
      }
    } catch (error) {
      // Handle errors here
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Server responded with error status:', error.response.status)

        // You can also access the response data
        console.error('Server responded with error data:', error.response.data)
        setError(error.response.data.message)

        // Handle the 401 status code (Unauthorized) specifically
        if (error.response.status === 401) {
          console.error('Unauthorized - Incorrect email or password')
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received from the server:', error.request)
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up the request:', error.message)
      }
    }
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <Form form={form} name="control-hooks" onFinish={onFinish}>
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={8}>
              <CCardGroup>
                <CCard className="p-4">
                  {error && <CAlert color="danger">{error}</CAlert>}
                  <CCardBody>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <Form.Item name="email" rules={[{ required: true }]}>
                      <CInputGroup className="mb-3">
                        <Input placeholder="Username" autoComplete="username" />
                      </CInputGroup>
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true }]}>
                      <CInputGroup className="mb-4">
                        <Input
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                        />
                      </CInputGroup>
                    </Form.Item>
                    <CRow>
                      <CCol xs={6}>
                        {/* <CButton color="primary" className="px-4" onClick={authentication}  htmlType="submit" >
                          Login
                        </CButton> */}
                        <Button type="primary" className="px-4" htmlType="submit">
                          Submit
                        </Button>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCard>
                <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                  <CCardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua.
                      </p>
                      <Link to="/register">
                        <CButton color="primary" className="mt-3" active tabIndex={-1}>
                          Register Now!
                        </CButton>
                      </Link>
                    </div>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </Form>
    </div>
  )
}

export default Login
