package com.example.porsche_api.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ConfiguratorSectionResponse {
    private UUID id;
    private String name;
    private Integer displayOrder;
    private List<ConfiguratorCategoryResponse> categories = new ArrayList<>();
}
