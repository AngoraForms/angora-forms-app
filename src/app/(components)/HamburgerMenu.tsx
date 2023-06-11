'use client';

import React, { useState, useEffect } from 'react';

export default function HamburgerMenu () {
  return (
    <div className="hamburger-menu hidden flex-col justify-between w-6 h-4 cursor-pointer items-center
      max-md:flex">
      <div className="hamburger-line w-full h-0.5 bg-black transition-transform"></div>
      <div className="hamburger-line w-full h-0.5 bg-black transition-transform"></div>
      <div className="hamburger-line w-full h-0.5 bg-black transition-transform "></div>
    </div>

  )
}