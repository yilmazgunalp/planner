import React from 'react';
type PlanContextType = {
  onOpen?: (slot: string) => void;
  plans?: {};
};

export const PlanContext = React.createContext<PlanContextType>({});
