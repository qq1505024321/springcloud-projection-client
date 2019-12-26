package com.jk.service;

import com.alibaba.fastjson.JSONObject;
import com.jk.mapper.*;
import com.jk.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class Service_xcImpl implements ServiceApi_xc{

    @Autowired
    private HouseType_xcMapper houseType_xcMapper;

    @Autowired
    private BedType_xcMapper bedType_xcMapper;

    @Autowired
    private HouseInfo_xcMapper houseInfo_xcMapper;

    @Autowired
    private Housedescribe_xcMapper housedescribe_xcMapper;


    @Autowired
    private HouseImg_xcMapper houseImg_xcMapper;
    @Autowired
    private HouseMating_xcMapper houseMating_xcMapper;

    @Autowired
    private HousePrice_xcMapper housePrice_xcMapper;

    @Autowired
    private BookingOrder_xcMapper bookingOrder_xcMapper;

    @Autowired
    private RealOrder_xcMapper realOrder_xcMapper;

    @Override
    @RequestMapping("findHouseType")
    public List<HouseType_xc> findHouseType() {
        return houseType_xcMapper.findHouseType();
    }

    @Override
    @RequestMapping("findBedType")
    public List<BedType_xc> findBedType() {

        return bedType_xcMapper.findBedType();
    }

    @Override
    @RequestMapping("addHouseInfoByNext")
    public Integer addHouseInfoByNext(HouseInfo_xc houseInfo_xc) {
        houseInfo_xcMapper.addHouseInfoByNext(houseInfo_xc);
        Integer houseid = houseInfo_xc.getHoseid();
        return houseid;
    }

    @Override
    @RequestMapping("addHouseDescribe")
    public void addHouseDescribe(Housedescribe_xc housedescribe_xc) {
        housedescribe_xcMapper.addHouseDescribe(housedescribe_xc);
    }

    @Override
    @RequestMapping("addHousemating")
    public void addHousemating(HouseMating_xc houseMating_xc) {
        houseMating_xcMapper.addHousemating(houseMating_xc);
    }

    @Override
    @RequestMapping("addHouseprice")
    public void addHouseprice(HousePrice_xc housePrice_xc) {
        housePrice_xcMapper.addHouseprice(housePrice_xc);
    }

    @Override
    @RequestMapping("findhouseprice")
    public HousePrice_xc findhouseprice(Integer houseid) {
        return housePrice_xcMapper.findhouseprice(houseid);
    }

    @Override
    @RequestMapping("addBookingOrder")
    public Integer addBookingOrder(BookingOrder_xc bookingOrder_xc) {
        bookingOrder_xcMapper.addBookingOrder(bookingOrder_xc);
        Integer bookingorderid = bookingOrder_xc.getBookingorderid();
        return bookingorderid;
    }

    @Override
    @RequestMapping("addRealorder")
    public void addRealorder(RealOrder_xc realOrder_xc) {
        realOrder_xcMapper.addRealorder(realOrder_xc);
    }

    @Override
    public List<BookingOrder_xc> findStartAndEndTime(Integer houseid, String starttime, String endtime) {

        return bookingOrder_xcMapper.findStartAndEndTime(houseid,starttime,endtime);
    }

    @Override
    @RequestMapping("addHouseImg")
    public void addHouseImg(HouseImg_xc houseImg_xc) {
        houseImg_xcMapper.addHouseImg(houseImg_xc);
    }

    @Override
    public JSONObject findYuYueById(Integer page, Integer limit, Integer userid) {
        long total = bookingOrder_xcMapper.findBookingorderTotal(userid);
        Integer start = (page-1)*limit;
        List<HouseInfo_xc> usersList = bookingOrder_xcMapper.findYuYueById(start,limit,userid);
        JSONObject json = new JSONObject();
        json.put("count",total);
        json.put("data",usersList);
        return json;
    }

    @Override
    public JSONObject findFangjianById(Integer page, Integer limit, Integer userid) {
        long total = houseInfo_xcMapper.findHouseTotal(userid);
        Integer start = (page-1)*limit;
        List<HouseInfo_xc> usersList = houseInfo_xcMapper.findFangjianById(start,limit,userid);
        JSONObject json = new JSONObject();
        json.put("count",total);
        json.put("data",usersList);
        return json;
    }

    @Override
    public HouseInfoEs getHouseInfoByHouseid(Integer houseid) {
        return houseInfo_xcMapper.getHouseInfoByHouseid(houseid);
    }


}
