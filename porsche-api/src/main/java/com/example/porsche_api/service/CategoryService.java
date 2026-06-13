package com.example.porsche_api.service;

import java.util.List;
import java.util.UUID;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.example.porsche_api.dto.CategoryResponse;
import com.example.porsche_api.model.Category;
import com.example.porsche_api.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

    @Cacheable("categories")
    public List<CategoryResponse> getAllCategories() {
        return categoryRepository.findAll()
            .stream()
            .map(this::response)
            .toList();
    }

    public CategoryResponse getCategoryById(UUID id) {
        Category category = categoryRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Category not found"));
        return response(category);
    }

    public List<CategoryResponse> getConfigurableCategories(){
        return categoryRepository.findByIsConfigurableTrue()
            .stream()
            .map(this::response)
            .toList();
    }

    private CategoryResponse response(Category c) {
        return new CategoryResponse(
            c.getId(),
            c.getName(),
            c.getDescription(),
            c.getImageConfiguratorUrl(),
            c.getImageCardUrl(),
            c.getImageHeroUrl(),
            c.getTagline(),
            c.getDriveType(),
            c.getEngineType(),
            c.getSeats(),
            c.getStartingPrice(),
            c.getIsConfigurable()
        );
    }
}
