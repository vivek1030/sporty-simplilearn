package com.sporty.shoes.controller;

import com.sporty.shoes.entity.Category;
import com.sporty.shoes.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @RequestMapping("/getallcategory")
    public Map<String, Object> getAllCategory() {
        return categoryService.getAllCategory();
    }

    @RequestMapping(method = RequestMethod.POST, value = "/savecategory")
    public Map<String, Object> allCategory(@RequestBody Category category) {
        return categoryService.addCategory(category);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/deleteCategory/{id}")
    public Map<String, Object> deleteCategory(@PathVariable String id) {
        return categoryService.deleteCategory(id);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/getcategorybyid/{id}")
    public Map<String, Object> getCategoryById(@RequestBody String id) {
        return categoryService.getCategoryById(id);
    }

}
