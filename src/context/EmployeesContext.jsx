import { createContext, useContext, useState } from 'react'
import { mockEmployees } from '../mocks/employees'

const EmployeesContext = createContext()

export function EmployeesProvider({ children }) {
  const [employees, setEmployees] = useState(mockEmployees)

  function updateEmployee(id, updatedFields) {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === id ? Object.assign(Object.create(Object.getPrototypeOf(emp)), emp, updatedFields) : emp
      )
    )
  }

  return (
    <EmployeesContext.Provider value={{ employees, updateEmployee }}>
      {children}
    </EmployeesContext.Provider>
  )
}

export function useEmployees() {
  return useContext(EmployeesContext)
}
