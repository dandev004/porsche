package com.example.porsche_api.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.porsche_api.dto.CategorySectionResponse;
import com.example.porsche_api.service.CategorySectionService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/category-section")
@RequiredArgsConstructor
public class CategorySectionController {

    private final CategorySectionService categorySectionService;

    @GetMapping("/{name}/intro")
    public ResponseEntity<CategorySectionResponse> getIntroSection(@PathVariable String name){
        return ResponseEntity.ok(categorySectionService.getIntroSection(name));
    }

    @GetMapping("/{name}/others")
    public ResponseEntity<List<CategorySectionResponse>> getOtherSections(@PathVariable String name){
        return ResponseEntity.ok(categorySectionService.getOtherSections(name));
    }
}
