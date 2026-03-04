import React, { useMemo, useState, useEffect } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
} from 'recharts';
import { useAdmin } from '../../contexts/AdminContext';
import { FiActivity, FiPieChart, FiBarChart2, FiAward } from 'react-icons/fi';

const StudentAnalytics = () => {
    const { projectGroups, tasks, studentId } = useAdmin();
    const [studentTasks, setStudentTasks] = useState([]);
    const [studentProjects, setStudentProjects] = useState([]);

    useEffect(() => {
        if (!studentId || projectGroups.length === 0) return;

        // Get student's projects
        const projects = projectGroups.filter(group =>
            group.selectedMembers && group.selectedMembers.some(member => member._id === studentId)
        );
        setStudentProjects(projects);

        // Get student's tasks from all projects they belong to
        const studentTasksData = tasks.filter(task => {
            return projects.some(project => project._id === task.groupId);
        });
        setStudentTasks(studentTasksData);
    }, [projectGroups, tasks, studentId]);

    // 1. Task Status Distribution
    const taskStatusData = useMemo(() => {
        if (studentTasks.length === 0) return [];

        const statusCounts = studentTasks.reduce((acc, task) => {
            const status = task.status || 'Pending';
            acc[status] = (acc[status] || 0) + 1;
            return acc;
        }, {});

        return Object.keys(statusCounts).map(status => ({
            name: status,
            value: statusCounts[status],
        }));
    }, [studentTasks]);

    // 2. Project Progress (Tasks completion)
    const projectProgressData = useMemo(() => {
        return studentProjects.map(group => {
            const groupTasks = studentTasks.filter(task => task.groupId === group._id);
            return {
                name: group.groupName || group.name || 'Unnamed Project',
                total: groupTasks.length,
                completed: groupTasks.filter(t => t.status === 'Completed' || t.status === 'Verified').length,
            };
        });
    }, [studentProjects, studentTasks]);

    // 3. Performance (Scores on verified tasks)
    const performanceData = useMemo(() => {
        return studentTasks
            .filter(task => task.status === 'Verified' && task.marks !== undefined)
            .map(task => ({
                name: task.taskName,
                score: task.marks || 0,
            }));
    }, [studentTasks]);

    const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

    const getStatusColor = (index) => COLORS[index % COLORS.length];

    if (studentProjects.length === 0 && studentTasks.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                    <FiActivity className="w-10 h-10 text-blue-500" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">No Analytics Available</h2>
                <p className="text-slate-500 max-w-md">
                    You are not assigned to any projects yet, or there are no tasks for your projects. Once tasks are assigned and updated, your analytics will appear here.
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">My Analytics</h1>
                    <p className="text-slate-500 mt-1">Track your project progress and task performance.</p>
                </div>
                <div className="flex items-center gap-4 text-sm">
                    <div className="bg-white px-5 py-3 rounded-xl shadow-sm border border-slate-200 flex items-center gap-3">
                        <div className="p-2 bg-indigo-50 rounded-lg">
                            <FiBarChart2 className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Total Tasks</p>
                            <p className="font-bold text-slate-900 text-lg">{studentTasks.length}</p>
                        </div>
                    </div>
                    <div className="bg-white px-5 py-3 rounded-xl shadow-sm border border-slate-200 flex items-center gap-3">
                        <div className="p-2 bg-green-50 rounded-lg">
                            <FiActivity className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Completed</p>
                            <p className="font-bold text-slate-900 text-lg">
                                {studentTasks.filter(t => t.status === 'Completed' || t.status === 'Verified').length}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Task Status Distribution */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2 text-slate-800">
                            <FiPieChart className="w-5 h-5 text-indigo-600" />
                            <h3 className="text-xl font-bold">Task Status Distribution</h3>
                        </div>
                    </div>

                    {taskStatusData.length > 0 ? (
                        <div className="flex flex-col items-center">
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={taskStatusData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        innerRadius={70}
                                        paddingAngle={5}
                                    >
                                        {taskStatusData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={getStatusColor(index)} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Legend verticalAlign="bottom" height={36} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-64 text-slate-400">No data to display</div>
                    )}
                </div>

                {/* Project Progress */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <div className="flex items-center gap-2 mb-6 text-slate-800">
                        <FiBarChart2 className="w-5 h-5 text-indigo-600" />
                        <h3 className="text-xl font-bold">Project Task Completion</h3>
                    </div>

                    {projectProgressData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={projectProgressData} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#64748b' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#64748b' }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    cursor={{ fill: '#f8fafc' }}
                                />
                                <Legend />
                                <Bar dataKey="total" name="Total Tasks" fill="#94a3b8" radius={[4, 4, 0, 0]} barSize={30} />
                                <Bar dataKey="completed" name="Completed Tasks" fill="#10b981" radius={[4, 4, 0, 0]} barSize={30} />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="flex items-center justify-center h-64 text-slate-400">No projects or tasks to display</div>
                    )}
                </div>

                {/* Performance (Task Scores) */}
                {performanceData.length > 0 && (
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 lg:col-span-2">
                        <div className="flex items-center gap-2 mb-6 text-slate-800">
                            <FiAward className="w-5 h-5 text-indigo-600" />
                            <h3 className="text-xl font-bold">Performance (Verified Tasks)</h3>
                        </div>

                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={performanceData} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#64748b' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#64748b' }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    cursor={{ fill: '#f8fafc' }}
                                />
                                <Bar dataKey="score" name="Score" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40}>
                                    {
                                        performanceData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))
                                    }
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentAnalytics;
