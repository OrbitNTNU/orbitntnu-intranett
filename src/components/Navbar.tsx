import React, { useState } from "react";
import logoWhite from "../../public/images/orbitwhite.png"; // Import the image file


/* 
Her er kode for navbaren til siden, resolutionen brukt under designingen er 1512x982 px
*/



const Navbar = () => {
  const [show, setShow] = useState(false);

  return (
    <header className=" flex w-screen h-16 justify-between items-center p-1">
      
      <div className="flex justify-start">
        <a href="/">
          <img className=" h-[7vh] p-4 relative" src={logoWhite.src} alt="Website logo"/>
        </a>
      </div>

      <div>
        {/* <input className="bg-transparent w-[300px] relative right-18" type="text" placeholder="Search..."/> */}
      </div>

      <div id="navbar-right" className="flex gap-6 justify-center items-center">

      <a href="https://orbitntnu.com/">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
      </a>
        
      {<button  className={`${show ? "flex flex-col -gap-3 items-center transition-all duration-300 w-24" : "flex w-24 "} `} onClick={() => setShow(!show)}>  
        <p className={`${show ? "-mt-2" : ""}`}>Ham</p>
        <p className={`${show ? "-mt-2" : ""}`}>bur</p>
        <p className={`${show ? "-mt-2" : ""}`}>ger</p>
        </button>}
        {show && 
        <div className="absolute top-0 right-0 mt-16 mr-1 flex flex-col bg-accentColorTwo justify-start items-end w-40 p-3 rounded-sm">
          <a href="https://orbitntnu.com/">Your profile</a>
          <a>Contact HR</a>
          <a>Calendar</a>
          <a>Search for orbiter</a>
          <a>Announcements</a>
          <a>Blog</a>
          <a>Legacy page</a>
          <a href="/memegallery">Meme gallery</a>

        </div>
      
      }

      </div>
    </header>
  );
};

export default Navbar;
