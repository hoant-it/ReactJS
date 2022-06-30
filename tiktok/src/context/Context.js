import { useState, createContext } from 'react';

const Context = createContext();

function Provider({ children }) {
  const [expand, setExpand] = useState(false);
  const [sidebarTop, setSidebarTop] = useState(0);
  const handleExpand = () => {
    setExpand(!expand);
  };
  const handleScroll = (event) => {
    // window.localStorage.setItem('scrollTop', event.target.scrollTop);
    setSidebarTop(event.target.scrollTop);
  };

  const value = {
    expand,
    handleExpand,
    sidebarTop,
    handleScroll,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export { Context, Provider };
