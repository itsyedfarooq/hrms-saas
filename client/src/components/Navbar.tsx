import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";
import { useState } from "react";
function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  return (
    <div className="bg-white shadow flex justify-between items-center px-6 py-4">

      {/* Search Box */}
      <div className="flex items-center border rounded-lg px-3 py-2 w-80">
        <FaSearch className="text-gray-500" />
    <input
  type="text"
  placeholder="Search employees..."
  className="ml-3 outline-none w-full"
  onChange={(e) =>
    console.log(e.target.value)
  }
/>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">

        <div className="relative">
  <FaBell
    onClick={() => setShowNotifications(!showNotifications)}
    className="text-2xl text-gray-600 cursor-pointer hover:text-blue-600"
  />

  {showNotifications && (
    <div className="absolute right-0 mt-3 w-72 bg-white shadow-lg rounded-lg p-4 z-50">
      <h2 className="font-bold mb-3">
        Notifications
      </h2>

      <ul className="space-y-2 text-sm">
        <li>✅ New employee added</li>
        <li>💰 Payroll generated</li>
        <li>📅 Leave request approved</li>
        <li>💳 Expense submitted</li>
      </ul>
    </div>
  )}
</div>

        <div className="flex items-center gap-2 cursor-pointer">
          <FaUserCircle className="text-3xl text-gray-600" />

          <div>
            <h2 className="font-semibold">
              Farooq
            </h2>

            <p className="text-sm text-gray-500">
              HR Manager
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Navbar;