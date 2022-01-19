import { listTables } from "../utils/api";
import { useState, useEffect } from "react";
import ErrorAlert from "../layout/ErrorAlert";

function TableList() {
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

  useEffect(loadTables, []);

  function loadTables() {
    const abortController = new AbortController();
    listTables(abortController.signal).then(setTables).catch(setTablesError);
    return () => abortController.abort();
  }

  let display = tables.map((table) => {
    return (
      <tr key={table.table_id}>
        <td>{table.table_name}</td>
        <td>{table.capacity}</td>
        <td data-table-id-status={table.table_id}>
          {table.reservation_id ? "Occupied" : "Free"}
        </td>
      </tr>
    );
  });
  return (
    <div>
        <h1>Tables</h1>
      <ErrorAlert error={tablesError} />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Table</th>
            <th scope="col">Capacity</th>
            <th scope="col">Occupied</th>
          </tr>
        </thead>
        <tbody>{tables.length ? display : "Please add at least 1 table"}</tbody>
      </table>
    </div>
  );
}

export default TableList;
