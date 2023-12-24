import React, { ChangeEvent, useEffect, useState } from "react";
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
  SelectionChangedEvent,
  ValueGetterParams,
} from "ag-grid-community";
import { IFullAdminUser } from "common/interfaces/auth";
import DialogForm from "./dialogForm";
import { CommonModalComponent } from "components/CommonModal";
import { useNavigate } from "react-router-dom";
import "./index.scss";

const DashboardAdmin = () => {
  const { auth, admin } = UseAppSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [gridApi, setGridApi] = useState(null);
  const [tableData, setTableData] = useState<Array<IFullAdminUser>>([]);

  const { isModalOpened: isModalOpened, toggle: setModalOpened } = useModal();

  const colDefs = [
    {
      headerName: "Role",
      field: "role",
    },
    { headerName: "ID", field: "_id" },
    {
      headerName: "Email",
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
      headerName: "Bookmarks nb",
      field: "bookmarks",
      cellRenderer: (params: any) => <div>{params.data.bookmarks.length}</div>,
    },
    {
      headerName: "Activation link",
      field: "activationLink",
    },
  ];

  const defeaultColDef = {
    sortable: true,
    filter: true,
    floatingFilter: true,
    flex: 1,
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

  const onGridReady = (params: GridReadyEvent) => {
    //@ts-ignore
    setGridApi(params);
  };

  // const onExportClick = () => {
  //   if (gridApi !== null) {
  //     gridApi.exportDataAsCsv();
  //   }
  // };

  const rowSelectionType = "single";
  //@ts-ignore
  const onSelectChanged = (event: SelectionChangedEvent<TData>) => {
    console.log(event.api.getSelectedRows());
    const selectedData = event.api.getSelectedRows()[0]._id;
    navigate(`/admin/user/${selectedData}`);
  };

  function onPaginationChange(e: ChangeEvent<HTMLSelectElement>) {
    if (gridApi && Object.keys(gridApi).includes("api")) {
      //@ts-ignore
      gridApi.api.updateGridOptions({ paginationPageSize: e.target.value });
    }
  }

  if (admin.isLoading) {
    return <div>on loading</div>;
  }

  return (
    <div className="wrap-dashboard-admin">
      {/* <div>
        <button onClick={() => handleAddUser()}>Add User</button>
      </div> */}

      {/* <button onClick={() => onExportClick()}>Export</button> */}
      <section className="user-admin-section">
        <h1 className="title-grid">All Users</h1>
        <div className="ag-theme-quartz" style={{ height: 600 }}>
          <AgGridReact
            rowData={admin.users}
            //@ts-ignore
            columnDefs={colDefs}
            defaultColDef={defeaultColDef}
            onGridReady={onGridReady}
            rowSelection={rowSelectionType}
            onSelectionChanged={onSelectChanged}
            pagination={true}
            paginationAutoPageSize={true}
          />
        </div>
      </section>
      <CommonModalComponent isModalOpened={isModalOpened} hide={setModalOpened}>
        <DialogForm />
      </CommonModalComponent>
    </div>
  );
};

export default DashboardAdmin;
