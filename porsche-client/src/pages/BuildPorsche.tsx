import axios from "axios"
import { useEffect, useState, useRef } from "react"
import { type Category } from "../types/Category"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"

import { GoArrowLeft, GoArrowRight } from "react-icons/go"

import "swiper/css"

const BuildPorsche = () => {
  const BASE_URL = "http://localhost:8080/api/category"

  const [categories, setCategories] = useState<Category[]>([])
  const swiperRef = useRef<any>(null)
  const [error, setError] = useState<string>("")


  const fetchCategories = async () => {
    try {
      const res = await axios.get(BASE_URL + "/configurable")
      setCategories(res.data)
    } catch (err: any) {
      setError(err.message || "Something was wrong")
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <section className="h-full w-full bg-white mt-20 md:pl-30">
      <h1 className="px-6 text-2xl lg:text-3xl">
        Build your own Porsche
      </h1>
      {error ? (
        <div className="w-[80%] h-[40%] m-12 px-12 bg-[#F1F1F4] rounded-md flex flex-col  justify-center gap-2">
          <h2 className="font-normal text-2xl lg:text-4xl">I'm sorry. Something went wrong.</h2>
          <p>Unfortunately, we were unable to load any cars. Please try refreshing the page or check back later if the error persists.</p>
        </div>
      ) : (
        <Swiper
          modules={[Navigation]}
          spaceBetween={10}
          slidesPerView={1.12}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          breakpoints={{
            640: {
              slidesPerView: 1.5
            },
            768: {
              slidesPerView: 2.5
            },
            1024: {
              slidesPerView: 3.6
            }
          }}
        >
          {categories.map((c) => (
            <SwiperSlide key={c.id}>
              <div className="pl-6 flex flex-col items-center">
                <img src={c.imageConfiguratorUrl} className="w-full py-10 object-contain" />
                <button className="w-full md:w-auto py-4 px-8 bg-[#DBDBDE] rounded-md hover:bg-[#f4f4f8] cursor-pointer">
                  {c.name}
                </button>
              </div>
            </SwiperSlide>
          ))}
          <div className="hidden md:flex absolute right-20 top-2 gap-2 z-10">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="w-10 h-10 rounded-full hover:bg-gray-200 flex items-center justify-center transition duration-300 cursor-pointer"
            >
              <GoArrowLeft size={25} />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="w-10 h-10 rounded-full hover:bg-gray-200 flex items-center justify-center transition duration-300 cursor-pointer"
            >
              <GoArrowRight size={25} />
            </button>
          </div>
        </Swiper>

      )}

    </section>
  )
}

export default BuildPorsche