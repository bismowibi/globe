import React from 'react';

function LayerController() {
  return (
    <div className='flex justify-between font-bold w-full md:w-1/2 lg:w-1/3 relative z-10  bg-[#f2f2f4] rounded-xl p-4 bg-opacity-50  items-center'>
      <div>
        <a>2000</a>
      </div>
      <div>
        <a>2005</a>
      </div>
      <div>
        <a>2010</a>
      </div>
      <div>
        <a>2015</a>
      </div>
      <div className='bg-gray-200 px-4 py-2 rounded-lg font-bold'>
        <a>2020</a>
      </div>
    </div>
  );
}

export default LayerController;
