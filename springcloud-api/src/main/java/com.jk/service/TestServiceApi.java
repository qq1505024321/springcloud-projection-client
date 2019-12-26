package com.jk.service;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Map;

public interface TestServiceApi {

    @RequestMapping("queryBook")
    Map<String, Object> queryBook(@RequestParam("page") Integer page, @RequestParam("limit") Integer limit);

}
