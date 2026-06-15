package com.example.porsche_api.dto;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CategorySectionResponse {
    UUID id;
    String title;
    String description;
    String imageUrl;
    Integer sortOrde;
}
