import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { CategorySection } from "../types/CategorySection";
import axios from "axios";
import SectionCard from "./SectionCard";



const BASE_URL = "http://localhost:8080/api/category"

const SectionModelsDetails = () => {
    const { name } = useParams()
    const [sections, setSections] = useState<CategorySection[]>([]);
    const [error, setError] = useState<string>("");

    const fetchIntro = async () => {
        try {
            const res = await axios.get(`${BASE_URL}-section/${name}/others`)
            setSections(res.data);
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
                ) : (
                    <div className="space-y-5 md:space-y-10 lg:space-y-20">
                        {
                            sections.map((section, i) => (
                                <SectionCard
                                    key={section.id}
                                    section={section}
                                    reverse={i % 2 !== 0}
                                />
                            ))
                        }
                    </div>
                )
            }
        </section>
    )
}
export default SectionModelsDetails
