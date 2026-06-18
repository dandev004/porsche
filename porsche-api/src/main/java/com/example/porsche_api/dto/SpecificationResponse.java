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
public class SpecificationResponse {
    private UUID id;
    private String name;
    private String unit;
    private Integer displayOrder;
    private SpecificationSectionResponse specificationSection;
    
}
