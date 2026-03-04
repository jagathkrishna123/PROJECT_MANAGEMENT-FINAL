import React, { useMemo } from 'react';
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
import { FiUsers, FiPieChart, FiBarChart2, FiCheckCircle } from 'react-icons/fi';

const GuideAnalytics = () => {
    const { GuideprojectGroups, tasks } = useAdmin();

    // 1. Task Status Distribution
    const taskStatusData = useMemo(() => {
        if (!tasks || tasks.length === 0) return [];

        const statusCounts = tasks.reduce((acc, task) => {
            const status = task.status || 'Pending';
            acc[status] = (acc[status] || 0) + 1;
            return acc;
        }, {});

        return Object.keys(statusCounts).map(status => ({
            name: status,
            value: statusCounts[status],
        }));
    }, [tasks]);

    // 2. Group Progress (Tasks completion across supervised groups)
    const groupProgressData = useMemo(() => {
        if (!GuideprojectGroups || GuideprojectGroups.length === 0) return [];

        return GuideprojectGroups.map(group => {
            const groupTasks = tasks.filter(task => task.groupId === group._id);
            return {
                name: group.groupName || group.name || 'Unnamed Group',
                totalTasks: groupTasks.length,
                verified: groupTasks.filter(t => t.status === 'Verified').length,
                pendingReview: groupTasks.filter(t => t.status === 'Submitted').length,
            };
        });
    }, [GuideprojectGroups, tasks]);

    // 3. Performance (Average Scores on verified tasks per group)
    const groupPerformanceData = useMemo(() => {
        if (!GuideprojectGroups || GuideprojectGroups.length === 0) return [];

        return GuideprojectGroups.map(group => {
            const groupTasks = tasks.filter(task => task.groupId === group._id && task.status === 'Verified' && task.marks !== undefined);

            let averageScore = 0;
            if (groupTasks.length > 0) {
                const totalScore = groupTasks.reduce((sum, t) => sum + (Number(t.marks) || 0), 0);
                averageScore = Math.round(totalScore / groupTasks.length);
            }

            return {
                name: group.groupName || group.name || 'Unnamed Group',
                averageScore,
            };
        }).filter(data => data.averageScore > 0);
    }, [GuideprojectGroups, tasks]);

    const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];
    const getStatusColor = (index) => COLORS[index % COLORS.length];

    const pendingReviewCount = tasks.filter(t => t.status === 'Submitted').length;

    if (!GuideprojectGroups || GuideprojectGroups.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                    <FiUsers className="w-10 h-10 text-blue-500" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">No Analytics Available</h2>
                <p className="text-slate-500 max-w-md">
                    You are not supervising any groups yet. Once you accept group requests and assign tasks, your analytics will appear here.
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Guide Analytics</h1>
                    <p className="text-slate-500 mt-1">Monitor the progress and performance of your supervised groups.</p>
                </div>
                <div className="flex items-center gap-4 text-sm flex-wrap">
                    <div className="bg-white px-5 py-3 rounded-xl shadow-sm border border-slate-200 flex items-center gap-3">
                        <div className="p-2 bg-indigo-50 rounded-lg">
                            <FiUsers className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Supervised Groups</p>
                            <p className="font-bold text-slate-900 text-lg">{GuideprojectGroups.length}</p>
                        </div>
                    </div>
                    <div className="bg-white px-5 py-3 rounded-xl shadow-sm border border-slate-200 flex items-center gap-3">
                        <div className="p-2 bg-amber-50 rounded-lg">
                            <FiCheckCircle className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Pending Review</p>
                            <p className="font-bold text-amber-600 text-lg">{pendingReviewCount}</p>
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
                            <h3 className="text-xl font-bold">Overall Task Distribution</h3>
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
                        <div className="flex items-center justify-center h-64 text-slate-400">No tasks assigned yet</div>
                    )}
                </div>

                {/* Group Progress */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <div className="flex items-center gap-2 mb-6 text-slate-800">
                        <FiBarChart2 className="w-5 h-5 text-indigo-600" />
                        <h3 className="text-xl font-bold">Group Task Progress</h3>
                    </div>

                    {groupProgressData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={groupProgressData} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#64748b' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#64748b' }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    cursor={{ fill: '#f8fafc' }}
                                />
                                <Legend />
                                <Bar dataKey="totalTasks" name="Total Assigned" fill="#94a3b8" radius={[4, 4, 0, 0]} barSize={20} />
                                <Bar dataKey="verified" name="Verified" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
                                <Bar dataKey="pendingReview" name="Pending Review" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="flex items-center justify-center h-64 text-slate-400">No group progress data</div>
                    )}
                </div>

                {/* Performance (Average Scores) */}
                {groupPerformanceData.length > 0 && (
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 lg:col-span-2">
                        <div className="flex items-center gap-2 mb-6 text-slate-800">
                            <FiBarChart2 className="w-5 h-5 text-indigo-600" />
                            <h3 className="text-xl font-bold">Average Verified Task Scores (Out of 100)</h3>
                        </div>

                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={groupPerformanceData} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#64748b' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#64748b' }} domain={[0, 100]} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    cursor={{ fill: '#f8fafc' }}
                                />
                                <Bar dataKey="averageScore" name="Avg Score" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40}>
                                    {
                                        groupPerformanceData.map((entry, index) => (
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

export default GuideAnalytics;
