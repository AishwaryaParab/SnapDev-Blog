import React from 'react';
import styles from "./categoryList.module.css";
import Link from 'next/link';
import Image from 'next/image';
import { getApiUrl } from '@/utils/apiUrl';

const apiUrl = getApiUrl();

const getData = async () => {
  const res = await fetch(`${apiUrl}/api/categories`, {cache: "no-store"})

  if(!res.ok) {
    throw new Error("Failed to load categories.");
  }

  return res.json();
}

const CategoryList = async () => {
  const data = await getData();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Popular Categories</h1>
      <div className={styles.categories}>
        {data?.map((item) => {
          return  <Link href={`/blog?c=${item.slug}`} key={item._id} className={`${styles.category} ${styles[item.slug]}`}>
            {item.img && <Image src={item.img} alt="" width={32} height={32} className={styles.image} />}
            {item.title}
          </Link>
        })}
      </div>
    </div>
  )
}

export default CategoryList