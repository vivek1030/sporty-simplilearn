//package com.sporty.shoes.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import springfox.documentation.builders.PathSelectors;
//import springfox.documentation.builders.RequestHandlerSelectors;
//import springfox.documentation.service.ApiInfo;
//import springfox.documentation.service.Contact;
//import springfox.documentation.spi.DocumentationType;
//import springfox.documentation.spring.web.plugins.Docket;
//import springfox.documentation.swagger2.annotations.EnableSwagger2;
//
//@Configuration
//@EnableSwagger2
//public class SwaggerConfig {
//    @Bean
//    public Docket api() {
//        return new Docket(DocumentationType.SWAGGER_2)
//                .select()
//                .apis(RequestHandlerSelectors.basePackage("com.sporty.shoes.controller"))
//                .paths(PathSelectors.regex("/.*"))
//                .build()
//                .apiInfo(apiInfo());
//    }
//
//    private ApiInfo apiInfo() {
//        return new ApiInfo(
//                "Sporty Shoes",
//                "Sporty Shoes Api doc",
//                "1.0",
//                "no term condition",
//                new Contact("Vivek Nishant", "viveknishant1030@gmail.com", "viveknishant1030@gmail.com"),
//                "Open source",
//                "viveknishant1030@gmail.com"
//        );
//    }
//}