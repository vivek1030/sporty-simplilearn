package com.sporty.shoes.repository;

import com.sporty.shoes.entity.Category;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface CategoryRepository extends JpaRepository<Category, String> {

    @Transactional
    @Modifying
    @Query(value = "delete from categories where id=?1", nativeQuery = true)
    public void deleteByCatId(String id);
}
