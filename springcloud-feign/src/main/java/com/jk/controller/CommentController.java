package com.jk.controller;

import com.jk.model.Comment;
import com.jk.model.Praise;
import com.jk.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping("pinglun")
public class CommentController {
    @Autowired
    private CommentService commentService;

    @Autowired
    private MongoTemplate mongoTemplate;

    @RequestMapping("toshow")
    public String toshow(){
        return "index";
    }

    @RequestMapping("queryComment")
    @ResponseBody
    public List<Comment> queryComment(Integer kechengid,String pid){
        String commentid = "jiaoshi"+(kechengid.toString());
        List<Comment> list = commentService.queryCommentById(commentid,pid);
        if(list != null && list.size()>0){
            for (int i = 0; i < list.size(); i++) {
                List<Comment> list2 = queryComment(kechengid,list.get(i).getId());
                list.get(i).setReply(list2);
            }
        }
        return list;
    }

    @RequestMapping("delComment")
    @ResponseBody
    public void  deleteComment(String id,Integer kechengid){
        Comment pl = new Comment();
        String commentid = "jiaoshi"+(kechengid.toString());
        pl.setId(id);
        pl.setCommentid(commentid);
        mongoTemplate.remove(pl);
    }

    @RequestMapping("toPraise")
    @ResponseBody
    public Integer  toPraise(String id){
        Integer flag=1;
        Integer userid = 7; //  当前登陆用户id
        //  查询是否点过这条评论的赞
        List<Praise> list = commentService.queryPraise(userid,id);
        Query query = new Query();
        if (id!="") {
            query.addCriteria(Criteria.where("id").is(id));
        }
        //  取出这条评论点赞数
        List<Comment> plList = mongoTemplate.find(query, Comment.class);
        Comment pl = plList.get(0);
        Integer dianzan = pl.getPraise();

        //  如果用户点过赞那么点赞数-1  并且删除点赞记录
        if (list!=null&&list.size()>0){
            commentService.delPraise(list.get(0).getId());
            pl.setPraise(dianzan-1);
            mongoTemplate.save(pl);
            flag=0;
        }else{  //  如果用户没有点过赞那么点赞数+1  并且增加点赞记录
            commentService.addPraise(userid,id);
            pl.setPraise(dianzan+1);
            mongoTemplate.save(pl);
        }
        return flag;
    }

    @RequestMapping("addComment")
    @ResponseBody
    public void addComment(Comment pl,Integer kechengid){
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String commentid = "jiaoshi"+(kechengid.toString());
        String pid = "0";

        // 屏蔽骂人的话
        String str=pl.getCommentcontent();
        String words[]={"畜生","傻逼","垃圾","废物","妈的","草泥马",
                "尼玛","你妈","弱智","脑残","傻狗","煞笔","烂",
                "滚","有病","脑瘫","狗贼","杂种"};
        for(int i=0;i<words.length;i++){
			//计算需要的*的个数
            String s="";
            for(int j=0;j<words[i].length();j++)
            {
                //s+="*";
                s=" 真棒 ";
            }
            str=str.replaceAll(words[i], s);    //  使用replace把脏话替换
        }
        pl.setCommentcontent(str);



        if (pl.getCommentpid()!=null && !"".equals(pl.getCommentpid())){    //  被回复的评论的id有为评论id 无默认为0
            pid=pl.getCommentpid();
        }
        if (pl.getReplyname()!=null && !"".equals(pl.getReplyname())){  //  没被回复人名字说明是评论不新增 有说明是回复评论的人
            pl.setReplyname(pl.getReplyname());
        }

        pl.setCommentcontent(pl.getCommentcontent());   //  评论内容
        pl.setCommentid(commentid);      //     评论的房间
        pl.setCommentname(pl.getCommentname());    //  评论人
        pl.setCommentpid(pid); //  被回复的评论的id 有为评论id无为0
        pl.setCommentdate(sdf.format(new Date()));  //  评论日期
        pl.setPraise(0);    //  点赞数默认为0
        mongoTemplate.save(pl);
    }


}
