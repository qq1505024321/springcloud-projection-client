package com.jk.mapper;

import com.jk.model.Houses;
import com.jk.model.Visitor;

import java.util.List;

public interface HouseMapper {

    List<Houses> queryHourse();

    List<Houses> queryHouse2();

    void saveVisitor(Visitor visitor);

    Long queryVisitor();
}
