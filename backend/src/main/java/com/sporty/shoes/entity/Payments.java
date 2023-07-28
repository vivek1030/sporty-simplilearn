package com.sporty.shoes.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "payments")
public class Payments {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String customerid;
    private String cardno;
    private String cvv;
    private String expirydate;


    public Payments() {

    }

    public String getCustomerid() {
        return customerid;
    }

    public void setCustomerid(String customerid) {
        this.customerid = customerid;
    }

    public Payments(Long id, String customerid, String cardno, String cvv, String expirydate) {
        super();
        this.id = id;
        this.customerid = customerid;
        this.cardno = cardno;
        this.cvv = cvv;
        this.expirydate = expirydate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCardno() {
        return cardno;
    }

    public void setCardno(String cardno) {
        this.cardno = cardno;
    }

    public String getCvv() {
        return cvv;
    }

    public void setCvv(String cvv) {
        this.cvv = cvv;
    }

    public String getExpirydate() {
        return expirydate;
    }

    public void setExpirydate(String expirydate) {
        this.expirydate = expirydate;
    }


}
