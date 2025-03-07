'use client';

import { createContext, useContext, useState } from 'react';

type AppContextType = {
  is404: boolean;
  setIs404: (value: boolean) => void;
};

const AppContext = createContext<AppContextType>({
  is404: false,
  setIs404: () => void(0)
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [is404, setIs404] = useState(false);

  return (
    <AppContext.Provider value={{ is404, setIs404 }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
