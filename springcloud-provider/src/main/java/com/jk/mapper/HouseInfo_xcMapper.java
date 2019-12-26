package com.jk.mapper;

import com.jk.model.HouseInfoEs;
import com.jk.model.HouseInfo_xc;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface HouseInfo_xcMapper {

    void addHouseInfoByNext(HouseInfo_xc houseInfo_xc);

   HouseInfo_xc findHouseByid(@Param("name") String houseadderss);

    long findHouseTotal(@Param("userid")Integer userid);

    List<HouseInfo_xc> findFangjianById(@Param("start") Integer start, @Param("rows")  Integer limit, @Param("userid")Integer userid);

    HouseInfoEs getHouseInfoByHouseid(@Param("houseid") Integer houseid);

}