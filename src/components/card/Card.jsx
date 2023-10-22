import React from 'react';
import styles from "./card.module.css";
import Image from 'next/image';
import Link from 'next/link';

const Card = ({ item }) => {
  return (
    <div className={styles.container}>
        {item.img &&<div className={styles.imgContainer}>
          <Image className={styles.image} src={item.img} alt="" fill />
        </div>}
        <div className={styles.textContainer}>
            <div className={styles.detail}>
                <span className={styles.date}>{item.createdAt.substring(0,10)} - </span>
                <span className={styles.category}>{item.catSlug}</span>
            </div>
            <Link href={`/posts/${item.slug}`}>
                <h1>{item.title}</h1>
            </Link>
            <div className={styles.desc} dangerouslySetInnerHTML={{__html: item?.desc.substring(0, 100) + "<strong> ...</strong>"}} />
            <Link href={`/posts/${item.slug}`} className={styles.link}>Read More</Link>
        </div>
    </div>
  )
}

export default Card