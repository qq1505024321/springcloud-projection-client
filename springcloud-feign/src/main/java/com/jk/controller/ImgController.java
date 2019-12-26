package com.jk.controller;

import com.alibaba.fastjson.JSONArray;
import com.jk.model.*;
import com.jk.service.CollecService;
import com.jk.service.UserService;
import com.jk.utils.OSSClientUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.data.redis.core.RedisTemplate;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @ClassName ImgController
 * @Description: TODO
 * @Author 梁浩
 * @Date 2019/12/17
 * @Version V1.0
 **/
@Controller
@RequestMapping("img")
public class ImgController {

    @Autowired
    private RedisTemplate redisTemplate;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private CollecService collecService;

    @Autowired
    private UserService userService;






    @RequestMapping("toAddImg")
    public String toAddImg(){
        return "addimg";
    }

    @RequestMapping("updaloadImg")
    @ResponseBody
    public String uploadImg(MultipartFile imgg)throws IOException {
        if (imgg == null || imgg.getSize() <= 0) {
            throw new IOException("file不能为空");
        }
        OSSClientUtil ossClient=new OSSClientUtil();
        String name = ossClient.uploadImg2Oss(imgg);
        String imgUrl = ossClient.getImgUrl(name);
        String[] split = imgUrl.split("\\?");
        //System.out.println(split[0]);
        MongoImg mongoImg = new MongoImg();
        mongoImg.setImgurl(imgUrl);
        mongoTemplate.save(mongoImg);
        return split[0];
    }


    /**
     * 去收藏页面
     * @return
     */
    @RequestMapping("toCollec")
    public String toCollec(){
        return "collecHouse";
    }


    /**
     * 跳转到收藏页面
     * @return
     */
    @RequestMapping("findImg")
    @ResponseBody
    public List<MongoImg> findImg(){
        Query query = new Query();
        List<MongoImg> imgList = mongoTemplate.find(query, MongoImg.class);

        return imgList;

    }


    /**
     * 收藏
     * @param userid
     * @param houseid
     * @return
     */
    @RequestMapping("collectHouse")
    @ResponseBody
    public String collectHouse(Integer userid, Integer houseid, Integer num){

        String data = collecService.collecUserHouse(userid,houseid,num);

        return data;

    }

    /**
     * 取消收藏
     * @param userid
     */
    @RequestMapping("cancelCollectHouse")
    @ResponseBody
    public void cancelCollectHouse(Integer userid){
        collecService.cancelCollectHouse(userid);

    }


    /**
     * 查看收藏房源的具体信息
     * @param userid
     */
    @RequestMapping("fingHouseByUserId")
    @ResponseBody
    public void fingHouseByUserId(Integer userid){
        collecService.fingHouseByUserId(userid);
    }


    /**
     * 查询收藏房间的照片
     * @param
     * @return
     */
    @RequestMapping("findUserCollecHouseImg")
    @ResponseBody
    public List<UserCollec> findUserCollecHouseImg(Integer userid){
        List<UserCollec> imgList = collecService.findUserCollecHouseImg(userid);

        System.out.println(userid);
        return imgList;
    }


    /**
     * 跳转到房屋具体信息
     * @param houseid
     * @return
     */
    @RequestMapping("toHouseInfo")
    public String toHouseInfo(Integer houseid){
        System.out.println("idiada");
        return "houseInfo";
    }


    /**
     * ---------------------------------------个人资料-------------------------------------------
     */

    //跳转房客中心个人资料
    @RequestMapping("toUserHouse")
    public String toUserHouse(HttpServletRequest httpServletRequest, Model model){
        Users u = (Users) httpServletRequest.getSession().getAttribute("loginUser");
        if (u!=null) {
            UserInfo user = userService.queryUserById(u);
            model.addAttribute("yh", user);
        }
        return "userCentreList";
    }
    //跳修改个人资料页面
    @RequestMapping("toUserInfo")
    public String toUserInfo(HttpServletRequest httpServletRequest, Model model){
        Users u = (Users) httpServletRequest.getSession().getAttribute("loginUser");
        if (u!=null) {
            UserInfo user = userService.queryUserById(u);
            model.addAttribute("yh", user);
        }
        return "userInfo";
    }
    //跳修改个人资料页面
    @RequestMapping("toUpdateUserInfo")
    public String toUpdateUserInfo(HttpServletRequest httpServletRequest, Model model){
        Users u = (Users) httpServletRequest.getSession().getAttribute("loginUser");
        if (u!=null) {
            UserInfo user = userService.queryUserById(u);
            model.addAttribute("yh", user);
        }
        return "updateUserInfo";
    }
    //修改个人资料
    @RequestMapping("updUserInfo")
    @ResponseBody
    public void updUserInfo(UserInfo userInfo){
        System.out.println("xxxxgggggggggg-----------------------"+userInfo);
        userService.userService(userInfo);
    }

    /**
     * OSS阿里云上传图片
     * @return
     */
    @RequestMapping("updaloadImg2")
    @ResponseBody
    public Map uploadImg2(MultipartFile imgfile)throws IOException {
        if (imgfile == null || imgfile.getSize() <= 0) {
            throw new IOException("file不能为空");
        }
        OSSClientUtil ossClient=new OSSClientUtil();
        String name = ossClient.uploadImg2Oss(imgfile);
        String imgUrl = ossClient.getImgUrl(name);
        //String[] split = imgUrl.split("\\?");
        System.out.println("图片url："+imgUrl);
        Map map = new HashMap();
        map.put("imgUrl",imgUrl);
        return map;
    }











    /**
     * ---------------------------------------个人资料End-------------------------------------------
     */

    @RequestMapping("queryCentreListMenu")
    @ResponseBody
    public List<Menus> queryCentreListMenu(){
        List<Menus> menusList = new ArrayList<>();
        String redisStr = (String) redisTemplate.opsForValue().get("lsitMenu");
        if (redisStr != null) {
            menusList = (List<Menus>) JSONArray.parse(redisStr);
        }else {
            menusList = collecService.queryCentreListMenu(-1);
            String menuString = JSONArray.toJSONString(menusList);
            redisTemplate.opsForValue().set("listMenu",menuString);

        }

        return menusList;
    }


}
