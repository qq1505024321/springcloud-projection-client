package com.jk.mapper;

import com.jk.model.BookModel;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface TestMapper {
    //测试
    long queryTotal();
    List<BookModel> queryList(@Param("start") Integer start, @Param("rows") Integer limit);

}
