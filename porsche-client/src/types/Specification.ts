import type { SpecificationSection } from "./SpecificationSection";

export interface Specification {
    id:string;
    name:string;
    unit: string;
    displayOrder: number;
    specificationSection: SpecificationSection

}