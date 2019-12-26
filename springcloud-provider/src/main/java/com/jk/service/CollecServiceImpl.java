package com.jk.service;

import com.jk.mapper.CollecMapper;
import com.jk.model.HouseImg_xc;
import com.jk.model.Menus;
import com.jk.model.UserCollec;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @ClassName CollecServiceImpl
 * @Description: TODO
 * @Author 梁浩
 * @Date 2019/12/17
 * @Version V1.0
 **/
@RestController
public class CollecServiceImpl implements CollecServiceApi{

    @Autowired
    private CollecMapper collecMapper;


    /**
     * 收藏
     * @param num
     * @param userid
     * @param houseid
     */
    @Override
    @RequestMapping("collecUserHouse")
    public String collecUserHouse(@RequestParam("num") Integer num,@RequestParam("userid")  Integer userid,@RequestParam("houseid") Integer houseid) {
        System.out.println(num+"====="+userid+"====="+houseid);
            HouseImg_xc houseimg = collecMapper.getHouseimgByHouseid(houseid);
            collecMapper.collecUserHouse(userid,houseid,houseimg.getKetingimgurl());
            return "收藏成功";

        /*if(num==1){
        }else {
            collecMapper.cancelCollectHouse(userid,houseid);
            return "取消成功";
        }*/

    }


    /**
     * 取消收藏
     * @param userid
     */
    @Override
    @RequestMapping("cancelCollectHouse")
    public void cancelCollectHouse(Integer userid) {
        //collecMapper.cancelCollectHouse(userid);
    }


    /**
     * 查看收藏信息
     * @param userid
     */
    @Override
    @RequestMapping("fingHouseByUserId")
    public void fingHouseByUserId(Integer userid) {

    }


    /**
     * 查看用户收藏的房间照片
     * @param userid
     * @return
     */
    @Override
    @RequestMapping("findUserCollecHouseImg")
    public List<UserCollec> findUserCollecHouseImg(Integer userid) {
        List<UserCollec> collecList = collecMapper.findUserCollecHouseImg(userid);

        return collecList;
    }


    /**
     * 主页树展示
     * @param pid
     * @return
     */
    @Override
    public List<Menus> queryCentreListMenu(int pid) {
        List<Menus> menusList = collecMapper.queryCentreKistMenuPid(pid);
        if (menusList != null && menusList.size() > 0) {
            for (int i=0;i<menusList.size();i++){
                List<Menus> menus = queryCentreListMenu(menusList.get(i).getId());
                menusList.get(i).setChildren(menus);
            }
        }

        return menusList;
    }
}
