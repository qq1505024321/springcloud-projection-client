package com.jk.mapper;

import com.jk.model.BookingOrder_xc;
import com.jk.model.HouseInfo_xc;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface BookingOrder_xcMapper {

    void addBookingOrder(BookingOrder_xc bookingOrder_xc);

    List<BookingOrder_xc> findStartAndEndTime(@Param("houseid") Integer houseid, @Param("starttime")String starttime, @Param("endtime")String endtime);

    long findBookingorderTotal(@Param("userid")Integer userid);

    List<HouseInfo_xc> findYuYueById(@Param("start")Integer start, @Param("rows") Integer limit, @Param("userid") Integer userid);

}