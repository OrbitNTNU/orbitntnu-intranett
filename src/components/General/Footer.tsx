import Link from "next/link";
import Image from "next/image";
import logoWhite from "../../../public/images/orbitblue.png";
import mockShortcuts from "@/mockdata/MockShortcuts";
import BreakLine from "./Breakline";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="bg-gradient-to-b from-[#010332] to-[#29011C] p-8 mt-8">
        <div className="relative max-w-4xl m-auto">
          <Link href="/">
            <Image
              src={logoWhite.src}
              width={200}
              height={100}
              alt="Orbit"
              objectFit="contain"
              className="mb-4"
            />
          </Link>

          <div className="mb-4 ml-2 text-sm md:text-base">
            <h3 className="font-bold">Made by the Orbit Web Team</h3>
          </div>

          <div className="mb-4 ml-2 text-sm md:text-base">
            <p>Email: web@orbitntnu.com</p>
            <p>Slack: #orbit-web</p>
          </div>

          <div className="mb-4 text-sm ml-2">
            <h3>Orbit Web © {year}</h3>
          </div>
        </div>

        <BreakLine />
        <div className="relative max-w-4xl m-auto">
          <div className=" flex flex-wrap items-center justify-center">
            {mockShortcuts.map((link) => (
              <Link key={link.header} href={link.url} className="ml-2 mr-2 mb-2 hover:text-yellow-500">
                {link.header}
              </Link>
            ))}
          </div>
        </div>

      <div className="text-sm flex flex-wrap items-center justify-center p-8">
        <p className="m-2 text-gray-500">Hanne Marie Haakaas</p>
        <p className="m-2 text-gray-500">Idar Buer</p>
        <p className="m-2 text-gray-500">Mads Kvanvik</p>
        <p className="m-2 text-gray-500">Magnus Andreas Giverin</p>
        <p className="m-2 text-gray-500">Simon Bjerkås</p>
      </div>
      </div>

    </footer>
  )
};

export default Footer;
