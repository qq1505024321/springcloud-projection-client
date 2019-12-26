package com.jk.model;

import java.io.Serializable;
import java.util.Date;

/**
 * 〈一句话功能简述〉<br>
 * 〈〉
 *
 * @author ccl
 * @create 2019/12/22
 * @since 1.0.0
 */
public class Visitor implements Serializable {

    private static final long serialVersionUID = -6784752507357201424L;

    private Integer id;
    private String calssmethod;
    private Date vdate;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCalssmethod() {
        return calssmethod;
    }

    public void setCalssmethod(String calssmethod) {
        this.calssmethod = calssmethod;
    }

    public Date getVdate() {
        return vdate;
    }

    public void setVdate(Date vdate) {
        this.vdate = vdate;
    }

    @Override
    public String toString() {
        return "Visitor{" +
                "id=" + id +
                ", calssmethod='" + calssmethod + '\'' +
                ", vdate=" + vdate +
                '}';
    }
}