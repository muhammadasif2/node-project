import React, { useEffect, useState } from 'react'
import {
  CAvatar,
  CCol,
  CProgress,
  CRow,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { Button, Skeleton } from 'antd'
import axios from 'axios'
import CIcon from '@coreui/icons-react'
import { cilPeople } from '@coreui/icons'
import avatar1 from 'src/assets/images/avatars/1.jpg'
import AddContact from 'src/components/AddContact'
import { Form } from 'react-router-dom'
const Accordion = () => {
  const [contact, setContact] = useState([])
  const [loader, setLoader] = useState(false)
  const [numRows, setNumRows] = useState(3)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [updateRecord, setIsUpdateRecord] = useState(null)
  const [isdelId, setIsdelId] = useState(null)
  const [onAddContact, setOnAddContact] = useState(null)
  useEffect(() => {
    contactListHandler()
  }, [onAddContact]) // Add dependencies as needed
  const updateHandler = item => {
    if (item) {
      setIsUpdateRecord(item)
    }
    setIsModalOpen(true)
  }
  const addContacthandler = () => {
    setIsModalOpen(true)
  }
  const contactListHandler = () => {
    setLoader(true)
    axios
      .get('http://localhost:5001/api/contacts')
      .then(response => {
        setContact(response.data)
        console.log('Data received:', response.data)
        setNumRows(response.data.length)
        setLoader(false)
      })
      .catch(error => {
        console.error('Axios error:', error)
      })
  }
  const deleteHandler = id => {
    setLoader(true)
    setIsdelId(id)
    axios
      .delete(`http://localhost:5001/api/contacts/${id}`)
      .then(response => {
        contactListHandler()
        setLoader(false)
      })
      .catch(error => {
        console.error('Axios error:', error)
      })
  }
 
  console.log('updateRecord',updateRecord)
  const updateContactHanler = async(payload) => {
    
   if(updateRecord)
   {
     setLoader(true)
    const response = await axios.put(
      `http://localhost:5001/api/contacts/${updateRecord?._id}`,
      payload,
    )
    if (response) {
     
      contactListHandler()
      setIsUpdateRecord(null)
      setLoader(false)
      setIsModalOpen(false)
      return true
    } else {
      setLoader(false)
    }
  }
  else {
    setLoader(true)
    const response = axios.post('http://localhost:5001/api/contacts', payload)
    if (response) {
      setOnAddContact(response)
      setLoader(false)
      setIsModalOpen(false)
      
    } else {
      setLoader(false)
    }
  }
  }
 
  return (
    <>
      <Button type="primary" className="m-2" onClick={addContacthandler}>
        Add Contact
      </Button>
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell className="text-center">
              <CIcon icon={cilPeople} />
            </CTableHeaderCell>
            <CTableHeaderCell>User</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Country</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Email</CTableHeaderCell>
            <CTableHeaderCell>Activity</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {contact && contact.length > 0 ? (
            contact.map((item, index) => (
              <CTableRow v-for="item in tableItems" key={index}>
                <CTableDataCell className="text-center">
                  <CAvatar
                    size="md"
                    src={avatar1}
                    // status={item.avatar.status}
                  />
                </CTableDataCell>
                <CTableDataCell>
                  <div>{item.title}</div>
                </CTableDataCell>
                <CTableDataCell className="text-center">{item.email}</CTableDataCell>
                <CTableDataCell className="text-center">{item.description}</CTableDataCell>
                <CTableDataCell>
                  <span>
                    <Button loading={loader && isdelId ===item._id} className="btn btn-danger" onClick={() => deleteHandler(item._id)}>
                      Delete
                    </Button>
                  </span>{' '}
                  &nbsp;
                  <span>
                    <button className="btn btn-success" onClick={() => updateHandler(item)}>
                      Update
                    </button>
                  </span>
                  {/* <strong>{item.activity}</strong> */}
                </CTableDataCell>
              </CTableRow>
            ))
          ) : loader ? (
            <CTableDataCell className="text-center" colSpan={5}>
             <CSpinner variant="grow" />
            </CTableDataCell>
          ) : (
            !loader &&
            contact.length === 0 && (
              <CTableDataCell className="text-center" colSpan={4}>
                Record Not Found!
              </CTableDataCell>
            )
          )}
          <AddContact
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            updateRecord={updateRecord}
            setContact={setContact}
            updateContactHanler={updateContactHanler}
          />
        </CTableBody>
      </CTable>
    </>
  )
}

export default Accordion
