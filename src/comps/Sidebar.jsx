import SidebarItem from "./SidebarItem";

export default function Sidebar() {
  return (
    <aside class="h-screen sticky top-0" aria-label="Sidebar">
      <div class="overflow-y-auto py-4 px-3 h-full bg-red-600">
        <ul class="space-y-2">
          <li>
            <div class="flex items-center p-2 text-base font-normal rounded-lg text-white">
              <svg
                class="w-6 h-6 text-white transition duration-75 group-hover:text-gray-900"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
              </svg>
              <span class="ml-3">Admin Dashboard</span>
            </div>
          </li>
          <SidebarItem name="All" link="/" />
          <SidebarItem name="Serviced" link="/stats" />
          <SidebarItem name="Generate Report" link="/report" />
          <SidebarItem name="Add New Room" link="/new/room" />
          <SidebarItem name="Add New AC" link="/new/ac" />
          <SidebarItem name="Add New User" link="/new/user" />
          <SidebarItem name="Assign Sites Access" link="/new/access" />
          <SidebarItem name="Update Current Quarter" link="/update/quarter" />
        </ul>
        <ul class="pt-4 mt-4 space-y-2 border-t border-gray-200">
          <SidebarItem name="Logout" />
          <SidebarItem name="Help" />
        </ul>
      </div>
    </aside>
  );
}
