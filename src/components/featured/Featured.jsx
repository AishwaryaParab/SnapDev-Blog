import React from 'react';
import styles from "./featured.module.css";
import Image from 'next/image';

const Featured = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}><b>Hey, Aishwarya Parab here!</b> Discover my blogs and creative ideas.</h1>
      <div className={styles.post}>
        <div className={styles.imgContainer}>
          <Image src="/home.jpg" alt="" fill className={styles.image} />
          {/* <Image src="/profile.png" alt="" fill className={styles.image} /> */}
        </div>
        <div className={styles.textContainer}>
          <h1 className={styles.postTitle}>Making an Impact through Software & Tech. 👩🏻‍💻</h1>
          <p className={styles.postDesc}>Dive into the world of web development with me — a passionate frontend developer and MERN Stack engineer. I thrive on challenges, constantly expanding my skills in React, JavaScript and TypeScript. When not coding, I indulge in teaching, writing, reading and travelling, always seeking new adventures and knowledge. Join me on this exhilarating journey as we push boundaries and unlock the magic of technology together.</p>
          {/* <button className={styles.button}>Read More</button> */}
        </div>
      </div>
    </div>
  )
}

export default Featured