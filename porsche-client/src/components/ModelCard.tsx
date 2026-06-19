
import type { Model } from "../types/Model";
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import { useState } from "react";
import TehnicalSpecificationModal from "./TehnicalSpecificationModal";

interface ModelCardProps {
    model: Model;
}
const ModelCard = ({ model }: ModelCardProps) => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    return (
        <div className="relative bg-white rounded-lg px-4 w-[90%]">
            <div className="absolute top-2 left-2 px-2 bg-[#EEEFF2] rounded-md">
                <p className="text-sm">{model.engineType[0] + model.engineType.slice(1).toLowerCase()}</p>
            </div>
            <Swiper
                modules={[Pagination]}
                spaceBetween={8}
                slidesPerView={1}
                pagination={{ clickable: true, }}
            >
                {[...(model.images ?? [])]
                    .sort((a, b) => a.displayOrder - b.displayOrder)
                    .map(img => (
                        <SwiperSlide key={img.id}>
                            <img src={img.imageUrl} alt={model.name} className="w-full object-contain" />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            <p className="text-lg font-semibold">{model.name}</p>
            <p className="text-sm">From €{model.startingPrice}</p>
            <div>
                {model.specifications
                    .filter(s => s.specification.name === "Maximum power (hp)")
                    .map(s => (
                        <div className="flex flex-col mt-2">
                            <p className="font-semibold text-[16px]">{s.value} {s.specification.unit}</p>
                            <p className="text-sm">{s.specification.name}</p>
                        </div>
                    ))
                }
            </div>
            <div className="mt-2">
                {
                    model.specifications
                        .filter(s => s.specification.name === "Acceleration 0-100 km/h")
                        .map(s => (
                            <div>
                                <p className="font-semibold text-[16px]">{s.value} {s.specification.unit}</p>
                                <p className="text-sm">{s.specification.name}</p>
                            </div>
                        ))
                }
            </div>
            <div className="mt-2">
                {
                    model.specifications
                        .filter(s => s.specification.name === "Maximum speed")
                        .map(s => (
                            <div>
                                <p className="font-semibold text-[16px]">{s.value} {s.specification.unit}</p>
                                <p className="text-sm">{s.specification.name}</p>
                            </div>
                        ))
                }
            </div>

            <button className="mt-5 text-sm underline cursor-pointer" onClick={() => setOpenModal(true)}>Technical data and standart equipment</button>
            {
                openModal && (
                    <TehnicalSpecificationModal model={model} onClose={() => setOpenModal(false)}/>
                )
            }
            <button className="p-4 w-full bg-black text-white rounded-md my-6">Setting up</button>
            <div className="flex gap-2">
                <input type="checkbox" className="mb-5 w-6 h-6 border-2" />
                <h4>Compare</h4>
            </div>

            
        </div>
    )
}
export default ModelCard
