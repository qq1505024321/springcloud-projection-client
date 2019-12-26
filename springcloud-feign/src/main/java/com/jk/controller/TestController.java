package com.jk.controller;

import com.jk.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

@Controller
@RequestMapping("tests")
public class TestController {

    @Autowired
    private TestService testService;

    @RequestMapping("totest")
    public String totest(){
        return "test";
    }

    @RequestMapping("queryBook")
    @ResponseBody
    public Map<String, Object> queryBook (Integer page, Integer limit){
        Map<String, Object> map = testService.queryBook(page,limit);
        return map ;
    }

}
