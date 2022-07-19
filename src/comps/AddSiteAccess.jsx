import { useState, useEffect } from "react";
import { API_URL } from "../globals";
import Axios from "axios";

export default function AddSiteAccess() {
  const [sites, setSites] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedSite, setSelectedSite] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getSites = async () => {
    try {
      const res = await Axios.get(`${API_URL}/admin/sites`);
      setSites(res.data);
      setIsLoading(false);
    } catch (err) {
      setIsError(true);
    }
  };

  const getUsers = async () => {
    try {
      const res = await Axios.get(`${API_URL}/admin/users`);
      setUsers(res.data);
      setIsLoading(false);
    } catch (err) {
      setIsError(true);
    }
  };

  const handleSiteChange = (e) => {
    e.preventDefault();
    setSelectedSite(e.target.value);
  };

  const handleUserChange = (e) => {
    e.preventDefault();
    setSelectedUser(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (selectedSite !== "" && selectedUser !== "") {
      Axios.post(`${API_URL}/admin/access/new`, {
        siteid: selectedSite,
        userid: selectedUser,
      })
        .then((res) => {
          console.log(res);
          if (res.data.message) {
            alert("Site Access Added");
          } else {
            alert("Error");
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Error Adding Site Access");
        });
    } else {
      alert("Please select a site and user");
    }
  };

  useEffect(() => {
    getSites();
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section class="w-full text-gray-600 body-font">
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-col text-center w-full mb-12">
          <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Assign Site Access
          </h1>
          <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
            Give Access to a user by selecting the dropdowns below
          </p>
        </div>
        <div class="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
          <div class="relative flex-grow w-full">
            <label for="full-name" class="leading-7 text-sm text-gray-600">
              User
            </label>
            <select
              id="user"
              name="user"
              onChange={handleUserChange}
              class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            >
              <option value="">Select User</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.firstname + " " + user.lastname}
                </option>
              ))}
            </select>
          </div>
          <div class="relative flex-grow w-full">
            <label className="leading-7 text-sm text-gray-600">Site</label>
            <select
              id="site"
              onChange={handleSiteChange}
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-transparent focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            >
              <option value="">Select Site</option>
              {sites.map((site) => (
                <option key={site.site_id} value={site.site_id}>
                  {site.site_name}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleClick}
            class="text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg"
          >
            Assign
          </button>
        </div>
      </div>
    </section>
  );
}
