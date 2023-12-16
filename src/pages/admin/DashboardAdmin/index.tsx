import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllUsers } from "store/thunks/admin";
import { getUser } from "store/thunks/auth";
import { UseAppSelector } from "utils/hook";
//table  composants
import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme

interface IRowUserInterface {
  make: string;
  model: string;
  price: number;
}

const DashboardAdmin = () => {
  const { auth, admin } = UseAppSelector((state) => state);
  const dispatch = useDispatch();

  // const [rowData, setRowData] = useState(admin.users);
  const [colDefs, setColDefs] = useState([
    { headerName: "id", field: "_id", sortable: true },
    { headerName: "email", field: "email", sortable: true, editable: true },
    {
      headerName: "First Name",
      field: "firstName",
      sortable: true,
      editable: true,
    },
    { headerName: "Last Name", field: "lastName", editable: true },
    {
      headerName: "Activation status",
      field: "isActivated",
      sortable: true,
      editable: true,
    },
    {
      headerName: "Activation link",
      field: "activationLink",
      sortable: true,
      editable: true,
    },
    { headerName: "Created", field: "createdDateTime", sortable: true },
    { headerName: "Role", field: "role", sortable: true, editable: true },
    {
      headerName: "Preferences",
      field: "preferences",
      sortable: true,
      editable: true,
    },
    {
      headerName: "Bookmarks",
      field: "bookmarks",
      sortable: true,
      editable: true,
    },
  ]);

  const rowData = admin.users;
  // const getUserDashboard = async () => {
  //   console.log("we start get user");
  //   await dispatch(getUser());
  // };

  useEffect(() => {
    //@ts-ignore
    dispatch(getUser());
    //@ts-ignore
    dispatch(getAllUsers());
  }, []);

  if (admin.isLoading) {
    return <div>on loading</div>;
  }

  return (
    <main>
      <h1>hello admin</h1>
      <div className="dashboardAdmin">DashboardAdmin</div>

      <section>
        <div className="ag-theme-quartz" style={{ height: 500 }}>
          <AgGridReact
            rowData={rowData}
            //@ts-ignore
            columnDefs={colDefs}
          />
        </div>
      </section>
    </main>
  );
};

export default DashboardAdmin;
