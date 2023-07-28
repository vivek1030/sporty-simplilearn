package com.sporty.shoes.controller;

import com.sporty.shoes.entity.Orders;
import com.sporty.shoes.service.OrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class OrdersController {
    @Autowired
    private OrdersService ordersService;

    @RequestMapping("/getAllOrders")
    public Map<String, Object> getAllOrders() {
        return ordersService.getAllOrders();
    }

    @RequestMapping(method = RequestMethod.GET, value = "/getOrderByUserId/{id}")
    public Map<String, Object> getOrderByUserId(@PathVariable String id) {
        return ordersService.getOrderByUserId(id);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/getOrderById/{id}")
    public Map<String, Object> getOrderById(@RequestBody String id) {
        return ordersService.getOrderById(id);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/updateOrder")
    public Map<String, Object> updateOrder(@RequestBody Orders order) {
        return ordersService.updateOrder(order);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/placeOrder")
    public Map<String, Object> addOrder(@RequestBody Orders order) {
        return ordersService.addOrder(order);
    }

}
