import React from 'react';

export default function Tile({className}) {
  return (
    <div className={`${className} -z-10 rounded-full size-[4.4rem]`}></div>
  );
}
