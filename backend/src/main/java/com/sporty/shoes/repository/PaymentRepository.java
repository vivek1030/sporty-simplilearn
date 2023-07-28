package com.sporty.shoes.repository;

import com.sporty.shoes.entity.Payments;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payments, String> {
    
}
