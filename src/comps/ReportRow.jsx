export default function ReportRow(props) {
  return (
    <tr class="bg-white border-b hover:bg-gray-50">
      <td class="w-4 p-4">{props.id}</td>
      <th
        scope="row"
        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        {props.site}
      </th>
      <td class="px-6 py-4">{props.brand}</td>
      <td class="px-6 py-4">{props.type}</td>
      <td class="px-6 py-4">{props.btu}</td>
      <td class="px-6 py-4">{props.room}</td>
      <td class="px-6 py-4 text-right">
        <a
          href="#"
          class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Edit
        </a>
      </td>
    </tr>
  );
}
