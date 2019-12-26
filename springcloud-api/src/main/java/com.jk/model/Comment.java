package com.jk.model;

import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.List;

@Document(collection = "t_comment")
public class Comment implements Serializable {  // 评论实体类
    private static final long serialVersionUID = 5974813732933957892L;

    private String id;  //  此条评论的id
    private String commentid;   //  被评论房间/用户id
    private String commentname;  //  评论人名字
    private String commentcontent;  //  评论内容
    private String commentdate; //  评论时间
    private String commentpid;   //  被回复的评论的id 有为评论id无为0
    private Integer praise; //  点赞数
    private String replyname;  //  评论人名字
    @Transient
    private List<Comment> reply;    //  回复的内容

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getReplyname() {
        return replyname;
    }

    public void setReplyname(String replyname) {
        this.replyname = replyname;
    }

    public String getCommentid() {
        return commentid;
    }

    public void setCommentid(String commentid) {
        this.commentid = commentid;
    }

    public String getCommentname() {
        return commentname;
    }

    public void setCommentname(String commentname) {
        this.commentname = commentname;
    }

    public String getCommentcontent() {
        return commentcontent;
    }

    public void setCommentcontent(String commentcontent) {
        this.commentcontent = commentcontent;
    }

    public String getCommentdate() {
        return commentdate;
    }

    public void setCommentdate(String commentdate) {
        this.commentdate = commentdate;
    }

    public String getCommentpid() {
        return commentpid;
    }

    public void setCommentpid(String commentpid) {
        this.commentpid = commentpid;
    }

    public Integer getPraise() {
        return praise;
    }

    public void setPraise(Integer praise) {
        this.praise = praise;
    }

    public List<Comment> getReply() {
        return reply;
    }

    public void setReply(List<Comment> reply) {
        this.reply = reply;
    }

    @Override
    public String toString() {
        return "Comment{" +
                "id='" + id + '\'' +
                ", commentid='" + commentid + '\'' +
                ", commentname='" + commentname + '\'' +
                ", commentcontent='" + commentcontent + '\'' +
                ", commentdate='" + commentdate + '\'' +
                ", commentpid='" + commentpid + '\'' +
                ", praise=" + praise +
                ", reply=" + reply +
                '}';
    }
}
