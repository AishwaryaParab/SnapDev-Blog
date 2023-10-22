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
        <Image src="/facebook.png" alt="facebook" width={24} height={24} />
        <Image src="/instagram.png" alt="instagram" width={24} height={24} />
        <Image src="/tiktok.png" alt="tiktok" width={24} height={24} />
        <Image src="/youtube.png" alt="youtube" width={24} height={24} />
      </div>
      <div className={styles.logo}>SnapDev</div>
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