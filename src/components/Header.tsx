import React, { useState } from "react";

const Header = () => {
  const [show, setShow] = useState(false);

  return (
    <header style={{outline: "1px dotted red", width: "100vw", display: "flex", margin: "1vw, 0vw, 0vw, 0vw"}}>
      <div className="image"><img src="" alt="" />Bilde går her</div>
      <div className="search"><input type="text" placeholder="Search"/></div>
      <button style={{outline: "1px solid black"}} onClick={() => setShow(!show)}>Hamburger</button>
      {show && 
        <React.Fragment>
          burgermeny-ting
        </React.Fragment>
      
      
      
      }
    </header>
  );
};

export default Header;
