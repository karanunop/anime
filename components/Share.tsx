'use client'
import { LinkIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';
import { useState } from "react";

export default function Share() {
  const [clicked, setClicked] = useState(false);

  const copyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          setClicked(true);
          setTimeout(() => setClicked(false), 2000); // Reset after 2 seconds
        })
        .catch((err) => console.error("Failed to copy: ", err));
    }
  };

  return (
      <button onClick={copyLink} className=" flex gap-2 items-center px-2 border border-black bg-white">
          <LinkIcon className='h-4 w-4'/>
      {clicked ? "Copied" : "Share"}
    </button>
  );
}
