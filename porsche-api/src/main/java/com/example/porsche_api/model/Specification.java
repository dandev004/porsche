package com.example.porsche_api.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "specifications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Specification {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(nullable = false, updatable = false)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "specification_section_id", nullable = false)
    private SpecificationSection specificationSection;

    @NotBlank
    @Size(min = 3, max = 100)
    @Column(length = 100, nullable = false)
    private String name;

    @Size(min = 1, max = 20)
    @Column(length = 20)
    private String unit;

    @Column(name = "display_order")
    private Integer displayOrder;

    @OneToMany(mappedBy = "specification")
    @Builder.Default
    private List<ModelSpecification> modelSpecifications = new ArrayList<>();

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

}
