import React, { useState } from "react";

const Header = () => {
  const [show, setShow] = useState(false);

  return (
    <header className="outline-dotted outline-red-500 flex w-screen justify-between">
      <div><img src="" alt="" />Bilde går her</div>
      <div><input type="text" placeholder="Search"/></div>
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
