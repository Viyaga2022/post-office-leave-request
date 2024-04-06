"use client"

import { useEffect, useState } from "react";
import toast from 'react-hot-toast'
import './data-page.scss'
import DataTable from "../shared/dataTable/DataTable";
import Add from "../shared/add/Add";
import { getData } from "@/services";
import { regularEmployeeColumns, substituteEmployeeColums } from '@/data'

const DataPage = ({ type, category }) => {
  const [rows, setRows] = useState(null)
  const [open, setOpen] = useState(false);

  var columns = regularEmployeeColumns

  if (type === 'employees' && category === 'regular') {
    columns = regularEmployeeColumns;
  } else if (type === 'employees' && category === 'substitute') {
    columns = substituteEmployeeColums;
  }

  const fetchData = async (type, category) => {
    const res = await getData(type, category)
    console.log({ data: res?.data || res.error });
    if (res.error) return toast.error("An Error Occured While Fetching Data")
    if (res.data) {
      const idAddedData = res.data.map((item, index) => ({ id: index + 1, ...item }))
      setRows(idAddedData)
    }
  }

  useEffect(() => {
    fetchData(type, category)
  }, [type, category])

  return (
    <div className="leave-requests">
      <div className="info">
        <h1>Leave Requests</h1>
        <button onClick={() => setOpen(true)}>Add New</button>
      </div>
      {(rows && rows.length > 0)
        ? < DataTable slug="products" columns={columns} rows={rows} />
        : rows
          ? <p>No Data Found</p>
          : <p>Loading...</p>
      }
      {/* {open && <Add slug="product" columns={columns} setOpen={setOpen} />} */}
    </div>
  )
}

export default DataPage
