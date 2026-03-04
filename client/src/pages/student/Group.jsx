// import React, { useState, useEffect } from 'react'
// import { FaUsers, FaPlus, FaEdit, FaSave, FaTimes } from 'react-icons/fa'
// import { useAdmin } from '../../contexts/AdminContext'

// const Group = () => {
//   const { students, projectGroups, createProjectGroup, updateProjectGroup, guides, department } = useAdmin()
//   const [currentUser, setCurrentUser] = useState(null)
//   const [userGroup, setUserGroup] = useState(null)

//   const [assignedGuide, setAssignedGuide] = useState(null)
//   const [groupName, setGroupName] = useState('')
//   const [topicName, setTopicName] = useState('')
//   const [selectedMembers, setSelectedMembers] = useState([])
//   const [availableStudents, setAvailableStudents] = useState([])
//   const [error, setError] = useState('')
//   const [showCreateGroupModal, setShowCreateGroupModal] = useState(false)
//   const [isEditing, setIsEditing] = useState(false)
//   const [editGroupName, setEditGroupName] = useState('')
//   const [editTopicName, setEditTopicName] = useState('')

//   // console.log(currentUser, "userr");
//   console.log(projectGroups, "pro");



//   useEffect(() => {
//     const userData = localStorage.getItem('user')
//     if (userData) {
//       const parsedUser = JSON.parse(userData)
//       setCurrentUser(parsedUser)

//       // Get all student IDs that are already members of any group
//       const studentsInGroups = new Set()
//       projectGroups.forEach(group => {
//         group.selectedMembers.forEach(member => {
//           studentsInGroups.add(member._id)
//         })
//       })





//       // Filter students from the same department, excluding the current user and students already in groups
//       const departmentStudents = students.filter(
//         (s) => s.department === department &&
//           s._id !== parsedUser.id &&
//           !studentsInGroups.has(s._id)
//       )


//       setAvailableStudents(departmentStudents)

//       // Check if the current user is already in a group
//       const foundGroup = projectGroups.find(group =>
//         group.selectedMembers.some(member => member._id === parsedUser.id)
//       )

//       console.log("Found Groupppppppppppp:", foundGroup)


//       setUserGroup(foundGroup)
//       if (foundGroup?.teacherName) {
//   const guide = guides.find(
//     g => g.username === foundGroup.teacherName
//   );
//   setAssignedGuide(guide || null);
// } else {
//   setAssignedGuide(null);
// }
//     }
//   }, [students, projectGroups, guides])



//   const handleMemberSelection = (studentId) => {
//     const selectedStudent = availableStudents.find(s => s._id === studentId)
//     if (selectedMembers.some(member => member._id === studentId)) {
//       setSelectedMembers(selectedMembers.filter(member => member._id !== studentId))
//     } else if (selectedMembers.length < 3) {
//       setSelectedMembers([...selectedMembers, selectedStudent])
//     } else {
//       setError('Maximum 3 members can be selected for the group (excluding yourself).')
//     }
//   }

//   const handleCreateGroup = (e) => {
//     e.preventDefault()
//     setError('')
//     if (!groupName.trim()) {
//       setError('Group name cannot be empty.')
//       return
//     }
//     if (!topicName.trim()) {
//       setError('Topic name cannot be empty.')
//       return
//     }
//     if (!currentUser) {
//       setError('Creator user not found.')
//       return
//     }
//     if (selectedMembers.length < 1) {
//       setError('Please select at least one member for the group.')
//       return
//     }

//     const allMembers = [currentUser, ...selectedMembers]
//     const newGroup = createProjectGroup(groupName, allMembers, topicName)
//     setUserGroup(newGroup)
//     setShowCreateGroupModal(false)
//     setGroupName('')
//     setTopicName('')
//     setSelectedMembers([])
//     alert('Project group created successfully!')
//   }

//   const handleEditToggle = () => {
//     if (userGroup) {
//       setEditGroupName(userGroup.groupName)

//       setEditTopicName(userGroup.topicName || '')
//       setIsEditing(true)
//     }
//   }

//   const handleCancelEdit = () => {
//     setIsEditing(false)
//     setError('')
//   }

//   const handleSaveEdit = () => {
//     if (!editGroupName.trim()) {
//       setError('Group name cannot be empty.')
//       return
//     }
//     if (!editTopicName.trim()) {
//       setError('Topic name cannot be empty.')
//       return
//     }

//     updateProjectGroup(userGroup._id, {
//       name: editGroupName,
//       topicName: editTopicName
//     })
//     setIsEditing(false)
//     setError('')
//     alert('Group details updated successfully!')
//   }

//   if (!currentUser) {
//     return <div className="text-center py-8 text-gray-600">Loading user data...</div>
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-900 mb-8">Project Group Management</h1>

//         {userGroup ? (
//           <div className="bg-white rounded-lg shadow-sm p-6">
//             <div className="flex justify-between items-start mb-4">
//               <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
//                 <FaUsers className="text-blue-600" /> Your Project Group
//               </h2>
//               {!isEditing && (
//                 <button
//                   onClick={handleEditToggle}
//                   className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium transition-colors"
//                 >
//                   <FaEdit /> Edit Details
//                 </button>
//               )}
//             </div>

//             {isEditing ? (
//               <div className="space-y-4 mb-6 p-4 bg-blue-50 rounded-lg">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Group Name</label>
//                   <input
//                     type="text"
//                     value={editGroupName}
//                     onChange={(e) => setEditGroupName(e.target.value)}
//                     className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Topic Name</label>
//                   <input
//                     type="text"
//                     value={editTopicName}
//                     onChange={(e) => setEditTopicName(e.target.value)}
//                     className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//                 {error && <p className="text-red-600 text-sm">{error}</p>}
//                 <div className="flex gap-2">
//                   <button
//                     onClick={handleSaveEdit}
//                     className="flex items-center gap-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
//                   >
//                     <FaSave /> Save Changes
//                   </button>
//                   <button
//                     onClick={handleCancelEdit}
//                     className="flex items-center gap-1 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
//                   >
//                     <FaTimes /> Cancel
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <>
//                 <p className="text-lg font-medium text-gray-800 mb-2">Group Name: <span className="text-blue-700">{userGroup.groupName}</span></p>
//                 <p className="text-lg font-medium text-gray-800 mb-2">Topic Name: <span className="text-indigo-700">{userGroup.topicName || 'Not specified'}</span></p>
//               </>
//             )}

//             <p className="text-lg font-medium text-gray-800 mb-2">
//               Status: <span className={`font-semibold ${userGroup.status === 'Accepted' ? 'text-green-600' : 'text-amber-600'}`}>{userGroup.status ?? 'Pending acceptance'}</span>
//             </p>
//             {assignedGuide && (
//               <p className="text-lg font-medium text-gray-800 mb-2">Supervised by: <span className="text-indigo-700">{assignedGuide.teacherName} ({assignedGuide.username})</span></p>
//             )}
//             <h3 className="text-md font-semibold text-gray-700 mb-2">Members:</h3>
//             <ul className="list-disc list-inside space-y-1 text-gray-600">
//               {userGroup.selectedMembers?.map(member => (
//                 <li key={member._id}>{member.name} -  {department}</li>
//               ))}
//             </ul>
//             <p className="text-sm text-gray-500 mt-4">Created On: {new Date(userGroup.createdAt).toLocaleDateString()}</p>
//           </div>
//         ) : (
//           <div className="bg-white rounded-lg shadow-sm p-6 text-center">
//             <h2 className="text-xl font-semibold text-gray-900 mb-4">No Project Group Assigned</h2>
//             <p className="text-gray-600 mb-6">You are not currently part of any project group.</p>
//             <button
//               onClick={() => setShowCreateGroupModal(true)}
//               className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 mx-auto"
//             >
//               <FaPlus /> Create New Project Group
//             </button>
//           </div>
//         )}

//         {/* Create Group Modal */}
//         {showCreateGroupModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Create Project Group</h3>
//               <form onSubmit={handleCreateGroup}>
//                 <div className="mb-4">
//                   <label htmlFor="groupName" className="block text-sm font-medium text-gray-700 mb-1">Group Name</label>
//                   <input
//                     type="text"
//                     id="groupName"
//                     value={groupName}
//                     onChange={(e) => {
//                       setGroupName(e.target.value)
//                       setError('')
//                     }}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                     required
//                   />
//                 </div>

//                 <div className="mb-4">
//                   <label htmlFor="topicName" className="block text-sm font-medium text-gray-700 mb-1">Topic Name</label>
//                   <input
//                     type="text"
//                     id="topicName"
//                     value={topicName}
//                     onChange={(e) => {
//                       setTopicName(e.target.value)
//                       setError('')
//                     }}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                     required
//                   />
//                 </div>

//                 <div className="mb-4">
//                   <p className="block text-sm font-medium text-gray-700 mb-2">Select 3 Members from {currentUser.department} Department:</p>
//                   {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
//                   <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-md p-3 space-y-2">
//                     {availableStudents.length === 0 ? (
//                       <p className="text-gray-500">No available students in your department. All students may already be part of a group.</p>
//                     ) : (
//                       availableStudents.map(student => (
//                         <div key={student._id} className="flex items-center">
//                           <input
//                             type="checkbox"
//                             id={`student-${student._id}`}
//                             checked={selectedMembers.some(member => member._id === student._id)}
//                             onChange={() => handleMemberSelection(student._id)}
//                             className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                             disabled={selectedMembers.length >= 3 && !selectedMembers.some(member => member._id === student._id)}
//                           />
//                           <label htmlFor={`student-${student._id}`} className="ml-2 text-sm text-gray-900">
//                             {student.name} ({student.username})
//                           </label>
//                         </div>
//                       ))
//                     )}
//                   </div>
//                   <p className="text-xs text-gray-500 mt-2">You ({currentUser.name}) are automatically included as the 4th member.</p>
//                 </div>

//                 <div className="flex justify-end gap-2">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setShowCreateGroupModal(false)
//                       setGroupName('')
//                       setTopicName('')
//                       setSelectedMembers([])
//                       setError('')
//                     }}
//                     className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//                   >
//                     Create Group
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default Group

//////////////////////////////////////////////////////////////////////////

import React, { useState, useEffect } from 'react'
import { FaUsers, FaPlus, FaEdit, FaSave, FaTimes, FaChalkboardTeacher } from 'react-icons/fa'
import { MdGroups2, MdTopic } from 'react-icons/md'
import { HiOutlineCalendar, HiOutlineCheckCircle, HiOutlineClock } from 'react-icons/hi'
import { useAdmin } from '../../contexts/AdminContext'

const Group = () => {
  const { students, projectGroups, createProjectGroup, updateProjectGroup, guides, department } = useAdmin()
  const [currentUser, setCurrentUser] = useState(null)
  const [userGroup, setUserGroup] = useState(null)
  const [assignedGuide, setAssignedGuide] = useState(null)
  const [groupName, setGroupName] = useState('')
  const [topicName, setTopicName] = useState('')
  const [selectedMembers, setSelectedMembers] = useState([])
  const [availableStudents, setAvailableStudents] = useState([])
  const [error, setError] = useState('')
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editGroupName, setEditGroupName] = useState('')
  const [editTopicName, setEditTopicName] = useState('')

  console.log(projectGroups, "pro")

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setCurrentUser(parsedUser)

      const studentsInGroups = new Set()
      projectGroups.forEach(group => {
        group.selectedMembers.forEach(member => {
          studentsInGroups.add(member._id)
        })
      })

      const departmentStudents = students.filter(
        (s) => s.department === department &&
          s._id !== parsedUser.id &&
          !studentsInGroups.has(s._id)
      )

      setAvailableStudents(departmentStudents)

      const foundGroup = projectGroups.find(group =>
        group.selectedMembers.some(member => member._id === parsedUser.id)
      )

      setUserGroup(foundGroup)
      if (foundGroup?.teacherName) {
        const guide = guides.find(g => g.username === foundGroup.teacherName)
        setAssignedGuide(guide || null)
      } else {
        setAssignedGuide(null)
      }
    }
  }, [students, projectGroups, guides])

  const handleMemberSelection = (studentId) => {
    const selectedStudent = availableStudents.find(s => s._id === studentId)
    if (selectedMembers.some(member => member._id === studentId)) {
      setSelectedMembers(selectedMembers.filter(member => member._id !== studentId))
    } else if (selectedMembers.length < 3) {
      setSelectedMembers([...selectedMembers, selectedStudent])
    } else {
      setError('Maximum 3 members can be selected (excluding yourself).')
    }
  }

  const handleCreateGroup = (e) => {
    e.preventDefault()
    setError('')
    if (!groupName.trim()) return setError('Group name cannot be empty.')
    if (!topicName.trim()) return setError('Topic name cannot be empty.')
    if (!currentUser) return setError('Creator user not found.')
    if (selectedMembers.length < 1) return setError('Please select at least one member.')

    const allMembers = [currentUser, ...selectedMembers]
    const newGroup = createProjectGroup(groupName, allMembers, topicName)
    setUserGroup(newGroup)
    setShowCreateGroupModal(false)
    setGroupName('')
    setTopicName('')
    setSelectedMembers([])
    alert('Project group created successfully!')
  }

  const handleEditToggle = () => {
    if (userGroup) {
      setEditGroupName(userGroup.groupName)
      setEditTopicName(userGroup.topicName || '')
      setIsEditing(true)
    }
  }

  const handleCancelEdit = () => { setIsEditing(false); setError('') }

  const handleSaveEdit = () => {
    if (!editGroupName.trim()) return setError('Group name cannot be empty.')
    if (!editTopicName.trim()) return setError('Topic name cannot be empty.')
    updateProjectGroup(userGroup._id, { name: editGroupName, topicName: editTopicName })
    setIsEditing(false)
    setError('')
    alert('Group details updated successfully!')
  }

  const initials = (name) => name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '?'

  const avatarColors = [
    'bg-blue-100 text-blue-700',
    'bg-violet-100 text-violet-700',
    'bg-emerald-100 text-emerald-700',
    'bg-amber-100 text-amber-700',
  ]

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-600 text-sm font-medium">Loading user data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-3xl mx-auto">

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-sky-400 flex items-center justify-center shadow-md shadow-blue-500/20">
              <MdGroups2 className="text-white w-5 h-5" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Project Groups</h1>
          </div>
          {/* subtitle removed — was text-slate-400, too light */}
        </div>

        {userGroup ? (
          <div className="space-y-4">

            {/* Group Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

              {/* Card Header */}
              <div className="bg-gradient-to-r from-blue-600 to-sky-500 px-6 py-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <FaUsers className="text-white w-5 h-5" />
                  </div>
                  <div>
                    {/* "Your Group" label — white on colored bg, readable */}
                    <p className="text-xs font-semibold text-white/80 uppercase tracking-wider">Your Group</p>
                    <h2 className="text-lg font-bold text-white leading-tight">
                      {isEditing ? editGroupName || 'Editing...' : userGroup.groupName}
                    </h2>
                  </div>
                </div>

                {!isEditing && (
                  <button
                    onClick={handleEditToggle}
                    className="flex items-center gap-1.5 text-xs font-semibold text-white bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <FaEdit className="w-3 h-3" /> Edit
                  </button>
                )}
              </div>

              {/* Edit Form */}
              {isEditing && (
                <div className="px-6 pt-5 pb-4 border-b border-slate-200 bg-blue-50/40">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">Group Name</label>
                      <input
                        type="text"
                        value={editGroupName}
                        onChange={(e) => setEditGroupName(e.target.value)}
                        className="w-full px-3 py-2.5 text-sm text-slate-800 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">Topic Name</label>
                      <input
                        type="text"
                        value={editTopicName}
                        onChange={(e) => setEditTopicName(e.target.value)}
                        className="w-full px-3 py-2.5 text-sm text-slate-800 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                      />
                    </div>
                  </div>
                  {error && (
                    <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-3">{error}</p>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveEdit}
                      className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors shadow-sm"
                    >
                      <FaSave className="w-3.5 h-3.5" /> Save Changes
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="flex items-center gap-1.5 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold px-4 py-2 rounded-xl border border-slate-200 transition-colors"
                    >
                      <FaTimes className="w-3.5 h-3.5" /> Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Info Grid */}
              <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Topic */}
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <MdTopic className="text-indigo-600 w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-0.5">Topic</p>
                    <p className="text-sm font-semibold text-slate-800">{userGroup.topicName || 'Not specified'}</p>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${userGroup.status === 'Accepted' ? 'bg-emerald-100' : 'bg-amber-100'}`}>
                    {userGroup.status === 'Accepted'
                      ? <HiOutlineCheckCircle className="text-emerald-600 w-4 h-4" />
                      : <HiOutlineClock className="text-amber-600 w-4 h-4" />
                    }
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-0.5">Status</p>
                    <span className={`text-sm font-semibold ${userGroup.status === 'Accepted' ? 'text-emerald-700' : 'text-amber-700'}`}>
                      {userGroup.status ?? 'Pending Acceptance'}
                    </span>
                  </div>
                </div>

                {/* Guide */}
                {assignedGuide && (
                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center flex-shrink-0">
                      <FaChalkboardTeacher className="text-violet-600 w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-0.5">Supervisor</p>
                      <p className="text-sm font-semibold text-slate-800">{assignedGuide.teacherName}</p>
                      <p className="text-xs font-medium text-slate-600">{assignedGuide.username}</p>
                    </div>
                  </div>
                )}

                {/* Date */}
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center flex-shrink-0">
                    <HiOutlineCalendar className="text-sky-600 w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-0.5">Created On</p>
                    <p className="text-sm font-semibold text-slate-800">{new Date(userGroup.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                  </div>
                </div>
              </div>

              {/* Members */}
              <div className="px-6 pb-6">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Team Members</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {userGroup.selectedMembers?.map((member, i) => (
                    <div key={member._id} className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 ${avatarColors[i % avatarColors.length]}`}>
                        {initials(member.name)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800 leading-tight">{member.name}</p>
                        <p className="text-xs font-medium text-slate-600">{department}</p>
                      </div>
                      {member._id === currentUser?.id && (
                        <span className="ml-auto text-[10px] font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">You</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        ) : (
          /* Empty State */
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-2xl bg-blue-100 flex items-center justify-center mb-5">
              <MdGroups2 className="w-10 h-10 text-blue-500" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">No Group Yet</h2>
            <p className="text-sm font-medium text-slate-600 mb-6 max-w-xs">You're not part of any project group. Create one to get started with your capstone.</p>
            <button
              onClick={() => setShowCreateGroupModal(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-sky-500 text-white text-sm font-semibold px-6 py-3 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:opacity-95 transition-all"
            >
              <FaPlus className="w-3.5 h-3.5" /> Create Project Group
            </button>
          </div>
        )}

        {/* Create Group Modal */}
        {showCreateGroupModal && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-slate-200 overflow-hidden">

              {/* Modal Header */}
              <div className="bg-gradient-to-r from-blue-600 to-sky-500 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <FaUsers className="text-white w-4 h-4" />
                  <h3 className="text-base font-bold text-white">Create Project Group</h3>
                </div>
                <button
                  onClick={() => { setShowCreateGroupModal(false); setGroupName(''); setTopicName(''); setSelectedMembers([]); setError('') }}
                  className="w-7 h-7 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                >
                  <FaTimes className="text-white w-3 h-3" />
                </button>
              </div>

              <form onSubmit={handleCreateGroup} className="px-6 py-5 space-y-4">

                {/* Group Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">Group Name</label>
                  <input
                    type="text"
                    value={groupName}
                    onChange={(e) => { setGroupName(e.target.value); setError('') }}
                    placeholder="e.g. Team Innovators"
                    className="w-full px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                    required
                  />
                </div>

                {/* Topic Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">Topic Name</label>
                  <input
                    type="text"
                    value={topicName}
                    onChange={(e) => { setTopicName(e.target.value); setError('') }}
                    placeholder="e.g. AI-based Attendance System"
                    className="w-full px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                    required
                  />
                </div>

                {/* Member Select */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide">Select Members</label>
                    <span className="text-xs font-semibold text-slate-600">{selectedMembers.length}/3 selected</span>
                  </div>

                  {error && (
                    <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-2">{error}</p>
                  )}

                  <div className="max-h-48 overflow-y-auto border border-slate-200 rounded-xl divide-y divide-slate-100">
                    {availableStudents.length === 0 ? (
                      <p className="text-sm font-medium text-slate-600 text-center py-6 px-4">No available students in your department.</p>
                    ) : (
                      availableStudents.map(student => {
                        const isSelected = selectedMembers.some(m => m._id === student._id)
                        const isDisabled = selectedMembers.length >= 3 && !isSelected
                        return (
                          <label
                            key={student._id}
                            className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors ${isDisabled ? 'opacity-40 cursor-not-allowed' : 'hover:bg-blue-50'} ${isSelected ? 'bg-blue-50' : 'bg-white'}`}
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleMemberSelection(student._id)}
                              disabled={isDisabled}
                              className="w-4 h-4 rounded text-blue-500 border-slate-300 focus:ring-blue-400"
                            />
                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${isSelected ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-700'}`}>
                              {initials(student.name)}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-slate-800">{student.name}</p>
                              <p className="text-xs font-medium text-slate-600">{student.username}</p>
                            </div>
                          </label>
                        )
                      })
                    )}
                  </div>
                  <p className="text-xs font-medium text-slate-600 mt-2">
                    <span className="font-semibold text-blue-600">{currentUser.name}</span> is automatically added as the 4th member.
                  </p>
                </div>

                {/* Footer Buttons */}
                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => { setShowCreateGroupModal(false); setGroupName(''); setTopicName(''); setSelectedMembers([]); setError('') }}
                    className="flex-1 py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-sky-500 hover:opacity-95 rounded-xl shadow-md shadow-blue-500/20 transition-all"
                  >
                    Create Group
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Group