import type { ConfiguratorCategory } from "./ConfiguratorCategory";
import type { Model } from "./Model";

export interface ConfiguratorSection {
    id:string;
    name:string;
    displayOrder:number;
    categories: ConfiguratorCategory[];
    model: Model
}