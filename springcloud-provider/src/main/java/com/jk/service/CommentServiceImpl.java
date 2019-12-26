package com.jk.service;

import com.jk.model.Comment;
import com.jk.model.Praise;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CommentServiceImpl implements CommentServiceApi {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    @RequestMapping("queryCommentById")
    public List<Comment> queryCommentById(String commentid,String pid) {
        Query query = new Query();

        if (commentid!=null && !"".equals(commentid)) {
            query.addCriteria(Criteria.where("commentid").is(commentid));
        }
        if (pid!=null && !"".equals(pid)) {
            query.addCriteria(Criteria.where("commentpid").is(pid));
        }
        long zongshu = mongoTemplate.count(query, Comment.class);

        List<Comment> list = mongoTemplate.find(query, Comment.class);
        return list;
    }

    @Override
    @RequestMapping("queryPraise")
    public List<Praise> queryPraise(@RequestParam("userid")Integer userid, @RequestParam("id")String id) {
        String usid = userid.toString();
        Query query = new Query();
        if (usid!=null && !"".equals(usid)) {
            query.addCriteria(Criteria.where("usid").is(usid));
        }
        if (id!=null && !"".equals(id)) {
            query.addCriteria(Criteria.where("coid").is(id));
        }

        List<Praise> list = mongoTemplate.find(query, Praise.class);
        return list;
    }

    @Override
    @RequestMapping("addPraise")
    public void addPraise(@RequestParam("userid")Integer userid, @RequestParam("id")String id) {
        Praise dz = new Praise();
        dz.setUsid(userid.toString());
        dz.setCoid(id);
        mongoTemplate.save(dz);
    }

    @Override
    @RequestMapping("delPraise")
    public void delPraise(@RequestParam("id") String id) {
        Praise dz = new Praise();
        dz.setId(id);
        mongoTemplate.remove(dz);
    }


}
