package com.sporty.shoes.controller;

import com.sporty.shoes.entity.Product;
import com.sporty.shoes.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class ProductController {
    @Autowired
    private ProductService productService;

    @RequestMapping("/getAllProducts")
    public Map<String, Object> getAllProducts() {
        return productService.getAllProducts();
    }

    @RequestMapping(method = RequestMethod.GET, value = "/getProductById/{id}")
    public Map<String, Object> getProductById(@RequestBody String id) {
        return productService.getProductById(id);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/getProductByCategoryId/{id}")
    public Map<String, Object> getProductByCategoryId(@PathVariable String id) {
        return productService.getProductByCategoryId(id);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/deleteProduct/{id}")
    public Map<String, Object> deleteProduct(@PathVariable Long id) {
        return productService.deleteProduct(id);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/updateProduct")
    public Map<String, Object> updateProducts(Product product) {
        return productService.updateProducts(product);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/addproduct")
    public Map<String, Object> addProduct(@RequestBody Product product) {
        return productService.addProduct(product);
    }

}
