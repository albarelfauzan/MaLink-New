import {
  IconCopy,
  IconLayoutDashboard,
  IconSettings, // Any other necessary imports
} from "@tabler/icons-react";
import { uniqueId } from "lodash";


interface TablerIconsProps {
  size?: number; // Example prop
  color?: string; // Example prop
}

interface MenuItem {
  id: string;
  title: string;
  icon: (props: TablerIconsProps) => JSX.Element; // Use JSX.Element instead of Element
  href: string;
  subheader?: string; // Optional property
}

const Menuitems: MenuItem[] = [
  {
    id: uniqueId(),
    title: "Home",
    icon: IconLayoutDashboard,
    href: "/",
  },
  {
    id: uniqueId(),
    title: "Set-Up Automation",
    icon: IconCopy,
    href: "/automation",
  },
];

export default Menuitems;
