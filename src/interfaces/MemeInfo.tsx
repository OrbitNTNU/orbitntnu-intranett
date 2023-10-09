import { StaticImageData } from "next/image";

export interface MemeInfo {
    creator: string;
    meme: StaticImageData;
    date: Date;
  }
