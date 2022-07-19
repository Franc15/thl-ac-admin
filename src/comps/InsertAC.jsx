import Axios from "axios";
import { useState, useEffect } from "react";
import { API_URL } from "../globals";

export default function InsertRoom() {
  const [sites, setSites] = useState([]);
  const [brands, setBrands] = useState([]);
  const [types, setTypes] = useState([]);
  const [btus, setBtus] = useState([]);
  const [id, setId] = useState([]);

  const [floors, setFloors] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [siteId, setSiteId] = useState("");
  const [floorId, setFloorId] = useState("");
  const [roomId, setRoomId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [typeId, setTypeId] = useState("");
  const [btuId, setBtuId] = useState("");

  const getSites = async () => {
    try {
      const res = await Axios.get(`${API_URL}/admin/sites`);
      setSites(res.data);
      setIsLoading(false);
    } catch (err) {
      setIsError(true);
    }
  };

  const getFloors = async () => {
    try {
      const res = await Axios.get(`${API_URL}/admin/floors`);
      setFloors(res.data);
      setIsLoading(false);
    } catch (err) {
      setIsError(true);
    }
  };

  const getBrands = async () => {
    try {
      const res = await Axios.get(`${API_URL}/admin/ac/brands`);
      setBrands(res.data);
      setIsLoading(false);
    } catch (err) {
      setIsError(true);
    }
  };
  const getTypes = async () => {
    try {
      const res = await Axios.get(`${API_URL}/admin/ac/types`);
      setTypes(res.data);
      setIsLoading(false);
    } catch (err) {
      setIsError(true);
    }
  };
  const getBtus = async () => {
    try {
      const res = await Axios.get(`${API_URL}/admin/ac/btus`);
      setBtus(res.data);
      setIsLoading(false);
    } catch (err) {
      setIsError(true);
    }
  };

  function handleSubmit(event) {
    event.preventDefault();

    console.log(
      "data: room" +
        roomId +
        " brand" +
        brandId +
        " type" +
        typeId +
        " btu" +
        btuId +
        " id" +
        id
    );
    if (
      roomId !== "" &&
      brandId !== "" &&
      typeId !== "" &&
      btuId !== "" &&
      id !== ""
    ) {
      Axios.post(`${API_URL}/admin/ac/new`, {
        id: id,
        room: roomId,
        brand: brandId,
        type: typeId,
        btu: btuId,
      })
        .then((res) => {
          console.log(res.data);
          alert("Saved succesfully");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Please fill all fields");
    }
  }

  useEffect(() => {
    getSites();
    getFloors();
    getBrands();
    getTypes();
    getBtus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit} class="w-full mx-auto my-24 max-w-lg">
        <div class="text-center w-full mb-12">
          <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Create new AC
          </h1>
          <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
            Enter the details below to add a new AC into database.
          </p>
        </div>
        {isLoading ? <p>Loading...</p> : null}
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3 mb-6">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-state"
            >
              Site Name
            </label>
            <div class="relative">
              <select
                class="block w-full appearance-none bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                id="grid-site"
                onChange={(e) => {
                  setIsLoading(true);
                  setSiteId(e.target.value);
                  console.log(siteId);
                }}
              >
                <option value="">Select Site</option>
                {sites.map((site) => (
                  <option key={site.site_id} value={site.site_id}>
                    {site.site_name}
                  </option>
                ))}
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  class="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div class="w-full px-3 mb-6">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-state"
            >
              Floor
            </label>
            <div class="relative">
              <select
                class="block w-full appearance-none bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                id="grid-state"
                onChange={(e) => {
                  console.log("Loading rooms");
                  setIsLoading(true);
                  Axios.get(
                    `${API_URL}/admin/rooms/${siteId}/${e.target.value}`,
                    {}
                  )
                    .then((res) => {
                      setRooms(res.data);
                      console.log(res.data);
                      setIsLoading(false);
                    })
                    .catch((err) => {
                      setIsError(true);
                    });
                }}
              >
                <option value="">Select Floor</option>
                {floors.map((floor) => (
                  <option key={floor.id} value={floor.id}>
                    {floor.floor_level_name}
                  </option>
                ))}
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  class="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div class="w-full px-3 mb-6">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-state"
            >
              Location
            </label>
            <div class="relative">
              <select
                class="block appearance-none w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                id="grid-state"
                onChange={(e) => {
                  setRoomId(e.target.value);
                }}
              >
                {rooms.map((room) => (
                  <option key={room.id} value={room.id}>
                    {room.room_name}
                  </option>
                ))}
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  class="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div class="w-full px-3 mb-6">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-state"
            >
              AC Brand
            </label>
            <div class="relative">
              <select
                class="block appearance-none w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                id="grid-brand"
                onChange={(e) => {
                  setBrandId(e.target.value);
                }}
              >
                <option value="">Select AC Brand</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.brand_name}
                  </option>
                ))}
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  class="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          <div class="w-full px-3 mb-6">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-state"
            >
              AC Type
            </label>
            <div class="relative">
              <select
                class="block appearance-none w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                id="grid-state"
                onChange={(e) => {
                  setTypeId(e.target.value);
                }}
              >
                <option value="">Select AC Type</option>
                {types.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.type_name}
                  </option>
                ))}
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  class="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          <div class="w-full px-3 mb-6">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-state"
            >
              AC BTU
            </label>
            <div class="relative">
              <select
                class="block appearance-none w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                id="grid-state"
                onChange={(e) => {
                  setBtuId(e.target.value);
                }}
              >
                <option value="">Select AC BTU</option>
                {btus.map((btu) => (
                  <option key={btu.id} value={btu.id}>
                    {btu.btu}
                  </option>
                ))}
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  class="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          <div class="w-full px-3 mb-6">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              AC ID
            </label>
            <input
              class="appearance-none block w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              id="id"
              type="text"
              placeholder="Enter AC ID here"
              onChange={(e) => {
                setId(e.target.value);
              }}
            />
            {/* <p class="text-green-500 text-xs italic">Saved successfully</p> */}
          </div>
          <div className="w-full px-3 mb-6">
            <button class="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Save
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
