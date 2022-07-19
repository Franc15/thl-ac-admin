import Axios from "axios";
import { useState } from "react";
import { API_URL } from "../globals";

export default function CurrentQ() {
  const [currentQ, setCurrentQ] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleQuarterChange = (e) => {
    e.preventDefault();
    setCurrentQ(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (currentQ !== "") {
      Axios.put(`${API_URL}/admin/quarter`, {
        quarter: currentQ,
      })
        .then((res) => {
          console.log(res);
          if (res.data.message) {
            localStorage.setItem("current-quarter", currentQ);
            alert("Current Quarter Updated");
          } else {
            alert("Error");
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Error Updating Current Quarter");
        });
    } else {
      alert("Please select a quarter");
    }
  };

  return (
    <section class="w-full text-gray-600 body-font">
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-col text-center w-full mb-12">
          <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Update to Current Quarter
          </h1>
          <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
            Write the new quarter in number format in the input field
          </p>
        </div>
        <div class="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
          <div class="relative flex-grow w-full">
            <label className="leading-7 text-sm text-gray-600">
              Current Quarter
            </label>
            <input
              type="text"
              id="quarter"
              name="quarter"
              onChange={handleQuarterChange}
              class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>

          <button
            onClick={handleClick}
            class="text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg"
          >
            Update
          </button>
        </div>
        {/* <p className="text-gray-600 text-center text-sm mt-8">
          Updated succefully
        </p> */}
      </div>
    </section>
  );
}
