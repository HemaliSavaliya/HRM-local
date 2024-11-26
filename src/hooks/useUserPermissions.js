import { useEffect, useState } from 'react'

const useUserPermissions = (role) => {
  const [permissions, setPermissions] = useState([])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const rolePermissions = JSON.parse(localStorage.getItem('rolePermissions'))
      if (rolePermissions && role) {
        setPermissions(rolePermissions[role] || [])
      }
    }
  }, [role])

  return permissions
}

export default useUserPermissions
