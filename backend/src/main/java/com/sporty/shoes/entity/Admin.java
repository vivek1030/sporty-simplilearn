package com.sporty.shoes.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.lang.reflect.Field;

@Entity
@Table(name = "admin")
public class Admin {

    @Id
    private String id;
    private String email;
    private String username;
    private String password;
    private String name;

    public Admin() {

    }

    public Admin(String id, String email, String username, String password, String name) {
        super();
        this.id = id;
        this.email = email;
        this.username = username;
        this.password = password;
        this.name = name;
    }


    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("{");
        // Get the class of the object
        Class<?> clazz = this.getClass();
        // Get all declared fields of the class (including private fields)
        Field[] fields = clazz.getDeclaredFields();
        try {
            for (Field field : fields) {
                // Set the field accessible (even if it's private)
                field.setAccessible(true);
                // Get the name of the field
                String fieldName = field.getName();
                // Get the value of the field for the current instance
                Object fieldValue = field.get(this);
                // Append the field name and its value to the StringBuilder
                sb.append("\"").append(fieldName).append("\":").append("\"").append(fieldValue).append("\",");
            }
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        }
        // Remove the trailing comma (if any) and close the JSON object
        if (sb.length() > 1) {
            sb.setLength(sb.length() - 1);
        }
        sb.append("}");
        return sb.toString();
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
