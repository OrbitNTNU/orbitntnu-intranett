import React, { useState } from "react";
import logoWhite from "../../public/images/orbitwhite.png"; // Import the image file


const Header = () => {
  const [show, setShow] = useState(false);

  return (
    <header className="outline-dotted outline-red-500 flex w-screen h-10 justify-between items-center">
      <div className="flex justify-start"><img className=" h-[6vh] h-auto relative" src={logoWhite.src} alt="Website logo" /></div>
      <div><input className="bg-transparent w-[300px] relative right-18" type="text" placeholder="Search..."/></div>
      {<button style={{outline: "1px solid black"}} onClick={() => setShow(!show)}>Hamburger</button>}
      {show && 
        <div className="absolute top-0 right-0 m-12 flex flex-col bg-accentColorTwo ">
        <p>Hallo</p>
        <p>Hallo2</p>
        </div>
      
      }
    </header>
  );
};

export default Header;
