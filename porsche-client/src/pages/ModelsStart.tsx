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
import { GoArrowRight } from "react-icons/go";

const BASE_URL = "http://localhost:8080/api/models"
const ModelsStart = () => {
  const { name } = useParams();
  const [models, setModels] = useState<Model[]>([]);
  const [error, setError] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<number | null>(null)
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [minPower, setMinPower] = useState<string>("")

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

  const uniquePowers = [
    ...new Set(
      models.flatMap(model =>
        model.specifications.filter(s => s.specification.name === "Maximum power (hp)")
          .map(s => s.value)
      )
    )
  ];

  const priceOptions = [
    { label: "70,000.00 €", value: 70000 },
    { label: "80,000.00 €", value: 80000 },
    { label: "90,000.00 €", value: 90000 },
    { label: "100,000.00 €", value: 100000 },
    { label: "110,000.00 €", value: 110000 },
    { label: "120,000.00 €", value: 120000 },
    { label: "130,000.00 €", value: 130000 },
    { label: "140,000.00 €", value: 140000 },
    { label: "150,000.00 €", value: 150000 },
    { label: "160,000.00 €", value: 160000 },
  ];

  const toggleType = (typeName: string) => {
    setSelectedTypes(prev => prev.includes(typeName)
      ? prev.filter(t => t !== typeName)
      : [...prev, typeName]);
  };

  const getModelPower = (model: Model): number => {
    const powerSpec = model.specifications.find(
      s => s.specification.name === "Maximum power (hp)"
    );
    return powerSpec ? Number(powerSpec.value) : 0;
  };

  const filteredModels = models.filter(model => {
    const filterSearch = model.name.toLowerCase().includes(search.toLowerCase());
    const filterPrice = maxPrice === null || model.startingPrice <= maxPrice;
    const filterType = selectedTypes.length === 0 || selectedTypes.includes(model.modelType.name);
    const filterPower = minPower === "" || getModelPower(model) >= Number(minPower);
    return filterSearch && filterPrice && filterType && filterPower;
  })

  const resetFilters = () => {
    setSearch("");
    setMaxPrice(null);
    setSelectedTypes([]);
    setMinPower("");
  };

  if (error) {
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
    <div className="bg-[#EEEFF2]">
      <div className="mt-20 px-8">
        {/* Header */}
        <div className="flex gap-2 items-center">
          <IoIosArrowRoundBack size={28} onClick={() => navigate("/")} />
          <p>Return to model range selection</p>
        </div>
        <h1 className="font-semibold text-2xl mt-3">Which <span>{name}</span> do you want to configure?</h1>

        {/* search mobile */}
        <div className="xl:hidden flex gap-3 items-center mt-5">
          <div className="relative flex-1">
            <LiaSearchSolid size={22} color="black" className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
            <input
              type="text"
              placeholder="For example Turbo S, 4S, GT"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="py-3 px-12 border-2 border-black/60 w-full outline-none"
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
              {/*search desktop* */}
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
                      className="py-3 px-12 border-2 border-black/60 w-full placeholder:text-sm outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 border border-gray-300" />

            {/*body type */}
            <div className="mt-5">
              <h3 className="font-semibold">Body Type</h3>
              {uniqueModelTypes.map(type => (
                <div key={type.id} className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(type.name)}
                    onChange={() => toggleType(type.name)}
                    className="w-5 h-5 border-2 border-black/80"
                  />
                  <img src={type.imageUrl} alt={type.name} width={80} height={80} />
                  <p>{type.name}</p>
                </div>
              ))}
            </div>
            {/*compare body types */}
            <div className="mt-5 h-25 px-4 bg-[#E6E7EA] flex gap-2 items-center justify-between rounded-md ">
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Compare body types</h3>
                <p>Learn about the diferences</p>
              </div>
              <GoArrowRight size={24} />
            </div>
            <div className="mt-5 border border-gray-300" />

            {/*transmision type */}
            <div className="mt-5">
              <h3 className="font-semibold">Transmision Type</h3>
              <div className=" flex flex-col gap-2 mt-2">
                <div className="flex gap-2">
                  <input type="checkbox" className="w-5 h-5" />
                  <p>Autmoatic</p>
                </div>
                <div className="flex gap-2">
                  <input type="checkbox" className="w-5 h-5" />
                  <p>Manual Transmision</p>
                </div>
              </div>
            </div>
            <div className="mt-5 border border-gray-300" />

            {/*performance form */}
            <div className="my-5">
              <h3 className="font-semibold">Performance from</h3>
              <select
                value={minPower}
                onChange={(e) => setMinPower(e.target.value)}
                name="performance"
                id="performance"
                className="w-full border-2 border-black/70 p-4 outline-none rounded-md"
              >
                <option value="">All</option>
                {
                  uniquePowers.map(power => (
                    <option key={power} value={power}> {power} hp</option>
                  ))
                }
              </select>
            </div>
            <div className="mt-5 border border-gray-300" />

            {/*price */}
            <div className="mt-5">
              <h3 className="font-semibold">Price up to</h3>
              <select
                value={maxPrice ?? ""}
                onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : null)}
                name="price"
                id="price"
                className="w-full border-2 border-black/70 p-4 outline-none rounded-md"
              >
                <option value="">All</option>
                {
                  priceOptions.map(p => (
                    <option key={p.value} value={p.value}>{p.label}</option>
                  ))
                }
              </select>
            </div>

            <button
              onClick={resetFilters}
              className=" mt-10 p-3 border-2 w-full rounded-md"
            >
              Reset all filters
            </button>
          </aside>

          {/*models */}
          <div className="flex-1">
            <h2 className="mt-5 text-2xl font-semibold">Cayman Models</h2>
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredModels.map(model => (
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
