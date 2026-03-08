import React, { useState, useEffect } from 'react'
import { FaUsers, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'
import { useAdmin } from '../../contexts/AdminContext'

const ManageGroups = () => {
  const { projectGroups, GuideprojectGroups, rejectAcceptedGroup } = useAdmin()
  const [currentUser, setCurrentUser] = useState(null)
  const [myGroups, setMyGroups] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setMyGroups(GuideprojectGroups)
    }
  }, [GuideprojectGroups])

  const handleReject = async (groupId, groupName) => {
    if (window.confirm(`Are you sure you want to reject "${groupName}"? This will reset the group status and you will no longer supervise it.`)) {
      try {
        setLoading(true)
        await rejectAcceptedGroup(groupId)
        alert('Group rejected successfully.')
      } catch (error) {
        console.error('Rejection error:', error)
        alert('Failed to reject group. Please try again.')
      } finally {
        setLoading(false)
      }
    }
  }

  if (!myGroups) {
    return (
      <div className="flex items-center justify-center min-h-[40vh] text-slate-500">
        Loading...
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Manage Groups</h1>
        <p className="text-slate-600">Groups under your supervision</p>
      </div>

      {myGroups.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
          <FaUsers className="text-slate-300 text-6xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-700 mb-2">No Groups Assigned</h3>
          <p className="text-slate-500">You haven't accepted any group requests yet. Check your notifications to accept group requests.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {myGroups.map((group) => (
            <div
              key={group._id || group.id}
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <FaUsers className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">{group.groupName || group.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <FaCheckCircle className="text-green-500 text-sm" />
                      <span className="text-sm text-green-600 font-medium">Accepted</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4 flex-grow">
                <h4 className="text-sm font-semibold text-slate-700 mb-3">Members ({group.selectedMembers?.length || 0}):</h4>
                <ul className="space-y-2">
                  {group.selectedMembers?.map((member) => (
                    <li key={member._id || member.id} className="text-sm text-slate-600 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span>{member.name}</span>
                      <span className="text-slate-400">({member.username})</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200">
                <p className="text-xs text-slate-500">
                  Created: {new Date(group.createdAt).toLocaleDateString()}
                </p>
                {group.updatedAt && (
                  <p className="text-xs text-slate-500 mt-1">
                    Accepted: {new Date(group.updatedAt).toLocaleDateString()}
                  </p>
                )}

                <button
                  onClick={() => handleReject(group._id || group.id, group.groupName || group.name)}
                  disabled={loading}
                  className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-semibold text-sm transition-colors border border-red-100"
                >
                  <FaTimesCircle className="text-sm" />
                  {loading ? 'Processing...' : 'Reject Group'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ManageGroups
