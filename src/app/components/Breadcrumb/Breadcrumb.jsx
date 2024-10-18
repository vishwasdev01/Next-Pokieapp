import React from 'react';
import { useRouter } from 'next/navigation';

const HomeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
);

const Breadcrumb = ({ name }) => {
  const router = useRouter();

  const handleHomeClick = (e) => {
    e.preventDefault();
    router.push('/');
  };

  return (
    <nav className="flex items-center gap-2" aria-label="Breadcrumb">
      <div className="flex items-center gap-2">
        <a
          href="/"
          className="text-gray-600 hover:text-gray-900 transition duration-300 ease-in-out"
          onClick={handleHomeClick}
          aria-label="Home"
        >
          <HomeIcon />
        </a>
        <span className="text-gray-600">/</span>
        <span className="text-gray-600" aria-current="page">{name}</span>
      </div>
    </nav>
  );
};

export default Breadcrumb;