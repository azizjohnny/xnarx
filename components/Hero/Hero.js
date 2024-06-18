import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import CallBtn from "../ComponetntModuls/CallBtn/CallBtn";
import Texno from "../../public/Assets/Images/news/Texnomart.png";
import Media from "../../public/Assets/Images/news/Mediapark.jpg";
import Elmakon from "../../public/Assets/Images/news/Elmakon.png";
import Idea from "../../public/Assets/Images/news/Idea.png";

function Hero() {
  const lang = useSelector((state) => state.data.lang);
  const languages = useSelector((state) => state.data.localization);

  return (
    <section className="mt-5 sm:mt-5 md:mt-10 ">
      <div className="w-full max-w-container mx-auto">
        <div className="bg-gray-bg_main  rounded-3xl flex-col lg:flex-row flex lg:items-center justify-between">
          <div className="w-full max-w-container mx-auto">
            <div className="bg-gray-bg_main py-3 sm:pl-6 md:py-8 lg:py-10 pl-4 rounded-sectionRadius flex-col lg:flex-row flex lg:items-center justify-between">
              <div className="w-full lg:w-heroContent pr-4">
                <div className="flex">
                  <h1 className="font-bold text-2xl sm:text-4xl xl:text-5xl text-black-black_dark mb-4">
                    <span className=" text-orange-400">x</span>nar
                    <span className="text-orange-400">x </span>
                    {languages[lang].hero.heading}
                  </h1>
                </div>
                <p className="font-normal text-sm lg:text-base text-black-black_thin mb-3 sm:mb-6y">
                  {languages[lang].hero.text}
                </p>
                {/* <div className="hidden sm:inline-block">
                  <CallBtn />
                </div> */}
              </div>
              {/* <div className="flex justify-end">
                <div className="grid md:grid-cols-2 grid-cols-4 gap-4 px-10">
                  <Image
                    className="md:w-[200px] md:h-[150px]  w-20 h-auto"
                    id="hero-bg"
                    src={Texno}
                    width={571}
                    height={319}
                    alt="Hero Bg"
                  />
                  <Image
                    className="md:w-[200px] md:h-[150px]  w-20 h-auto"
                    id="hero-bg"
                    src={Media}
                    width={571}
                    height={319}
                    alt="Hero Bg"
                  />
                  <Image
                    className="md:w-[200px] md:h-[150px]  w-20 h-auto"
                    id="hero-bg"
                    src={Elmakon}
                    width={571}
                    height={319}
                    alt="Hero Bg"
                  />
                  <Image
                    className="md:w-[200px] md:h-[150px]  w-20 h-auto"
                    id="hero-bg"
                    src={Idea}
                    width={571}
                    height={319}
                    alt="Hero Bg"
                  />
                </div>
                <Image
                  className="w-heroImgMobile h-heriImgMobile sm:hidden "
                  id="hero-bg"
                  src={"/Assets/Images/HeaderAndHeroImg/heroMobile.png"}
                  width={320}
                  height={160}
                  alt="Hero Bg"
                />
              </div> */}
              {/* <div className="sm:hidden mt-7 pr-4">
                <CallBtn namejon={languages[lang].hero.button} />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
