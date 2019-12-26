package com.jk.service;

import com.jk.model.BedType_xc;
import com.jk.model.HouseInfo_xc;
import org.springframework.cloud.openfeign.FeignClient;

import java.util.List;


@FeignClient(value = "service-provider")
public interface Service_xc extends ServiceApi_xc{

}
