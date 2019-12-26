package com.jk.service;


import com.jk.model.Houses;
import com.jk.model.Visitor;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

public interface HouseServiceApi {

    @RequestMapping("queryHourse")
    List<Houses> queryHourse();

    @RequestMapping(value = "queryHouse2")
    List<Houses> queryHouse2();

    @RequestMapping(value = "saveVisitor")
    void saveVisitor(@RequestBody Visitor visitor);

    @RequestMapping(value = "queryVisitor")
    Long queryVisitor();
}
