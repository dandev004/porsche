package com.example.porsche_api.service;

import java.util.Comparator;
import java.util.List;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.example.porsche_api.dto.ConfiguratorCategoryResponse;
import com.example.porsche_api.dto.ConfiguratorOptionResponse;
import com.example.porsche_api.dto.ConfiguratorSectionResponse;
import com.example.porsche_api.dto.ModelImageResponse;
import com.example.porsche_api.dto.ModelResponse;
import com.example.porsche_api.model.ConfiguratorSection;
import com.example.porsche_api.model.ModelImage;
import com.example.porsche_api.repository.ConfiguratorSectionRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ConfiguratorSectionService {
    private final ConfiguratorSectionRepository configuratorSectionRepository;

    @Cacheable("configurator_sections")
    public List<ConfiguratorSectionResponse> getConfiguratorByModel(String name) {
        return configuratorSectionRepository.findByModelName(name)
                .stream()
                .sorted(Comparator.comparing(ConfiguratorSection::getDisplayOrder))
                .map(this::response)
                .toList();
    }

    private ConfiguratorSectionResponse response(ConfiguratorSection section) {

        List<ConfiguratorCategoryResponse> categories = section.getConfiguratorCategories()
                .stream()
                .sorted(Comparator.comparing(c -> c.getDisplayOrder()))
                .map(category -> new ConfiguratorCategoryResponse(
                        category.getId(),
                        category.getName(),
                        category.getDisplayOrder(),
                        category.getConfiguratorOptions()
                                .stream()
                                .sorted(Comparator.comparing(o -> o.getDisplayOrder()))
                                .map(option -> new ConfiguratorOptionResponse(
                                        option.getId(),
                                        option.getName(),
                                        option.getPrice(),
                                        option.getImageCategoryUrl(),
                                        option.getImageHeroUrl(),
                                        option.isDefault(),
                                        option.getDisplayOrder()))
                                .toList()))
                .toList();
        return new ConfiguratorSectionResponse(
                section.getId(),
                section.getName(),
                section.getDisplayOrder(),
                categories,
                new ModelResponse( 
                        section.getModel().getId(),
                        section.getModel().getName(),
                        section.getModel().getStartingPrice(),
                        section.getModel().getEngineType(),
                        section.getModel().getCategory(),
                        section.getModel().getModelType(),
                        section.getModel().getImages()
                            .stream()
                            .sorted(Comparator.comparing(ModelImage::getDisplayOrder))
                            .map(i -> new ModelImageResponse(i.getId(), i.getImageUrl(), i.getDisplayOrder(), i.getImageType()))
                            .toList(),
                        List.of()
                    ));
    }
}
