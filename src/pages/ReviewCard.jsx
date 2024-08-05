import React from "react";
import { ImQuotesLeft } from "react-icons/im";

const ReviewCard = ({ rating }) => {
  // Sample user image URL
  const userImage =
    "https://tse4.mm.bing.net/th?id=OIP.1AYxQXXaC2nmlq2gHuKlogHaJQ&pid=Api&P=0&h=220";
  const userImage2 =
    "https://tse3.mm.bing.net/th?id=OIP.0OHbAGENXBFABKmP7vML7AHaJZ&pid=Api&P=0&h=220";
  const userImage3 =
    "https://tse4.mm.bing.net/th?id=OIP.RuVFMlGrIFvD-0VDyZr5kgHaJo&pid=Api&P=0&h=220";

  return (
    <div className="flex flex-col xl:flex-row  lg:flex-row md:flex-row     py-7 px-7 gap-8">
      {/* Review Card 1 */}
      <div className="bg-gray-50 shadow-xl flex flex-col w-full xl:w-1/3 md:w-1/2 border border-gray-200 rounded-md p-6 cursor-pointer hover:shadow-md transition-shadow">
        <div className="flex items-center mb-2">
          <img
            src={userImage}
            alt="User Profile"
            className="w-10 h-10 rounded-full mr-4 object-cover"
          />
          <h3 className="text-lg font-semibold text-gray-900">synster gates</h3>
        </div>

        <div className="flex items-center mb-2">
          {[...Array(rating)].map((_, index) => (
            <span key={index} className="text-yellow-400 text-xl">
              ★★★★★★
            </span>
          ))}
        </div>

        <ImQuotesLeft className="text-gray-400 mb-2" size={20} />

        <p className="text-gray-600">
          "I am absolutely in love with this dress! The fit is perfect, the fabric is so
          soft and comfortable, and the color is even more vibrant in person. I received
          so many compliments when I wore it out. It's definitely a new favorite in my
          wardrobe."
        </p>
      </div>
      {/* Review Card 2 */}
      <div className="bg-gray-50 shadow-xl flex flex-col w-full xl:w-1/3 md:w-1/2 border border-gray-200 rounded-md p-6 cursor-pointer hover:shadow-md transition-shadow">
        <div className="flex items-center mb-2">
          <img
            src={userImage2}
            alt="User Profile"
            className="w-10 h-10 rounded-full mr-4 object-cover"
          />
          <h3 className="text-lg font-semibold text-gray-900">Cristiano ronaldo</h3>
        </div>

        <div className="flex items-center mb-2">
          {[...Array(rating)].map((_, index) => (
            <span key={index} className="text-yellow-400 text-xl">
              ★★★★
            </span>
          ))}
        </div>

        <ImQuotesLeft className="text-gray-400 mb-2" size={20} />

        <p className="text-gray-600">
          "This shirt is a good value for the price. The material is decent quality, and
          the design is simple but stylish. It fits true to size, but I wish it was a bit
          longer. Overall, I'm happy with my purchase and would recommend it to others."
        </p>
      </div>
      {/* Review Card 1 */}
      <div className="bg-gray-50 shadow-xl flex flex-col w-full xl:w-1/3 md:w-1/2 border border-gray-200 rounded-md p-6 cursor-pointer hover:shadow-md transition-shadow">
        <div className="flex items-center mb-2">
          <img
            src={userImage3}
            alt="User Profile"
            className="w-10 h-10 rounded-full mr-4 object-cover"
          />
          <h3 className="text-lg font-semibold text-gray-900">Lamine yamal</h3>
        </div>

        <div className="flex items-center mb-2">
          {[...Array(rating)].map((_, index) => (
            <span key={index} className="text-yellow-400 text-xl">
              ★★★★★★
            </span>
          ))}
        </div>

        <ImQuotesLeft className="text-gray-400 mb-2" size={20} />

        <p className="text-gray-600">
          "I was disappointed with the quality of this sweater. The fabric feels thin and
          scratchy, and it started pilling after just a few wears. The color is nice, but
          the overall construction doesn't justify the price. I would not buy this again."
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
