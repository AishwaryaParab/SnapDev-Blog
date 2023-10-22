"use client"

import React, { useContext } from 'react';
import styles from './themeToggle.module.css';
import Image from 'next/image';
import { ThemeContext } from '@/context/ThemeContext';

const ThemeToggle = () => {
  const {theme, toggleTheme} = useContext(ThemeContext);

  return (
    <div className={styles.container} style={theme === "dark" ? {backgroundColor: "white"} : {backgroundColor: "black"}} onClick={toggleTheme}>
      <Image src="/moon.png" alt="dark-mode" width={14} height={14} />
      <div className={styles.ball} style={theme === "dark" ? {backgroundColor: "#0f172a", left: "3px"} : {backgroundColor: "white", right: "3px"}}></div>
      <Image src="/sun.png" alt="light-mode" width={14} height={14} />
    </div>
  )
}

export default ThemeToggle