"use client";
import React from "react";
import Recorder from "@/components/Recorder";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const Home = () => {
  return (
    <div className="bg-gradient-to-br from-pink-100 dark:from-purple-900 via-purple-50 dark:via-gray-900 to-white dark:to-black h-screen w-screen flex flex-col items-center justify-between py-10">
      <ThemeSwitcher />
      <div className="flex items-center text-center flex-col max-w-xl">
        <div className="w-12 h-12 mb-10 bg-default-800 rounded-xl flex items-center justify-center">
          <span className="text-white text-2xl font-bold">👋</span>
        </div>
        <h1 className="text-2xl font-extrabold text-default-900 opacity-30">
          Hi, Saturday Ai
        </h1>

        <p className="text-xl font-bold text-default-700 ">
          Can I help you with anything?
        </p>
        <p className="text-sm mt-2 text-default-400 ">
          Ready to assist you with anything you need, from answering questions
          to providing recommendations. {"Let's"} get started!
        </p>
      </div>

      <Recorder />
    </div>
  );
};

export default Home;
