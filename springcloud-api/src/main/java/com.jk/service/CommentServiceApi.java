package com.jk.service;

import com.jk.model.Comment;
import com.jk.model.Praise;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface CommentServiceApi {
    //  根据教程id和pid  递归查询所有评论
    @RequestMapping("queryCommentById")
    List<Comment> queryCommentById(@RequestParam("commentid") String commentid, @RequestParam("pid") String pid);

    //  查询根据 点赞的用户id和被点赞的评论id 查询是否有评论记录
    @RequestMapping("queryPraise")
    List<Praise> queryPraise(@RequestParam("userid") Integer userid, @RequestParam("id") String id);

    //  新增点赞记录
    @RequestMapping("addPraise")
    void addPraise(@RequestParam("userid") Integer userid, @RequestParam("id") String id);

    //  删除点赞记录
    @RequestMapping("delPraise")
    void delPraise(@RequestParam("id") String id);
}
