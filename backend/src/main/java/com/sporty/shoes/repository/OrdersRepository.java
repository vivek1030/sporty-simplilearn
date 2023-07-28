package com.sporty.shoes.repository;

import com.sporty.shoes.entity.Orders;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Map;

public interface OrdersRepository extends JpaRepository<Orders, String> {

    @Query(value = "select o.id, p.price, p.name as productname, cat.name as categoryname, c.name as customername," + " c.email, c.phone, c.address, o.date, o.orderstatus from orders as o" + " left join product as p on p.id = o.productid" + " left join categories as cat on cat.id = p.categoryid" + " left join customer as c on c.id = o.customerid  where o.customerid=?1", nativeQuery = true)
    public List<Map<String, Object>> findByUserId(String id);

    @Query(value = "select o.quantity, o.price, o.date, o.orderstatus," + "c.name as customername, p.name as productname, cat.name as categoryname" + " from orders as o " + "left join customer as c on c.id = o.customerid " + "left join product as p on p.id = o.productid " + "left join categories as cat on cat.id = o.categoryid", nativeQuery = true)
    public List<Map<String, Object>> getAllOrdersDetails();

    @Transactional
    @Modifying
    @Query(value = "update orders set orderstatus=?1 where id=?2", nativeQuery = true)
    public void UpdateOrderStatus(String orderstatus, Long id);
}
