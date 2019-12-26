package com.jk.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public class BookModel {
    private Integer id;

    private String author;

    @JsonFormat(pattern="yyyy-MM-dd",timezone="GMT+8",locale="zh")
    private Date date;

    private String name;

    private String price;

    private Integer type;

    private String info;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author == null ? null : author.trim();
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price == null ? null : price.trim();
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info == null ? null : info.trim();
    }

    @Override
    public String toString() {
        return "BookModel{" +
                "id=" + id +
                ", author='" + author + '\'' +
                ", date=" + date +
                ", name='" + name + '\'' +
                ", price='" + price + '\'' +
                ", type=" + type +
                ", info='" + info + '\'' +
                '}';
    }
}