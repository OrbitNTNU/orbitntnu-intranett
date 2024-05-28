import type { ReactNode } from "react";

export interface ShortcutLink {
    header: string;
    description: string;
    url: string;
    icon?: ReactNode;
  }