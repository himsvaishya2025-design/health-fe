import {
  FaHome,
  FaUsers,
  FaDumbbell,
  FaBoxOpen,
  FaClipboardList,
  FaMoneyBillWave,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

const menuItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: <FaHome />,
  },
  {
    name: "Members",
    path: "/members",
    icon: <FaUsers />,
  },
  {
    name: "Trainers",
    path: "/trainers",
    icon: <FaDumbbell />,
  },
  {
    name: "Packages",
    path: "/packages",
    icon: <FaBoxOpen />,
  },
  {
    name: "Attendance",
    path: "/attendance",
    icon: <FaClipboardList />,
  },
  {
    name: "Payments",
    path: "/payments",
    icon: <FaMoneyBillWave />,
  },
  {
    name: "Reports",
    path: "/reports",
    icon: <FaChartBar />,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: <FaCog />,
  },
];

const Sidebar = () => {
  return (
    <aside className="w-72 bg-slate-900 text-white flex flex-col shadow-xl">
      {/* Logo */}
      <div className="h-20 flex items-center justify-center border-b border-slate-800">
        <h1 className="text-2xl font-bold tracking-wide">
          🏋 Universal<span className="text-blue-400">Gym</span>
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-6 px-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-xl mb-2 transition-all duration-200
              ${
                isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>

            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-800 p-4">
        <button className="flex items-center gap-4 w-full px-4 py-3 rounded-xl hover:bg-red-500 transition">
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;