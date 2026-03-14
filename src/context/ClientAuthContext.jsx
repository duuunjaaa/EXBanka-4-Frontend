import { createContext, useContext, useState } from 'react'
import { clientAuthService } from '../services/clientAuthService'

const ClientAuthContext = createContext()

export function ClientAuthProvider({ children }) {
  const [clientUser, setClientUser] = useState(null)

  async function clientLogin(email, password) {
    const userData = await clientAuthService.login(email, password)
    setClientUser(userData)
    return userData
  }

  async function clientLogout() {
    await clientAuthService.logout()
    setClientUser(null)
  }

  return (
    <ClientAuthContext.Provider value={{ clientUser, clientLogin, clientLogout }}>
      {children}
    </ClientAuthContext.Provider>
  )
}

export function useClientAuth() {
  return useContext(ClientAuthContext)
}
