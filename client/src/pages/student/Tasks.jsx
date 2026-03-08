


import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FaTasks, FaUpload, FaCheckCircle, FaClock, FaFile, FaFlagCheckered, FaCalendarAlt, FaRedo, FaUsers, FaDownload } from 'react-icons/fa'
import { useAdmin } from '../../contexts/AdminContext'

const StatusBadge = ({ status, isOverdue }) => {
  if (isOverdue) {
    return (
      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold bg-red-100 text-red-800 border border-red-400">
        <span className="w-2 h-2 rounded-full bg-red-600" />
        Overdue
      </span>
    )
  }
  const config = {
    Verified: 'bg-emerald-100 text-emerald-900 border border-emerald-400',
    Submitted: 'bg-blue-100 text-blue-900 border border-blue-400',
    'Needs Resubmit': 'bg-amber-100 text-amber-900 border border-amber-400',
    Pending: 'bg-gray-200 text-gray-700 border border-gray-400',
  }
  const dot = {
    Verified: 'bg-emerald-700',
    Submitted: 'bg-blue-700',
    'Needs Resubmit': 'bg-amber-600',
    Pending: 'bg-gray-500',
  }
  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold ${config[status] || config.Pending}`}>
      <span className={`w-2 h-2 rounded-full ${dot[status] || dot.Pending}`} />
      {status}
    </span>
  )
}

const InfoRow = ({ label, value }) => (
  <div className="flex items-start gap-3">
    <span className="text-xs font-bold text-gray-600 uppercase tracking-wide w-20 shrink-0 mt-0.5">{label}</span>
    <span className="text-sm text-gray-900 font-semibold">{value}</span>
  </div>
)

const Tasks = () => {
  const { projectGroups, tasks, submitTaskFile, studentId } = useAdmin()
  const [userGroup, setUserGroup] = useState(null)
  const [groupTasks, setGroupTasks] = useState([])
  const [uploadingTaskId, setUploadingTaskId] = useState(null)
  const [selectedFiles, setSelectedFiles] = useState({})
  const [finalLinks, setFinalLinks] = useState({ projectGitLink: '', projectLiveLink: '' });

  console.log(tasks, "tasks");

  useEffect(() => {
    if (studentId && projectGroups.length > 0) {
      const foundGroup = projectGroups.find(group =>
        group.selectedMembers && group.selectedMembers.some(member => member._id === studentId)
      )
      setUserGroup(foundGroup || null)
    } else {
      setUserGroup(null)
    }
    setGroupTasks(tasks)
  }, [projectGroups, tasks, studentId])

  const handleFileSelect = (taskId, event) => {
    const file = event.target.files[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB')
        return
      }
      setSelectedFiles(prev => ({
        ...prev,
        [taskId]: { file, fileName: file.name, fileSize: file.size, fileType: file.type }
      }))
    }
  }

  // const handleSubmitFile = async (taskId) => {
  //   const fileData = selectedFiles[taskId]
  //   if (!fileData) return alert('Please select a file first')
  //   setUploadingTaskId(taskId)
  //   try {
  //     submitTaskFile(taskId, fileData.file)
  //     alert('File submitted successfully!')
  //     setSelectedFiles(prev => {
  //       const newState = { ...prev }
  //       delete newState[taskId]
  //       return newState
  //     })
  //     if (userGroup) {
  //       const tasksForGroup = tasks.filter(task => task.groupId === userGroup._id)
  //       setGroupTasks(tasksForGroup)
  //     }
  //   } catch (error) {
  //     console.error('Error submitting file:', error)
  //     alert('Error submitting file. Please try again.')
  //   } finally {
  //     setUploadingTaskId(null)
  //   }
  // }


  const handleDownload = (fileName) => {
    if (!fileName) return;
    const baseUrl = axios.defaults.baseURL.replace('/api', '')
    const downloadUrl = `${baseUrl}/${fileName}`;

    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', fileName || 'download');
    link.setAttribute('target', '_blank');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmitFile = async (taskId, isFinal = false) => {
    const fileData = selectedFiles[taskId];
    if (!fileData) return alert('Please select a file first');

    setUploadingTaskId(taskId);

    try {
      const links = isFinal ? finalLinks : {};
      await submitTaskFile(taskId, fileData.file, links);

      alert('File submitted successfully!');

      setSelectedFiles(prev => {
        const next = { ...prev };
        delete next[taskId];
        return next;
      });

      if (isFinal) setFinalLinks({ projectGitLink: '', projectLiveLink: '' });

    } catch (err) {
      alert('Error submitting file. Please try again.');
      console.error(err);
    } finally {
      setUploadingTaskId(null);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  const getTaskStatus = (task) => {
    const dueDate = new Date(task.submissionDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    dueDate.setHours(0, 0, 0, 0)
    switch (task.status) {
      case 'Verified': return { isOverdue: false }
      case 'Submitted': return { isOverdue: false }
      case 'Needs Resubmit': return { isOverdue: false }
      default: return { isOverdue: dueDate < today }
    }
  }

  if (!groupTasks) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex items-center gap-3 text-gray-600">
          <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
          <span className="text-base font-semibold">Loading tasks...</span>
        </div>
      </div>
    )
  }

  if (!userGroup) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 md:p-8 flex items-center justify-center">
        <div className="bg-white border border-gray-300 rounded-2xl p-16 text-center shadow-sm max-w-md w-full">
          <div className="bg-gray-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <FaTasks className="text-gray-500 w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">No Group Assigned</h3>
          <p className="text-gray-600 text-base">You need to be part of a group to view tasks.</p>
        </div>
      </div>
    )
  }

  const regularTasks = groupTasks.filter(t => t.taskName !== 'Final Report Submission')
  const finalTask = groupTasks.find(t => t.taskName === 'Final Report Submission')

  console.log(regularTasks, "tasks");


  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="max-w-6xl mx-auto">

        {/* Page Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-blue-100 border border-blue-300 p-2.5 rounded-xl">
                <FaTasks className="text-blue-700 w-5 h-5" />
              </div>
              <span className="text-blue-800 border border-blue-300 bg-blue-100 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                Student View
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Project Tasks</h1>
            <div className="flex items-center gap-2 mt-2">
              <FaUsers className="text-gray-500 w-4 h-4" />
              <p className="text-gray-700 text-base font-medium">
                Group: <span className="text-gray-900 font-bold">{userGroup?.groupName}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-2xl px-5 py-3 text-right shadow-sm">
            <p className="text-gray-600 text-xs font-bold uppercase tracking-widest mb-1">Total Tasks</p>
            <p className="text-blue-700 text-2xl font-extrabold">{groupTasks.length}</p>
          </div>
        </div>

        {groupTasks.length === 0 ? (
          <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-16 text-center shadow-sm">
            <div className="bg-gray-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FaTasks className="text-gray-400 w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">No Tasks Assigned</h3>
            <p className="text-gray-600 text-base">Your guide hasn't assigned any tasks yet.</p>
          </div>
        ) : (
          <div className="space-y-5">

            {/* Regular Tasks */}
            {regularTasks.map((task, index) => {
              const { isOverdue } = getTaskStatus(task)
              const hasFile = !!selectedFiles[task._id]
              const isSubmitted = task.status === 'Submitted' || task.status === 'Verified'
              const needsResubmit = task.status === 'Needs Resubmit'
              const dueDate = new Date(task.submissionDate)

              let borderClass = 'border-gray-200'
              if (isOverdue && !isSubmitted) borderClass = 'border-red-200 border-l-4 border-l-red-500'
              else if (needsResubmit) borderClass = 'border-amber-200 border-l-4 border-l-amber-500'
              else if (isSubmitted) borderClass = 'border-emerald-200 border-l-4 border-l-emerald-500'

              return (
                <div key={task._id} className={`bg-white border rounded-2xl shadow-sm hover:shadow-md transition-shadow ${borderClass}`}>

                  {/* Task header */}
                  <div className="px-6 pt-5 pb-4 border-b border-gray-200">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-gray-200 rounded-xl flex items-center justify-center text-sm font-bold text-gray-600 shrink-0">
                          {String(index + 1).padStart(2, '0')}
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 leading-snug">{task.taskName}</h3>
                      </div>
                      <StatusBadge status={task.status} isOverdue={isOverdue && !isSubmitted} />
                    </div>

                    <div className="mt-3 ml-12 inline-flex items-center gap-2 flex-wrap 
                bg-blue-50 border border-blue-200 
                rounded-full px-3 py-1">

                      <FaCalendarAlt className="w-3.5 h-3.5 text-blue-600" />

                      <span className="text-sm font-semibold text-blue-700">
                        Due:{' '}
                        <span className={`font-bold ${isOverdue && !isSubmitted ? 'text-red-700' : 'text-blue-900'}`}>
                          {dueDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                      </span>

                      {isOverdue && !isSubmitted && (
                        <span className="text-red-700 text-xs font-bold bg-red-100 border border-red-300 px-2 py-0.5 rounded-full">
                          ⚠ Overdue
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Task body */}
                  <div className="px-6 py-5 space-y-4">

                    {/* Resubmit remark */}
                    {needsResubmit && task.reviewRemark && (
                      <div className="flex items-start gap-3 bg-amber-50 border border-amber-300 rounded-xl px-4 py-3">
                        <FaRedo className="text-amber-700 w-4 h-4 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-amber-800 uppercase tracking-wide mb-1">Guide Remark</p>
                          <p className="text-sm font-medium text-amber-900">{task.reviewRemark}</p>
                        </div>
                      </div>
                    )}

                    {/* Submitted info */}
                    {isSubmitted && (task.submittedFile || task.submittedFileName || task.submittedFilePath) && (
                      <div className="bg-emerald-50 border border-emerald-300 rounded-xl px-4 py-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <FaCheckCircle className="text-emerald-700 w-4 h-4" />
                            <span className="text-sm font-bold text-emerald-900">
                              {task.status === 'Verified' ? 'Verified by Guide' : 'File Submitted'}
                            </span>
                          </div>
                          <button
                            onClick={() => {
                              console.log("Downloading file:", task.submittedFilePath);
                              handleDownload(task.submittedFilePath);
                            }}
                            className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm active:scale-95"
                          >
                            <FaDownload className="w-3 h-3" />
                            Download
                          </button>
                        </div>
                        <div className="space-y-2.5">
                          <InfoRow label="File" value={task.submittedFileName || (task.submittedFile && task.submittedFile.fileName) || 'View File'} />
                          {(task.submittedFile && task.submittedFile.fileSize) ? <InfoRow label="Size" value={formatFileSize(task.submittedFile.fileSize)} /> : null}
                          <InfoRow label="On" value={new Date(task.updatedAt || task.submittedFile?.submittedAt || Date.now()).toLocaleString()} />
                          {task.reviewRemark && task.status === 'Verified' && (
                            <InfoRow label="Remark" value={task.reviewRemark} />
                          )}
                        </div>
                      </div>
                    )}

                    {/* Upload area */}
                    {!isSubmitted && (
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-bold text-gray-800 mb-1">Upload Submission</p>
                          <p className="text-sm text-gray-600 mb-3">Accepted: PDF, DOC, DOCX, ZIP, RAR &nbsp;·&nbsp; Max 10MB</p>
                          <label className="block cursor-pointer group">
                            <input
                              type="file"
                              onChange={(e) => handleFileSelect(task._id, e)}
                              className="hidden"
                              accept=".pdf,.doc,.docx,.zip,.rar"
                            />
                            <div className={`flex items-center gap-3 px-4 py-4 border-2 border-dashed rounded-xl transition-all
                              ${hasFile
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-300 bg-gray-50 group-hover:border-blue-400 group-hover:bg-blue-50'
                              }`}>
                              <div className={`p-2 rounded-lg shrink-0 ${hasFile ? 'bg-blue-200' : 'bg-gray-300 group-hover:bg-blue-100'}`}>
                                <FaFile className={`w-4 h-4 ${hasFile ? 'text-blue-700' : 'text-gray-600 group-hover:text-blue-600'}`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className={`text-sm font-semibold truncate ${hasFile ? 'text-blue-900' : 'text-gray-600'}`}>
                                  {hasFile ? selectedFiles[task._id].fileName : 'Click to choose a file'}
                                </p>
                                <p className={`text-xs mt-0.5 font-medium ${hasFile ? 'text-blue-600' : 'text-gray-500'}`}>
                                  {hasFile ? formatFileSize(selectedFiles[task._id].fileSize) : 'No file selected'}
                                </p>
                              </div>
                            </div>
                          </label>
                        </div>

                        {hasFile && (
                          <button
                            onClick={() => handleSubmitFile(task._id)}
                            disabled={uploadingTaskId === task._id}
                            className="w-full py-3 rounded-xl text-base font-bold flex items-center justify-center gap-2 transition-all bg-blue-600 text-white hover:bg-blue-700 shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <FaUpload className="w-4 h-4" />
                            {uploadingTaskId === task._id ? 'Uploading...' : 'Submit File'}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}

            {/* Final Report Task */}
            {finalTask && (() => {
              const { isOverdue } = getTaskStatus(finalTask)
              const hasFile = !!selectedFiles[finalTask._id]
              const isSubmitted = finalTask.status === 'Submitted' || finalTask.status === 'Verified'
              const dueDate = new Date(finalTask.submissionDate)

              return (
                <div className="bg-white border-2 border-violet-300 rounded-2xl shadow-md overflow-hidden">

                  {/* Final header strip */}
                  <div className="bg-violet-600 px-6 py-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FaFlagCheckered className="text-white w-4 h-4" />
                      <span className="text-sm font-bold text-white uppercase tracking-widest">Final Stage</span>
                    </div>
                    <span className="bg-white text-violet-800 text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full">
                      Project Finale
                    </span>
                  </div>

                  {/* Task header */}
                  <div className="px-6 pt-5 pb-4 border-b border-violet-100">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-lg font-bold text-gray-900">{finalTask.taskName}</h3>
                      <StatusBadge status={finalTask.status} isOverdue={isOverdue && !isSubmitted} />
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <FaCalendarAlt className="w-3.5 h-3.5 text-gray-500" />
                      <span className="text-sm font-semibold text-gray-700">
                        Due:{' '}
                        <span className="font-bold text-gray-900">
                          {dueDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="px-6 py-5 space-y-4">

                    {/* Final Mark */}
                    {finalTask.finalMark !== undefined && (
                      <div className="bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-300 rounded-xl p-5">
                        <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-3">Project Performance Score</p>
                        <div className="flex items-end justify-between mb-4">
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-6xl font-black text-gray-900 leading-none">{finalTask.finalMark}</span>
                            <span className="text-xl font-bold text-gray-500">/ 100</span>
                          </div>
                          <div className="text-right">
                            <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-900 border border-emerald-400 px-3 py-1.5 rounded-full text-xs font-bold">
                              <FaCheckCircle className="w-3 h-3" /> Completed
                            </span>
                            <p className="text-xs text-gray-600 font-semibold mt-2">
                              Published {new Date(finalTask.publishedAt || Date.now()).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </p>
                          </div>
                        </div>
                        <div className="bg-white border border-violet-200 rounded-full h-3 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-700 ${finalTask.finalMark >= 75 ? 'bg-emerald-500' : finalTask.finalMark >= 50 ? 'bg-amber-400' : 'bg-red-500'}`}
                            style={{ width: `${finalTask.finalMark}%` }}
                          />
                        </div>
                        <div className="flex justify-between mt-1.5 text-xs text-gray-600 font-semibold">
                          <span>0</span>
                          <span>50</span>
                          <span>100</span>
                        </div>
                      </div>
                    )}

                    {/* Submitted info */}
                    {isSubmitted && (finalTask.submittedFile || finalTask.submittedFileName || finalTask.submittedFilePath) && (
                      <div className="bg-violet-200 border border-violet-600 rounded-xl px-4 py-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <FaCheckCircle className="text-violet-700 w-4 h-4" />
                            <span className="text-sm font-bold text-violet-900">
                              {finalTask.status === 'Verified' ? 'Verified by Guide' : 'Report Submitted'}
                            </span>
                          </div>
                          <button
                            onClick={() => {
                              console.log("Downloading report:", finalTask.submittedFileName);
                              handleDownload(finalTask.submittedFilePath, finalTask.submittedFileName);
                            }}
                            className="inline-flex items-center gap-2 px-3 py-1.5 bg-violet-700 hover:bg-violet-800 text-white rounded-lg text-xs font-bold transition-all shadow-sm active:scale-95"
                          >
                            <FaDownload className="w-3 h-3" />
                            Download
                          </button>
                        </div>
                        <div className="space-y-2.5">
                          <InfoRow label="File" value={finalTask.submittedFileName || (finalTask.submittedFile && finalTask.submittedFile.fileName) || 'View File'} />
                          {(finalTask.submittedFile && finalTask.submittedFile.fileSize) ? <InfoRow label="Size" value={formatFileSize(finalTask.submittedFile.fileSize)} /> : null}
                          <InfoRow label="On" value={new Date(finalTask.updatedAt || finalTask.submittedFile?.submittedAt || Date.now()).toLocaleString()} />
                          {finalTask.projectGitLink && <InfoRow label="Git Link" value={<a href={finalTask.projectGitLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{finalTask.projectGitLink}</a>} />}
                          {finalTask.projectLiveLink && <InfoRow label="Live Preview" value={<a href={finalTask.projectLiveLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{finalTask.projectLiveLink}</a>} />}
                        </div>
                      </div>
                    )}

                    {/* Upload */}
                    {!isSubmitted && (
                      <div className="space-y-4">
                        {/* Final Links Inputs */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">Project Git Link</label>
                            <input
                              type="url"
                              placeholder="https://github.com/..."
                              value={finalLinks.projectGitLink}
                              onChange={(e) => setFinalLinks(prev => ({ ...prev, projectGitLink: e.target.value }))}
                              className="w-full bg-violet-50 border border-violet-200 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-2.5 text-sm font-medium outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition-all shadow-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">Live Preview Link</label>
                            <input
                              type="url"
                              placeholder="https://project.vercel.app"
                              value={finalLinks.projectLiveLink}
                              onChange={(e) => setFinalLinks(prev => ({ ...prev, projectLiveLink: e.target.value }))}
                              className="w-full bg-violet-50 border border-violet-200 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-2.5 text-sm font-medium outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition-all shadow-sm"
                            />
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-bold text-gray-800 mb-1">Upload Final Report</p>
                          <p className="text-sm text-gray-600 mb-3">Accepted: PDF, DOC, DOCX, ZIP, RAR &nbsp;·&nbsp; Max 10MB</p>
                          <label className="block cursor-pointer group">
                            <input
                              type="file"
                              onChange={(e) => handleFileSelect(finalTask._id, e)}
                              className="hidden"
                              accept=".pdf,.doc,.docx,.zip,.rar"
                            />
                            <div className={`flex items-center gap-3 px-4 py-4 border-2 border-dashed rounded-xl transition-all
                              ${hasFile
                                ? 'border-violet-500 bg-violet-50'
                                : 'border-gray-300 bg-gray-50 group-hover:border-violet-400 group-hover:bg-violet-50'
                              }`}>
                              <div className={`p-2 rounded-lg shrink-0 ${hasFile ? 'bg-violet-200' : 'bg-gray-300 group-hover:bg-violet-100'}`}>
                                <FaFile className={`w-4 h-4 ${hasFile ? 'text-violet-700' : 'text-gray-600 group-hover:text-violet-600'}`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className={`text-sm font-semibold truncate ${hasFile ? 'text-violet-900' : 'text-gray-600'}`}>
                                  {hasFile ? selectedFiles[finalTask._id].fileName : 'Click to choose your final report'}
                                </p>
                                <p className={`text-xs mt-0.5 font-medium ${hasFile ? 'text-violet-600' : 'text-gray-500'}`}>
                                  {hasFile ? formatFileSize(selectedFiles[finalTask._id].fileSize) : 'No file selected'}
                                </p>
                              </div>
                            </div>
                          </label>
                        </div>

                        {hasFile && (
                          <button
                            onClick={() => handleSubmitFile(finalTask._id, true)}
                            disabled={uploadingTaskId === finalTask._id}
                            className="w-full py-3 rounded-xl text-base font-bold flex items-center justify-center gap-2 transition-all bg-violet-600 text-white hover:bg-violet-700 shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <FaUpload className="w-4 h-4" />
                            {uploadingTaskId === finalTask._id ? 'Uploading...' : 'Submit Final Report'}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )
            })()}
          </div>
        )}
      </div>
    </div>
  )
}

export default Tasks