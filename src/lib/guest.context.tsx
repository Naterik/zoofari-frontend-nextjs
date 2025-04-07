"use client";
import { createContext, useContext, useState } from "react";

interface IGuestContext {
  collapseMenu: boolean;
  setCollapseMenu: (v: boolean) => void;
}

export const GuestContext = createContext<IGuestContext | null>(null);

export const GuestContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [collapseMenu, setCollapseMenu] = useState(false);

  return (
    <GuestContext.Provider value={{ collapseMenu, setCollapseMenu }}>
      {children}
    </GuestContext.Provider>
  );
};

export const useGuestContext = () => {
  const context = useContext(GuestContext);
  if (!context) {
    throw new Error(
      "useGuestContext must be used within a GuestContextProvider"
    );
  }
  return context;
};
