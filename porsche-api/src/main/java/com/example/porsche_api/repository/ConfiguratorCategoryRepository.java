package com.example.porsche_api.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.example.porsche_api.model.ConfiguratorCategory;

public interface ConfiguratorCategoryRepository extends JpaRepository<ConfiguratorCategory, UUID>, JpaSpecificationExecutor<ConfiguratorCategory> {
    
}
