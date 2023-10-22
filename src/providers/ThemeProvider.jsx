"use client"

import { ThemeContext } from '@/context/ThemeContext'
import React, { useContext, useState, useEffect } from 'react'

const ThemeProvider = ({ children }) => {
  const {theme} = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // localstorage is used in client components
  // But at first, all components are server-side. Here, we're making sure that the component is mounted as
  // a client component before returning
  if(mounted) {
    return (
        <div className={theme}>
            {children}
        </div>
      )
  }
}

export default ThemeProvider