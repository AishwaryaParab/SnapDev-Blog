import React from 'react';
import styles from "./cardList.module.css";
import Pagination from '../pagination/Pagination';
import Card from '../card/Card';
import { getApiUrl } from '@/utils/apiUrl';

const apiUrl = getApiUrl();

const getData = async (page, category) => {
  const res = await fetch(`${apiUrl}/api/posts?page=${page}&c=${category || ""}`, {cache: "no-store"});
  
  if(!res.ok) {
    throw new Error("Failed to load posts.");
  }

  return res.json();
}

const CardList = async ({ page, category }) => {
  const {posts, count} = await getData(page, category);

  const POST_PER_PAGE = 3;
  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

  return (
    <div className={styles.container}>
      {posts.length === 0 ?
        <h1 className={`${styles.title} ${styles.noPosts}`}>No posts yet...</h1> :
        <>
          <h1 className={styles.title}>Recent Posts</h1>
          <div className={styles.posts}>
            {posts?.map((item) => {
              return <Card key={item._id} item={item} />
            })}
          </div>
          <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
        </>
      }
    </div>
  )
}

export default CardList