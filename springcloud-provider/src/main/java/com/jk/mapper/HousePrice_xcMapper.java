package com.jk.mapper;

import com.jk.model.HousePrice_xc;
import org.apache.ibatis.annotations.Param;

public interface HousePrice_xcMapper {

    void addHouseprice(HousePrice_xc housePrice_xc);

    HousePrice_xc findhouseprice(@Param("houseid") Integer houseid);
}