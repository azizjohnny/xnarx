import React from "react";
import axios from "axios";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import { DateTime } from "luxon";
import {
  Chart as ChartJS,
  LineElement,
  TimeScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

import "chartjs-adapter-date-fns";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  TimeScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import ImageSale from "../../public/Assets/Images/news/fakeSale.png";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// Import Swiper styles
import "swiper/css";
import { useSelector } from "react-redux";
import { Spinner } from "../Spinner/Spinner";

const env = process.env.NEXT_PUBLIC_TOKEN;
const img = process.env.NEXT_PUBLIC_IMG;

const InfoTovar = () => {
  const chartRef = useRef(null);
  const [product, setProduct] = useState([]);
  const [numberProduct, setNumberProduct] = useState(8);
  const [recentPrice, setRecentPrice] = useState([]);
  const [loader, setLoader] = useState(true);
  const [takeDateGragh, setTakeDateGragh] = useState([]);

  const [productImageUrl, setProductImageUrl] = useState("");
  const [priceHistoryByStore, setPriceHistoryByStore] = useState({});
  const router = useRouter();

  const productUrl = `${env}product/getAllPH?product_name=${router.query.product_name}`;

  const formatPrice2 = (price) => {
    const formattedPrice = parseFloat(price).toFixed(0);
    return formattedPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  useEffect(() => {
    axios
      .get(`${env}product/getAllPH?product_name=${router.query.product_name}`)
      .then((res) => {
        setLoader(false);
        setProduct(res?.data?.object[0]);
        setTakeDateGragh(res?.data?.object);
        setRecentPrice(res?.data?.object[0]?.priceHistory[0]?.price);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [router]);
  // console.log(productId);

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  // LABELS
  const allDates = Array.from(
    new Set(
      takeDateGragh.flatMap((item) =>
        item.priceHistory.map((history) => history.date.split("T")[0])
      )
    )
  );

  // Sorting dates
  allDates.sort();

  // Resulting labels
  const labels = allDates.map((date) => date.split("T")[0]);
  console.log(labels);
  const nextDatasets = takeDateGragh.map((item) => ({
    label: item.store_name,
    data: item.priceHistory.map((history) => history.price),
    backgroundColor: getRandomColor(), // You can customize this as needed
    tension: 0.4,
  }));
  const data = {
    labels: labels,
    datasets: nextDatasets,
  };
  const options = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="">
      {loader ? (
        <div className="h-40 md:w-full md:h-[600px] flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="md:mt-[114px] mt-5 mx-5 md:mx-[130px]">
          <p className="flex items-center sm:text-base text-xs text-black-black_thin">
            <Link
              href={`/`}
              className="text-orange-400"
              // onClick={() => dispatch(setCategoryId(0))}
            >
              Главная
            </Link>
            <Image
              className="mx-1"
              src={"/Assets/Images/news/down.svg"}
              width={24}
              height={24}
              alt="Arrow_down"
            />
            <Link
              href={{
                pathname: "/categoryPage",
                query: { category: product?.category_name },
              }}
              className="text-orange-400"
            >
              {product?.category_name}
            </Link>
            <Image
              className="mx-1"
              src={"/Assets/Images/news/down.svg"}
              width={24}
              height={24}
              alt="Arrow_down"
            />
            {product?.product_name}
          </p>
          <div className="grid md:grid-cols-2 gap-5 mt-5 md:mt-10">
            <div className=" md:col-span-1">
              <div className="border-2 rounded-xl ">
                <img
                  className=" object-contain py-1 w-full h-[200px] md:h-[370px]"
                  src={`${img}${product?.product_image}`}
                  alt="Success_image"
                  width={680}
                  height={370}
                />
              </div>
            </div>
            <div className="md:col-span-1">
              <h1 className="font-bold text-xl md:text-2xl">
                {product?.product_name}
              </h1>
              {/* <canvas ref={chartRef} className="w-full" /> */}

              <Line data={data} options={options}></Line>

              <div className=" flex justify-between items-center mt-2 sm:mt-5 sm:py-1 border px-2">
                <div className="flex  py-1 gap-2 items-center">
                  {/* <img
                  src={`https://backendstartup-production-5c5e.up.railway.app/stores/${product?.store_name}`}
                /> */}
                  <h3 className=" text-lg sm:text-xl font-medium">
                    {product?.store_name}
                  </h3>
                  <p className=" text-orange-400 text-lg">
                    {formatPrice2(recentPrice)} so'm
                  </p>
                </div>
                <a
                  href={product?.product_link}
                  className=" py-1 px-4 rounded text-white hover:scale-105 bg-orange-500 text-xs sm:text-base"
                >
                  Sotib olish
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoTovar;
