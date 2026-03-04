import React, { useState } from 'react'
import { useAdmin } from '../contexts/AdminContext'
import { FaDownload, FaUsers, FaTrophy, FaSearch, FaCalendar } from 'react-icons/fa'

const Projects = () => {
    const { tasks, projectGroups } = useAdmin()
    const [searchTerm, setSearchTerm] = useState('')
    console.log(projectGroups, "project");
    console.log(tasks, "tsss");



    // Get all published final reports
    const publishedProjects = tasks
        .filter(
            task =>
                task.taskName === "Final Report Submission" &&
                task.status === "Verified" &&
                task.submittedFileName
        )
        .map(task => {
            const group = projectGroups.find(g => g._id === task.groupId);

            return {
                ...task,
                groupInfo: group || null
            };
        });
    console.log(publishedProjects, "publis");


    // Filter projects based on search term
    const filteredProjects = publishedProjects.filter(project => {
        const groupName = project.groupInfo?.groupName || "";
        const topicName = project.groupInfo?.topicName || "";
        const members =
            project.groupInfo?.selectedMembers
                ?.map(m => m.name)
                .join(" ") || "";

        const searchLower = searchTerm.toLowerCase();



        return (
            groupName.toLowerCase().includes(searchLower) ||
            topicName.toLowerCase().includes(searchLower) ||
            members.toLowerCase().includes(searchLower)
        );
    });
    console.log(filteredProjects, "filter");


    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold mb-4 flex items-center justify-center gap-3">
                            <FaTrophy className="text-yellow-300" />
                            Student Projects Gallery
                        </h1>
                        <p className="text-xl text-blue-100 mb-8">
                            Explore outstanding final year projects from our talented students
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto">
                            <div className="relative">
                                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search by topic, group, or member..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 rounded-full text-gray-800 text-lg focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Projects Grid */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                {filteredProjects.length === 0 ? (
                    <div className="text-center py-20">
                        <FaTrophy className="mx-auto text-6xl text-gray-300 mb-4" />
                        <h3 className="text-2xl font-semibold text-gray-600 mb-2">
                            {searchTerm ? 'No projects found' : 'No published projects yet'}
                        </h3>
                        <p className="text-gray-500">
                            {searchTerm ? 'Try adjusting your search terms' : 'Check back soon for amazing student projects!'}
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="mb-8">
                            <p className="text-gray-600 text-lg">
                                Showing <span className="font-semibold text-blue-600">{filteredProjects.length}</span> published project{filteredProjects.length !== 1 ? 's' : ''}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredProjects.map((project) => (
                                <div
                                    key={project._id}
                                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-300 transform hover:-translate-y-1"
                                >
                                    {/* Project Header */}
                                    <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-6 text-white">
                                        <h3 className="text-xl font-bold mb-1 line-clamp-1">
                                            {project.groupInfo?.topicName || 'Untitled Project'}
                                        </h3>
                                        <p className="text-sm font-medium text-blue-100 mb-2 opacity-90">
                                            {project.groupInfo?.groupName || 'Project Group'}
                                        </p>
                                        <p className="text-sm font-medium text-blue-100 mb-2 opacity-90">
                                            {project.groupInfo?.department || 'Project Group'}
                                        </p>
                                        <div className="flex items-center gap-2 text-blue-100">
                                            <FaCalendar className="text-sm" />
                                            <span className="text-sm">
                                                Published: {new Date(project.submissionDate).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Project Body */}
                                    <div className="p-6 space-y-4">
                                        {/* Final Mark */}
                                        {/* <div className="flex items-center justify-between bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                                            <span className="text-gray-700 font-medium">Final Mark</span>
                                            <span className="text-3xl font-bold text-green-600">
                                                {project.finalMark}
                                                <span className="text-lg text-gray-500">/100</span>
                                            </span>
                                        </div> */}

                                        {/* Team Members */}
                                        <div>
                                            <div className="flex items-center gap-2 mb-3">
                                                <FaUsers className="text-blue-600" />
                                                <h4 className="font-semibold text-gray-800">Team Members</h4>
                                            </div>
                                            <ul className="space-y-2">
                                                {project.groupInfo?.selectedMembers?.map((member, idx) => (
                                                    <li key={idx} className="text-sm text-gray-600 flex items-start">
                                                        <span className="text-blue-500 mr-2">•</span>
                                                        <div>
                                                            <p className="font-medium text-gray-800">{member.name}</p>

                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* File Info */}
                                        <div className="pt-4 border-t border-gray-200">
                                            <p className="text-sm text-gray-600 mb-3">
                                                <span className="font-medium">Report:</span> {project.submittedFileName}
                                            </p>
                                            <p className="text-xs text-gray-500 mb-4">
                                                Size: {Math.round(project.submittedFile.fileSize / 1024)} KB •
                                                Submitted: {new Date(project.submissionDate).toLocaleDateString()}
                                            </p>

                                            {/* Project Links */}
                                            {(project.projectGitLink || project.projectLiveLink) && (
                                                <div className="flex gap-2 mb-4">
                                                    {project.projectGitLink && (
                                                        <a
                                                            href={project.projectGitLink}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white text-sm font-semibold rounded-lg transition-all"
                                                        >
                                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.412-4.041-1.412-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                                            Source
                                                        </a>
                                                    )}
                                                    {project.projectLiveLink && (
                                                        <a
                                                            href={project.projectLiveLink}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-lg transition-all"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                                            Demo
                                                        </a>
                                                    )}
                                                </div>
                                            )}

                                            {/* Download Button */}
                                            <a
                                                href={`http://localhost:5000/${project.submittedFilePath}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                                            >
                                                <FaDownload />
                                                Download Report
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Footer */}
            <div className="bg-gray-800 text-white py-8 mt-16">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-gray-400">
                        © {new Date().getFullYear()} Final Year Project Management System
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Projects