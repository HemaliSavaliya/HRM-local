import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import navigation from 'src/navigation/vertical'
import usePermissionData from 'src/hooks/usePermissionData'

const Permission = () => {
    const { loading, roles, handleToggleChange, rolePermissions } = usePermissionData()

    if (loading) {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '80vh'
                }}
            >
                <img src='/images/loader.svg' alt='loader' />
            </div>
        )
    }

    return (
        <>
            <Box display={"flex"} gap={10} overflow={"auto"}>
                {roles?.map(role => (
                    <Box key={role.roleName} width={300} minWidth={300}>
                        <Typography
                            fontSize={14}
                            textTransform={'uppercase'}
                            color={'#9155f2'}
                            fontWeight={700}
                            mb={3}
                            sx={{ textDecoration: 'underline' }}
                        >
                            {role.roleName} Permissions
                        </Typography>
                        {navigation().map(menuItem => {
                            if (menuItem.sectionTitle) return null // skip rendering if sectionTitle exists

                            return (
                                <div className='switch-holder' key={menuItem.title}>
                                    <div className='switch-label'>
                                        <Box sx={{ textTransform: 'uppercase', fontWeight: 700, fontSize: '13px' }}>{menuItem.title}</Box>
                                    </div>
                                    <div className='switch-toggle'>
                                        <input
                                            type='checkbox'
                                            id={`${role.roleName}-${menuItem.title}`}
                                            checked={rolePermissions[role.roleName]?.includes(menuItem.title)}
                                            onChange={() => handleToggleChange(menuItem.title, role.roleName)}
                                        />
                                        <label htmlFor={`${role.roleName}-${menuItem.title}`}></label>
                                    </div>
                                </div>
                            )
                        })}
                    </Box>
                ))}
            </Box>
        </>
    )
}

export default Permission
