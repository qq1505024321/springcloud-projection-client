package com.jk.model;

import java.io.Serializable;
import java.util.List;

public class FrontMenu implements Serializable {

    private static final long serialVersionUID = 4965655594632636161L;

    private Integer id;

    private String href;

    private Integer pid;

    private String title;

    private List<FrontMenu> children;

    public List<FrontMenu> getChildren() {
        return children;
    }

    public void setChildren(List<FrontMenu> children) {
        this.children = children;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getHref() {
        return href;
    }

    public void setHref(String href) {
        this.href = href == null ? null : href.trim();
    }

    public Integer getPid() {
        return pid;
    }

    public void setPid(Integer pid) {
        this.pid = pid;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title == null ? null : title.trim();
    }
}