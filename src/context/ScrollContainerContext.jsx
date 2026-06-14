import React, { createContext, useContext } from 'react';
import { useScroll } from 'framer-motion';

const ScrollContainerContext = createContext(null);

export const ScrollContainerProvider = ({ containerRef, children }) => {
  return (
    <ScrollContainerContext.Provider value={containerRef}>
      {children}
    </ScrollContainerContext.Provider>
  );
};

export const useTemplateScroll = (options = {}) => {
  const containerRef = useContext(ScrollContainerContext);
  const scrollOptions = { ...options };
  
  if (containerRef && containerRef.current) {
    scrollOptions.container = containerRef;
  }
  
  return useScroll(scrollOptions);
};

export const useScrollToTop = () => {
  const containerRef = useContext(ScrollContainerContext);
  
  return (options = { top: 0, behavior: 'smooth' }) => {
    if (containerRef && containerRef.current) {
      containerRef.current.scrollTo(options);
    } else if (typeof window !== 'undefined') {
      window.scrollTo(options);
    }
  };
};
