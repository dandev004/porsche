package com.example.porsche_api.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.example.porsche_api.model.ConfiguratorSection;

public interface ConfiguratorSectionRepository extends JpaRepository<ConfiguratorSection, UUID>, JpaSpecificationExecutor<ConfiguratorSection>{
    List<ConfiguratorSection> findByModelName(String name);
}
