package com.sporty.shoes.service;

import com.sporty.shoes.entity.Category;
import com.sporty.shoes.repository.CategoryRepository;
import com.sporty.shoes.util.JsonResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class CategoryService {
    @Autowired
    public CategoryRepository categoryRepo;

    public Map<String, Object> addCategory(Category category) {
        categoryRepo.save(category);
        return JsonResponseUtil.createJsonResponse("New Category Successfully Added", 200, "");

    }

    public Map<String, Object> getAllCategory() {
        List<Category> category = new ArrayList<>();
        category = categoryRepo.findAll();
        return JsonResponseUtil.createJsonResponse("Data Fetched Successfully.", 200, category);
    }

    public Map<String, Object> getCategoryById(String id) {
        Optional<Category> category = categoryRepo.findById(id);
        return JsonResponseUtil.createJsonResponse("Data fetched successfully", 200, category);
    }

    public Map<String, Object> deleteCategory(String id) {
        categoryRepo.deleteByCatId(id);
        return JsonResponseUtil.createJsonResponse("Category Deleted successfully", 200, "");
    }

}
