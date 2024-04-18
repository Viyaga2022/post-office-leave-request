"use client"

import { useEffect, useState } from "react";
import toast from 'react-hot-toast'
import './pendingLeaveRequest.scss'
import { getPendngLeaveData } from "@/services";
import { leaveDataColums } from '@/data'
import DataTableWithActions from "../shared/dataTableWithActions/DataTableWithActions";
import AddLeaveData from "./addLeaveData/AddLeaveData";
import { useDispatch, useSelector } from "react-redux";
import { setPendingLeaves } from "@/redux/slices/commonSlice";
import DeleteLeaveData from "./deleteLeaveData/DeleteLeaveData";

const PendingLeaveRequest = () => {
  const { pendingLeave } = useSelector(state => state.common)
  const [isLoading, setIsLoading] = useState(true)
  const [deleteData, setDeleteData] = useState(null)
  const [editData, setEditData] = useState(null)
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()

  const fetchData = async () => {
    const res = await getPendngLeaveData()

    if (res.error) toast.error("An Error Occured While Fetching Data")
    if (res.leaves) {
      console.log({ leaves: res.leaves });
      dispatch(setPendingLeaves(res.leaves))
    }

    setIsLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="pendingLeave">
      <div className="info">
        <h2>Pending</h2>
        <button onClick={() => setOpen(true)}>Add New</button>
      </div>
      {(pendingLeave && pendingLeave.length > 0)
        ? < DataTableWithActions columns={leaveDataColums} rows={pendingLeave} setOpen={setOpen} setEditData={setEditData} setDeleteData={setDeleteData} />
        : isLoading
          ? <p>Loading...</p>
          : <p>No Data Found</p>
      }
      {open && <AddLeaveData editData={editData} setEditData={setEditData} setOpen={setOpen} />}
      {deleteData && <DeleteLeaveData deleteData={deleteData} setDeleteData={setDeleteData} />}
    </div>
  )
}

export default PendingLeaveRequest