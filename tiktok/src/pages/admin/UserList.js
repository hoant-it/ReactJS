import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './UserList.module.scss';

import * as UserListServices from '~/services/admin/UserListServices';

import {
  DataGrid,
  Column,
  //   ColumnChooser,
  //   ColumnFixing,
  FilterRow,
  SearchPanel,
  Selection,
  Grouping,
  Toolbar,
  Item,
  Export,
  Paging,
  Pager,
  Editing,
  Popup,
  Form,
} from 'devextreme-react/data-grid';
import { Button } from 'devextreme-react/button';
import { SelectBox } from 'devextreme-react';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { exportDataGrid } from 'devextreme/excel_exporter';

function exportGrid(e) {
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet('Sales');
  exportDataGrid({
    worksheet: worksheet,
    component: e.component,
  }).then(function () {
    workbook.xlsx.writeBuffer().then(function (buffer) {
      saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Sales.xlsx');
    });
  });
  e.cancel = true;
}

const notesEditorOptions = 100;

const cx = classNames.bind(styles);
function UserList() {
  const [expanded, setExpanded] = useState(true);
  const [userList, getUserList] = useState([]);
  useEffect(() => {
    const fetchApiUserList = async () => {
      const dataUserList = await UserListServices.wacoal_GetUserList_Web_V1();
      getUserList(dataUserList);
    };

    fetchApiUserList();
  }, []);

  return (
    <React.Fragment>
      <div className={cx('wrapper')}>
        <h2 className={cx('content-block')}>User List</h2>
        <DataGrid
          className={cx('dx-card wide-card')}
          id="dataGrid"
          dataSource={userList}
          keyExpr="UserName"
          columnAutoWidth={true}
          allowColumnReordering={true}
          // onSelectionChanged={selectEmployee}
          // height={666}
          // width={800}
          onExporting={exportGrid}
          showBorders={true}
          focusedRowEnabled={true}
          defaultFocusedRowIndex={0}
          columnHidingEnabled={true}
        >
          <Paging defaultPageSize={10} />
          <Pager showPageSizeSelector={true} showInfo={true} />
          <Export enabled={true}></Export>
          <Grouping autoExpandAll="expanded"></Grouping>
          <Toolbar>
            <Item name="grouppanel"></Item>
            <Item location="after">
              <Button
                text={expanded ? 'Collapse All' : 'Expand All'}
                width={136}
                onClick={() => setExpanded((prevExpanded) => !prevExpanded)}
              />
            </Item>
            <Item name="addRowButton" showText="always" />
            <Item name="exportButton" />
            <Item name="columnChooserButton" />
            <Item name="searchPanel" />
          </Toolbar>
          <Selection mode="single"></Selection>
          <FilterRow visible={true}></FilterRow>
          <SearchPanel visible={true}></SearchPanel>
          <Editing mode="popup" 
          allowUpdating={true} 
          allowAdding={true} 
          allowDeleting={true}
          >
            <Popup title="User Info" showTitle={true} width={700} height={525} />
            <Form>
              <Item itemType="group" colCount={2} colSpan={2}>
                <Item dataField="UserName" />
                <Item dataField="FullName" />
                <Item dataField="Email" />
                <Item dataField="PositionsCode" />
                <Item dataField="PositionsName" />
                <Item dataField="DepartmentCode" />
                <Item
                  dataField="DepartmentName"
                  editorType="dxTextArea"
                  colSpan={2}
                  editorOptions={notesEditorOptions}
                />
              </Item>
              <Item>
                <SelectBox searchEnabled={true}>aaa</SelectBox>
              </Item>
            </Form>
          </Editing>
          <Column
            dataField="UserName"
            // width={300}
            fixed={true}
            //   sortOrder="desc"
          ></Column>
          {/* <ColumnFixing enabled={true}></ColumnFixing> */}
          <Column dataField="FullName"></Column>
          <Column dataField="Email"></Column>
          <Column dataField="PositionsCode" visible={false}></Column>
          <Column dataField="PositionsName"></Column>
          <Column dataField="DepartmentCode" visible={false}></Column>
          <Column dataField="DepartmentName"></Column>
          <Column dataField="WebPass" visible={false}></Column>
          <Column dataField="GroupUserDescription"></Column>
          {/* ColumnChooser cho phep chon cot da an  */}
          {/* <ColumnChooser enabled={true}></ColumnChooser> */}
        </DataGrid>
      </div>
    </React.Fragment>
  );
}

export default UserList;
