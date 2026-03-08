// import React, { useMemo, useState } from 'react'
// import { FaUsers, FaFilter } from 'react-icons/fa'
// import { useAdmin } from '../../contexts/AdminContext'

// const ProjectGroups = () => {
//   const { projectGroups, departments, guides } = useAdmin()
//   const [departmentFilter, setDepartmentFilter] = useState('ALL')

//   const departmentOptions = useMemo(
//     () => (departments || []).map(d => d.name).filter(Boolean),
//     [departments]
//   )

//   console.log(projectGroups, "gro");



//   const groupsWithMeta = useMemo(() => {
//     let list = [...(projectGroups || [])]

//     // Filter out invalid/empty groups
//     list = list.filter(g => g && g.groupName && g.department)

//     // newest first
//     list.sort(
//       (a, b) =>
//         new Date(b.createdAt || 0).getTime() -
//         new Date(a.createdAt || 0).getTime()
//     )

//     return list.map(group => {
//       const guide =
//         guides?.find(g => g._id === group.teacherId) || null

//       return {
//         ...group,
//         _guideName: guide ? `${guide.name} (${guide.username})` : (group.teacherName || 'Not assigned')
//       }
//     })
//   }, [projectGroups, guides])

//   const filteredGroups = useMemo(() => {
//     if (departmentFilter === 'ALL') return groupsWithMeta
//     return groupsWithMeta.filter(g => g.department === departmentFilter)
//   }, [groupsWithMeta, departmentFilter])

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
//               <FaUsers className="text-blue-600" />
//               Project Groups
//             </h1>
//             <p className="text-gray-600 mt-1">
//               All student-created project groups visible to administrators.
//             </p>
//           </div>

//           <div className="bg-white border border-gray-200 rounded-lg p-3 flex items-center gap-3">
//             <FaFilter className="text-gray-500" />
//             <span className="text-sm font-medium text-gray-700">
//               Department
//             </span>
//             <select
//               value={departmentFilter}
//               onChange={e => setDepartmentFilter(e.target.value)}
//               className="text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="ALL">All</option>
//               {departmentOptions.map(name => (
//                 <option key={name} value={name}>
//                   {name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {filteredGroups.length === 0 ? (
//           <div className="bg-white rounded-lg shadow-sm p-10 text-center text-gray-600">
//             No project groups found.
//           </div>
//         ) : (
//           <div className="grid gap-5 md:grid-cols-2">
//             {filteredGroups.map(group => (
//               <div
//                 key={group._id}
//                 className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
//               >
//                 <div className="flex items-start justify-between gap-3">
//                   <div>
//                     <h2 className="text-xl font-semibold text-gray-900">
//                       {group.groupName}
//                     </h2>
//                     <p className="text-sm text-gray-600 mt-1">
//                       <span className="font-medium">Department:</span>{' '}
//                       {group.department}
//                     </p>
//                     <p className="text-sm text-gray-600">
//                       <span className="font-medium">Status:</span>{' '}
//                       {group.status || 'Pending acceptance'}
//                     </p>
//                     <p className="text-sm text-gray-600">
//                       <span className="font-medium">Assigned guide:</span>{' '}
//                       {group._guideName}
//                     </p>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-xs text-gray-500">
//                       Created:{' '}
//                       {group.createdAt
//                         ? new Date(group.createdAt).toLocaleString()
//                         : '—'}
//                     </p>
//                     {group.updatedAt && (
//                       <p className="text-xs text-gray-500 mt-1">
//                         Updated:{' '}
//                         {new Date(group.updatedAt).toLocaleString()}
//                       </p>
//                     )}
//                   </div>
//                 </div>

//                 <div className="mt-5">
//                   <h3 className="text-sm font-semibold text-gray-800 mb-2">
//                     Members ({group.selectedMembers?.length || 0})
//                   </h3>
//                   <div className="border border-gray-200 rounded-md divide-y">
//                     {(group.selectedMembers || []).map(m => (
//                       <div
//                         key={m._id}
//                         className="px-3 py-2 text-sm text-gray-700 flex flex-wrap items-center gap-x-2 gap-y-1"
//                       >
//                         <span className="font-medium">{m.name}</span>
//                         <span className="text-gray-500">
//                           ({m.name})
//                         </span>
//                         <span className="text-gray-400">•</span>
//                         <span className="text-gray-600">
//                           {m.email}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default ProjectGroups



import React, { useMemo, useState } from 'react'
import { FaUsers, FaFilter, FaUserGraduate, FaCalendarAlt, FaCheckCircle, FaClock, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useAdmin } from '../../contexts/AdminContext'

const ProjectGroups = () => {
  const { projectGroups, departments, guides } = useAdmin()
  const [departmentFilter, setDepartmentFilter] = useState('ALL')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  const departmentOptions = useMemo(
    () => (departments || []).map(d => d.name).filter(Boolean),
    [departments]
  )

  const groupsWithMeta = useMemo(() => {
    let list = [...(projectGroups || [])]

    // Filter out invalid/empty groups
    list = list.filter(g => g && g.groupName && g.department)

    // newest first
    list.sort(
      (a, b) =>
        new Date(b.createdAt || 0).getTime() -
        new Date(a.createdAt || 0).getTime()
    )

    return list.map(group => {
      const guide =
        guides?.find(g => g._id === group.teacherId) || null

      return {
        ...group,
        _guideName: guide ? `${guide.name} (${guide.username})` : (group.teacherName || 'Not assigned')
      }
    })
  }, [projectGroups, guides])

  const filteredGroups = useMemo(() => {
    if (departmentFilter === 'ALL') return groupsWithMeta
    return groupsWithMeta.filter(g => g.department === departmentFilter)
  }, [groupsWithMeta, departmentFilter])

  // Reset to page 1 when filter changes
  React.useEffect(() => {
    setCurrentPage(1)
  }, [departmentFilter])

  // Pagination calculations
  const totalPages = Math.ceil(filteredGroups.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentGroups = filteredGroups.slice(startIndex, endIndex)

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const getStatusBadge = (status) => {
    const statusText = status || 'Pending acceptance'
    const isAccepted = statusText.toLowerCase().includes('accept')
    
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
        isAccepted 
          ? 'bg-green-50 text-green-700 border border-green-200' 
          : 'bg-amber-50 text-amber-700 border border-amber-200'
      }`}>
        {isAccepted ? <FaCheckCircle /> : <FaClock />}
        {statusText}
      </span>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <FaUsers className="text-white text-xl" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Project Groups
                </h1>
              </div>
              <p className="text-gray-600 ml-15">
                Manage and monitor all student project groups across departments
              </p>
            </div>

            {/* Filter Section */}
            <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <FaFilter className="text-gray-600 text-sm" />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-gray-700">
                    Department
                  </span>
                  <select
                    value={departmentFilter}
                    onChange={e => setDepartmentFilter(e.target.value)}
                    className="text-sm border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer hover:border-gray-400 transition-colors"
                  >
                    <option value="ALL">All Departments</option>
                    {departmentOptions.map(name => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="mt-6 flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-600">
                Total Groups: <span className="font-semibold text-gray-900">{filteredGroups.length}</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">
                Departments: <span className="font-semibold text-gray-900">{departmentOptions.length}</span>
              </span>
            </div>
            {filteredGroups.length > 0 && (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-gray-600">
                  Showing: <span className="font-semibold text-gray-900">{startIndex + 1}-{Math.min(endIndex, filteredGroups.length)}</span> of <span className="font-semibold text-gray-900">{filteredGroups.length}</span>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {filteredGroups.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaUsers className="text-gray-400 text-3xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Project Groups Found</h3>
            <p className="text-gray-600">
              {departmentFilter === 'ALL' 
                ? 'There are no project groups created yet.' 
                : `No groups found in the ${departmentFilter} department.`}
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2">
              {currentGroups.map(group => (
              <div
                key={group._id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-300 hover:bg-gradient-to-br hover:from-blue-50 hover:to-white transition-all duration-300 overflow-hidden group cursor-pointer"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-blue-50 to-white group-hover:from-blue-100 group-hover:to-blue-50 p-6 border-b border-gray-100 transition-all duration-300">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {group.groupName}
                      </h2>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white text-gray-700 border border-gray-200">
                          {group.department}
                        </span>
                        {getStatusBadge(group.status)}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                        <FaCalendarAlt className="text-gray-400" />
                        <span>Created</span>
                      </div>
                      <p className="text-xs font-medium text-gray-700">
                        {group.createdAt
                          ? new Date(group.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })
                          : '—'}
                      </p>
                      {group.updatedAt && (
                        <p className="text-xs text-gray-500 mt-1">
                          Updated: {new Date(group.updatedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Guide Info */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FaUserGraduate className="text-blue-600 text-sm" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Assigned Guide</p>
                        <p className="text-sm font-semibold text-gray-900">{group._guideName}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Members Section */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                      <span className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-xs font-bold">
                        {group.selectedMembers?.length || 0}
                      </span>
                      Team Members
                    </h3>
                  </div>
                  
                  <div className="space-y-2">
                    {(group.selectedMembers || []).map((m, idx) => (
                      <div
                        key={m._id}
                        className="bg-gray-50 rounded-xl px-4 py-3 border border-gray-100 hover:bg-blue-50 hover:border-blue-300 hover:shadow-sm transition-all duration-200 cursor-pointer"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-sm">
                            {m.name?.charAt(0)?.toUpperCase() || idx + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 text-sm truncate">
                              {m.name}
                            </p>
                            <p className="text-xs text-gray-600 truncate mt-0.5">
                              {m.email}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 shadow-sm'
                }`}
              >
                <FaChevronLeft className="text-sm" />
                Previous
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                  // Show first page, last page, current page, and pages around current
                  const showPage = 
                    page === 1 || 
                    page === totalPages || 
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  
                  // Show ellipsis
                  const showEllipsisBefore = page === currentPage - 2 && currentPage > 3
                  const showEllipsisAfter = page === currentPage + 2 && currentPage < totalPages - 2

                  if (showEllipsisBefore || showEllipsisAfter) {
                    return (
                      <span key={page} className="px-2 text-gray-400">
                        ...
                      </span>
                    )
                  }

                  if (!showPage) return null

                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 ${
                        currentPage === page
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                          : 'bg-white text-gray-700 border border-gray-300 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600'
                      }`}
                    >
                      {page}
                    </button>
                  )
                })}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 shadow-sm'
                }`}
              >
                Next
                <FaChevronRight className="text-sm" />
              </button>
            </div>
          )}
        </>
        )}
      </div>
    </div>
  )
}

export default ProjectGroups