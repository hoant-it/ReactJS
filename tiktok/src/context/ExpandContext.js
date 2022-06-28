import { useState, createContext } from 'react';

const ExpandContext = createContext();

function ExpandProvider({ children }) {
  const [expand, setExpand] = useState(false);
  const handleExpand = () => {
    setExpand(!expand);
  };

  const value = {
    expand,
    handleExpand,
  };

  return <ExpandContext.Provider value={value}>{children}</ExpandContext.Provider>;
}

export { ExpandContext, ExpandProvider };
