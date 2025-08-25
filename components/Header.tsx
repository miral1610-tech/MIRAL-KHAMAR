
import React from 'react';

const IndiaPostLogo: React.FC = () => (
    <svg className="w-12 h-12 mr-4" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="48" fill="#D92E28"/>
        <path d="M50 18L75 39.9052V60.0948L50 82L25 60.0948V39.9052L50 18Z" stroke="#FDB913" strokeWidth="4"/>
        <path d="M50 50L75 39" stroke="#FDB913" strokeWidth="4"/>
        <path d="M50 50L25 39" stroke="#FDB913" strokeWidth="4"/>
        <path d="M50 82V50" stroke="#FDB913" strokeWidth="4"/>
    </svg>
);


const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md p-4 flex items-center z-10">
      <IndiaPostLogo />
      <div>
        <h1 className="text-xl font-bold text-gray-800">Miral Khamar</h1>
        <p className="text-sm text-gray-600">Department of Post, India - AI Expert</p>
      </div>
    </header>
  );
};

export default Header;
