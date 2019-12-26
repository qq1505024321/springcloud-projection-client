package com.jk.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class Shaxiangpage {

    @RequestMapping("tolist")
    public String sha(){

        return "list";
    }
}
