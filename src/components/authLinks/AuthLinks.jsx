"use client"

import React, { useState } from 'react';
import styles from './authLinks.module.css';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { HiMenu } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';

const AuthLinks = () => {
  const [open, setOpen] = useState(false);
  const {status} = useSession();

  const handleResponsiveMenu = () => {
    setOpen(!open);
    // Enable/disable body scroll when the menu is open/closed
    document.body.style.overflow = open ? 'auto' : 'hidden';
  };

  return <>
    {status === "authenticated" ?
    <>
      <Link href="/write" className={styles.link}>Write</Link>
      <span className={styles.link} style={{cursor: "pointer"}} onClick={signOut}>Logout</span>
    </> :
    <Link href="/login" className={styles.link}>Login</Link>
    }

    {open ? <IoClose className={styles.hamburger} onClick={handleResponsiveMenu} /> : <HiMenu className={styles.hamburger} onClick={handleResponsiveMenu} />}


    {open && (
      <div className={styles.responsiveMenu}>
        <Link href="/">Home</Link>
        <Link href="/">About</Link>
        <Link href="/">Contact</Link>
        {status === "authenticated" ?
          <>
            <Link href="/write">Write</Link>
            <span style={{cursor: "pointer"}} onClick={signOut}>Logout</span>
          </> :
            <Link href="/login">Login</Link>
        }
      </div>
    )}
  </>
}

export default AuthLinks