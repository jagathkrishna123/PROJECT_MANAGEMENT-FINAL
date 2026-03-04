// import React from "react";
// import { NavLink } from "react-router-dom";
// import { BiNotification } from "react-icons/bi";
// import { LuMessageSquareMore, LuUserRoundCheck } from "react-icons/lu";
// import { MdOutlineSpaceDashboard} from "react-icons/md";
// import { IoSettingsOutline } from "react-icons/io5";
// import { FiEdit } from "react-icons/fi";
// import { FaUserGear } from "react-icons/fa6";
// import { GoGraph } from "react-icons/go";

// const SidebarLink = ({ to, end, icon: Icon, label }) => {
//   return (
//     <NavLink
//       to={to}
//       end={end}
//       className={({ isActive }) =>
//         `group flex items-center gap-4 py-4 px-4 rounded-xl text-sm font-medium transition-all duration-200 hover:shadow-md ${
//           isActive
//             ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/25"
//             : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
//         }`
//       }
//     >
//       {({ isActive }) => (
//         <>
//           <Icon
//             className={`w-5 h-5 transition-colors duration-200 ${
//               isActive
//                 ? "text-white"
//                 : "text-slate-400 group-hover:text-slate-600"
//             }`}
//           />
//           <span className="hidden md:inline-block">{label}</span>
//         </>
//       )}
//     </NavLink>
//   );
// };

// const Sidebar = () => {
//   return (
//     <aside className="flex flex-col bg-white/95 backdrop-blur-md border-r border-slate-200/60 min-h-full pt-8 px-4 shadow-xl w-64">
//       <nav className="flex-1 space-y-2">
//         <SidebarLink
//           to="/guide"
//           end
//           icon={MdOutlineSpaceDashboard}
//           label="Dashboard"
//         />
//         <SidebarLink
//           to="/guide/notifications"
//           icon={BiNotification}
//           label="Notifications"
//         />
//         <SidebarLink
//           to="/guide/assigntask"
//           icon={FiEdit}
//           label="Assign Task"
//         />
//         <SidebarLink
//           to="/guide/managegroup"
//           icon={IoSettingsOutline}
//           label="Manage Group"
//         />
//         <SidebarLink
//           to="/guide/message-guide"
//           icon={LuMessageSquareMore}
//           label="Message"
//         />
//         <SidebarLink
//           to="/guide/guide-profile"
//           icon={LuUserRoundCheck}
//           label="Profile"
//         />
//         <SidebarLink
//           to="/guide/guide-analytics"
//           icon={GoGraph}
//           label="Analytics"
//         />
//       </nav>

//       {/* Footer */}
//       <div className="pt-6 border-t border-slate-200/60 mt-6">
//         <p className="text-xs text-slate-500 text-center">Capstone Admin v1.0</p>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;


////////////////////////////////////////////////

import React from "react";
import { NavLink } from "react-router-dom";
import { BiNotification } from "react-icons/bi";
import { LuMessageSquareMore, LuUserRoundCheck } from "react-icons/lu";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { GoGraph } from "react-icons/go";

const SidebarLink = ({ to, end, icon: Icon, label }) => {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
          isActive
            ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-lg shadow-blue-500/20"
            : "text-slate-500 hover:bg-slate-100 hover:text-slate-800 hover:translate-x-0.5"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <Icon
            className={`w-[18px] h-[18px] flex-shrink-0 transition-colors duration-200 ${
              isActive ? "text-white" : "text-slate-400 group-hover:text-slate-600"
            }`}
          />
          <span className="hidden md:inline truncate">{label}</span>
          {isActive && (
            <span className="hidden md:block ml-auto w-1.5 h-1.5 rounded-full bg-white/60" />
          )}
        </>
      )}
    </NavLink>
  );
};

const SectionLabel = ({ children }) => (
  <p className="hidden md:block px-3 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
    {children}
  </p>
);

const Divider = () => (
  <div className="mx-2 my-2 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
);

const Sidebar = () => {
  return (
    <aside className="flex flex-col w-16 md:w-60 min-h-full bg-white border-r border-slate-100 shadow-[4px_0_24px_-4px_rgba(15,23,42,0.06)] px-2 md:px-3 pt-6 pb-4">

      {/* Brand */}
      <div className="flex items-center gap-3 px-1 mb-7">
        <div className="relative flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-sky-400 flex items-center justify-center shadow-md shadow-blue-500/25">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7l10 5 10-5-10-5z" fill="white" />
            <path
              d="M2 17l10 5 10-5M2 12l10 5 10-5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-400 border-2 border-white rounded-full" />
        </div>
        <div className="hidden md:block leading-tight">
          <p className="text-sm font-bold text-slate-800 tracking-tight">Capstone</p>
          <p className="text-[11px] text-slate-400 font-normal">Guide Portal</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-0.5">
        <SectionLabel>Overview</SectionLabel>
        <SidebarLink to="/guide" end icon={MdOutlineSpaceDashboard} label="Dashboard" />
        <SidebarLink to="/guide/notifications" icon={BiNotification} label="Notifications" />
        <SidebarLink to="/guide/guide-analytics" icon={GoGraph} label="Analytics" />

        <Divider />

        <SectionLabel>Management</SectionLabel>
        <SidebarLink to="/guide/assigntask" icon={FiEdit} label="Assign Task" />
        <SidebarLink to="/guide/managegroup" icon={IoSettingsOutline} label="Manage Group" />
        <SidebarLink to="/guide/message-guide" icon={LuMessageSquareMore} label="Message" />

        <Divider />

        <SectionLabel>Account</SectionLabel>
        <SidebarLink to="/guide/guide-profile" icon={LuUserRoundCheck} label="Profile" />
      </nav>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-blue-500 to-sky-400" />
        <p className="hidden md:block text-[10.5px] text-slate-400 tracking-wide">
          v1.0 — Capstone Admin
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
