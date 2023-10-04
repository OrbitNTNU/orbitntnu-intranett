import React, { useState } from "react";
import logoWhite from "../../public/images/orbitwhite.png"; // Import the image file


/* 
Her er kode for navbaren til siden, resolutionen brukt under designingen er 1512x982 px
*/

const Header = () => {
  const [show, setShow] = useState(false);

  return (
    <header className="outline-dotted outline-red-500 flex w-screen h-10 justify-between items-center p-2">
      <div className="flex justify-start"><img className=" h-[6vh] relative" src={logoWhite.src} alt="Website logo" /></div>
      <div><input className="bg-transparent w-[300px] relative right-18" type="text" placeholder="Search..."/></div>
      {<button style={{outline: "1px solid black"}} className={`${show ? "flex flex-col -gap-3 items-center transition-all duration-300 " : "flex transition-all duration-300 "} `} onClick={() => setShow(!show)}> <p className={`${show ? "-mt-2" : ""}`}>Ham</p>
  <p className={`${show ? "-mt-2" : ""}`}>bur</p>
  <p className={`${show ? "-mt-2" : ""}`}>ger</p></button>}
      {show && 
        <div className="absolute top-0 right-0 mt-12 flex flex-col bg-accentColorTwo flex justify-start items-end w-40 p-2 rounded-sm">
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
