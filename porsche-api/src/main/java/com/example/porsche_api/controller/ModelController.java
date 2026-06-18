package com.example.porsche_api.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.porsche_api.dto.ModelResponse;
import com.example.porsche_api.service.ModelService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/models")
@AllArgsConstructor
public class ModelController {
    private final ModelService modelService;

    @GetMapping("/{categoryName}")
    public List<ModelResponse> getModelsByCategory(@PathVariable String categoryName){
        return modelService.getModelsByCategory(categoryName);
    }
}
