import type { ConfiguratorOption } from "./ConfiguratorOption";

export interface ConfiguratorCategory {
    id: string;
    name: string;
    displayOrder: number;
    options: ConfiguratorOption[];
}