import React from 'react';
import styles from "./navbar.module.css";
import Image from 'next/image';
import Link from 'next/link';
import ThemeToggle from '../themeToggle/ThemeToggle';
import AuthLinks from '../authLinks/AuthLinks';

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.socials}>
        <Link target="_blank" href="https://www.linkedin.com/in/aishwaryaparab/"><Image src="/linkedin.png" alt="" width={24} height={24} /></Link>
        <Link target="_blank" href="https://www.youtube.com/@CodeWithAishwarya"><Image src="/youtube.png" alt="" width={24} height={24} /></Link>
        <Link target="_blank" href="https://github.com/AishwaryaParab"><Image src="/github.png" alt="" width={28} height={28} /></Link>
      </div>
      <Link className={styles.logo} href="/">SnapDev</Link>
      <div className={styles.links}>
        <ThemeToggle />
        <Link className={styles.link} href="/">Home</Link>
        <Link className={styles.link} href="/">About</Link>
        <Link className={styles.link} href="/">Contact</Link>
        <AuthLinks />
      </div>
    </div>
  )
}

export default Navbar