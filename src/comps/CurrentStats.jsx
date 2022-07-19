import Axios from "axios";
import CurrentStatsRow from "./CurrentStatsRow";
import { useState, useEffect } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { API_URL } from "../globals";

export default function CurrentStats() {
  const [data, setData] = useState([]);

  const getData = async () => {
    Axios.get(
      `${API_URL}/admin/ac/serviced/${localStorage.getItem("current-quarter")}`
    )
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div class="p-4">
        <h4 class="text-xl font-bold text-gray-900 ml-2 my-2-">
          We are currently in quarter {localStorage.getItem("current-quarter")}
        </h4>
        {/* <label for="table-search" class="sr-only">
          Search
        </label> */}
        {/* <div class="relative mt-1">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              class="w-5 h-5 text-gray-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="table-search"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5"
            placeholder="Search for items"
          />
        </div> */}
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="bg-green-500 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          table="report"
          filename="AC_Report - Serviced"
          sheet="tablexls"
          buttonText="Download as XLS"
        />
      </div>

      <table id="report" class="w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="p-4">
              AC ID
            </th>
            <th scope="col" class="px-6 py-3">
              Site Name
            </th>
            <th scope="col" class="px-6 py-3">
              AC Brand
            </th>
            <th scope="col" class="px-6 py-3">
              AC Type
            </th>
            <th scope="col" class="px-6 py-3">
              AC BTU
            </th>
            <th scope="col" class="px-6 py-3">
              Zone Name
            </th>
            <th scope="col" class="px-6 py-3">
              Region Name
            </th>
            <th scope="col" class="px-6 py-3">
              Location
            </th>
            <th scope="col" class="px-6 py-3">
              Technician Name
            </th>
            <th scope="col" class="px-6 py-3">
              Technician Phone
            </th>
            <th scope="col" class="px-6 py-3">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <CurrentStatsRow
              id={item.id}
              brand={item.brand_name}
              type={item.type_name}
              btu={item.btu}
              site={item.site_name}
              room={item.room_name.slice(0, -8)}
              zone={item.zone_name}
              region={item.region_name}
              technician={item.firstname + " " + item.lastname}
              phone={item.phone}
              date={item.date_done}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
