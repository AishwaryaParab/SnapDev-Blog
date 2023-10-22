import React from 'react';
import styles from "./featured.module.css";
import Image from 'next/image';

const Featured = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}><b>Hey, Aishwarya Parab here!</b> Discover my stories and creative ideas.</h1>
      <div className={styles.post}>
        <div className={styles.imgContainer}>
          <Image src="/p1.jpeg" alt="" fill className={styles.image} />
          {/* <Image src="/profile.png" alt="" fill className={styles.image} /> */}
        </div>
        <div className={styles.textContainer}>
          <h1 className={styles.postTitle}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. dipisicing elit</h1>
          <p className={styles.postDesc}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, culpa accusantium. Nostrum unde sapiente praesentium corrupti temporibus voluptas reiciendis? Expedita ea distinctio ipsa, animi quibusdam amet fuga nobis et ad! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus similique odit iure doloribus, earum pariatur, voluptatibus corporis voluptate provident quam necessitatibus nemo magni doloremque eum, laborum vel ad omnis corrupti!</p>
          <button className={styles.button}>Read More</button>
        </div>
      </div>
    </div>
  )
}

export default Featured