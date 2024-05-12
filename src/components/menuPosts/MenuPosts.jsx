import React from 'react';
import Image from 'next/image';
import Link from "next/link";
import styles from "./menuPosts.module.css";

const MenuPosts = ({ withImage }) => {
  return (
    <div className={styles.items}>
    <Link className={styles.item} href="/">
      {withImage && <div className={styles.imgContainer}>
        <Image className={styles.image} src="/p1.jpeg" alt="" fill />
      </div>}
      <div className={styles.textContainer}>
        <span className={`${styles.category} ${styles.coding}`}>Coding</span>
        <h3 className={styles.postTitle}>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h3>
        <div className={styles.detail}>
          <span className={styles.username}>John Doe</span>
          <span className={styles.date}> - 11.02.2023</span>
        </div>
      </div>
    </Link>

    <Link className={styles.item} href="/">
      {withImage && <div className={styles.imgContainer}>
        <Image className={styles.image} src="/p1.jpeg" alt="" fill />
      </div>}
      <div className={styles.textContainer}>
        <span className={`${styles.category} ${styles.react}`}>React</span>
        <h3 className={styles.postTitle}>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h3>
        <div className={styles.detail}>
          <span className={styles.username}>John Doe</span>
          <span className={styles.date}> - 11.02.2023</span>
        </div>
      </div>
    </Link>

    <Link className={styles.item} href="/">
      {withImage && <div className={styles.imgContainer}>
        <Image className={styles.image} src="/p1.jpeg" alt="" fill />
      </div>}
      <div className={styles.textContainer}>
        <span className={`${styles.category} ${styles.next}`}>Next</span>
        <h3 className={styles.postTitle}>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h3>
        <div className={styles.detail}>
          <span className={styles.username}>John Doe</span>
          <span className={styles.date}> - 11.02.2023</span>
        </div>
      </div>
    </Link>

    <Link className={styles.item} href="/">
      {withImage && <div className={styles.imgContainer}>
        <Image className={styles.image} src="/p1.jpeg" alt="" fill />
      </div>}
      <div className={styles.textContainer}>
        <span className={`${styles.category} ${styles.node}`}>Node</span>
        <h3 className={styles.postTitle}>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h3>
        <div className={styles.detail}>
          <span className={styles.username}>John Doe</span>
          <span className={styles.date}> - 11.02.2023</span>
        </div>
      </div>
    </Link>
  </div>
  )
}

export default MenuPosts