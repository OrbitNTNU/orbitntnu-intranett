import React, { useState } from "react";
import logoWhite from "../../public/images/orbitwhite.png"; // Import the image file
import Link from "next/link";
import Image from "next/image";

/* 
  Her er kode for navbaren til siden, resolutionen brukt under designingen er 1512x982 px
  */

const Header = () => {
  const [show, setShow] = useState(false);

  return (
    <header className=" flex h-16 w-screen items-center justify-between p-1">
      <div className="flex justify-start">
        <Link href="/">
          <Image
            className="relative h-[80px] p-4"
            src={logoWhite.src}
            alt="Website logo"
            width={250}
            height={90}
          />
        </Link>
      </div>

      <div>
        {/* <input className="bg-transparent w-[300px] relative right-18" type="text" placeholder="Search..."/> */}
      </div>

      <div id="navbar-right" className="flex items-center justify-center gap-6">
        <a href="https://orbitntnu.com/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </a>

        {
          <button
            className={`${
              show
                ? "-gap-3 flex w-24 flex-col items-center transition-all duration-300"
                : "flex w-24 "
            } `}
            onClick={() => setShow(!show)}
          >
            <p className={`${show ? "-mt-2" : ""}`}>Ham</p>
            <p className={`${show ? "-mt-2" : ""}`}>bur</p>
            <p className={`${show ? "-mt-2" : ""}`}>ger</p>
          </button>
        }
        {show && (
          <div className="absolute right-0 top-0 mr-1 mt-16 flex w-40 flex-col items-end justify-start rounded-sm bg-accentColorTwo p-3">
            <a href="https://orbitntnu.com/">Your profile</a>
            <a>Contact HR</a>
            <a>Calendar</a>
            <a>Search for orbiter</a>
            <a>Announcements</a>
            <a>Blog</a>
            <a>Legacy page</a>
            <Link href="/memegallery">Meme gallery</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
