package com.sporty.shoes.service;

import com.sporty.shoes.entity.Payments;
import com.sporty.shoes.repository.PaymentRepository;
import com.sporty.shoes.util.JsonResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class PaymentService {
    @Autowired
    public PaymentRepository paymentRepo;

    public Map<String, Object> getAllPaymentDetails() {
        List<Payments> paymentdetails = new ArrayList<>();
        paymentRepo.findAll().forEach(paymentdetails::add);
        return JsonResponseUtil.createJsonResponse("Data fetched successfully", 200, paymentdetails);
    }

    public Map<String, Object> getPaymentDetails(String id) {
        Optional<Payments> payments = paymentRepo.findById(id);
        return JsonResponseUtil.createJsonResponse("Data Fetched successfully", 200, payments);
    }

    public Map<String, Object> addPaymentDetails(Payments payment) {
        paymentRepo.save(payment);
        return JsonResponseUtil.createJsonResponse("Data Added successfully", 200, "");
    }

    public Map<String, Object> deletePaymentDetails(String id) {
        paymentRepo.deleteById(id);
        return JsonResponseUtil.createJsonResponse("Data Deleted successfully", 200, "");
    }
}
