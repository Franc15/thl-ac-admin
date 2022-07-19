import { useState } from "react";
import auth from "../auth";

export default function AddUser() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPaswword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [accountType, setAccountType] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  function handleFirstnameChange(e) {
    e.preventDefault();
    setFirstname(e.target.value);
  }

  function handleLastnameChange(e) {
    e.preventDefault();
    setLastname(e.target.value);
  }

  function handlePasswordChange(e) {
    e.preventDefault();
    setPassword(e.target.value);
  }

  function handleConfirmPasswordChange(e) {
    e.preventDefault();
    setConfirmPassword(e.target.value);
  }

  function handlePhoneChange(e) {
    e.preventDefault();
    setPhone(e.target.value);
  }

  function handleUsernameChange(e) {
    e.preventDefault();
    setUsername(e.target.value);
  }

  function handleAccountTypeChange(e) {
    e.preventDefault();
    setAccountType(e.target.value);
  }

  function handleClick() {
    console.log("User is signing in");
    console.log("Firstname: " + firstname);
    console.log("Lastname: " + lastname);
    console.log("Password: " + password);
    console.log("Phone: " + phone);
    console.log("Username: " + username);
    console.log("Account Type: " + accountType);
    if (
      firstname !== "" &&
      lastname !== "" &&
      password !== "" &&
      confirmPaswword !== "" &&
      username !== "" &&
      accountType !== ""
    ) {
      console.log("User sign in");
      // check password match
      if (password !== confirmPaswword) {
        setIsError(true);
        setIsLoading(false);
      } else {
        setIsError(false);
        setIsLoading(true);
        auth.createUser(
          username,
          password,
          firstname,
          lastname,
          accountType,
          phone
        );
        console.log("User signed in");
      }
    } else {
      setIsError(true);
      setIsLoading(false);
    }
  }
  return (
    <section class="text-gray-600 body-font relative">
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-col text-center w-full mb-12">
          <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Create a new User
          </h1>
          <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
            Enter the details below to create a new system user.
          </p>
        </div>
        <div class="lg:w-1/2 md:w-2/3 mx-auto">
          <div class="flex flex-wrap -m-2">
            <div class="p-2 w-1/2">
              <div class="relative">
                <label for="name" class="leading-7 text-sm text-gray-600">
                  First Name
                </label>
                <input
                  type="text"
                  id="fname"
                  name="fname"
                  onChange={handleFirstnameChange}
                  class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div class="p-2 w-1/2">
              <div class="relative">
                <label for="email" class="leading-7 text-sm text-gray-600">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lname"
                  name="lname"
                  onChange={handleLastnameChange}
                  class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div class="p-2 w-1/2">
              <div class="relative">
                <label for="email" class="leading-7 text-sm text-gray-600">
                  Password
                </label>
                <input
                  type="password"
                  id="pass"
                  name="pass"
                  onChange={handlePasswordChange}
                  class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div class="p-2 w-1/2">
              <div class="relative">
                <label class="leading-7 text-sm text-gray-600">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="cpass"
                  name="cpass"
                  onChange={handleConfirmPasswordChange}
                  class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div class="p-2 w-1/2">
              <div class="relative">
                <label class="leading-7 text-sm text-gray-600">Username</label>
                <input
                  type="text"
                  id="uname"
                  name="uname"
                  onChange={handleUsernameChange}
                  class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div class="p-2 w-1/2">
              <div class="relative">
                <label class="leading-7 text-sm text-gray-600">Phone</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  onChange={handlePhoneChange}
                  class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div class="p-2 w-full">
              <div class="relative">
                <label for="email" class="leading-7 text-sm text-gray-600">
                  Account Type
                </label>
                <select
                  onChange={handleAccountTypeChange}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                >
                  <option value="" selected>
                    Select Account Type
                  </option>
                  <option value="admin">Admin</option>
                  <option value="nuser">Normal</option>
                </select>
              </div>
            </div>

            <div class="p-2 w-full">
              <button
                onClick={handleClick}
                class="flex mx-auto text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg"
              >
                Create User
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
