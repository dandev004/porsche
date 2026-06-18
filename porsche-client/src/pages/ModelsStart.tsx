import { useNavigate, useParams } from "react-router-dom"
import axios from "axios";
import { useEffect, useState } from "react";
import type { Model } from "../types/Model";
import { IoIosArrowRoundBack } from "react-icons/io";
import { LiaSearchSolid } from "react-icons/lia";
import { LuFilter } from "react-icons/lu";
import "swiper/css"
import "swiper/css/pagination"
import ModelCard from "../components/ModelCard";

const BASE_URL = "http://localhost:8080/api/models"
const ModelsStart = () => {
  const { name } = useParams();
  const [models, setModels] = useState<Model[]>([]);
  const [error, setError] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const navigate = useNavigate();

  const fetchModels = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/${name}`);
      setModels(res.data);
    } catch (error: any) {
      setError(error.message || "Something was wrong")
    }
  }
  useEffect(() => {
    fetchModels()
  }, [name])


  const uniqueModelTypes = [...new Map(
    models.map(m => [m.modelType.id, m.modelType])
  ).values()];

  return (
    <div className="bg-[#EEEFF2]">
      <div className="mt-20 px-8">
        {/* Header */}
        <div className="flex gap-2 items-center">
          <IoIosArrowRoundBack size={28} onClick={() => navigate("/")} />
          <p>Return to model range selection</p>
        </div>
        <h1 className="font-semibold text-2xl mt-3">Which <span>{name}</span> do you want to configure?</h1>

        {/* Search mobile */}
        <div className="xl:hidden flex gap-3 items-center mt-5">
          <div className="relative flex-1">
            <LiaSearchSolid size={22} color="black" className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
            <input
              type="text"
              placeholder="For example Turbo S, 4S, GT"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="py-3 px-12 border-2 border-black/60 w-full"
            />
          </div>
          <button className="border-2 p-3">
            <LuFilter size={24} />
          </button>
        </div>
         {/* layout*/}
        <div className="flex gap-6 mt-5">
          <aside className="hidden xl:block w-1/5 shrink-0">
            <div className="flex gap-3 items-center mt-6">
              <div className="flex flex-col">
                <label htmlFor="search" className="hidden xl:block text-lg">Search</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <LiaSearchSolid size={22} color="black" className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
                    <input
                      type="text"
                      placeholder="For example Turbo S, 4S, GT"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="py-3 px-12 border-2 border-black/60 w-full placeholder:text-sm"
                    />
                  </div>
                  <button className="border-2 p-3">
                    <LuFilter size={24} />
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-5 border border-gray-300" />
            <div className="mt-5">
              <h3 className="font-semibold">Body Type</h3>
              {uniqueModelTypes.map(type => (
                <div key={type.id} className="flex gap-2 items-center">
                  <input type="checkbox" className="w-5 h-5 border-2 border-black/80" />
                  <img src={type.imageUrl} alt={type.name} width={80} height={80} />
                  <p>{type.name}</p>
                </div>
              ))}
            </div>
          </aside>

          <div className="flex-1">
            <h2 className="mt-5 text-2xl font-semibold">Cayman Models</h2>
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {models.map(model => (
                <ModelCard key={model.id} model={model} />
              ))}
            </div>
          </div>

        </div>


      </div>
    </div>
  )
}

export default ModelsStart
