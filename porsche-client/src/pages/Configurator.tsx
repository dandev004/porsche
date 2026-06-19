import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import type { ConfiguratorSection } from "../types/ConfiguratorSection"
import { Swiper, SwiperSlide } from "swiper/react"
import { Thumbs } from "swiper/modules"
import type { Swiper as SwiperType } from "swiper"
import "swiper/css"
import "swiper/css/pagination"
import { IoIosArrowRoundBack } from "react-icons/io"
import { CiBookmark } from "react-icons/ci";
import { MdOutlineIosShare } from "react-icons/md";
const BASE_URL = "http://localhost:8080/api/configurator"

const Configurator = () => {
  const [sections, setSections] = useState<ConfiguratorSection[]>([])
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string>("")
  const { name } = useParams();

  const navigate = useNavigate();


  const fetchOptions = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/${name}`);
      setSections(res.data);
    } catch (error: any) {
      setError(error || "Something was wrong")
    }
  }

  useEffect(() => {
    fetchOptions()
  }, [name])

  const model = sections[0]?.model;
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const images = model?.images.filter(i => i.type === "CONFIGURATOR") ?? [];
  const displayImage = selectedImageUrl ?? images[0]?.imageUrl

  if (error || !model) {
    return (
      <div className="w-[80%] h-100 m-12 px-12 bg-[#F1F1F4] rounded-md flex flex-col justify-center gap-2">
        <h2 className="font-normal text-2xl lg:text-4xl">
          I'm sorry. Something went wrong.
        </h2>
        <p>
          Unfortunately, we were unable to load any cars. Please try refreshing
          the page or check back later if the error persists.
        </p>
      </div>
    );
  }
  return (
    <div className="w-full flex-1 px-10">
      <div className="flex justify-between items-center mt-15">
        <div className="flex gap-6">
          <IoIosArrowRoundBack size={28} onClick={() => navigate(`/model-start/718`)} />
          <div className="flex gap-2 items-center">
            <CiBookmark size={18} />
            <p>Save</p>
          </div>
          <div className="flex gap-2 items-center">
            <MdOutlineIosShare size={18} />
            <p>Create a Porsche Code</p>
          </div>
        </div>
        <div className="flex gap-6">
          <div className="flex flex-col">
            {model && <p>{model.startingPrice}€</p>}
            <p className="text-sm text-gray-400">including VAT</p>
          </div>
          <button className="py-4 px-6 bg-[#DBDBDE] rounded-xl">Resume</button>
          <button className="py-4 px-6 bg-black text-white rounded-xl">Keep in touch</button>

        </div>
      </div>
      <div className="mt-3 border border-[#efeff4]" />

      <div className="flex gap-4 mt-5 w-full">
        <div className="w-[70%]">
          <img
            src={displayImage}
            alt={model?.name}
            className="w-full object-contain rounded-3xl"
          />
          <Swiper
            modules={[Thumbs]}
            spaceBetween={8}
            slidesPerView={8}
            watchSlidesProgress
            onSwiper={setThumbsSwiper}
            className="mt-2"
          >
            {images.map(i => (
              <SwiperSlide
                key={i.id}
                onClick={() => setSelectedImageUrl(i.imageUrl)}
                className="cursor-pointer rounded-md border-2 border-transparent [&.swiper-slide-thumb-active]:border-black"
              >
                <img src={i.imageUrl} alt={model?.name} className="w-full object-contain rounded-md" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="w-[30%] overflow-x-auto max-h-[80vh]">
          {sections.map(section => (

            <div key={section.id} className="flex flex-col mb-4">

              <p className="text-xl font-semibold mb-2 ml-5">{section.name}</p>
              {section.categories.map(category => (
                <div key={category.id} className="mb-3">
                  <p className="text-[16px] font-bold mb-1">{category.name}</p>
                  <div className="grid grid-cols-2 gap-3">

                    {category.options.map(option => (
                      <div
                        key={option.id}
                        onClick={() => option.imageHeroUrl && setSelectedImageUrl(option.imageHeroUrl)}
                        className="flex flex-col items-center gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                      >
                        {option.imageCategoryUrl && (
                          <img
                            src={option.imageCategoryUrl}
                            alt={option.name}
                            className="w-25 h-25 object-contain rounded-md shrink-0"
                          />
                        )}
                        <p className="text-sm ">{option.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div className="border border-gray-100 mt-2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Configurator
