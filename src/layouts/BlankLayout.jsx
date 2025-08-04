// src/layouts/BlankLayout.jsx
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const BlankLayout = () => {


 
  return (
    <div className="min-h-screen w-full h-full bg-zinc-950 relative overflow-hidden flex items-center justify-center">
      
     
      {/* Content Container with proper z-index */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <Outlet />
      </div>

      {/* Global styles for animations */}
   
    </div>
  );
};

export default BlankLayout;
