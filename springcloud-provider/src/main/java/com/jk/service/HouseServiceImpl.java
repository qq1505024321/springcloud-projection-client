package com.jk.service;

import com.alibaba.fastjson.JSONObject;
import com.jk.mapper.HouseMapper;
import com.jk.model.Houses;
import com.jk.model.Visitor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 〈一句话功能简述〉<br>
 * 〈〉
 *
 * @author ccl
 * @create 2019/12/13
 * @since 1.0.0
 */
@RestController
public class HouseServiceImpl implements HouseServiceApi{

    @Autowired
    private HouseMapper houseMapper;

    @Override
    @RequestMapping("queryHourse")
    public List<Houses> queryHourse() {
        List<Houses> houseList =  houseMapper.queryHourse();
       /* for (int i=0;i<houseList.size();i++){
            System.out.println(houseList.get(i)+"provider");
        }*/
        return houseList;
    }



    @Override
    @RequestMapping(value = "queryHouse2")
    public List<Houses> queryHouse2(){

        List<Houses> housesList = houseMapper.queryHouse2();
        for(int i=0;i<housesList.size();i++){
            System.out.println(housesList.get(i));
        }
        return housesList;
    }

    @Override
    @RequestMapping(value = "saveVisitor")
    public void saveVisitor(Visitor visitor) {
        houseMapper.saveVisitor(visitor);
    }

    @Override
    @RequestMapping(value = "queryVisitor")
    public Long queryVisitor() {
        return houseMapper.queryVisitor();
    }
}