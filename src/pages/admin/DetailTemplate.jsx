import React from "react";
import { DataGrid, Column } from "devextreme-react/data-grid";
import service from "./data.js";

class DetailTemplate extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { eth_wallets } = this.props.data.data;
    return (
      <React.Fragment>
        <div className="master-detail-caption">{`Tokens Summary`}</div>
        <DataGrid
          dataSource={eth_wallets}
          showBorders={true}
          columnAutoWidth={true}
        >
          <Column dataField="wallet" />
          <Column dataField="eth" />
          <Column dataField="shib" />
          <Column dataField="vey" />
        </DataGrid>
      </React.Fragment>
    );
  }
  completedValue(rowData) {
    return rowData.Status === "Completed";
  }
}

export default DetailTemplate;
