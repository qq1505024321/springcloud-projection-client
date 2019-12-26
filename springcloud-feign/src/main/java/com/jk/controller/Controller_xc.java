package com.jk.controller;


import com.alibaba.fastjson.JSONObject;
import com.jk.model.*;
import com.jk.service.Service_xc;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.core.ElasticsearchTemplate;
import org.springframework.data.elasticsearch.core.query.IndexQuery;
import org.springframework.data.elasticsearch.core.query.IndexQueryBuilder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping("test")
public class Controller_xc {

    @Autowired
    private Service_xc service_xc;

    @RequestMapping("tomyuyue")
    public String tomyuyue(){

        return "myyuyue";
    }

    @RequestMapping("findYuYueById")
    @ResponseBody
    public JSONObject findYuYueById(Integer page, Integer limit, Integer userid){
        System.out.println(userid);
        JSONObject json = service_xc.findYuYueById(page,limit,userid);
        long code = 0;
        String msg = "";
        json.put("code",code);
        json.put("msg",msg);
        return json;
    }
    //我的房间
    @RequestMapping("tofangjian")
    public String tofangjian(){

        return "fangjian";
    }
    @RequestMapping("findFangjianById")
    @ResponseBody
    public JSONObject findFangjianById(Integer page, Integer limit,Integer userid){
        System.out.println(userid);
        JSONObject json = service_xc.findFangjianById(page,limit,userid);
        long code = 0;
        String msg = "";
        json.put("code",code);
        json.put("msg",msg);
        return json;
    }

    @RequestMapping("totest")
    public String totest(){

        return "test";
    }

    @RequestMapping("tofabu")
    public String tofabu(){

        return "fabu";
    }


    @RequestMapping("tocollHose")
    public String tocollHose(){

        return "collecHouse";
    }

    @RequestMapping("toweizhi")
    public String toweizhi(){

        return "dtweizhi";
    }


    @RequestMapping("todtzhi")
    @ResponseBody
    public void todtzhi(String dtzhi, HttpServletRequest request){
        request.getSession().setAttribute("dt",dtzhi);
        request.getSession(false);
    }

    @RequestMapping("findHouseType")
    @ResponseBody
    public List<HouseType_xc> findHouseType(){
        return service_xc.findHouseType();
    }

    @RequestMapping("findBedType")
    @ResponseBody
    public List<BedType_xc> findBedType(){

        return service_xc.findBedType();
    }

    @RequestMapping("tohouseshenhe")
    public String tohouseshenhe(){

        return "houseshenhe";
    }

    @RequestMapping("tofukuan")
    public String tofukuan(){

        return "fukuan";
    }

    @RequestMapping("addHouseInfoByNext")
    @ResponseBody
    public void addHouseInfoByNext(HouseInfo_xc houseInfo_xc, HttpSession session){
        Users user = (Users)session.getAttribute("loginUser");
        houseInfo_xc.setUserid(user.getUserid());
        Integer houid = service_xc.addHouseInfoByNext(houseInfo_xc);
        System.out.println(houid+"service返回id");
        session.setAttribute("houid",houid);
        Integer id = (Integer) session.getAttribute("houid");
        System.out.println(id+"sessionid");
    }

    @RequestMapping("tohousedescribe")
    public String tohousedescribe(){

        return "housedescribe";
    }


    @RequestMapping("addHouseDescribe")
    @ResponseBody
    public void addHouseDescribe(Housedescribe_xc housedescribe_xc, HttpSession session){
        Integer houid = (Integer) session.getAttribute("houid");
        Integer houseid = houid;
        System.out.println(houseid+"第二次新增中session");
        housedescribe_xc.setHouseid(houseid);
        service_xc.addHouseDescribe(housedescribe_xc);
    }

    @RequestMapping("tohousemating")
    public String tohousemating(){

        return "housemating";
    }

    @RequestMapping("addHousemating")
    @ResponseBody
    public void addHousemating(HouseMating_xc houseMating_xc,HttpSession session){
        Integer houid = (Integer) session.getAttribute("houid");

        System.out.println(houid+"第三次次新增中session");
        houseMating_xc.setHouseid(houid);
        service_xc.addHousemating(houseMating_xc);
    }

    @RequestMapping("tohouseprice")
    public String tohousingpictures(){

        return "houseprice";
    }

    @RequestMapping("tohousingpictures")
    public String housingpictures(){

        return "housingpictures";
    }


    /*@Autowired
    private HouseRepository houseRepository;*/
    @Autowired(required=true)
    private ElasticsearchTemplate elasticsearchTemplate;

    @RequestMapping("addHouseImg")
    @ResponseBody
    public void addHouseImg(HouseImg_xc houseImg_xc,HttpSession session){
        Integer houid = (Integer) session.getAttribute("houid");
        houseImg_xc.setHouseid(houid);
        service_xc.addHouseImg(houseImg_xc);
        /*HouseInfoEs h = service_xc.getHouseInfoByHouseid(houseImg_xc.getHouseid());
        HouseInfo_xc_es e = new HouseInfo_xc_es();
        e.setAddress(h.getAddress());
        e.setBedlength(h.getBedwidth());
        e.setBednum(h.getBednum());
        e.setBedtypeid(h.getBedtypeid());
        e.setBedtypename(h.getBedtypename());
        e.setBedwidth(h.getBedwidth());
        e.setChufangimgurl(h.getChufangimgurl());
        e.setCommensalismtype(h.getCommensalismtype());
        e.setDayprice(h.getDayprice());
        e.setHallnum(h.getHallnum());
        e.setHoseid(h.getHoseid());
        e.setHouseadderss(h.getHouseadderss());
        e.setHousearea(h.getHousearea());
        e.setHousenam(h.getHousenam());
        e.setHouseshow(h.getHouseshow());
        e.setHousetypeid(h.getHousetypeid());
        e.setHousetypes(h.getHousetypes());
        e.setImg(h.getImg());
        e.setKetingimgurl(h.getKetingimgurl());
        e.setKitchennum(h.getKitchennum());
        e.setLeasetype(h.getLeasetype());
        e.setLeasetypes(h.getLeasetypes());
        e.setQitaimgurl(h.getQitaimgurl());
        e.setRoomnum(h.getRoomnum());
        e.setSimilarproperties(h.getSimilarproperties());
        e.setSuitablenum(h.getSuitablenum());
        e.setToiletnum(h.getToiletnum());
        e.setToilettypeid(h.getToilettypeid());
        e.setUsername(h.getUsername());
        e.setVerandanum(h.getVerandanum());
        e.setWsjimgurl(h.getWsjimgurl());

        IndexQuery indexQuery = new IndexQueryBuilder().withId(Integer.toString(e.getHoseid())).withObject(e).build();
        elasticsearchTemplate.index(indexQuery);*/

    }

    @RequestMapping("addHouseprice")
    @ResponseBody
    public void addHouseprice(HousePrice_xc housePrice_xc ,HttpSession session){
        Integer houid = (Integer) session.getAttribute("houid");
        housePrice_xc.setHouseid(houid);
        service_xc.addHouseprice(housePrice_xc);
    }

    @RequestMapping("findStartAndEndTime")
    @ResponseBody
    public String findStartAndEndTime(Integer houseid,String starttime,String endtime){
        List<BookingOrder_xc> list = service_xc.findStartAndEndTime(houseid,starttime,endtime);
        if(list == null || list.size()==0){
            return "有房哦，老板来订我哦！";
        }
        return "您下手有点慢了哦，下次洗白白等你哦！";
    }



    @RequestMapping("toyuyue")
    public String toyuyue(Model model, Integer houseid){
        System.out.println(houseid);
        HousePrice_xc housePrice_xc = service_xc.findhouseprice(houseid);
        model.addAttribute("housePrice",housePrice_xc);
        model.addAttribute("houseid",houseid);
        return "yuyue";
    }


    @RequestMapping("addBookingOrder")
    @ResponseBody
    public void addBookingOrder(BookingOrder_xc bookingOrder_xc,String realname,String realicard,String realphone,Integer house,Integer userid){
        int random = (int)(Math.random()*900)+100;
        SimpleDateFormat sdf = new SimpleDateFormat("yyMMdd");
        String format = sdf.format(new Date());
        bookingOrder_xc.setOrdernum(format+random);

        bookingOrder_xc.setHouseid(house);
        bookingOrder_xc.setUserid(userid);
        Integer bookingorderid = service_xc.addBookingOrder(bookingOrder_xc);
        System.out.println(bookingorderid+"+++++++++++++");

        String[] realnames = realname.split(",");
        String[] realicards = realicard.split(",");
        String[] realphones = realphone.split(",");

        List<RealOrder_xc> relist = new ArrayList<>();
        for (int i =0;i<realnames.length;i++){
            RealOrder_xc realOrder_xc = new RealOrder_xc();

            realOrder_xc.setOrderid(bookingorderid);
            realOrder_xc.setRealname(realnames[i]);
            realOrder_xc.setRealicard(realicards[i]);
            realOrder_xc.setRealphone(realphones[i]);
            relist.add(realOrder_xc);

            service_xc.addRealorder(realOrder_xc);

        }


    }
}
