package com.example.porsche_api.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.porsche_api.dto.ConfiguratorSectionResponse;
import com.example.porsche_api.service.ConfiguratorSectionService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/configurator")
@AllArgsConstructor
public class ConfiguratorSectionController {

    private final ConfiguratorSectionService configuratorSectionService;

    @GetMapping("/{name}")
    public ResponseEntity<List<ConfiguratorSectionResponse>> getConfiguratorByModel( @PathVariable String name){
        return ResponseEntity.ok(configuratorSectionService.getConfiguratorByModel(name));
    }
}
