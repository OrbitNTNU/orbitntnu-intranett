import { useState } from "react";

const Header = () => {
  const [show, setShow] = useState(false);

  return (
    <header>
      This is the header
      <button onClick={() => setShow(!show)}>Hamburger</button>
      {show && <div>Hei</div>}
    </header>
  );
};

export default Header;
