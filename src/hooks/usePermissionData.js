import { useEffect, useState } from 'react';

const usePermissionData = () => {
    const [roles, setRoles] = useState([]);
    const [rolePermissions, setRolePermissions] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRolesAndPermissions = () => {
            setLoading(true);
            try {
                // Fetch roles
                const storedRoles = JSON.parse(localStorage.getItem('roles')) || [];
                const filterRoles = storedRoles.filter(role => role.status !== 'Disable');
                setRoles(filterRoles);

                // Fetch permissions for roles
                const storedPermissions = JSON.parse(localStorage.getItem('rolePermissions')) || {};

                // Set default permissions if not already present
                const defaultPermissions = {
                    hr: [
                        "Dashboard",
                        "Role",
                        "Departments",
                        "Employees",
                        "Holidays",
                        "Attendance",
                        "Leave Management",
                        "Job",
                        "Calendar",
                        "Announcement",
                        "Awards"
                    ],
                    employee: [
                        "Dashboard",
                        "Projects",
                        "Attendance",
                        "Leave Management",
                        "Announcement",
                        "Awards"
                    ]
                };

                // Merge defaults if not already set
                const updatedPermissions = { ...defaultPermissions, ...storedPermissions };
                setRolePermissions(updatedPermissions);

                // Save to localStorage if missing
                if (!localStorage.getItem('rolePermissions')) {
                    localStorage.setItem('rolePermissions', JSON.stringify(updatedPermissions));
                }
            } catch (error) {
                console.error('Error fetching roles or permissions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRolesAndPermissions();
    }, []);

    const handleToggleChange = (menuItemTitle, role) => {
        const currentPermissions = rolePermissions[role] || []; // Ensure it's an array

        // Determine whether to add or delete the permission
        const updatedPermissions = currentPermissions.includes(menuItemTitle)
            ? currentPermissions.filter(item => item !== menuItemTitle) // Remove
            : [...currentPermissions, menuItemTitle]; // Add

        // Update rolePermissions state
        setRolePermissions(prev => ({ ...prev, [role]: updatedPermissions }));

        // Save updated permissions to localStorage
        const storedPermissions = JSON.parse(localStorage.getItem('rolePermissions')) || {};
        storedPermissions[role] = updatedPermissions;
        localStorage.setItem('rolePermissions', JSON.stringify(storedPermissions));
    };

    return {
        loading,
        roles,
        handleToggleChange,
        rolePermissions
    };
};

export default usePermissionData;
