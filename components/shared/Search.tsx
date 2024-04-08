'use client'
import React, { useEffect, useState } from 'react';
import { Input } from '../ui/input'; // Import the Input component from your library
import Image from 'next/image'; // Import the Image component from Next.js
import { useRouter } from 'next/navigation';


interface Props {
  routerType: string;
}


const Search = ({routerType}:Props) => {
  const [text, setText] = useState('');
  const router=useRouter()

 useEffect(()=>{
  const delaydependece=setTimeout(() => {
    if(text){
      router.push(`/${routerType}?q=` + text)
     }
     else{
      router.push(`/${routerType}`)
     }
  }, 300);
   
 },[text,router])

  return (
    <div className="relative rounded-md shadow-sm">
      <Input
        value={text}
        placeholder="Search.."
        onChange={e => setText(e.target.value)}
        className="block w-full rounded-md border-0 bg-gray-800 text-light-1"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none ">
        <Image
          src="/assets/search.svg"
          alt="search"
          width={24}
          height={24}
        />
      </div>
    </div>
  );
}

export default Search;
