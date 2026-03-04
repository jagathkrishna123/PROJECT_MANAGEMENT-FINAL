import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  MdOutlineSpaceDashboard,
  MdGroups,
  MdOutlineAnalytics,
  MdOutlineSettings,
  MdOutlineHelpOutline
} from "react-icons/md";
import {
  PiStudentFill,
  PiNotificationBold,
  PiBookOpenTextFill,
  PiPresentationChartFill
} from "react-icons/pi";
import { FaUserTie, FaChevronRight } from "react-icons/fa";
import { HiAcademicCap } from "react-icons/hi";
import { motion } from "framer-motion";

const SidebarLink = ({ to, end, icon: Icon, label }) => {
  const location = useLocation();
  const isActive = end
    ? location.pathname === to
    : location.pathname.startsWith(to);

  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `group relative flex items-center gap-3 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 ${isActive
          ? "bg-blue-600/10 text-blue-600"
          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
        }`
      }
    >
      <div className={`relative z-10 p-2 rounded-lg transition-colors duration-300 ${isActive ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" : "bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-blue-600"
        }`}>
        <Icon className="w-5 h-5" />
      </div>

      <span className="relative z-10 flex-1">{label}</span>

      {isActive && (
        <motion.div
          layoutId="active-indicator"
          className="absolute left-0 w-1 h-2/3 bg-blue-600 rounded-r-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      <FaChevronRight className={`w-3 h-3 transition-all duration-300 ${isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 group-hover:opacity-40 group-hover:translate-x-0"
        }`} />
    </NavLink>
  );
};

const SectionHeader = ({ label }) => (
  <div className="px-4 pt-6 pb-2">
    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
      {label}
    </span>
  </div>
);

const Sidebar = () => {
  return (
    <aside className="flex flex-col bg-white border-r border-slate-200 w-64 h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-6">
        <nav className="space-y-1">
          <SectionHeader label="Overview" />
          <SidebarLink
            to="/admin"
            end
            icon={MdOutlineSpaceDashboard}
            label="Dashboard"
          />
          <SidebarLink
            to="/admin/analytics"
            icon={PiPresentationChartFill}
            label="Analytics"
          />

          <SectionHeader label="Academic" />
          <SidebarLink
            to="/admin/academic-setup"
            icon={HiAcademicCap}
            label="Setup"
          />
          <SidebarLink
            to="/admin/students"
            icon={PiStudentFill}
            label="Students"
          />
          <SidebarLink
            to="/admin/guides"
            icon={FaUserTie}
            label="Guides"
          />

          <SectionHeader label="Projects" />
          <SidebarLink
            to="/admin/project-groups"
            icon={MdGroups}
            label="Groups"
          />
          <SidebarLink
            to="/admin/notifications"
            icon={PiNotificationBold}
            label="Notifications"
          />
        </nav>
      </div>

      {/* Sidebar Footer */}
      <div className="p-4 bg-slate-50/50 border-t border-slate-200">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200/60 shadow-sm">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-900 truncate">Version 2.4.0</p>
            <p className="text-[10px] text-slate-500">Premium Dashboard</p>
          </div>
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;
