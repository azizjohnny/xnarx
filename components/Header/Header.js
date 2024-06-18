import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import {
  changeLang,
  searchProduct,
  setCategoryId,
} from "../../redux/siteDataReducer";
import LeftSidebar from "./LeftSideBar";

const env = process.env.NEXT_PUBLIC_TOKEN;

function Header() {
  // newww
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [currentValue, setCurrentValue] = useState("");
  const router = useRouter();
  // olds
  const [openLang, setOpenLang] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const [menuLang, setMenuLang] = useState(false);
  const [clickMenu, setClickMenu] = useState(false);
  const [menuCatOpen, setMenuCatOpen] = useState(false);
  const [fixedBar, setFixedBar] = useState(true);
  const [categories, setCategories] = useState([]);
  const [flagName, setFlagName] = useState("Ru");
  const [flagImg, setFlagImg] = useState(
    "/Assets/Images/HeaderAndHeroImg/russia-flag.svg"
  );
  const [savat, setSavat] = useState([]);

  const lang = useSelector((state) => state.data.lang);
  const languages = useSelector((state) => state.data.localization);
  const [golink, setGoLink] = useState("laa");
  const [catalog, setCatalog] = useState(false);
  const [mainCategoryTitle, setMaincategoryTitle] = useState("");
  const [active, setActive] = useState("Smartfonlar");
  const [testCatalog, setTestCatalog] = useState(-1);

  const categoryGroups = {
    "Mobil telefonlar va aksessuarlar": [
      "Smartfonlar",
      "Quloqchinlar",
      "Mikrofonlar",
      "Smartsoatlar",
      "Planshetlar",
    ],
    "Kompyuterlar va aksessuarlar": [
      "Noutbuklar",
      "Monitorlar",
      "Klaviaturalar",
      "Sichqonchalar",
      "Printerlar va skanerlar",
      "USB xotira-fleshkalari",
      "Tarmoq qurilmalari (Wi-Fi routerlar)",
    ],
    "Uy jihozlari": [
      "Televizorlar",
      "Havoni tozaluvchi va namlovchi jihozlar",
      "Suv isitgichlar",
      "Isitgichlar",
    ],
    "Oshxona jihozlari": [
      "Muzlatgichlar",
      "Gaz plitalari",
      "Mikroto'lqinli pechlar",
      "Tutun tortgichlar",
      "Qahva mashinalari",
      "Sharbat chiqargichlar",
      "Multivarkalar",
      "Blenderlar",
      "Elektr choynaklar",
      "Pishirish panellari",
      "Idish yuvish mashinalari",
      "Duxovkalar va pechlar",
      "Mini pechlar",
      "Plitalar",
    ],
    "Maishiy texnika": [
      "Kir yuvish mashinalari",
      "Changyutgich",
      "Konditsionerlar",
      "Ventilatorlar",
      "Dazmollar",
      "Tikuv mashinalari",
    ],
    "Shaxsiy gigiena uskunalari": [
      "Soch quritgichlar",
      "Soch olish mashinalari",
      "DEPILYATORLAR",
      "Soch to'g'rilash uskunalari va ploykalar",
      "Elektr Tish cho’tkalari",
    ],
    // ... (add more categories as needed)
  };
  // useEffect(() => {
  //   const tokens = JSON.parse(window.localStorage.getItem("token"));

  //   setGoLink(tokens ? "userprofil" : "login");
  // }, []);

  const dispatch = useDispatch();
  const token = false;

  const toggleCategory = (mainCategory, index, indexAll) => {
    setMaincategoryTitle(mainCategory);
    setExpandedCategory((prevCategory) =>
      prevCategory === mainCategory ? null : mainCategory
    );
    setActive(index[0]);
    setTestCatalog(indexAll);
    setMenuCatOpen(!menuCatOpen);
  };

  const handleSubCategoryClick = () => {
    setExpandedCategory(null);
    setCatalog(false);
    setMenuCatOpen(!menuCatOpen);
    setClickMenu(false);
    // Close the category details pane
    // dispatch(setCategoryId(item.id));
  };

  // --- Get Categories
  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://intex-shop-production.up.railway.app/api/categories/getCategories`
  //     )
  //     .then((res) => {
  //       // console.log(res?.data);
  //       setCategories(res?.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  function handlMenuOpen(e) {
    if (e.target.id === "menuBar") setClickMenu(false);
  }

  const handleChange = (evt) => {
    console.log(evt.target.value);
    setCurrentValue(evt.target.value);
  };

  // useEffect(() => {
  //   // window is accessible here.
  //   window.addEventListener("scroll", function () {
  //     if (window.scrollY > 10) {
  //       setFixedBar(true);
  //     } else {
  //       setFixedBar(false);
  //     }
  //   });
  // }, []);
  // useEffect(() => {
  //   setSavat(JSON.parse(window.localStorage.getItem("cartItems")));
  // }, []);
  // console.log(savat?.length);
  const catalogTest = [
    {
      name: "1 chi catalog",
      catalog: ["swsws", "hswhsws", "whshwsh", "jdcnud"],
    },
    {
      name: "2 chi catalog",
      catalog: ["2wsws", "hswhsws", "whshwsh", "jdcnud"],
    },
    {
      name: "3 chi catalog",
      catalog: ["3sws", "hswhsws", "whshwsh", "jdcnud"],
    },
  ];

  const handleCatalog = (e) => {
    setTestCatalog(e);
    setMenuCatOpen(!menuCatOpen);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push({
      pathname: "/search",
      query: { keyword: currentValue },
    });
    setCurrentValue("");
  };

  return (
    <header id="header" className=" shadow-sm">
      <div
        className="bg-gray-bg_nav z-50 md:fixed w-full 
          top-0 transition-all
        border-b-2 md:border-none"
      >
        <div className="w-full max-w-container mx-auto px-4 py-3.5 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href={"/"} onClick={() => dispatch(setCategoryId(""))}>
                <Image
                  priority={true}
                  className="w-40 h-[50px] hidden sm:inline-block"
                  src={"/Assets/Images/HeaderAndHeroImg/logo.jpg"}
                  width={200}
                  height={50}
                  alt="Site Logo"
                />
                <Image
                  priority={true}
                  className="w-20 h-[50px] sm:hidden"
                  src={"/Assets/Images/HeaderAndHeroImg/logo.jpg"}
                  width={150}
                  height={14}
                  alt="Site Logo Mobile"
                />
              </Link>
              <div className="hidden items-center ml-10 xl:flex space-x-6">
                <div
                  onClick={() => setCatalog(!catalog)}
                  className="z-50  px-5 py-2 rounded-md  category bg-[#ff9d3a] inline-block relative mr-1 pr-4 text-base text-black-black_dark font-medium"
                  href={"/"}
                >
                  <Image
                    className={` absolute w-5 h-5 mt-0.5`}
                    src={
                      catalog
                        ? "/Assets/Images/HeaderAndHeroImg/Xcatalog.png"
                        : "/Assets/Images/HeaderAndHeroImg/hamburger.svg"
                    }
                    width={9}
                    height={5}
                    alt="Drop_img"
                    priority={true}
                  />
                  <h2 className="ml-8">Mahsulotlar katalogi</h2>
                </div>

                {/* <Link
                  className="ml-6 text-base text-black-black_dark font-medium"
                  href={"#populyar"}
                >
                  {languages[lang].header.navCategory.item2}
                </Link>
                <Link
                  className="ml-6 text-base text-black-black_dark font-medium"
                  href={"#noviy"}
                >
                  {languages[lang].header.navCategory.item3}
                </Link>
                <Link
                  className="ml-6 text-base text-black-black_dark font-medium"
                  href={"#skidka"}
                >
                  {languages[lang].header.navCategory.item4}
                </Link> */}
              </div>
            </div>
            <div className="flex items-center pl-3">
              <form onSubmit={handleSubmit}>
                <input
                  value={currentValue}
                  id="input-searching"
                  className="hidden md:inline-block  md:w-[560px] w-[260px] py-2.5 rounded-xl pl-9 outline-none"
                  type="text"
                  autoComplete="off"
                  placeholder=" Mahsulot qidirish"
                  aria-label="Enter your searching"
                  minLength={3}
                  onChange={handleChange}
                />
              </form>
              <button className="bg-white z-50 hidden md:flex ml-5 w-11 h-11 relative  items-center justify-center cursor-pointer rounded-xl">
                <Link href="/">
                  {savat?.length === 0 ? null : (
                    <div className=" bg-[#2B3D90] rounded-xl  z-20 ml-3 absolute w-4 h-4">
                      <h2 className=" text-center text-white  text-[8px] mt-0.5">
                        {savat?.length}
                      </h2>
                    </div>
                  )}
                  <Image
                    priority={true}
                    className="w-6 h-6 z-10"
                    src={"/Assets/Images/HeaderAndHeroImg/block-img.svg"}
                    width={24}
                    height={24}
                    alt="Blog Img"
                  />
                </Link>
              </button>
              <div className="relative ">
                <div
                  onClick={() => setOpenUser(!openUser)}
                  className="bg-white relative z-50 h-11 w-11 md:flex  language-wrap hidden cursor-pointer sm:flex ml-5 items-center justify-between  rounded-xl"
                >
                  <Image
                    priority={true}
                    className=" w-6 h-6 mx-auto"
                    src={"/Assets/Images/HeaderAndHeroImg/user.svg"}
                    width={28}
                    height={20}
                    alt="Flag Russia"
                  />
                </div>
              </div>

              <button className="hidden cursor-pointer md:inline-block ml-3 xl:hidden">
                <Image
                  onClick={() => setClickMenu(true)}
                  priority={true}
                  className="w-8 h-5"
                  src={"/Assets/Images/HeaderAndHeroImg/hamburger.svg"}
                  width={32}
                  height={20}
                  alt="Hamburger Menu"
                />
              </button>
            </div>
          </div>
        </div>
        <div
          className={
            catalog
              ? "w-full h-[420px] shadow-md hidden lg:block bg-white"
              : "hidden"
          }
        >
          <div className="flex  py-10">
            <div className="flex flex-col px-10 gap-2  border-r-2">
              {Object.entries(categoryGroups).map(
                ([mainCategory, index], indexAll) => (
                  <div
                    key={mainCategory}
                    onClick={() =>
                      toggleCategory(mainCategory, index, indexAll)
                    }
                    className={
                      active == index[0]
                        ? "bg-orange-100 text-orange-400 font-normal py-1 px-2 rounded"
                        : `hover:bg-orange-100 hover:text-orange-400 font-normal py-1 px-2 rounded`
                    }
                  >
                    {mainCategory}
                  </div>
                )
              )}
            </div>
            <div className="ml-10 overflow-y-auto px-10">
              {expandedCategory && (
                <ul className="flex flex-col text-sm gap-1 ">
                  <h2 className=" text-lg font-medium py-2 px-3">
                    {mainCategoryTitle}
                  </h2>
                  {categoryGroups[expandedCategory].map((subCategory) => (
                    <li
                      className="text-sm text-gray-500 px-4 hover:text-orange-400"
                      key={subCategory}
                      onClick={() => {
                        handleSubCategoryClick(subCategory);
                        dispatch(setCategoryId(subCategory));
                      }}
                    >
                      <Link
                        href={{
                          pathname: "/categoryPage",
                          query: { category: subCategory },
                        }}
                      >
                        {subCategory}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`bg-gray-bg_nav z-50  ${
          fixedBar
            ? "fixed -top-1 transition-all w-full"
            : "static top-15 duration-500"
        } md:translate-y-59 flex py-3.5 px-4 items-center justify-between md:hidden`}
      >
        <Image
          onClick={() => setClickMenu(true)}
          priority={true}
          className="w-6 h-6 sm:w-7 sm:h-7 cursor-pointer"
          src={"/Assets/Images/HeaderAndHeroImg/hamburger.svg"}
          width={26}
          height={19}
          alt="Hamburger Manu"
        />
        <form className="w-full" onSubmit={handleSubmit}>
          <input
            value={currentValue}
            id="input-searching"
            className="w-full ml-2 max-w-inputWidth py-2 sm:py-3 rounded-xl pl-9 sm:pl-9 outline-none"
            type="text"
            autoComplete="off"
            placeholder="Qidirish"
            aria-label="Enter your searching"
            minLength={3}
            onChange={handleChange}
          />
        </form>
        {/* <button className="bg-white  w-10 h-10 sm:w-11 sm:h-11  flex items-center justify-center cursor-pointer rounded-xl">
          <Image
            priority={true}
            className="w-5 h-5 sm:w-6 sm:h-6"
            src={"/Assets/Images/HeaderAndHeroImg/block-img.svg"}
            width={24}
            height={24}
            alt="Blog Img"
          />
        </button> */}
      </div>
      <div
        id="menuBar"
        onClick={handlMenuOpen}
        className={`${
          clickMenu
            ? "left-0 bg-black w-auto inset-0 bg-opacity-25 backdrop-blur-sm duration-300 fixed z-50 top-0 "
            : "hidden"
        }   `}
      >
        <div className="w-modalMenu h-modalMenuHe h-screen bg-white pt-10 px-4">
          <Link
            className="mb-5 inline-block"
            href={"/"}
            onClick={() => {
              dispatch(setCategoryId(""));
              setClickMenu(false);
            }}
          >
            <Image
              priority="true"
              className=" w-[150px] h-[40px]"
              src={"/Assets/Images/HeaderAndHeroImg/logo.jpg"}
              width={150}
              height={14}
              alt="Menu Bar Logo"
            />
          </Link>

          <div className="h-[100vh] overflow-y-auto pb-[180px]">
            {Object.entries(categoryGroups).map(
              ([mainCategory, index], indexAll) => {
                return (
                  <div key={indexAll} className=" ">
                    {" "}
                    <div
                      onClick={() =>
                        toggleCategory(mainCategory, index, indexAll)
                      }
                      className={`flex z-50 relative items-center justify-between ${
                        menuCatOpen ? "" : "border-b-1"
                      } p-2.5 cursor-pointer`}
                    >
                      <div
                        className={`flex items-center py-2 text-sm font-medium  ${
                          menuCatOpen && testCatalog == indexAll
                            ? "text-orange-400"
                            : "text-black-black_dark"
                        }`}
                      >
                        {mainCategory}
                      </div>
                      <Image
                        className={`w-3 h-2 ${
                          menuCatOpen && testCatalog == indexAll
                            ? "-rotate-180 duration-300"
                            : "rotate-0 duration-300"
                        }`}
                        src={"/Assets/Images/HeaderAndHeroImg/drop-img.svg"}
                        width={9}
                        height={5}
                        alt="Drop Down Img"
                      />
                    </div>
                    {testCatalog == indexAll ? (
                      <ul className=" overflow-y-auto">
                        {categoryGroups[expandedCategory]?.map(
                          (subCategory) => {
                            return (
                              <li
                                key={subCategory}
                                onClick={() => {
                                  handleSubCategoryClick(subCategory);
                                }}
                                className=" flex text-sm text-gray-500 py-1 hover:text-orange-400 pl-12 items-center"
                              >
                                <Link
                                  href={{
                                    pathname: "/categoryPage",
                                    query: { category: subCategory },
                                  }}
                                >
                                  {subCategory}
                                </Link>
                              </li>
                            );
                          }
                        )}
                      </ul>
                    ) : null}
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
