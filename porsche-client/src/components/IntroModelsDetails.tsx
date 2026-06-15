import { useEffect, useState } from "react"
import type { CategorySection } from "../types/CategorySection"
import axios from "axios"
import { useParams } from "react-router-dom"

const BASE_URL = "http://localhost:8080/api/category"
const IntroModelsDetails = () => {

    const { name } = useParams()
    const [intro, setIntro] = useState<CategorySection | null>(null);
    const [error, setError] = useState<string>("");

    const fetchIntro = async () => {
        try {
            const res = await axios.get(`${BASE_URL}-section/${name}/intro`)
            setIntro(res.data);
        } catch (error: any) {
            setError(error.message || "Something was wrong")
        }
    }
    useEffect(() => {
        fetchIntro()
    }, [name])
    return (
        <section className="mt-20 h-screen">
            {
                error ? (
                    <div className="w-[80%] h-100 m-12 px-12 bg-[#F1F1F4] rounded-md flex flex-col justify-center gap-2">
                        <h2 className="font-normal text-2xl lg:text-4xl">I'm sorry. Something went wrong.</h2>
                        <p>Unfortunately, we were unable to load any cars. Please try refreshing the page or check back later
                            if the error persists.
                        </p>
                    </div>
                ) :
                    (
                        <div className="flex flex-col md:flex-row w-full md:w-[90%] items-start justify-center px-10 mx-auto md:gap-8">
                            <div>
                                <img src={intro?.imageUrl} alt={intro?.title} className="w-full rounded-lg" />
                            </div>
                            <div className="mt-5 flex flex-col gap-4 w-full  ">
                                <h1 className="text-2xl md:text-3xl lg:text-4xl">{intro?.title}</h1>
                                <p className="text-sm lg:text-[16px]">{intro?.description}</p>
                            </div>
                        </div>
                    )
            }
        </section>
    )
}
export default IntroModelsDetails
