package com.example.porsche_api.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.example.porsche_api.model.ConfiguratorOption;

public interface ConfiguratorOptionRepository extends JpaRepository<ConfiguratorOption, UUID>, JpaSpecificationExecutor<ConfiguratorOption> {
    
}
