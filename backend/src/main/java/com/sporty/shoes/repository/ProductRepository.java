package com.sporty.shoes.repository;

import com.sporty.shoes.entity.Product;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Map;

public interface ProductRepository extends JpaRepository<Product, String> {

    @Query(value = "select p.name, p.description, p.price, p.image, p.quantity, " + " c.name as categoryname from product as p " + "left join categories as c on c.id = p.categoryid where p.categoryid=?1", nativeQuery = true)
    public List<Map<String, Object>> findByCategoryId(String id);

    @Query(value = "select p.name, p.description, p.price, p.image, p.quantity, " + " c.name as categoryname from product as p " + "left join categories as c on c.id = p.categoryid", nativeQuery = true)
    public List<Map<String, Object>> findAllWithCatName();

    @Transactional
    @Modifying
    @Query(value = "delete from product where id=?1", nativeQuery = true)
    public void deleteById(Long id);
}
