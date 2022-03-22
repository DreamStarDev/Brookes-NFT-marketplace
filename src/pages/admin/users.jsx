import React, { useEffect } from "react";
import DataGrid, {
  Column,
  MasterDetail,
  SearchPanel,
  HeaderFilter,
} from "devextreme-react/data-grid";

import "devextreme/dist/css/dx.light.css";
import DetailTemplate from "./DetailTemplate";

function App({ users = [] }) {
  return (
    <>
      <h3>Users</h3>
      <DataGrid dataSource={users} showBorders={true}>
        <SearchPanel visible={true} width={240} placeholder="Search..." />
        <Column dataField="first_name">
          <HeaderFilter groupInterval={10000} />
        </Column>
        <Column dataField="last_name" />
        <Column dataField="email" />
        <Column dataField="phone" />

        <MasterDetail enabled={true} component={DetailTemplate} />
      </DataGrid>
    </>
  );
}

export default App;
