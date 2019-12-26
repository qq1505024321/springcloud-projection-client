package com.jk.mapper;

import com.jk.model.FrontMenu;
import com.jk.model.HouseImg_xc;
import com.jk.model.Menus;
import com.jk.model.UserCollec;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface CollecMapper {
    void collecUserHouse(@Param("userid") Integer userid, @Param("houseid") Integer houseid,@Param("ketingimgurl") String ketingimgurl);

    void cancelCollectHouse(@Param("userid") Integer userid, @Param("houseid") Integer houseid);

    List<UserCollec> findUserCollecHouseImg(@Param("userid") Integer userid);

    List<Menus> queryCentreKistMenuPid(@Param("pid") int pid);

    HouseImg_xc getHouseimgByHouseid(@Param("houseid") Integer houseid);
}
