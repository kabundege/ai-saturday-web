// components/ThemeSwitcher.tsx
"use client";

import { useTheme } from "next-themes";
import { Button } from "@nextui-org/react";
import { IoSunny, IoMoon } from "react-icons/io5";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      isIconOnly
      className="absolute top-4 right-4"
    >
      {theme !== "light" ? <IoSunny size={20} /> : <IoMoon size={20} />}
    </Button>
  );
};

export default ThemeSwitcher;
