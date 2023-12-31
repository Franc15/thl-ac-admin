import { Link } from "react-router-dom";

export default function SidebarItem(props) {
  return (
    <li>
      <Link to={{ pathname: props.link }}>
        <button class="flex w-full items-center p-2 text-base font-normal text-white rounded-lg hover:bg-blue-400">
          {/* <svg
          class="flex-shrink-0 w-6 h-6 text-white transition duration-75 group-hover:text-gray-900"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
          <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
        </svg> */}
          <span class=" ml-3 whitespace-nowrap">{props.name}</span>
          {/* <span class="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200">
          3
        </span> */}
        </button>
      </Link>
    </li>
  );
}
