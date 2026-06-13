package com.example.porsche_api.service;

import java.util.List;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.example.porsche_api.dto.CategoryResponse;
import com.example.porsche_api.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

    @Cacheable("categories")
    public List<CategoryResponse> getAllCategories() {
        return categoryRepository.findAll()
            .stream().map(c -> new CategoryResponse(c.getName(), c.getImageUrl()) )
            .toList();
    }
}
