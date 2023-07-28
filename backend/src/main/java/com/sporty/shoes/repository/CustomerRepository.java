package com.sporty.shoes.repository;

import com.sporty.shoes.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Map;

public interface CustomerRepository extends JpaRepository<Customer, String> {

    @Query(value = "select name, email, phone, address from customer", nativeQuery = true)
    public List<Map<String, Object>> getCustomerAllDetails();

    @Query(value = "select id, name, email, phone, address from customer where id=?1", nativeQuery = true)
    public List<Map<String, Object>> findCustomerById(Long id);

    @Query(value = "select id, name, email, phone, address from customer where username=?1 and password=?2", nativeQuery = true)
    public List<Map<String, Object>> getUserDetailsFromUserPass(String username, String password);
}
