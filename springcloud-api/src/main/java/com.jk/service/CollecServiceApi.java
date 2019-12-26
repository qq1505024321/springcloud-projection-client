package com.jk.service;


import com.jk.model.Menus;
import com.jk.model.UserCollec;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface CollecServiceApi {


    /**
     * 收藏
     * @param num
     * @param userid
     * @param houseid
     */
    @RequestMapping("collecUserHouse")
    String collecUserHouse(@RequestParam("num")Integer num, @RequestParam("userid") Integer userid, @RequestParam("houseid") Integer houseid);

    /**
     * 取消收藏
     * @param userid
     */
    @RequestMapping("cancelCollectHouse")
    void cancelCollectHouse(Integer userid);


    /**
     * 查看房源的具体信息
     * @param userid
     */
    @RequestMapping("fingHouseByUserId")
    void fingHouseByUserId(Integer userid);


    /**
     * 查看用户收藏的房间照片集合
     * @param userid
     * @return List<UserCollec>
     */
    @RequestMapping("findUserCollecHouseImg")
    List<UserCollec> findUserCollecHouseImg(@RequestParam("userid") Integer userid);


    @RequestMapping("queryCentreListMenu")
    List<Menus> queryCentreListMenu(@RequestParam("pid") int pid);
}
