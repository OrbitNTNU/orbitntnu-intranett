import React, { useState } from "react";
import logoWhite from "../../public/images/orbitwhite.png"; // Import the image file


/* 
Her er kode for navbaren til siden, resolutionen brukt under designingen er 1512x982 px
*/

const Header = () => {
  const [show, setShow] = useState(false);

  return (
    <header className="outline-dotted outline-red-500 flex w-screen h-16 justify-between items-center p-1">
      
      <div className="flex justify-start">
        <a href="/">
          <img className=" h-[8vh] relative" src={logoWhite.src} alt="Website logo"/>
        </a>
      </div>

      <div>
        <input className="bg-transparent w-[300px] relative right-18" type="text" placeholder="Search..."/>
      </div>
      
      
      {<button  className={`${show ? "flex flex-col -gap-3 items-center transition-all duration-300 w-24" : "flex w-24 "} `} onClick={() => setShow(!show)}>  
        <p className={`${show ? "-mt-2" : ""}`}>Ham</p>
        <p className={`${show ? "-mt-2" : ""}`}>bur</p>
        <p className={`${show ? "-mt-2" : ""}`}>ger</p></button>}
      {show && 
        <div className="absolute top-0 right-0 mt-16 flex flex-col bg-accentColorTwo flex justify-start items-end w-40 p-2 rounded-sm">
        <a href="https://orbitntnu.com/">Your profile</a>
        <a>Contact HR</a>
        <a>Calendar</a>
        <a>Search for orbiter</a>
        <a>Announcements</a>
        <a>Blog</a>
        <a>Legacy page</a>
        <a>Meme gallery</a>

        </div>
      
      }
    </header>
  );
};

export default Header;
