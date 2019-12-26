package com.jk.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.io.Serializable;

@Document(indexName = "houseindex", type = "house", shards = 3, replicas = 2)
public class HouseInfo_xc_es implements Serializable {

    private static final long serialVersionUID = 8369820560711037312L;

    @Id
    private Integer hoseid;
    @Field(type = FieldType.Text,analyzer = "ik_max_word",searchAnalyzer = "ik_max_word",copyTo = "copy")
    private String houseadderss;
    @Field(type = FieldType.Integer)
    private Integer housetypeid;
    @Field(type = FieldType.Integer)
    private Integer leasetype;
    @Field(type = FieldType.Integer)
    private Integer roomnum;
    @Field(type = FieldType.Integer)
    private Integer hallnum;
    @Field(type = FieldType.Integer)
    private Integer verandanum;
    @Field(type = FieldType.Integer)
    private Integer toiletnum;
    @Field(type = FieldType.Integer)
    private Integer kitchennum;
    @Field(type = FieldType.Text,analyzer = "ik_max_word",searchAnalyzer = "ik_max_word",copyTo = "copy")
    private String housearea;
    @Field(type = FieldType.Integer)
    private Integer toilettypeid;
    @Field(type = FieldType.Integer)
    private Integer bedtypeid;
    @Field(type = FieldType.Double)
    private Double bedlength;
    @Field(type = FieldType.Double)
    private Double bedwidth;
    @Field(type = FieldType.Integer)
    private Integer bednum;
    @Field(type = FieldType.Integer)
    private Integer suitablenum;
    @Field(type = FieldType.Integer)
    private Integer commensalismtype;
    @Field(type = FieldType.Integer)
    private Integer similarproperties;
    @Field(type = FieldType.Text,analyzer = "ik_max_word",searchAnalyzer = "ik_max_word",copyTo = "copy")
    private String housenam;
    @Field(type = FieldType.Text,analyzer = "ik_max_word",searchAnalyzer = "ik_max_word",copyTo = "copy")
    private String houseshow;
    //地区去掉
    @Field(type = FieldType.Text,analyzer = "ik_max_word",searchAnalyzer = "ik_max_word",copyTo = "copy")
    private String address;
    @Field(type = FieldType.Integer)
    private Integer dayprice;
    @Field(type = FieldType.Text,analyzer = "ik_max_word",searchAnalyzer = "ik_max_word",copyTo = "copy")
    private String username;
    @Field(type = FieldType.Text,analyzer = "ik_max_word",searchAnalyzer = "ik_max_word",copyTo = "copy")
    private String housetypes;
    @Field(type = FieldType.Text,analyzer = "ik_max_word",searchAnalyzer = "ik_max_word",copyTo = "copy")
    private String bedtypename;
    @Field(type = FieldType.Text,analyzer = "ik_max_word",searchAnalyzer = "ik_max_word",copyTo = "copy")
    private String leasetypes;
    @Field(type = FieldType.Text)
    private String ketingimgurl;
    @Field(type = FieldType.Text)
    private String wsjimgurl;
    @Field(type = FieldType.Text)
    private String chufangimgurl;
    @Field(type = FieldType.Text)
    private String qitaimgurl;
    @Field(type = FieldType.Text)
    private String img;

    @Transient
    private Integer endprice;

    public Integer getEndprice() {
        return endprice;
    }

    public void setEndprice(Integer endprice) {
        this.endprice = endprice;
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
        return "HouseInfo_xc_es{" +
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
                ", endprice=" + endprice +
                '}';
    }
}