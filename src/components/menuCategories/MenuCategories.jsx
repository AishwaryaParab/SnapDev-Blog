import React from 'react';
import Link from "next/link";
import styles from "./menuCategories.module.css";

const MenuCategories = () => {
  return (
    <div className={styles.categoryList}>
        <Link href="/blog?c=travel" className={`${styles.categoryItem} ${styles.travel}`}>
          Travel
        </Link>
        <Link href="/blog?c=node" className={`${styles.categoryItem} ${styles.node}`}>
          Node
        </Link>
        <Link href="/blog?c=react" className={`${styles.categoryItem} ${styles.react}`}>
          React
        </Link>
        <Link href="/blog?c=coding" className={`${styles.categoryItem} ${styles.coding}`}>
          Coding
        </Link>
        <Link href="/blog?c=next" className={`${styles.categoryItem} ${styles.next}`}>
          Next
        </Link>
        <Link href="/blog?c=novels" className={`${styles.categoryItem} ${styles.novels}`}>
          Novels
        </Link>
      </div>
  )
}

export default MenuCategories