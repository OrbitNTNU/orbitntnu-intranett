import React, { useState } from "react";
import logoWhite from "../../public/images/orbitwhite.png"; // Import the image file


const Header = () => {
  const [show, setShow] = useState(false);

  return (
    <header className="outline-dotted outline-red-500 flex w-screen h-10 justify-between items-center">
      <div><img className=" w-[25vw] h-auto relative p-2" src={logoWhite.src} alt="Website logo" /></div>
      <div><input className="bg-transparent" type="text" placeholder="Search..."/></div>
      {<button style={{outline: "1px solid black"}} onClick={() => setShow(!show)}>Hamburger</button>}
      {show && 
        <div className="absolute top-0 right-0 m-12 flex flex-col">
        <p>Hallo</p>
        <p>Hallo2</p>
        </div>
      
      }
    </header>
  );
};

export default Header;
