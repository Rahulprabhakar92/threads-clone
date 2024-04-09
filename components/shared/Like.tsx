"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';


interface Props {
    currentuserid: string;
    postid: string;
}

const Like = ({
    currentuserid,
    postid
}: Props) => {
    const [like, setLike] = useState(false);
   
    

    async function toggle() {
        setLike(!like);
    }

    return (
        <div>
            <Image
                alt="heart"
                width={24}
                height={24}
                className="cursor-pointer object-contain"
                onClick={toggle}
                src={like ? "/assets/heart-filled.svg" : "/assets/heart-gray.svg"}
            />
        </div>
    );
}

export default Like;