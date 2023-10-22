import React from 'react';
import Link from "next/link";
import styles from "./menuCategories.module.css";

const MenuCategories = () => {
  return (
    <div className={styles.categoryList}>
        <Link href="/blog/c=style" className={`${styles.categoryItem} ${styles.style}`}>
          Style
        </Link>
        <Link href="/blog/c=fashion" className={`${styles.categoryItem} ${styles.fashion}`}>
          Fashion
        </Link>
        <Link href="/blog/c=food" className={`${styles.categoryItem} ${styles.food}`}>
          Food
        </Link>
        <Link href="/blog/c=travel" className={`${styles.categoryItem} ${styles.travel}`}>
          Travel
        </Link>
        <Link href="/blog/c=culture" className={`${styles.categoryItem} ${styles.culture}`}>
          Culture
        </Link>
        <Link href="/blog/c=coding" className={`${styles.categoryItem} ${styles.coding}`}>
          Coding
        </Link>
      </div>
  )
}

export default MenuCategories