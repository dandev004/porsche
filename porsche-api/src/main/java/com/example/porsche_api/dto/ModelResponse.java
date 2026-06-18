package com.example.porsche_api.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.example.porsche_api.model.Category;
import com.example.porsche_api.model.EngineType;
import com.example.porsche_api.model.ModelType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ModelResponse {
    private UUID id;
    private String name;
    private Double startingPrice;
    private EngineType engineType;
    private Category category;
    private ModelType modelType;
    private List<ModelImageResponse> images = new ArrayList<>();
    private List<ModelSpecificationResponse> specifications = new ArrayList<>();
}
