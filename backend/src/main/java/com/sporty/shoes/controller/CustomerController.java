package com.sporty.shoes.controller;

import com.sporty.shoes.entity.Customer;
import com.sporty.shoes.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @RequestMapping(method = RequestMethod.GET, value = "/customer/{id}")
    public Optional<Customer> getCustomerDetails(@PathVariable String id) {
        return customerService.getCustomerDetails(id);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/customerLogin")
    public Map<String, Object> getCustomerDetails(@RequestBody Customer customer) {
        return customerService.getUserdetailsFromUnamePass(customer);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/allCustomers")
    public Map<String, Object> getCustomerDetails() {
        return customerService.getCustomerAllDetails();
    }

    @RequestMapping(method = RequestMethod.POST, value = "/customer")
    public Map<String, Object> addCustomer(@RequestBody Customer customer) {
        return customerService.addCustomer(customer);
    }

}
