import React, { createContext, useContext } from 'react';

interface ScrollRevealDefaults {
  once: boolean;
}

const ScrollRevealDefaultsContext = createContext<ScrollRevealDefaults>({ once: true });

export const ScrollRevealDefaultsProvider: React.FC<{
  once?: boolean;
  children: React.ReactNode;
}> = ({ once = true, children }) => (
  <ScrollRevealDefaultsContext.Provider value={{ once }}>
    {children}
  </ScrollRevealDefaultsContext.Provider>
);

export const useScrollRevealDefaults = () => useContext(ScrollRevealDefaultsContext);
