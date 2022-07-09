import React, { useState, useEffect, useCallback } from 'react';
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
  Scrolling,
  Lookup,
} from 'devextreme-react/data-grid';
import { Button } from 'devextreme-react/button';
import { ScrollView, SelectBox } from 'devextreme-react';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { exportDataGrid } from 'devextreme/excel_exporter';

import { Popup, ToolbarItem } from 'devextreme-react/popup';
import { Form } from 'devextreme-react/form';

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

const cx = classNames.bind(styles);

let formInstance = null;//dung de focus khi popup

function UserList() {
  const [userList, setUserList] = useState([]);
  const [positionList, setPositionList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [positionCode, setPositionCode] = useState('');
  const [departmentCode, setDepartmentCode] = useState('');
  const [addStatus, setAddStatus] = useState(false);

  useEffect(() => {
    const fetchApiUserList = async () => {
      const dataUserList = await UserListServices.wacoal_GetUserList_Web_V1();
      // userList.current = dataUserList;
      setUserList(dataUserList);
    };
    const fetchApiPosition = async () => {
      const dataPositionList = await UserListServices.ListPositions_Load_Web_V1();

      setPositionList(dataPositionList);
    };
    const fetchApiDepartment = async () => {
      const dataDepartment = await UserListServices.ListDepartment_Load_Web_V1();

      setDepartmentList(dataDepartment);
    };

    fetchApiUserList();
    fetchApiPosition();
    fetchApiDepartment();
  }, []);

  const handleAdd = () => {
    setAddStatus(true);
    setPopupVisibility(!isPopupVisible);
  };

  const handleEdit = () => {
    setAddStatus(false);
    setPopupVisibility(!isPopupVisible);
  };

  const selectUser = useCallback((e) => {
    e.component.byKey(e.currentSelectedRowKeys[0]).done((employee) => {
      setSelectedUser(employee);
      setPositionCode(employee.PositionsCode);
      setDepartmentCode(employee.DepartmentCode);
    });
  }, []);

  const onValueChangedPosition = (e) => {
    // console.log(e.previousValue);
    // console.log(e.value);
    // PositionsCode.current = e.value;
    setPositionCode(e.value);
  };
  const onValueChangedDepartment = (e) => {
    // departmentCode.current = e.value;
    setDepartmentCode(e.value);
  };
  const handleOnInitialized = (e) => {
    formInstance = e;
  };

  const handleOnShown = (e) => {
    //alternative approach to get form instance
    //const element = document.getElementById("myform")
    // const instance = Form1.getInstance(element) as Form;
    //   const dateBoxInstance = instance.getEditor("BirthDate");
    // console.log(e);
    //get editor accepts the name of the datafield
    if (formInstance !== null) {
      const UserName = formInstance.component.getEditor('UserName');

      UserName.focus(); //focus on the editor
    }
  };
  // console.log('user list re-render');

  return (
    <React.Fragment>
      <div className={cx('wrapper')}>
        <h2 className={cx('content-block')}>User List</h2>
        <Popup
          visible={isPopupVisible}
          hideOnOutsideClick={true}
          showCloseButton={true}
          onHiding={handleAdd}
          onShown={handleOnShown}
          showTitle={true}
          title="User List"
          width={600}
          height={500}
          // resizeEnabled={true}
          dragEnabled={true}
          position="center"
        >
          <ScrollView height="100%" width="100%">
            <Form formData={addStatus ? [] : selectedUser} onInitialized={handleOnInitialized}>
              <Item dataField={'UserName'} editorOptions={{ disabled: !addStatus, focus: addStatus }}></Item>
              <Item dataField="FullName"></Item>
              <Item dataField="Email"></Item>
              {/* <Item dataField="PositionsCode" ></Item> */}
              <Item dataField={'PositionsCode'}>
                <SelectBox
                  dataSource={positionList}
                  // label="PositionsNameeee"
                  // labelMode="floating"
                  valueExpr={'PositionsCode'}
                  displayExpr={'PositionsName'}
                  searchEnabled={true}
                  value={addStatus ? '' : positionCode}
                  // defaultValue={selectedUser.PositionsCode}
                  // placeholder={defaultPositionName}
                  onValueChanged={onValueChangedPosition}
                ></SelectBox>
              </Item>
              <Item dataField="DepartmentCode">
                <SelectBox
                  dataSource={departmentList}
                  // label="PositionsNameeee"
                  // labelMode="floating"
                  valueExpr={'DepartmentCode'}
                  displayExpr={'DepartmentName'}
                  searchEnabled={true}
                  value={addStatus ? '' : departmentCode}
                  // defaultValue={selectedUser.PositionsCode}
                  // placeholder={defaultPositionName}
                  onValueChanged={onValueChangedDepartment}
                ></SelectBox>
              </Item>
              {/* <Item dataField="DepartmentName"></Item> */}
              <Item dataField="WebPass" visible={false}></Item>
              <Item dataField="GroupUserDescription"></Item>
            </Form>
          </ScrollView>
          <ToolbarItem
            widget="dxButton"
            toolbar={'bottom'}
            location="after"
            options={{
              icon: 'save',
              text: 'save',
              onClick: () => {
                alert('click');
              },
            }}
            // onClick={alert('click')}
          ></ToolbarItem>
        </Popup>

        <DataGrid
          className={cx('dx-card wide-card')}
          id="dataGrid"
          dataSource={userList}
          keyExpr="UserName"
          columnAutoWidth={true}
          allowColumnReordering={true}
          rowAlternationEnabled={true}
          showColumnLines={true}
          showRowLines={true}
          showBorders={true}
          onSelectionChanged={selectUser}
          height={666}
          // width={800}
          onExporting={exportGrid}
          focusedRowEnabled={true}
          // defaultFocusedRowIndex={0}
          columnHidingEnabled={true}
        >
          <Scrolling mode={'virtual'} columnRenderingMode={'virtual'}></Scrolling> {/* infinite  virtual*/}
          <Paging defaultPageSize={10} />
          <SearchPanel visible={true}></SearchPanel>
          <Pager showPageSizeSelector={true} showInfo={true} />
          <Export enabled={true}></Export>
          <Grouping autoExpandAll="expanded"></Grouping>
          <Toolbar>
            {/* <Item name="groupPanel" /> */}
            <Item location={'after'}>
              <Button
                icon="add"
                // text={'add'}
                width={50}
                onClick={handleAdd}
              />
            </Item>
            <Item location="after">
              <Button icon="edit" onClick={handleEdit} />
            </Item>
            <Item location="after">
              <Button
                icon="close"
                // onClick={this.refreshDataGrid}
              />
            </Item>

            {/* <Item name="addRowButton" showText="always" /> */}
            <Item name="exportButton" />
            <Item name="searchPanel" />
          </Toolbar>
          <Selection mode="single"></Selection>
          <FilterRow visible={true}></FilterRow>
          <Column
            dataField="UserName"
            width={100}
            fixed={true}
            //   sortOrder="desc"
          ></Column>
          {/* <ColumnFixing enabled={true}></ColumnFixing> */}
          <Column dataField="FullName"></Column>
          <Column dataField="Email"></Column>
          <Column dataField="PositionsCode" caption={'Positions Name'} visible={true}>
            <Lookup dataSource={positionList} valueExpr="PositionsCode" displayExpr={'PositionsName'}></Lookup>
          </Column>
          {/* <Column dataField="PositionsName" visible={true}></Column> */}
          <Column dataField="DepartmentCode" caption={'Department'}>
            <Lookup dataSource={departmentList} valueExpr="DepartmentCode" displayExpr={'DepartmentName'}></Lookup>
          </Column>
          {/* <Column dataField="DepartmentName"></Column> */}
          <Column dataField="WebPass" visible={false}></Column>
          <Column dataField="GroupUserDescription"></Column>
          {/* ColumnChooser cho phep chon cot da an  */}
          {/* <ColumnChooser enabled={true}></ColumnChooser> */}
        </DataGrid>
        {/* <selectedUser employee={selectedUser} /> */}
      </div>
    </React.Fragment>
  );
}

export default UserList;
