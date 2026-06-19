
import { useState } from "react";
import type { Model } from "../types/Model";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { IoIosClose } from "react-icons/io";
import { Link } from "react-router-dom";

interface ModelProps {
  model: Model;
  onClose: () => void;
}

const TehnicalSpecificationModal = ({ model, onClose }: ModelProps) => {
  const [openSections, setOpenSections] = useState<string[]>([])


  const uniqueSpecifciationSections = [
    ...new Set(
      model.specifications
        .filter(s => s.specification.specificationSection.name)
        .map(s => s.specification.specificationSection.name)
    )
  ];

  const toogleSection = (sectionName: string) => {
    setOpenSections(prev => prev.includes(sectionName)
      ? prev.filter(s => s !== sectionName)
      : [...prev, sectionName])
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/70 backdrop-blur-sm" />

      <div className="w-[70vw] h-screen bg-white shadow-2xl overflow-y-auto px-14">
        <div className="sticky top-0 bg-white z-10 py-2">
          <div className="flex justify-between ">
            <h1 className="opacity-70">{model.name}</h1>
            <IoIosClose
              size={30}
              onClick={onClose}
              className="opacity-70 w-7 h-7 bg-[#EDEFF2] hover:bg-[#dcdfe3] cursor-pointer" />
          </div>
          <div className="flex gap-3 items-center">
            <button className="text-xl font-semibold">Tehnical Specifications</button>
            <button className="text-xl font-semibold">Standart Equipment</button>
          </div>
        </div>


        <div className="flex justify-between w-full items-start mt-6 bg-[#EDEFF2] rounded-md">
          <div className="w-1/2 px-8 space-y-4 my-5">
            {model.specifications
              .filter(s => s.specification.name === "Maximum power (hp)")
              .map(s => (
                <div className="flex flex-col mt-2">
                  <p className="font-bold text-[16px]">{s.value} {s.specification.unit}</p>
                  <p className="text-sm">{s.specification.name}</p>
                </div>
              ))
            }
            {
              model.specifications
                .filter(s => s.specification.name === "Acceleration 0-100 km/h")
                .map(s => (
                  <div>
                    <p className="font-bold text-[16px]">{s.value} {s.specification.unit}</p>
                    <p className="text-sm">{s.specification.name}</p>
                  </div>
                ))
            }

            {
              model.specifications
                .filter(s => s.specification.name === "Maximum speed")
                .map(s => (
                  <div>
                    <p className="font-bold text-[16px]">{s.value} {s.specification.unit}</p>
                    <p className="text-sm">{s.specification.name}</p>
                  </div>
                ))
            }
            {
              model.specifications
                .filter(s => s.specification.name === "Number of cylinders")
                .map(s => (
                  <div>
                    <p className="font-bold text-[16px]">{s.value} {s.specification.unit}</p>
                    <p className="text-sm">{s.specification.name}</p>
                  </div>
                ))
            }
            {
              model.specifications
                .filter(s => s.specification.name === "Engine displacement")
                .map(s => (
                  <div>
                    <p className="font-bold text-[16px]">{s.value} {s.specification.unit}</p>
                    <p className="text-sm">{s.specification.name}</p>
                  </div>
                ))
            }
            {
              model.specifications
                .filter(s => s.specification.name === "Weight (DIN)")
                .map(s => (
                  <div>
                    <p className="font-bold text-[16px]">{s.value} {s.specification.unit}</p>
                    <p className="text-sm">{s.specification.name}</p>
                  </div>
                ))
            }
            <div className="flex flex-col">
              <div className="flex gap-2">
                {
                  model.specifications
                    .filter(s => s.specification.name === "Length")
                    .map(s => (<p className="font-bold text-[16px]">{s.value} x</p>))
                }
                {
                  model.specifications
                    .filter(s => s.specification.name === "Width")
                    .map(s => (<p className="font-bold text-[16px]">{s.value} x</p>))
                }
                {
                  model.specifications
                    .filter(s => s.specification.name === "Height")
                    .map(s => (<p className="font-bold text-[16px]">{s.value} {s.specification.unit}</p>))
                }

              </div>
              <p>Length/Width (without folded mirrors)/Height</p>
            </div>

          </div>
          <div className="w-1/2 flex items-center justify-center">
            <img
              src="https://vrvqjmkllbxtcjxxhiju.supabase.co/storage/v1/object/public/porsche/specificator-image.webp"
              className="max-w-full h-[80%] object-contain -rotate-90 mt-20"
              alt=""
            />
          </div>
        </div>
        <div className="flex flex-col items-start mt-5 ">
          {
            uniqueSpecifciationSections.map(sectionName => {
              const isOpen = openSections.includes(sectionName);
              const sections = model.specifications.filter(
                s => s.specification.specificationSection.name === sectionName
              );
              return (
                <div key={sectionName} className="flex flex-col w-full gap-2">
                  <div
                    onClick={() => toogleSection(sectionName)}
                    className="flex justify-between items-center hover:bg-[#EDEFF2] transition-all duration-300 p-3 rounded-md cursor-pointer">
                    <p className="text-xl font-semibold">{sectionName}</p>
                    {isOpen ? <IoIosRemove size={28} /> : <IoIosAdd size={28} />}
                  </div>
                  {
                    isOpen && (
                      <div className="">
                        {
                          sections.map(s => (
                            <div key={s.id} className="flex justify-between py-1 px-3 space-y-4">
                              <p className="text-[16px]">{s.specification.name}</p>
                              <p className="text-[16px] font-bold">{s.value} {s.specification.unit}</p>
                            </div>
                          ))
                        }
                      </div>
                    )
                  }
                  <div className="border border-gray-100" />
                </div>
              );
            }
            )
          }
        </div>
        <div className="mt-5 bg-white w-full py-4 sticky bottom-0 z-10 border-t border-gray-100">
          <Link to={`/model-start/${model.name}`} className="py-4 px-8 bg-black rounded-md text-white">
            Open the Configurator
          </Link>
        </div>
      </div>

    </div>
  );
};

export default TehnicalSpecificationModal;
