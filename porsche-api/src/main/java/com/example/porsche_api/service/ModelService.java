package com.example.porsche_api.service;

import java.util.Comparator;
import java.util.List;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.example.porsche_api.dto.ModelImageResponse;
import com.example.porsche_api.dto.ModelResponse;
import com.example.porsche_api.dto.ModelSpecificationResponse;
import com.example.porsche_api.dto.SpecificationResponse;
import com.example.porsche_api.dto.SpecificationSectionResponse;
import com.example.porsche_api.model.Model;
import com.example.porsche_api.model.ModelImage;
import com.example.porsche_api.repository.ModelRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ModelService {

    private final ModelRepository modelRepository;

    @Cacheable("models")
    public List<ModelResponse> getAllModels(){
        return modelRepository.findAll()
            .stream()
            .map(this::response)
            .toList();
    }

    @Cacheable("models")
    public List<ModelResponse> getModelsByCategory(String name){
        return  modelRepository.findByCategoryName(name)
        .stream()
        .map(this::response)
        .toList();
    }

    private ModelResponse response(Model model){
        List<ModelSpecificationResponse> spec = model.getSpecifications()
            .stream()
            .map(m -> new ModelSpecificationResponse(
                m.getId(),
                m.getValue(),
                new SpecificationResponse(
                    m.getSpecification().getId(),
                    m.getSpecification().getName(),
                    m.getSpecification().getUnit(),
                    m.getSpecification().getDisplayOrder(),
                    new SpecificationSectionResponse(
                        m.getSpecification().getSpecificationSection().getId(),
                        m.getSpecification().getSpecificationSection().getName(),
                        m.getSpecification().getSpecificationSection().getDisplayOrder()
                    )
                )
            ))
            .toList();
        return new ModelResponse(
            model.getId(),
            model.getName(),
            model.getStartingPrice(),
            model.getEngineType(),
            model.getCategory(),
            model.getModelType(),
            model.getImages()
                .stream()
                .sorted(Comparator.comparing(ModelImage::getDisplayOrder))
                .map(i -> new ModelImageResponse(i.getId(), i.getImageUrl(), i.getDisplayOrder(), i.getImageType()))
                .toList(),
            spec
        );
    }
    
}
