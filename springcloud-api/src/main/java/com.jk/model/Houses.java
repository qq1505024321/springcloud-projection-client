package com.jk.model;

import java.io.Serializable;
/**
 * 〈一句话功能简述〉<br>
 * 〈〉
 *
 * @author ccl
 * @create 2019/12/16
 * @since 1.0.0
 */
public class Houses implements Serializable {

    private static final long serialVersionUID = 4965639494632636161L;

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

    /*临时*/


    private String housenam;

    private String houseshow;

    private String address;

    private Integer dayprice;

    private String username;

    private String housetypes;

    private String bedtypename;

    private String leasetypes;

    private String ketingimgurl;

    private String wsjimgurl;

    private String chufangimgurl;

    private String qitaimgurl;

    private String img;

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
        this.houseadderss = houseadderss;
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
        this.housearea = housearea;
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

    public Integer getCommensalismtype() {
        return commensalismtype;
    }

    public void setCommensalismtype(Integer commensalismtype) {
        this.commensalismtype = commensalismtype;
    }

    public String getHousenam() {
        return housenam;
    }

    public void setHousenam(String housenam) {
        this.housenam = housenam;
    }

    public String getHouseshow() {
        return houseshow;
    }

    public void setHouseshow(String houseshow) {
        this.houseshow = houseshow;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getDayprice() {
        return dayprice;
    }

    public void setDayprice(Integer dayprice) {
        this.dayprice = dayprice;
    }

    public String getHousetypes() {
        return housetypes;
    }

    public void setHousetypes(String housetypes) {
        this.housetypes = housetypes;
    }

    public String getBedtypename() {
        return bedtypename;
    }

    public void setBedtypename(String bedtypename) {
        this.bedtypename = bedtypename;
    }

    public String getLeasetypes() {
        return leasetypes;
    }

    public void setLeasetypes(String leasetypes) {
        this.leasetypes = leasetypes;
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

    public Integer getToilettypeid() {
        return toilettypeid;
    }

    public void setToilettypeid(Integer toilettypeid) {
        this.toilettypeid = toilettypeid;
    }

    public Integer getSuitablenum() {
        return suitablenum;
    }

    public void setSuitablenum(Integer suitablenum) {
        this.suitablenum = suitablenum;
    }

    public Integer getSimilarproperties() {
        return similarproperties;
    }

    public void setSimilarproperties(Integer similarproperties) {
        this.similarproperties = similarproperties;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getKetingimgurl() {
        return ketingimgurl;
    }

    public void setKetingimgurl(String ketingimgurl) {
        this.ketingimgurl = ketingimgurl;
    }

    public String getChufangimgurl() {
        return chufangimgurl;
    }

    public void setChufangimgurl(String chufangimgurl) {
        this.chufangimgurl = chufangimgurl;
    }

    public String getQitaimgurl() {
        return qitaimgurl;
    }

    public void setQitaimgurl(String qitaimgurl) {
        this.qitaimgurl = qitaimgurl;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public String getWsjimgurl() {
        return wsjimgurl;
    }

    public void setWsjimgurl(String wsjimgurl) {
        this.wsjimgurl = wsjimgurl;
    }

    @Override
    public String toString() {
        return "Houses{" +
                "hoseid=" + hoseid +
                ", houseadderss='" + houseadderss + '\'' +
                ", housetypeid=" + housetypeid +
                ", leasetype=" + leasetype +
                ", roomnum=" + roomnum +
                ", hallnum=" + hallnum +
                ", verandanum=" + verandanum +
                ", toiletnum=" + toiletnum +
                ", kitchennum=" + kitchennum +
                ", housearea='" + housearea + '\'' +
                ", toilettypeid=" + toilettypeid +
                ", bedtypeid=" + bedtypeid +
                ", bedlength=" + bedlength +
                ", bedwidth=" + bedwidth +
                ", bednum=" + bednum +
                ", suitablenum=" + suitablenum +
                ", commensalismtype=" + commensalismtype +
                ", similarproperties=" + similarproperties +
                ", housenam='" + housenam + '\'' +
                ", houseshow='" + houseshow + '\'' +
                ", address='" + address + '\'' +
                ", dayprice=" + dayprice +
                ", username='" + username + '\'' +
                ", housetypes='" + housetypes + '\'' +
                ", bedtypename='" + bedtypename + '\'' +
                ", leasetypes='" + leasetypes + '\'' +
                ", ketingimgurl='" + ketingimgurl + '\'' +
                ", wsjimgurl='" + wsjimgurl + '\'' +
                ", chufangimgurl='" + chufangimgurl + '\'' +
                ", qitaimgurl='" + qitaimgurl + '\'' +
                ", img='" + img + '\'' +
                '}';
    }
}