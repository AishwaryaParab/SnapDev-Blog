"use client"

import React, { useState, useEffect, useContext, useRef } from 'react';
import styles from "./write.module.css";
import Image from 'next/image';
// import ReactQuill from 'react-quill';
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeContext } from '@/context/ThemeContext';
import dynamic from 'next/dynamic';

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
  const ReactQuill = dynamic(() => import("react-quill"), { srr: false });

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  const [title, setTitle] = useState("");
  const [catSlug, setCatSlug] = useState(null);

  const storage = getStorage(app);

  const {theme} = useContext(ThemeContext);
  const toastId = useRef(null);

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
    const res = await fetch(`${apiUrl}/api/posts`, {
      method: "POST",
      body: JSON.stringify({
        title,
        desc: value,
        img: media,
        slug: slugify(title),
        catSlug: catSlug?.value || "coding", //If not selected, choose the general category
      })
    });

    if(res.status == 200) {
      toast.success('Your post has been published!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme === "light" ? "dark" : "light",
      });
      setTimeout(() => {
        router.push("/");
      }, 2000)
    }
  }

  const handleSelectChange = ( selectedOption ) => {
    setCatSlug(selectedOption);
  }

  // Whenever file is uploaded, call the upload()
  useEffect(() => {
    // If authentication is not done, go to homepage
    if(status === "unauthenticated") {
      router.push("/");
    }

    const upload = () => {
      const fileName = new Date().getTime() + file.name; // for a unique file name
      const storageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          // check if we already displayed a toast
          if (toastId.current === null) {
            toastId.current = toast("Upload in Progress", {
              progress,
              theme: theme === "light" ? "dark" : "light",
            });
          } else {
            toast.update(toastId.current, {
              progress,
              theme: theme === "light" ? "dark" : "light",
            });
          }
          console.log("Upload is " + progress + "% done");
          // switch (snapshot.state) {
          //   case "paused":
          //     console.log("Upload is paused");
          //     break;
          //   case "running":
          //     console.log("Upload is running");
          //     break;
          // }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // console.log("File available at", downloadURL);
            toast.done(toastId.current);
            setMedia(downloadURL);
          });
        }
      );
    };
  
    file && upload();
  }, [file, status])

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

        {/* Ensure ReactQuill is only rendered on the client side */}
        <ReactQuill className={styles.textArea} theme="bubble" modules={toolbarOptions} value={value} onChange={setValue} placeholder="Tell your story..." />
      </div>

      <button className={styles.publish} onClick={handleSubmit}>Publish</button>

      <ToastContainer />
    </div>
  )
}

export default WritePage