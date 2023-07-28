package com.sporty.shoes.util;

import java.util.HashMap;
import java.util.Map;

public class JsonResponseUtil {
    public static Map<String, Object> createJsonResponse(String message, int statusCode, Object data) {
        Map<String, Object> response = new HashMap<>();
        response.put("msg", message);
        response.put("status_code", statusCode);
        response.put("data", data);
        return response;
    }
}
