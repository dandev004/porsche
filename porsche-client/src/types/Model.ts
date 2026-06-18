import type { ModelImage } from "./ModelImage";
import type { ModelSpecification } from "./ModelSpecification";
import type { ModelType } from "./ModelType";

export interface Model {
    id: string;
    name: string;
    startingPrice: number;
    engineType: string;
    modelType: ModelType;
    images: ModelImage[];
    specifications: ModelSpecification[];
}