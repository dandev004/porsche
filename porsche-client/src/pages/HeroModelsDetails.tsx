import { useEffect, useState } from 'react'
import { IoCarSportOutline, IoPeopleOutline } from 'react-icons/io5'
import { PiChargingStationLight } from 'react-icons/pi'
import { useParams } from 'react-router-dom'
import type { Category } from '../types/Category'
import axios from 'axios'
const BASE_URL = "http://localhost:8080/api/category"
const HeroModelsDetails = () => {
    const { name } = useParams();
    const [model, setModel] = useState<Category | null>(null)
    const [error, setError] = useState<string>("")

    const fetchModel = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/${name}`)
            setModel(res.data)
        }
        catch (err: any) {
            setError(err.message || "Something was wrong")
        }
    }
    useEffect(() => {
        if (!name) return
        fetchModel()
    }, [name])
    return (
        <section>
            {
                error ? (
                    <div className="w-[80%] h-100 m-12 px-12 bg-[#F1F1F4] rounded-md flex flex-col justify-center gap-2">
                        <h2 className="font-normal text-2xl lg:text-4xl">I'm sorry. Something went wrong.</h2>
                        <p>Unfortunately, we were unable to load any cars. Please try refreshing the page or check back later
                            if the error persists.
                        </p>
                    </div>
                ) : (
                    <div className="relative w-screen h-[calc(100vh-72px)] mt-18">
                        <img src={model?.imageHeroMobileUrl} className="block md:hidden w-full h-full object-cover" />
                        <img src={model?.imageHeroDesktopUrl} className="hidden md:block w-full h-full object-cover" />

                        <div className='absolute inset-0 px-10 py-12 md:left-20'>

                            <div className='flex flex-col h-full md:justify-end'>
                                <div className='md:w-[40%]'>
                                    <h1 className="text-4xl md:text-5xl lg:text-6xl text-white">{model?.name}</h1>
                                    <p className="text-white lg:text-lg">{model?.tagline}</p>
                                </div>
                                <div className='hidden xl:flex gap-4 items-center'>
                                    <div className='flex gap-2 '>
                                        <IoCarSportOutline size={30} color='white' />
                                        <p className='text-white'>{model?.driveType}</p>
                                    </div>
                                    <div className='flex gap-2 '>
                                        <PiChargingStationLight size={30} color='white' />
                                        <p className='text-white'>{model?.engineType ? model.engineType.charAt(0).toUpperCase() + model?.engineType.slice(1).toLowerCase() : ""}</p>
                                    </div>
                                    <div className='flex gap-2 '>
                                        <IoPeopleOutline size={30} color='white' />
                                        <p className='text-white'>Number seats: {model?.seats}</p>
                                    </div>
                                </div>
                                <div className='mt-auto md:mt-6 space-y-4'>
                                    <p className='text-white text-xl md:text-2xl lg:text-3xl'>From {model?.startingPrice} EUR including taxes</p>
                                    <button className='bg-white w-full md:w-auto py-3 px-6 lg:px-8 lg:py-4 rounded-md'>
                                        <p className='text-sm'>Configure the {model?.name}</p>
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                )
            }
        </section>
    )
}

export default HeroModelsDetails
