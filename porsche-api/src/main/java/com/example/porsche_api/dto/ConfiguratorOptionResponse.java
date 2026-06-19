package com.example.porsche_api.dto;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ConfiguratorOptionResponse {
    private UUID id;
    private String name;
    private Double price;
    private String imageCategoryUrl;
    private String imageHeroUrl;
    private boolean isDefault;
    private Integer displayOrder;
}
