package com.example.porsche_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class PorscheApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(PorscheApiApplication.class, args);
	}

}
