package com.jk.service;

import com.alibaba.fastjson.JSONObject;
import com.jk.model.*;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface ServiceApi_xc {

    @RequestMapping("findHouseType")
    List<HouseType_xc> findHouseType();


    @RequestMapping("findBedType")
    List<BedType_xc> findBedType() ;

    @RequestMapping("addHouseInfoByNext")
    Integer addHouseInfoByNext(@RequestBody HouseInfo_xc houseInfo_xc);

    @RequestMapping("addHouseDescribe")
    void addHouseDescribe(@RequestBody Housedescribe_xc housedescribe_xc);

    @RequestMapping("addHousemating")
    void addHousemating(@RequestBody HouseMating_xc houseMating_xc);

    @RequestMapping("addHouseprice")
    void addHouseprice(@RequestBody HousePrice_xc housePrice_xc);

    @RequestMapping("findhouseprice")
    HousePrice_xc findhouseprice(@RequestParam("houseid") Integer houseid);

    @RequestMapping("addBookingOrder")
    Integer addBookingOrder(@RequestBody BookingOrder_xc bookingOrder_xc);

    @RequestMapping("addRealorder")
    void addRealorder(@RequestBody RealOrder_xc realOrder_xc);

    @RequestMapping("findStartAndEndTime")
    List<BookingOrder_xc> findStartAndEndTime(@RequestParam("houseid") Integer houseid,@RequestParam("starttime") String starttime,@RequestParam("endtime") String endtime);

    @RequestMapping("addHouseImg")
    void addHouseImg(@RequestBody HouseImg_xc houseImg_xc);

    @RequestMapping("findYuYueById")
    JSONObject findYuYueById(@RequestParam("page")Integer page,@RequestParam("limit") Integer limit,@RequestParam("userid") Integer userid);

    @RequestMapping("findFangjianById")
    JSONObject findFangjianById(@RequestParam("page")Integer page,@RequestParam("limit") Integer limit,@RequestParam("userid") Integer userid);

    @RequestMapping("getHouseInfoByHouseid")
    HouseInfoEs getHouseInfoByHouseid(@RequestParam("houseid")Integer houseid);

}
