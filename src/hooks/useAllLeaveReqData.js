/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

const useLeaveReqData = () => {
    const [leaveReqData, setLeaveReqData] = useState([])
    const [loading, setLoading] = useState(true)
    const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null
    const role = authToken?.role

    const updateLeaveRequestStatus = async (leaveRequestId, newStatus) => {
        try {
            // Update the leave request status in localStorage
            const updatedData = leaveReqData.map(item =>
                item.id === leaveRequestId ? { ...item, status: newStatus } : item
            );

            // Save the updated data back to localStorage
            localStorage.setItem('leaveRequest', JSON.stringify(updatedData));

            // Update the state
            setLeaveReqData(updatedData);
        } catch (error) {
            console.error('Error updating leave request status', error)
        }
    }

    const fetchAllLeaveRequest = async () => {
        try {
            // Retrieve leave requests from localStorage
            const storedData = JSON.parse(localStorage.getItem('leaveRequest')) || [];

            // Filter data based on role
            const filteredData = role === 'hr'
                ? storedData.filter(req => req.role !== 'hr')
                : storedData;

            setLeaveReqData(filteredData);
        } catch (error) {
            console.error('Error fetching leave request', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAllLeaveRequest()
    }, [])

    return {
        loading,
        leaveReqData,
        updateLeaveRequestStatus
    }
}

export default useLeaveReqData
