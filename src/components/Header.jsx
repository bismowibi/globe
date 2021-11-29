import React from 'react';

function Header() {
  return (
    <div className=' my-5 space-y-2 w-full md:w-1/2 lg:w-1/3 relative z-10  bg-[#f2f2f4] rounded-xl p-4 bg-opacity-50'>
      <div className='flex text-4xl space-x-2'>
        <p className='font-medium'>World</p>
        <p className='font-bold'>Population</p>
      </div>
      <div className='font-light text-lg'>
        <p>
          Human population density based on counts consistent with national
          censuses and population registers
        </p>
      </div>
    </div>
  );
}

export default Header;
