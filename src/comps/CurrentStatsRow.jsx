export default function CurrentStatsRow(props) {
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
      <td class="px-6 py-4">{props.zone}</td>
      <td class="px-6 py-4">{props.region}</td>
      <td class="px-6 py-4">{props.room}</td>
      <td class="px-6 py-4">{props.technician}</td>
      <td class="px-6 py-4">{props.phone}</td>
      <td class="px-6 py-4">{props.date.split("T")[0]}</td>
    </tr>
  );
}
