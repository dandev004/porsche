package com.example.porsche_api.dto;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ModelSpecificationResponse {
    private UUID id;
    private String value;
    private SpecificationResponse specification;
}
