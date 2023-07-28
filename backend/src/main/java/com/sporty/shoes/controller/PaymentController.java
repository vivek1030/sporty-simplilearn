package com.sporty.shoes.controller;

import com.sporty.shoes.entity.Payments;
import com.sporty.shoes.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class PaymentController {
    @Autowired
    private PaymentService paymentService;

    @RequestMapping("/getPaymentDetails")
    public Map<String, Object> getAllPaymentDetails() {
        return paymentService.getAllPaymentDetails();
    }

    @RequestMapping(method = RequestMethod.GET, value = "/getPaymentDetails/{id}")
    public Map<String, Object> getPaymentDetails(@PathVariable String id) {
        return paymentService.getPaymentDetails(id);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/savepaymentdetails")
    public Map<String, Object> addPaymentDetails(@RequestBody Payments payments) {
        return paymentService.addPaymentDetails(payments);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/paymentdetails/{id}")
    public Map<String, Object> deletePaymentDetails(@PathVariable String id) {
        return paymentService.deletePaymentDetails(id);
    }
}
