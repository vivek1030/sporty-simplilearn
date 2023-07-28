package com.sporty.shoes.service;

import com.sporty.shoes.entity.Customer;
import com.sporty.shoes.repository.CustomerRepository;
import com.sporty.shoes.util.JsonResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class CustomerService {
    @Autowired
    public CustomerRepository customerRepo;


    public Optional<Customer> getCustomerDetails(String id) {
        return customerRepo.findById(id);
    }

    public Map<String, Object> getCustomerAllDetails() {
        List<Map<String, Object>> obj = customerRepo.getCustomerAllDetails();
        return JsonResponseUtil.createJsonResponse("Data fetched successfully", 200, obj);
    }

    public Map<String, Object> addCustomer(Customer customer) {
        customerRepo.save(customer);
        Long customerid = customer.getId();
        List<Map<String, Object>> obj = customerRepo.findCustomerById(customerid);
        return JsonResponseUtil.createJsonResponse("Data insert successfully", 200, obj);
    }

    public Map<String, Object> getUserdetailsFromUnamePass(Customer customer) {
        int status_code = 200;
        String username = customer.getUsername();
        String password = customer.getPassword();
        List<Map<String, Object>> obj = customerRepo.getUserDetailsFromUserPass(username, password);
        if (obj.size() < 1) {
            status_code = 400;
        } else {
            status_code = 200;
        }
        return JsonResponseUtil.createJsonResponse("Data Fetched successfully", status_code, obj);
    }
}
