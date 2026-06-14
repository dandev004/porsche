import { useEffect, useRef, useState } from 'react'
import type { Category } from '../types/Category'
import axios from 'axios'
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import "swiper/css"
import { GoArrowLeft, GoArrowRight } from 'react-icons/go'

const ModelsPresentation = () => {
  const BASE_URL = "http://localhost:8080/api/category"

  const [categories, setCategories] = useState<Category[]>([])
  const [error, setError] = useState<string>("")
  const swiperRef = useRef<any>(null)

  const fetchCategories = async () => {
    try {
      const res = await axios.get(BASE_URL)
      setCategories(res.data)
    } catch (err: any) {
      setError(err.message || "Something was wrong")
    }
  }
  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <section className='h-full w-full md:pl-30 mt-30 '>
      <h1 className='px-6 text-2xl lg:text-3xl'>Models Porsche</h1>
      {
        error ? (
          <div className="w-[80%] h-[40%] m-12 px-12 bg-[#F1F1F4] rounded-md flex flex-col justify-center gap-2">
            <h2 className="font-normal text-2xl lg:text-4xl">I'm sorry. Something went wrong.</h2>
            <p>Unfortunately, we were unable to load any cars. Please try refreshing the page or check back later
              if the error persists.
            </p>
          </div>
        ) : (
          <>
            <Swiper
              modules={[Navigation]}
              spaceBetween={8}
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
              className='block xl:hidden!'
            >
              {
                categories.map((c) => (
                  <SwiperSlide key={c.id}>
                    <div className='relative md:h-112.5 mt-12 pl-6 flex flex-col gap-4'>
                      <img src={c.imageCardUrl} alt={c.name} className='rounded-4xl' />
                      <div className='pl-2 flex flex-col flex-1 gap-4'>
                        <h3 className='text-2xl'>{c.name}</h3>
                        <p>{c.description}</p>
                        <button className='mt-auto w-full flex justify-center py-4 px-8 bg-[#DBDBDE] rounded-md'>
                          Read more
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}

              <div className="hidden md:flex absolute right-20 top-0 gap-2 z-11">
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
            {/*for screens xl */}

            <div className='xl:h-112.5 hidden xl:grid grid-cols-3 gap-6 pr-20'>
              {
                categories.map((c) => (
                  <div key={c.id} className=' mt-5 pl-6 flex flex-col gap-4'>
                    <img src={c.imageCardUrl} alt={c.name} className='rounded-4xl' />
                    <div className='pl-2 flex flex-col flex-1 gap-4'>
                      <h3 className='text-2xl'>{c.name}</h3>
                      <p>{c.description}</p>
                      <button className='mt-auto w-[60%] py-4 px-8 bg-[#DBDBDE] rounded-md hover:bg-[#f4f4f8] cursor-pointer'>
                        Read more
                      </button>
                    </div>
                  </div>
                ))
              }
            </div>
          </>
        )
      }
    </section>
  )
}

export default ModelsPresentation
