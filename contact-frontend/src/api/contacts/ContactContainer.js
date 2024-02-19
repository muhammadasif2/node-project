import ApiService from 'src/apiServices/ApiServices'
import { CONTACTS, CONTACTS_SAVE } from '../constant/ApiContant'

export const ContactList = async () => {
  const response = await ApiService.get(CONTACTS)
  if (response && response.status) {
    return response?.data
  } else {
    return false
  }
}

export const SaveContact = async payload => {
  const response = await ApiService.post(CONTACTS_SAVE, payload)
  if (response) {
    return response
  }
  if (response?.error?.response) {
    alert(response?.error?.response?.message)
  }
}

export const DeleteContact = async id => {
  const response = await ApiService.delete(`${CONTACTS}/${id}`)
  if (response) {
    return response
  }
  if (response?.error?.response) {
    alert(response?.error?.response?.message)
  }
}

export const UpdateContact = async (id, payload) => {
  const response = await ApiService.put(`${CONTACTS}/${id}`, payload)
  if (response) {
    return response
  }
  if (response?.error?.response) {
    alert(response?.error?.response?.message)
  }
}
