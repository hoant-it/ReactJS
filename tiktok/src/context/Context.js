import { useState, createContext } from 'react';

const Context = createContext();

function Provider({ children }) {
  const [expand, setExpand] = useState(false);
  const [sidebarTop, setSidebarTop] = useState(0);
  const [arrMenuStatus, setArrMenuStatusp] = useState(
    JSON.parse(window.localStorage.getItem('statusMenu')) || [{ id: 'MN00039', status: true }],
  );
  const handleExpand = () => {
    setExpand(!expand);
  };
  const handleOpenSidebarItem = (event, open) => {
    let id = event.target.id;
    let objIndex = arrMenuStatus.findIndex((obj) => obj.id === id);
    if (objIndex >= 0) {
      arrMenuStatus[objIndex].status = !arrMenuStatus[objIndex].status;
    } else {
      let objMenuStatus = {};
      if (id !== '') {
        objMenuStatus.id = id;
        objMenuStatus.status = !open;
        arrMenuStatus.push(objMenuStatus);
        setArrMenuStatusp(arrMenuStatus);
      }
    }
  };

  const handleScroll = (event) => {
    setSidebarTop(event.target.scrollTop);
  };

  const value = {
    expand,
    handleExpand,
    sidebarTop,
    handleScroll,
    arrMenuStatus,
    handleOpenSidebarItem,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export { Context, Provider };
