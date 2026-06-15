package com.example.porsche_api.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.example.porsche_api.model.CategorySection;

public interface CategorySectionRepository extends JpaRepository<CategorySection, UUID>, JpaSpecificationExecutor<CategorySection>{

    Optional<CategorySection> findByCategoryNameAndSortOrder(String name, Integer sortOrder);
    List<CategorySection> findByCategoryNameAndSortOrderGreaterThanOrderBySortOrderAsc(String name, Integer sortOrder);
    
} 
