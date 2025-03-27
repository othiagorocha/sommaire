import { FileTextIcon } from "lucide-react";
import Link from "next/link";

export const Header = () => {
  const isLoggedIn = !false;
  return (
    <nav className='container flex items-center justify-between lg:px-8 py-4 px-2 mx-auto'>
      <div className='flex lg:flex-1'>
        <Link className='flex items-center group gap-1 lg:gap-2 shrink-0' href='/'>
          <FileTextIcon className='size-5 lg:size-8 text-gray-900 group-hover:rotate-12 transform transition duration-200 ease-in-out' />
          <span className='font-extrabold lg:text-xl text-gray-900'>Sommaire</span>
        </Link>
      </div>
      <div className='flex lg:justify-center gap-4 lg:gap-12 lg:items-center'>
        <Link href='/#pricing'>Pricing</Link>
        <Link href='/dashboard'>Your Summaries</Link>
      </div>
      <div className='flex lg:justify-end lg:flex-1'>
        {isLoggedIn ? (
          <div className='flex gap-2 items-center'>
            <Link href='/upload'>Upload a PDF</Link>
          </div>
        ) : (
          <div>
            <Link href='/sign-in'>Sign In</Link>
          </div>
        )}
      </div>
    </nav>
  );
};
