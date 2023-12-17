import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllUsers } from "store/thunks/admin";
import { getUser } from "store/thunks/auth";
import { UseAppSelector, useModal } from "utils/hook";
//table  composants
import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import {
  AgGridEvent,
  ICellRendererParams,
  ModuleRegistry,
  GridReadyEvent,
} from "ag-grid-community";
import { IFullAdminUser } from "common/interfaces/auth";
import DialogForm from "./dialogForm";
import { CommonModalComponent } from "components/CommonModal";

const DashboardAdmin = () => {
  const { auth, admin } = UseAppSelector((state) => state);
  const dispatch = useDispatch();

  const [gridApi, setGridApi] = useState(null);
  const [tableData, setTableData] = useState<Array<IFullAdminUser>>([]);

  const [isOpenAddUser, setIsOpenAddUser] = useState(false);
  const { isModalOpened: isModalOpened, toggle: setModalOpened } = useModal();

  const colDefs = [
    {
      headerName: "Role",
      field: "role",
      checkboxSelection: true,
    },
    { headerName: "id", field: "_id" },
    {
      headerName: "email",
      field: "email",
    },
    {
      headerName: "First Name",
      field: "firstName",
    },
    {
      headerName: "Last Name",
      field: "lastName",
    },
    {
      headerName: "Activation status",
      field: "isActivated",
    },
    {
      headerName: "Created",
      field: "createdDateTime",
    },
    {
      headerName: "Bookmarks",
      field: "bookmarks",
    },
    {
      headerName: "Activation link",
      field: "activationLink",
    },
  ];

  const defeaultColDef = {
    sortable: true,
    editable: true,
    filter: true,
    floatingFilter: true,
    flex: 1,
  };

  const rowData = admin.users;
  // const getUserDashboard = async () => {
  //   console.log("we start get user");
  //   await dispatch(getUser());
  // };
  const handleAddUser = () => {
    setModalOpened();
  };

  useEffect(() => {
    //@ts-ignore
    dispatch(getUser());
    //@ts-ignore
    dispatch(getAllUsers());
    setTimeout(() => {}, 500);
    if (!admin.isLoading && !admin.error.length && admin.users.length) {
      setTableData(admin.users);
    }
  }, []);

  // const onGridReady = (params: GridReadyEvent) => {
  //   setGridApi(params.api);
  // };

  // const onExportClick = () => {
  //   if (gridApi !== null) {
  //     gridApi.exportDataAsCsv();
  //   }
  // };

  if (admin.isLoading) {
    return <div>on loading</div>;
  }
  return (
    <main>
      <h1>hello admin</h1>
      <div className="dashboardAdmin">DashboardAdmin</div>
      <div>
        <button onClick={() => handleAddUser()}>Add User</button>
      </div>
      {/* <button onClick={() => onExportClick()}>Export</button> */}
      <section>
        <div className="ag-theme-quartz" style={{ height: 500 }}>
          <AgGridReact
            rowData={admin.users}
            //@ts-ignore
            columnDefs={colDefs}
            defaultColDef={defeaultColDef}
            // onGridReady={onGridReady}
          />
        </div>
      </section>

      <CommonModalComponent isModalOpened={isModalOpened} hide={setModalOpened}>
        <DialogForm />
      </CommonModalComponent>
    </main>
  );
};

export default DashboardAdmin;
