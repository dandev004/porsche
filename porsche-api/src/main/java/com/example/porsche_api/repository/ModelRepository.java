package com.example.porsche_api.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.example.porsche_api.model.Model;

public interface ModelRepository extends JpaRepository<Model, UUID>, JpaSpecificationExecutor<Model> {
    List<Model> findByCategoryName(String name);
}
