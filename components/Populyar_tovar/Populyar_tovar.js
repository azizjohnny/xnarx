import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Modal } from "../ComponetntModuls/Modal/Modal";
import Button from "../ComponetntModuls/button/Button";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { BtnLoader, Spinner } from "../Spinner/Spinner";
import { Heart } from "../../public/Assets/Images/ModalImg/heart.svg";
import Slider from "react-slick";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Card from "../Card/Card";

import ImageProduct from "../../public/Assets/Images/news/product.jpg";
import ImagePro from "../../public/Assets/Images/news/plisos.png";

const env = process.env.NEXT_PUBLIC_TOKEN;
const img = process.env.NEXT_PUBLIC_IMG;

const Populyar_nov = ({ mobile, cartItems, product, onAdd, onRemove }) => {
  // news

  // olds
  const [loader, setLoader] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [numberProduct, setNumberProduct] = useState(1);
  const [modalContent, setModalContent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tovar, setTovar] = useState([]);
  const [find, setFind] = useState({});

  const lang = useSelector((state) => state.data.lang);
  const languages = useSelector((state) => state.data.localization);

  //Basket

  // --- Get Product
  useEffect(() => {
    axios
      .get(
        `${env}product/category/Smartfonlar?minPrice=2000000&maxPrice=100000000&orderType=true&page=0&size=10`
      )
      .then((res) => {
        // console.log(res);
        setTovar(res?.data?.object);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // console.log(tovar);

  let token = "5463520222:AAFQgcQ7hyUTAYV3ad0YaGTQ_lGIbRZyyxg";
  let chatId = "636476536";

  const initialValues = {
    name: "",
    number: "",
    address: "",
  };

  const onSubmit = (values, { resetForm }) => {
    // let fullText = `\u{2705} Name: ${values.name}%0A\u{2705} Phone Number: \u{FF0B}998${values.number} %0A\u{2705} Address: ${values.address}`;
    // setLoading(true);
    // // --- Sent Message for Telegram
    // while (condition) {
    //   axios
    //     .post(
    //       `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${fullText}`
    //     )
    //     .then(function () {
    //       console.log("Submitted");
    //     })
    //     .catch(function () {
    //       toast.error("Internal error");
    //     });
    // }
    // // --- Create Order
    // axios
    //   .post(`${env}orders/create`, {
    //     order: {
    //       name: values.name,
    //       phone: String(`+998${values.number}`),
    //       address: values.address,
    //       location: {
    //         x: 49.9,
    //         y: 62.2,
    //       },
    //       order_number: "0",
    //       status_id: 3,
    //     },
    //     bascet: [
    //       {
    //         count: numberProduct,
    //         product_id: find.id,
    //       },
    //     ],
    //   })
    //   .then((res) => {
    //     if (res?.status === 201) {
    //       setModalContent(true);
    //     }
    //   })
    //   .catch((err) => console.log(err))
    //   .finally(() => {
    //     setNumberProduct(1);
    //     setLoading(false);
    //     setTimeout(() => {
    //       setShowModal(false);
    //       setModalContent(false);
    //     }, 2000);
    //   });
    // values.name = "";
    // resetForm({ values: "" });
  };

  const phoneRegExp = /^[0-9]{9}$/;
  const validationSchema = Yup.object({
    name: Yup.string()
      .required(
        lang === "ru"
          ? "Требуется имя пользователя, минимум 3 символа"
          : lang === "en"
          ? "Username is required, at least 3 characters"
          : "Foydalanuvchi nomi talab qilinadi, kamida 3 ta belgi"
      )
      .min(
        3,
        lang === "ru"
          ? "Минимум 3 символа"
          : lang === "en"
          ? "Minimal 3 characters"
          : "Minimal 3 ta belgi"
      )
      .max(
        20,
        lang === "ru"
          ? "Максимум 20 символов"
          : lang === "en"
          ? "Maximum 20 characters"
          : "Maksimal 20 ta belgi"
      ),
    number: Yup.string(
      lang === "ru"
        ? "Должен быть только номер"
        : lang === "en"
        ? "Must be only number"
        : "Faqat raqam bo'lishi kerak"
    )
      .matches(phoneRegExp, {
        message:
          lang === "ru"
            ? "Номер телефона недействителен"
            : lang === "en"
            ? "Phone number is not valid."
            : "Telefon raqami yaroqsiz.",
        excludeEmptyString: true,
      })
      .required(
        lang === "ru"
          ? "Необходимый номер телефона"
          : lang === "en"
          ? "Required phone number"
          : "Telefon raqami kiritish majburiy"
      ),
    address: Yup.string()
      .required(
        lang === "ru"
          ? "Укажите адрес"
          : lang === "en"
          ? "Address is required"
          : "Manzil kiritish majburiy"
      )
      .min(
        3,
        lang === "ru"
          ? "Минимум 3 символа"
          : lang === "en"
          ? "Minimal 3 characters"
          : "Minimal 3 ta belgi"
      ),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const ProductOrder = (id) => {
    setShowModal(true);
    const fintProduct = tovar.find((e) => e.id === id);
    setFind(fintProduct);
  };

  // newwwwwwww
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "gray",
          width: 24,
          height: 24,
          textAlign: "center",
          justifyContent: "center",
          alignContent: "center",
          paddingTop: 3,
          borderRadius: 12,
        }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "gray",
          width: 24,
          height: 24,
          textAlign: "center",
          justifyContent: "center",
          alignContent: "center",
          paddingTop: 3,
          borderRadius: 12,
        }}
        onClick={onClick}
      />
    );
  }
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1320,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3.5,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 710,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <section
      id="populyar"
      className="sm:mx-2 bg-white pl-[16px]  mt-5 md:pt-[30px]"
    >
      <h2 className="font-bold text-xl md:text-2xl leading-36 pl-3 md:pl-14">
        Smartfonlar
      </h2>
      <div className="">
        <Swiper
          slidesPerView={mobile ? 2 : 4}
          spaceBetween={mobile ? 170 : 30}
          slidesPerGroup={mobile ? 1 : 1}
          loop={false}
          loopFillGroupWithBlank={true}
          pagination={false}
          navigation={false}
          modules={[Pagination, Navigation]}
          className="mySwiper"
          style={{
            paddingBottom: "30px",
            paddingLeft: "15px",
            paddingRight: "20px",
          }}
          // spaceBetween={30}
          // slidesPerView={4} // show 4 slides at a time
          // slidesPerGroup={4} // move 4 slides at a time
          // navigation
          // pagination={{ clickable: true }}
        >
          {loader ? (
            <div className="w-full h-[80px] md:h-[200px] flex items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <Slider className="mx-2.5 lg:mx-8 pl-2" {...settings}>
              {tovar?.map((el, index) => {
                return (
                  <Card
                    key={el?.id}
                    id={el?.id}
                    image={el?.product_image}
                    attributes={el?.attributes}
                    subattributes={el?.subattributes}
                    status_ru={el?.status_ru}
                    status_en={el?.status_en}
                    status_uz={el?.status_uz}
                    name_ru={el?.name_ru}
                    name_en={el?.name_en}
                    name_uz={el?.name}
                    price={el?.price}
                    sale={el?.discount_price}
                    product={el}
                    onAdd={onAdd}
                    onRemove={onRemove}
                    items={cartItems.find((x) => x.id === el.id)}
                  />
                );
              })}
            </Slider>
          )}
        </Swiper>
      </div>

      {/* ----- Modal ----- */}
    </section>
  );
};

export default Populyar_nov;
