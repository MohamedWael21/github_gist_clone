"use client";
import { useState, createContext, useContext } from "react";

interface TabsProps {
  children: React.ReactNode;
  defaultTab: string;
}

interface TabProps {
  value: string;
  children: React.ReactNode;
}

interface TabContextType {
  activeTab: string;
  changeActiveTab: (_: string) => void;
}

const TabContext = createContext<TabContextType | null>(null);

export const Tabs = ({ children, defaultTab }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const changeActiveTab = (value: string) => {
    setActiveTab(value);
  };
  return (
    <TabContext.Provider value={{ activeTab, changeActiveTab }}>
      <nav>
        <ul className="flex gap-4 border-b-[2px] border-neutral-400">
          {children}
        </ul>
      </nav>
    </TabContext.Provider>
  );
};

export const Tab = ({ value, children }: TabProps) => {
  const context = useContext(TabContext);
  if (!context) return;
  const { activeTab, changeActiveTab } = context;

  const isActive = value === activeTab;
  return (
    <li
      className={`py-2 relative hover:text-primary-500 rounded-lg group text-sm ${
        isActive &&
        "after:w-full after:h-0.5 after:block after:bg-primary-500 after:rounded-lg  after:absolute after:-bottom-0.5 after:z-50"
      } ${isActive ? "font-bold text-primary-500" : "text-neutral-500"}`}
      onClick={() => changeActiveTab(value)}
    >
      {children}
    </li>
  );
};
