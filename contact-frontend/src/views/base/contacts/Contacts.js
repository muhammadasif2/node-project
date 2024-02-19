import React, { useEffect, useState } from 'react'
import {
  CAlert,
  CAvatar,
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
import {
  ContactList,
  DeleteContact,
  SaveContact,
  UpdateContact,
} from 'src/api/contacts/ContactContainer'
const Contacts = () => {
  const [contact, setContact] = useState([])
  const [loader, setLoader] = useState(false)
  const [numRows, setNumRows] = useState(3)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [updateRecord, setIsUpdateRecord] = useState(null)
  const [isdelId, setIsdelId] = useState(null)
  const [notification, setNotification] = useState({
    type: '',
    message: '',
  })

  useEffect(() => {
    contactListHandler()
  }, []) // Add dependencies as needed

  useEffect(() => {
    if (notification.message) {
      setTimeout(() => {
        setNotification({})
      }, 2000)
    }
  }, [notification]) // Add dependencies as needed

  const updateHandler = item => {
    if (item) {
      setIsUpdateRecord(item)
    }
    setIsModalOpen(true)
  }

  const addContacthandler = () => {
    setIsModalOpen(true)
  }

  const contactListHandler = async () => {
    setLoader(true)
    const response = await ContactList()
    if (response) {
      setContact(response)
      setNumRows(response.length)
      setLoader(false)
    }
  }

  const deleteHandler = async id => {
    setLoader(true)
    setIsdelId(id)
    const response = await DeleteContact(id)
    if (response.status) { 
      await contactListHandler()
      setNotification({
        ...notification, // Spread the existing properties
        type:'delete',
        message: response?.message, // Update the message property
      })
      setLoader(false)
    }
  }

  const updateContactHanler = async payload => {
    if (updateRecord) {
      setLoader(true)
      const response = await UpdateContact(updateRecord?._id, payload)
      if (response.status) {
        await contactListHandler()
        setNotification({
          // Spread the existing properties
          ...notification,
          message: response?.data?.message, // Update the message property
        })
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
      const response = await SaveContact(payload)
      if (response) {
        await contactListHandler()
        setLoader(false)
        setIsModalOpen(false)
        setNotification({
          ...notification, // Spread the existing properties
          message: response?.data?.message, // Update the message property
        })
      } else {
        setLoader(false)
      }
    }
  }
  return (
    <>
      {notification?.message && (
        <CAlert color={`${notification?.type === 'delete' ? 'danger' : 'success'}`}>
          {notification?.message}
        </CAlert>
      )}
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
            <CTableHeaderCell className="text-center">Email</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Description</CTableHeaderCell>
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
                    <Button
                      loading={loader && isdelId === item._id}
                      className="btn btn-danger"
                      onClick={() => deleteHandler(item._id)}
                    >
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
              <Skeleton
                avatar
                paragraph={{
                  rows: numRows,
                }}
              />
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

export default Contacts
