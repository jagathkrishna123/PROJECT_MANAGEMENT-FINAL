



import React, { useState, useEffect } from 'react'
import { FaCalendarAlt, FaTasks, FaSave, FaPlus, FaTrash, FaFlagCheckered, FaCheckCircle, FaChevronDown, FaClock, FaFileAlt, FaUsers, FaMedal } from 'react-icons/fa'
import { useAdmin } from '../../contexts/AdminContext'
import axios from 'axios'

const StatusBadge = ({ status }) => {
  const config = {
    Verified: 'bg-emerald-100 text-emerald-900 border border-emerald-400',
    Submitted: 'bg-blue-100 text-blue-900 border border-blue-400',
    'Needs Resubmit': 'bg-amber-100 text-amber-900 border border-amber-400',
    Pending: 'bg-gray-200 text-gray-700 border border-gray-400',
  }
  const dot = {
    Verified: 'bg-emerald-600',
    Submitted: 'bg-blue-600',
    'Needs Resubmit': 'bg-amber-600',
    Pending: 'bg-gray-500',
  }
  const cls = config[status] || config.Pending
  const d = dot[status] || dot.Pending
  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${cls}`}>
      <span className={`w-2 h-2 rounded-full ${d}`} />
      {status}
    </span>
  )
}



const SectionHeader = ({ icon: Icon, title, subtitle, iconClass, iconBgClass }) => (
  <div className="flex items-start gap-3 mb-5">
    <div className={`p-2.5 rounded-xl mt-0.5 shrink-0 ${iconBgClass}`}>
      <Icon className={`w-4 h-4 ${iconClass}`} />
    </div>
    <div>
      <h2 className="text-base font-bold text-gray-900 tracking-tight">{title}</h2>
      {subtitle && <p className="text-sm text-gray-600 mt-0.5">{subtitle}</p>}
    </div>
  </div>
)

const AddTask = () => {
  const { GuideprojectGroups, tasks, addTask, editTask, updateTask, reviewTask } = useAdmin()

  const [supervisedGroups, setSupervisedGroups] = useState([])
  const [selectedGroupId, setSelectedGroupId] = useState(null)
  const [existingTasks, setExistingTasks] = useState([])
  const [taskDates, setTaskDates] = useState({})
  const [saving, setSaving] = useState(false)
  const [remarks, setRemarks] = useState({})
  const [newTaskName, setNewTaskName] = useState('')
  const [newTaskDeadline, setNewTaskDeadline] = useState('')
  const [finalReportDeadline, setFinalReportDeadline] = useState('')
  const [finalMarks, setFinalMarks] = useState({})
  const [finalReportTask, setFinalReportTask] = useState(null)
  const [expandedTasks, setExpandedTasks] = useState({})

  useEffect(() => {
    try {
      const assigned = GuideprojectGroups.filter(g => g.status === 'Accepted')
      setSupervisedGroups(assigned)
      if (assigned.length === 0) {
        setSelectedGroupId(null)
      } else if (selectedGroupId === null || !assigned.some(g => g._id === selectedGroupId)) {
        setSelectedGroupId(assigned.length > 0 ? assigned[0]._id : null)
      }
    } catch (err) {
      console.error('User parse error:', err)
    }
  }, [GuideprojectGroups, selectedGroupId])
  useEffect(() => {
    console.log("======= TASKS DEBUG =======")

    console.log("tasks:", tasks)

    if (!tasks) {
      console.log("tasks is undefined ❌")
      return
    }

    if (tasks.length === 0) {
      console.log("tasks is empty ⚠️")
      return
    }

    tasks.forEach((t, index) => {
      console.log(`Task ${index + 1}:`, t)
      console.log("submissionDate:", t.submissionDate)

      const d = new Date(t.submissionDate)
      console.log("Parsed:", d)
      console.log("Valid?:", !isNaN(d.getTime()))
    })

    console.log("======= END DEBUG =======")
  }, [tasks])

  useEffect(() => {
    if (!selectedGroupId) {
      setExistingTasks([])
      setTaskDates({})
      setFinalReportTask(null)
      return
    }
    const groupTasks = tasks.filter(t => t.groupId === selectedGroupId)
    const finalTask = groupTasks.find(t => t.taskName === 'Final Report Submission')
    const regularTasks = groupTasks.filter(t => t.taskName !== 'Final Report Submission')
    setFinalReportTask(finalTask || null)
    setExistingTasks(regularTasks)
    const dates = {}
    regularTasks.forEach(task => {
      dates[task._id] = task.submissionDate ? new Date(task.submissionDate).toISOString().split('T')[0] : ''
    })
    setTaskDates(dates)
    if (finalTask) {
      setFinalReportDeadline(new Date(finalTask.submissionDate).toISOString().split('T')[0])
    }
  }, [selectedGroupId, tasks])

  const handleDateChange = (taskId, date) => setTaskDates(prev => ({ ...prev, [taskId]: date }))
  const handleRemarkChange = (taskId, value) => setRemarks(prev => ({ ...prev, [taskId]: value }))
  const toggleExpand = (taskId) => setExpandedTasks(prev => ({ ...prev, [taskId]: !prev[taskId] }))

  const handleAssignTask = async (taskId) => {
    if (!selectedGroupId) return alert('Please select a group')
    const taskToUpdate = existingTasks.find(t => t._id === taskId)
    if (!taskToUpdate) return alert('Task not found')
    const submissionDate = taskDates[taskToUpdate._id] || (taskToUpdate.submissionDate ? new Date(taskToUpdate.submissionDate).toISOString().split('T')[0] : '')
    if (!submissionDate) return alert('Please select a submission date')
    setSaving(true)
    try {
      await editTask(taskToUpdate._id, { submissionDate })
      alert('Task date updated successfully!')
    } catch {
      alert('Failed to update task date')
    } finally {
      setSaving(false)
    }
  }

  const handleReview = (task, action) => {
    if (!task) return
    const reviewRemark = remarks[task._id] || ''
    const status = action === 'verify' ? 'Verified' : 'Needs Resubmit'
    reviewTask(task._id, { status, reviewRemark })
    // ✅ clear remark field
    setRemarks(prev => ({
      ...prev,
      [task._id]: ''
    }))
    alert(action === 'verify' ? 'Task verified successfully.' : 'Resubmit requested from students.')
  }

  const handleCreateTask = () => {
    if (!selectedGroupId) return alert('Please select a group first')
    if (!newTaskName.trim()) return alert('Please enter a task name')
    if (!newTaskDeadline) return alert('Please select a deadline')
    const duplicate = existingTasks.find(t => t.taskName.toLowerCase() === newTaskName.trim().toLowerCase())
    if (duplicate) return alert('A task with this name already exists for this group')
    setSaving(true)
    addTask({ taskName: newTaskName.trim(), groupId: selectedGroupId, submissionDate: newTaskDeadline, status: 'Pending' })
    setNewTaskName('')
    setNewTaskDeadline('')
    setSaving(false)
    alert('Task created successfully!')
  }

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return
    try {
      const res = await axios.delete(`/deleteTask/${taskId}`, { withCredentials: true })
      alert('Task deleted successfully ✅')
      setExistingTasks(prev => prev.filter(task => task._id !== taskId))
      return res.data
    } catch {
      alert('Failed to delete task ❌')
    }
  }

  const handleFinalReportDeadline = async () => {
    if (!selectedGroupId) return alert('Please select a group first')
    if (!finalReportDeadline) return alert('Please select a deadline for the final report')
    setSaving(true)
    try {
      if (finalReportTask) {
        await editTask(finalReportTask._id, { submissionDate: finalReportDeadline })
        alert('Final report deadline updated!')
      } else {
        await addTask({ taskName: 'Final Report Submission', groupId: selectedGroupId, submissionDate: finalReportDeadline, status: 'Pending' })
        alert('Final report task created!')
      }
    } catch {
      alert('Failed to set deadline')
    } finally {
      setSaving(false)
    }
  }

  const handleMarkChange = (groupId, mark) => setFinalMarks(prev => ({ ...prev, [groupId]: mark }))

  const handlePublishMarks = () => {
    if (!selectedGroupId) return alert('Please select a group')
    const mark = finalMarks[selectedGroupId]
    if (!mark || mark < 0 || mark > 100) return alert('Please enter a valid mark between 0 and 100')
    if (!finalReportTask || !finalReportTask.submittedFileName) return alert('No final report has been submitted yet')
    if (!window.confirm(`Publish final mark of ${mark} for this group? This will make the project publicly visible.`)) return
    setSaving(true)
    const selectedGroup = supervisedGroups.find(g => g._id === selectedGroupId)
    updateTask(finalReportTask._id, {
      status: 'Verified', reviewRemark: `Final Mark: ${mark}/100`, finalMark: mark, isPublished: true,
      publishedAt: new Date().toISOString(),
      groupInfo: { id: selectedGroup._id, name: selectedGroup.name, topicName: selectedGroup.topicName, members: selectedGroup.members }
    })
    setSaving(false)
    alert(`Final mark of ${mark} published successfully!`)
  }

  if (!GuideprojectGroups) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex items-center gap-3 text-gray-600">
          <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
          <span className="text-base font-semibold">Loading workspace...</span>
        </div>
      </div>
    )
  }

  const selectedGroup = supervisedGroups.find(g => g._id === selectedGroupId)
  const today = new Date().toISOString().split('T')[0]
  const inputBase = "w-full bg-white border border-gray-300 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-2.5 text-sm font-medium outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all shadow-sm"

  return (
    <div className="min-h-screen bg-gray-100 p-3 rounded-xl">
      <div className="max-w-6xl mx-auto">

        {/* Page Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-blue-100 border border-blue-300 p-2.5 rounded-xl">
                <FaTasks className="text-blue-700 w-5 h-5" />
              </div>
              <span className="text-blue-800 border border-blue-300 bg-blue-100 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                Guide Panel
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Task Management</h1>
            <p className="text-gray-600 text-base mt-1">Assign deadlines, review submissions & publish marks</p>
          </div>
          <div className="flex items-center gap-4 bg-white border border-gray-300 rounded-2xl px-5 py-4 text-right shadow-sm">
            <p className="text-gray-600 text-xs font-bold uppercase tracking-widest mb-1">Groups</p>
            <p className="text-blue-700 text-2xl font-extrabold">{supervisedGroups.length}</p>
          </div>
        </div>

        {/* Group Selector */}
        <div className="bg-white border border-gray-300 rounded-2xl p-5 mb-5 shadow-sm">
          <SectionHeader
            icon={FaUsers} title="Select Group" subtitle="Choose a project group to manage"
            iconClass="text-blue-700" iconBgClass="bg-blue-100 border border-blue-300"
          />
          <div className="relative">
            <select
              value={selectedGroupId ?? ''}
              onChange={e => setSelectedGroupId(e.target.value)}
              className="w-full bg-white border border-gray-300 text-gray-800 font-medium rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all appearance-none cursor-pointer shadow-sm"
            >
              <option value="">— Select a group —</option>
              {supervisedGroups.map(group => (
                <option key={group._id} value={group._id}>
                  {group.groupName} · {group.selectedMembers.length} members
                </option>
              ))}
            </select>
            <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none w-3 h-3" />
          </div>

          {selectedGroup && (
            <div className="mt-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 flex flex-wrap gap-2">
              {selectedGroup.selectedMembers.map(m => (
                <span key={m._id} className="bg-white text-blue-800 border border-blue-300 text-sm font-semibold px-3 py-1 rounded-full shadow-sm">
                  {m.name}
                </span>
              ))}
            </div>
          )}
        </div>

        {selectedGroupId && (
          <div className="space-y-5">

            {/* Create New Task */}
            <div className="bg-white border border-gray-300 rounded-2xl p-5 shadow-sm">
              <SectionHeader
                icon={FaPlus} title="Create New Task" subtitle="Add a milestone for this group"
                iconClass="text-emerald-700" iconBgClass="bg-emerald-100 border border-emerald-300"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Task Name</label>
                  <input
                    type="text"
                    value={newTaskName}
                    onChange={e => setNewTaskName(e.target.value)}
                    placeholder="e.g., Abstract Submission"
                    className={inputBase}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Deadline</label>
                  <input
                    type="date"
                    value={newTaskDeadline}
                    onChange={e => setNewTaskDeadline(e.target.value)}
                    min={today}
                    className={inputBase}
                  />
                </div>
              </div>
              <button
                onClick={handleCreateTask}
                disabled={saving || !newTaskName.trim() || !newTaskDeadline}
                className="mt-4 w-full py-3 rounded-xl text-base font-bold flex items-center justify-center gap-2 transition-all bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none disabled:cursor-not-allowed"
              >
                <FaPlus className="w-3.5 h-3.5" /> Create Task
              </button>
            </div>

            {/* Final Report Section */}
            <div className="bg-white border border-gray-300 border-l-4 border-l-violet-600 rounded-2xl p-5 shadow-sm">
              <div className="flex items-start justify-between mb-5">
                <SectionHeader
                  icon={FaFlagCheckered} title="Final Report Submission" subtitle="Project milestone & marking"
                  iconClass="text-violet-700" iconBgClass="bg-violet-100 border border-violet-300"
                />
                <span className="bg-violet-100 text-violet-800 border border-violet-300 text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shrink-0 mt-1">
                  Finale
                </span>
              </div>

              {/* Deadline picker */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4">
                <label className="block text-sm font-bold text-gray-700 mb-2">Final Report Deadline</label>
                <div className="flex gap-3">
                  <input
                    type="date"
                    value={finalReportDeadline}
                    onChange={e => setFinalReportDeadline(e.target.value)}
                    min={today}
                    className={`${inputBase} flex-1`}
                  />
                  <button
                    onClick={handleFinalReportDeadline}
                    disabled={saving || !finalReportDeadline}
                    className="px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all bg-violet-600 text-white hover:bg-violet-700 shadow-sm disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none disabled:cursor-not-allowed"
                  >
                    <FaSave className="w-3 h-3" />
                    {finalReportTask ? 'Update' : 'Set'}
                  </button>
                </div>
                {finalReportTask && (
                  <p className="text-sm text-violet-700 font-semibold mt-2 flex items-center gap-1.5">
                    <FaCheckCircle className="w-3.5 h-3.5" />
                    Deadline set: {new Date(finalReportTask.submissionDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                )}
              </div>

              {finalReportTask && finalReportTask.submittedFileName ? (
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-bold text-gray-900 mb-3">Submitted Report</h3>
                      <div className="space-y-2 text-sm">
                        <p className="text-gray-800"><span className="font-bold text-gray-700">File:</span> {finalReportTask.submittedFile.fileName}</p>
                        <p className="text-gray-800"><span className="font-bold text-gray-700">Size:</span> {Math.round(finalReportTask.submittedFile.fileSize / 1024)} KB</p>
                        <p className="text-gray-800">
                          <span className="font-bold text-gray-700">Submitted:</span>
                          {finalReportTask.updatedAt
                            ? new Date(finalReportTask.updatedAt).toLocaleString()
                            : "No submission date"}
                        </p>
                        {finalReportTask.projectGitLink && (
                          <p className="text-gray-800">
                            <span className="font-bold text-gray-700">Git Link:</span>{" "}
                            <a href={finalReportTask.projectGitLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{finalReportTask.projectGitLink}</a>
                          </p>
                        )}
                        {finalReportTask.projectLiveLink && (
                          <p className="text-gray-800">
                            <span className="font-bold text-gray-700">Live Preview:</span>{" "}
                            <a href={finalReportTask.projectLiveLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{finalReportTask.projectLiveLink}</a>
                          </p>
                        )}
                      </div>
                    </div>
                    <StatusBadge status={finalReportTask.status} />
                  </div>
                  <a
                    href={`http://localhost:5000/${finalReportTask.submittedFilePath}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold bg-blue-100 text-blue-800 border border-blue-300 hover:bg-blue-200 transition-colors"

                  >
                    <FaFileAlt className="w-3 h-3" /> Download Report
                  </a>

                  <div className="border-t border-gray-300 pt-4 space-y-3">
                    <label className="block text-sm font-bold text-gray-700">Final Mark (0–100)</label>
                    <input
                      type="number" min="0" max="100"
                      value={finalMarks[selectedGroupId] || ''}
                      onChange={e => handleMarkChange(selectedGroupId, e.target.value)}
                      placeholder="Enter mark"
                      disabled={finalReportTask.status === 'Verified'}
                      className={`${inputBase} disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed`}
                    />
                    {finalReportTask.finalMark && (
                      <p className="text-sm text-emerald-700 font-bold flex items-center gap-1.5">
                        <FaMedal className="w-4 h-4" /> Published: {finalReportTask.finalMark}/100
                      </p>
                    )}
                    <button
                      onClick={handlePublishMarks}
                      disabled={saving || finalReportTask.status === 'Verified' || !finalMarks[selectedGroupId]}
                      className="w-full py-3 rounded-xl text-base font-bold flex items-center justify-center gap-2 transition-all bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none disabled:cursor-not-allowed"
                    >
                      <FaMedal className="w-4 h-4" />
                      {finalReportTask.status === 'Verified' ? 'Marks Published ✓' : 'Publish Final Marks'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-8 text-center">
                  <FaClock className="text-gray-400 w-7 h-7 mx-auto mb-2" />
                  <p className="text-gray-600 text-sm font-medium">
                    {finalReportTask ? 'Awaiting student submission...' : 'Set a deadline above to enable final report submission'}
                  </p>
                </div>
              )}
            </div>

            {/* Assigned Tasks List */}
            <div className="bg-white border border-gray-300 rounded-2xl p-5 shadow-sm">
              <SectionHeader
                icon={FaTasks}
                title="Assigned Tasks"
                subtitle={`${existingTasks.length} task${existingTasks.length !== 1 ? 's' : ''} for this group`}
                iconClass="text-amber-700"
                iconBgClass="bg-amber-100 border border-amber-300"
              />

              {existingTasks.length === 0 ? (
                <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-12 text-center">
                  <FaTasks className="text-gray-300 w-8 h-8 mx-auto mb-3" />
                  <p className="text-gray-600 text-base font-semibold">No tasks assigned yet</p>
                  <p className="text-gray-500 text-sm mt-1">Create your first task using the form above</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {existingTasks.map((task, index) => (
                    <div key={task._id} className="bg-white border border-gray-300 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      {/* Task header row */}
                      <div className="flex items-center gap-3 p-4">
                        <div className="w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center text-sm font-bold text-gray-600 shrink-0">
                          {String(index + 1).padStart(2, '0')}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-base font-bold text-gray-900 truncate">{task.taskName}</p>
                          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                            <StatusBadge status={task.status} />
                            <span className="text-sm text-gray-600 font-medium flex items-center gap-1">
                              <FaCalendarAlt className="w-3 h-3 text-gray-500" />
                              {new Date(task.submissionDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleExpand(task._id)}
                          className="bg-gray-100 border border-gray-300 text-gray-600 hover:text-gray-900 hover:bg-gray-200 p-2 rounded-lg transition-colors shrink-0"
                        >
                          <FaChevronDown
                            className="w-3 h-3 transition-transform duration-200"
                            style={{ transform: expandedTasks[task._id] ? 'rotate(180deg)' : 'rotate(0deg)' }}
                          />
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task._id)}
                          className="bg-gray-100 border border-gray-300 text-gray-600 hover:text-red-600 hover:bg-red-50 hover:border-red-300 p-2 rounded-lg transition-colors shrink-0"
                        >
                          <FaTrash className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Expandable details */}
                      {expandedTasks[task._id] && (
                        <div className="border-t border-gray-200 bg-gray-50 p-5 space-y-4">

                          {/* Update deadline */}
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Update Deadline</label>
                            <div className="flex gap-2">
                              <input
                                type="date"
                                value={taskDates[task._id] !== undefined ? taskDates[task._id] : (task.submissionDate ? new Date(task.submissionDate).toISOString().split('T')[0] : '')}
                                min={today}
                                onChange={e => handleDateChange(task._id, e.target.value)}
                                className={`${inputBase} flex-1`}
                              />
                              <button
                                onClick={() => handleAssignTask(task._id)}
                                disabled={saving}
                                className="px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-1.5 whitespace-nowrap bg-blue-600 text-white hover:bg-blue-700 shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <FaSave className="w-3 h-3" /> Update
                              </button>
                            </div>
                          </div>

                          {/* File submission */}
                          {task.submittedFileName && (

                            <div className="bg-white border border-gray-300 rounded-xl p-4 shadow-sm">
                              <p className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-2">Submission</p>
                              <div className="text-sm space-y-1.5">
                                <p className="text-gray-800 font-medium">{task.submittedFileName}</p>
                                <p className="text-gray-600">
                                  {task.updatedAt
                                    ? new Date(task.updatedAt).toLocaleString()
                                    : "No submission date"}
                                </p>                              </div>
                              <a
                                // href={`http://localhost:5000/${task.submittedFileName}`}
                                href={`http://localhost:5000/${task.submittedFilePath}`}
                                target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-2 mt-3 rounded-lg text-sm font-semibold bg-blue-100 text-blue-800 border border-blue-300 hover:bg-blue-200 transition-colors"
                              >
                                <FaFileAlt className="w-3 h-3" /> Download
                              </a>
                            </div>
                          )}

                          {/* Remark + Review actions */}
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Review Remark</label>
                            <textarea
                              rows={2}
                              className="w-full bg-white border border-gray-300 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-2.5 text-sm font-medium outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none shadow-sm"
                              placeholder="Add remark for this task..."
                              value={task._id in remarks ? remarks[task._id] : task.reviewRemark || ''}
                              onChange={e => handleRemarkChange(task._id, e.target.value)}
                            />
                            <div className="flex gap-2 mt-2">
                              <button
                                onClick={() => handleReview(task, 'resubmit')}
                                className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-colors bg-amber-100 border border-amber-300 text-amber-900 hover:bg-amber-200"
                              >
                                Request Resubmit
                              </button>
                              <button
                                onClick={() => handleReview(task, 'verify')}
                                className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-colors bg-emerald-100 border border-emerald-300 text-emerald-900 hover:bg-emerald-200"
                              >
                                Mark Verified
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Empty state when no group selected */}
        {!selectedGroupId && (
          <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-16 text-center shadow-sm">
            <div className="bg-blue-100 border border-blue-300 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FaUsers className="text-blue-700 w-6 h-6" />
            </div>
            <p className="text-gray-700 text-base font-bold">Select a group to get started</p>
            <p className="text-gray-500 text-sm mt-1">Choose from the dropdown above</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AddTask