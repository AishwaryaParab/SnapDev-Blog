import React from 'react';
import styles from './footer.module.css';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.logo}>
          <Image src="/logo.png" alt="SnapDev" width={50} height={50} />
          <h1 className={styles.logoText}>SnapDev</h1>
        </div>
        <p className={styles.desc}>Keep coding, keep exploring and never stop learning. Let&apos;s build the future, one line of code at a time. Let&apos;s connect on socials 👇</p>
        <div className={styles.icons}>
          <Link target="_blank" href="https://www.linkedin.com/in/aishwaryaparab/"><Image src="/linkedin.png" alt="" width={18} height={18} /></Link>
          <Link target="_blank" href="https://www.youtube.com/@CodeWithAishwarya"><Image src="/youtube.png" alt="" width={18} height={18} /></Link>
          <Link target="_blank" href="https://github.com/AishwaryaParab"><Image src="/github.png" alt="" width={22} height={22} /></Link>
        </div>
      </div>
      <div className={styles.links}>
        <div className={styles.list}>
          <span className={styles.listTitle}>Links</span>
          <Link href="/">Home</Link>
          <Link href="/">Blog</Link>
          <Link href="/">About</Link>
          <Link href="/">Contact</Link>
        </div>

        <div className={styles.list}>
          <span className={styles.listTitle}>Tags</span>
          <Link href="/">Coding</Link>
          <Link href="/">React</Link>
          <Link href="/">Next</Link>
          <Link href="/">Node</Link>
        </div>

        <div className={styles.list}>
          <span className={styles.listTitle}>Social</span>
          <Link href="/">Facebook</Link>
          <Link href="/">Instagram</Link>
          <Link href="/">Tiktok</Link>
          <Link href="/">Youtube</Link>
        </div>
      </div>
    </div>
  )
}

export default Footer