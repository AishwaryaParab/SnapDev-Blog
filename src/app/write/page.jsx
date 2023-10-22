"use client"

import React, { useState, useEffect } from 'react';
import styles from "./write.module.css";
import Image from 'next/image';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.core.css'
import "react-quill/dist/quill.bubble.css";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from '@/utils/firebase';
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
import Select from 'react-select';
import { getApiUrl } from '@/utils/apiUrl';

// Initialize highlight.js for code syntax highlighting
hljs.configure({
  languages: ['javascript', 'python', 'css'], // Add more languages as needed
});

const toolbarOptions  = {
  toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3] }],
      ["bold", "italic", "underline","strike"],
      [{ color: [] }, { background: [] }],
      [{ script:  "sub" }, { script:  "super" }],
      ["blockquote", "code-block"],
      [{ list:  "ordered" }, { list:  "bullet" }],
      [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
      ["link", "image", "video"],
      ["clean"],
  ],
  syntax: {
      highlight: (text) => hljs.highlightAuto(text).value
  },
  clipboard: {
    matchVisual: false,
  },
};

const options = [
  { value: 'react', label: 'React' },
  { value: 'node', label: 'Node' },
  { value: 'next', label: 'Next' },
  { value: 'coding', label: 'Coding' },
  { value: 'travel', label: 'Travel' },
  { value: 'novels', label: 'Novels' },
];

const WritePage = () => {
  const {status} = useSession();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  const [title, setTitle] = useState("");
  const [catSlug, setCatSlug] = useState(null);

  const storage = getStorage(app);

  const upload = () => {
    const fileName = new Date().getTime + file.name; // for a unique file name
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // console.log("File available at", downloadURL);
          setMedia(downloadURL);
        });
      }
    );
  }

  // Aishwarya Parab -> aishwarya-parab
  const slugify = (str) => {
    return str
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/[\s_-]+/g, "-")
            .replace(/^-+|-+$/g, "");
  }

  const apiUrl = getApiUrl();

  const handleSubmit = async () => {
    const res = await fetch(`/api/posts`, {
      method: "POST",
      body: JSON.stringify({
        title,
        desc: value,
        img: media,
        slug: slugify(title),
        catSlug: catSlug?.value || "coding", //If not selected, choose the general category
      })
    });

    console.log(res);
  }

  const handleSelectChange = ( selectedOption ) => {
    setCatSlug(selectedOption);
  }

  // Whenever file is uploaded, call the upload()
  useEffect(() => {
    file && upload();
  }, [file])

  // If authentication is not done, go to homepage
  if(status == "unauthenticated") {
    router.push("/");
  }

  if(status == "loading") {
    return <div className={styles.loading}>
      Loading...
    </div>
  }

  return (
    <div className={styles.container}>
      <input type="text" placeholder="Title" className={styles.input} onChange={(e) => setTitle(e.target.value)} />
      <Select
        className={styles.select} 
        classNamePrefix="react-select"
        value={catSlug} 
        onChange={handleSelectChange} 
        options={options} 
        placeholder="Select a Category" 
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: "#d8ecf3" 
          }
        })}
      />
      <div className={styles.editor}>
        <button className={styles.button} onClick={() => {setOpen(!open)}}>
          <Image src="/plus.png" alt="" width={16} height={16} />
        </button>

        {open && (
          <label htmlFor="image">
            <div className={styles.add}>
              <input type="file" id="image" onChange={(e) => setFile(e.target.files[0])} style={{display: "none"}} />
                    <div className={styles.addbutton}>
                        <Image src="/image.png" alt="" width={16} height={16} />
                    </div>
                    <span>
                      Upload thumbnail
                    </span>
                  
                  {/* <button className={styles.addbutton}>
                    <Image src="/external.png" alt="" width={16} height={16} />
                    </button>
                    <button className={styles.addbutton}>
                    <Image src="/video.png" alt="" width={16} height={16} />
                  </button> */}
            </div>
          </label>
        )}
        {console.log("Category ------> " + catSlug?.value)}
        <ReactQuill className={styles.textArea} theme="bubble" modules={toolbarOptions} value={value} onChange={setValue} placeholder="Tell your story..." />
      </div>

      <button className={styles.publish} onClick={handleSubmit}>Publish</button>
    </div>
  )
}

export default WritePage