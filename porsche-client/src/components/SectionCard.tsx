
import type { CategorySection } from '../types/CategorySection'

interface SectionCardProps {
    section: CategorySection;
    reverse: boolean
}
const SectionCard = ({section, reverse}: SectionCardProps) => {
    return (
        <div className={`flex flex-col md:flex-row w-full md:w-[90%] items-start justify-center px-10 mx-auto md:gap-8
                        ${reverse ? "md:flex-row-reverse" : "md:flex-row"}`}>
            <div>
                <img src={section?.imageUrl} alt={section?.title} className="w-full rounded-lg" />
            </div>
            <div className="mt-5 flex flex-col gap-4 w-full  ">
                <h1 className="text-2xl md:text-3xl lg:text-4xl">{section?.title}</h1>
                <p className="text-sm lg:text-[16px]">{section?.description}</p>
            </div>
        </div>
    )
}

export default SectionCard
