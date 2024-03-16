import React from 'react'

function Herosection() {
  return (
    <div className="container mx-auto">
    <div class="slider flex flex-col-reverse md:flex-row bg-[#f2f2f2]">
    <div class="left flex flex-col justify-center items-center md:items-baseline px-12 py-12 ml-32 space-y-5">
        <h1 class="text-2xl font-medium md:text-4xl mx-5">Beat the Diabetes</h1>
        <p class="3/4 mx-4 text-center md:text-center">Get up to 18% OFF on Diabetes Care </p>
        <button class="text-white bg-black px-4 py-2 my-6 font-bold mx-5">Shop Now</button>
    </div>
    <div class="right">
        <img class="w-[32rem] md:w-[36rem] md:mx-8" src="pictures/care6.avif" alt=""/>

    </div>
</div>
</div>
      
  )
}
export default Herosection;