// eslint-disable-next-line no-unused-vars
import React from "react";
import Button from "../components/Button";

// eslint-disable-next-line react/prop-types
const HeroSection = ({
heroSectionImage = "/images/puskesmas.jpg", // Gambar default jika tidak dikirim props
text = "Selamat Datang Di UPTD Puskesmas Jatisawit",
showButton1,
showButton2,
showButton3,
buttonText1,
buttonText2,
buttonText3,
scrollTarget1,
scrollTarget2,
scrollTarget3
}) => {
const handleButtonClick = (target) => {
    if (target.startsWith("#")) {
    const section = document.querySelector(target);
    if (section) {
        section.scrollIntoView({ behavior: "smooth" });
    }
    } else {
    window.location.href = target;
    }
};

return (
    <div className="relative w-full h-auto z-0" id="herosection">
    <div className="relative w-full h-auto">
        <img
        src={heroSectionImage}
        alt="Puskesmas"
        className="w-full h-96 lg:h-[730px] object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
    </div>

    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-center text-white text-2xl md:text-5xl font-bold">
        <p>{text}</p>
    </div>

    {/* Button 1 */}
    <div className="absolute my-18 top-54 left-34 lg:top-110 lg:left-174 flex space-x-4 z-30">
        {showButton1 && (
        <Button
            onClick={() => handleButtonClick(scrollTarget1)}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md h-7 px-2 text-[13px] lg:h-auto lg:p-3 lg:text-xl"
        >
            {buttonText1}
        </Button>
        )}
    </div>

    {/* Button 2  */}
        <div className="absolute my-18 top-65 left-10 lg:top-130 lg:left-46 flex space-x-4 z-30">
            {showButton2 && (
                <div
                className="bg-orange-300 text-white font-semibold text-[13px] lg:text-xl px-4 py-2 text-sm w-64 break-words whitespace-normal"
                >
                {buttonText2}
                </div>
            )}
        </div>


    {/* Button 3 */}
    <div className="absolute my-18 top-90 left-10 lg:top-180 lg:left-46 flex space-x-4 z-30">
        {showButton3 && (
        <Button
            onClick={() => handleButtonClick(scrollTarget3)}
            className="bg-orange-300 hover:bg-orange-400 text-white font-semibold rounded-md h-7 px-2 text-[13px] lg:h-auto lg:p-3 lg:text-xl"
        >
            {buttonText3}
        </Button>
        )}
    </div>
    </div>
);
};

export default HeroSection;
