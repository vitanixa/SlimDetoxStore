import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#2f3d2f] text-white text-center p-4 mt-12">
      &copy; {new Date().getFullYear()} Vitanixa. All rights reserved.
    </footer>
  );
}