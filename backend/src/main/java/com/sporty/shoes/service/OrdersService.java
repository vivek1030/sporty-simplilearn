package com.sporty.shoes.service;

import com.sporty.shoes.entity.Orders;
import com.sporty.shoes.util.JsonResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.sporty.shoes.repository.OrdersRepository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class OrdersService {
    @Autowired
    public OrdersRepository ordersRepo;

    public Map<String, Object> addOrder(Orders orders) {
        ordersRepo.save(orders);
        return JsonResponseUtil.createJsonResponse("New Order Placed Successfully.", 200, "");
    }

    public Map<String, Object> getAllOrders() {
        List<Map<String, Object>> orders = ordersRepo.getAllOrdersDetails();
        return JsonResponseUtil.createJsonResponse("Data Fetched Successfully.", 200, orders);
    }

    public Map<String, Object> getOrderByUserId(String id) {
        List<Map<String, Object>> order = ordersRepo.findByUserId(id);
        return JsonResponseUtil.createJsonResponse("Data fetched successfully", 200, order);
    }

    public Map<String, Object> getOrderById(String id) {
        Optional<Orders> order = ordersRepo.findById(id);
        return JsonResponseUtil.createJsonResponse("Data fetched successfully", 200, order);
    }

    public Map<String, Object> updateOrder(Orders order) {
        Long orderid = order.getId();
        String orderstatus = order.getOrderstatus();
        ordersRepo.UpdateOrderStatus(orderstatus, orderid);
        return JsonResponseUtil.createJsonResponse("Order Updated Successfully", 200, "");
    }

}
