package com.jk.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.data.annotation.Transient;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;

public class HouseInfo_xc implements Serializable {

    private static final long serialVersionUID = 8369820560711037313L;

    private Integer hoseid;

    private String houseadderss;

    private Integer housetypeid;

    private Integer leasetype;

    private Integer roomnum;

    private Integer hallnum;

    private Integer verandanum;

    private Integer toiletnum;

    private Integer kitchennum;

    private String housearea;

    private Integer toilettypeid;

    private Integer bedtypeid;

    private Double bedlength;

    private Double bedwidth;

    private Integer bednum;

    private Integer suitablenum;

    private Integer commensalismtype;

    private Integer similarproperties;

    @JsonFormat(pattern = "yyyy-MM-dd")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date createdate;

    private Integer userid;

    private Integer status;

    @Transient
    private String leasetypes;
    @Transient
    private Integer dayprice;


    public Date getCreatedate() {
        return createdate;
    }

    public void setCreatedate(Date createdate) {
        this.createdate = createdate;
    }

    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getHoseid() {
        return hoseid;
    }

    public void setHoseid(Integer hoseid) {
        this.hoseid = hoseid;
    }

    public String getHouseadderss() {
        return houseadderss;
    }

    public void setHouseadderss(String houseadderss) {
        this.houseadderss = houseadderss == null ? null : houseadderss.trim();
    }

    public Integer getHousetypeid() {
        return housetypeid;
    }

    public void setHousetypeid(Integer housetypeid) {
        this.housetypeid = housetypeid;
    }

    public Integer getLeasetype() {
        return leasetype;
    }

    public void setLeasetype(Integer leasetype) {
        this.leasetype = leasetype;
    }

    public Integer getRoomnum() {
        return roomnum;
    }

    public void setRoomnum(Integer roomnum) {
        this.roomnum = roomnum;
    }

    public Integer getHallnum() {
        return hallnum;
    }

    public void setHallnum(Integer hallnum) {
        this.hallnum = hallnum;
    }

    public Integer getVerandanum() {
        return verandanum;
    }

    public void setVerandanum(Integer verandanum) {
        this.verandanum = verandanum;
    }

    public Integer getToiletnum() {
        return toiletnum;
    }

    public void setToiletnum(Integer toiletnum) {
        this.toiletnum = toiletnum;
    }

    public Integer getKitchennum() {
        return kitchennum;
    }

    public void setKitchennum(Integer kitchennum) {
        this.kitchennum = kitchennum;
    }

    public String getHousearea() {
        return housearea;
    }

    public void setHousearea(String housearea) {
        this.housearea = housearea == null ? null : housearea.trim();
    }

    public Integer getToilettypeid() {
        return toilettypeid;
    }

    public void setToilettypeid(Integer toilettypeid) {
        this.toilettypeid = toilettypeid;
    }

    public Integer getBedtypeid() {
        return bedtypeid;
    }

    public void setBedtypeid(Integer bedtypeid) {
        this.bedtypeid = bedtypeid;
    }

    public Double getBedlength() {
        return bedlength;
    }

    public void setBedlength(Double bedlength) {
        this.bedlength = bedlength;
    }

    public Double getBedwidth() {
        return bedwidth;
    }

    public void setBedwidth(Double bedwidth) {
        this.bedwidth = bedwidth;
    }

    public Integer getBednum() {
        return bednum;
    }

    public void setBednum(Integer bednum) {
        this.bednum = bednum;
    }

    public Integer getSuitablenum() {
        return suitablenum;
    }

    public void setSuitablenum(Integer suitablenum) {
        this.suitablenum = suitablenum;
    }

    public Integer getCommensalismtype() {
        return commensalismtype;
    }

    public void setCommensalismtype(Integer commensalismtype) {
        this.commensalismtype = commensalismtype;
    }

    public Integer getSimilarproperties() {
        return similarproperties;
    }

    public void setSimilarproperties(Integer similarproperties) {
        this.similarproperties = similarproperties;
    }

    public String getLeasetypes() {
        return leasetypes;
    }

    public void setLeasetypes(String leasetypes) {
        this.leasetypes = leasetypes;
    }

    public Integer getDayprice() {
        return dayprice;
    }

    public void setDayprice(Integer dayprice) {
        this.dayprice = dayprice;
    }

}