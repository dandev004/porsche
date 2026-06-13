package com.example.porsche_api.dto;
import java.util.UUID;
import com.example.porsche_api.model.EngineType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CategoryResponse {
    private UUID id;
    private String name;

    private String description;
    private String imageConfiguratorUrl;
    private String imageCardUrl;
    private String imageHeroUrl;
    private String tagline;
    private String[] driveType;
    private EngineType engineType;
    private Integer seats;
    private Double startingPrice;
    private Boolean isConfigurable = true;
}
