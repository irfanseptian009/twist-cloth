import React from "react";
import img from "../../assets/Nirvana2.png";

const Collections = () => {
  return (
    <div className="h-screen lg:h-[50vh] flex flex-col justify-center lg:flex-row items-center bg-PrimaryColor mt-14 lg:px-32 px-5">
      {/* img section */}
      <div className=" flex justify-center w-full lg:w-2/4 pt-6">
        <img src={img} alt="img" />
      </div>

      {/* content section */}
      <div className=" w-full lg:w-2/4 space-y-4 pt-5 text-center lg:text-start">
        <h1 className=" text-4xl font-semibold text-ExtraDarkColor">
          Best Summer Collection
        </h1>
        <h3 className=" text-lg font-medium text-DarkColor">Sale Get Up To 60% off</h3>
        <p>
          Clothes aren't just about covering up. They're about expressing who you are,
          embracing your unique style, and feeling your best. Our new collection is
          designed to empower you, to make you feel beautiful, confident, and ready to
          take on the world.
        </p>

        <button className=" bg-ExtraDarkColor bg-yellow-800 shadow-xl rounded-lg text-white px-4 py-2 font-medium active:bg-amber-800">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Collections;
