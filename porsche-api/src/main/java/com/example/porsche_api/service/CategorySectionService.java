package com.example.porsche_api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.porsche_api.dto.CategorySectionResponse;
import com.example.porsche_api.model.CategorySection;
import com.example.porsche_api.repository.CategorySectionRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategorySectionService {

    private final CategorySectionRepository categorySectionRepository;
    
    public CategorySectionResponse getIntroSection(String name){
        CategorySection section = categorySectionRepository.findByCategoryNameAndSortOrder(name, 1)
        .orElseThrow(() -> new RuntimeException("Intro section not found"));
        return response(section);
    }

    public List<CategorySectionResponse> getOtherSections(String name){
        return categorySectionRepository
            .findByCategoryNameAndSortOrderGreaterThanOrderBySortOrderAsc(name, 1)
            .stream()
            .map(this::response)
            .toList();
    }
    private CategorySectionResponse response(CategorySection section){
        return new CategorySectionResponse(
            section.getId(),
            section.getTitle(),
            section.getDescription(),
            section.getImageUrl(),
            section.getSortOrder()
            );
    } 
}
