// AuthCheckHOC.js
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthCheckHOC = WrappedComponent => {
  const AuthCheck = () => {
    const history = useNavigate()

    useEffect(() => {
      // Check if the user is logged in
      const isLoggedIn = localStorage.getItem(
        'token',
      ) /* Implement your logic to check if the user is logged in */

      if (!isLoggedIn) {
        // Redirect to the login page if the user is not logged in
        history('/')
      }
    }, [history])

    return <WrappedComponent />
  }

  return AuthCheck
}

export default AuthCheckHOC
