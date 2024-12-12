// ** Custom Menu Components
import { useEffect, useState } from 'react'
import VerticalNavLink from './VerticalNavLink'
import useUserPermissions from 'src/hooks/useUserPermissions'
import navigation from 'src/navigation/vertical'

const resolveNavItemComponent = item => {
  return VerticalNavLink
}

const VerticalNavItems = props => {
  const [userRole, setUserRole] = useState(null)
  const userPermissions = useUserPermissions(userRole) || []

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loginDetails = JSON.parse(localStorage.getItem('login-details'))
      if (loginDetails) {
        // setAuthToken(loginDetails.email)
        setUserRole(loginDetails.role)
      }
    }
  }, [])

  const verticalNavItems = navigation()
  const hasDashboardPermission = userPermissions.includes('Dashboard')

  const filteredNavItems = verticalNavItems.filter(item => {
    if (userRole === 'admin') {
      return true // Admin sees all items including section titles
    } else {
      if (item.sectionTitle) {
        return hasDashboardPermission // Non-admin roles see section titles only if they have Dashboard permission
      }
      return userPermissions.includes(item.title)
    }
  })

  const RenderMenuItems = filteredNavItems?.map((item, index) => {
    const TagName = resolveNavItemComponent(item)

    return <TagName {...props} key={index} item={item} />
  })

  return <>{RenderMenuItems}</>
}

export default VerticalNavItems
