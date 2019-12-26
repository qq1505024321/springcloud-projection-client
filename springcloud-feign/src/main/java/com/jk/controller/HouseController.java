package com.jk.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.jk.model.HouseInfo_xc_es;
import com.jk.model.Houses;
import com.jk.service.HouseService;
import org.elasticsearch.action.search.SearchRequestBuilder;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.action.search.SearchType;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.fetch.subphase.highlight.HighlightBuilder;
import org.elasticsearch.search.fetch.subphase.highlight.HighlightField;
import org.elasticsearch.search.sort.SortOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.core.ElasticsearchTemplate;
import org.springframework.data.elasticsearch.core.query.IndexQuery;
import org.springframework.data.elasticsearch.core.query.IndexQueryBuilder;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.data.elasticsearch.core.query.SearchQuery;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * 〈一句话功能简述〉<br>
 * 〈〉
 *
 * @author ccl
 * @create 2019/12/13
 * @since 1.0.0
 */
@Controller
@RequestMapping("house")
public class HouseController {

    @Autowired
    private HouseService houseService;

    @Autowired(required=true)
    private RedisTemplate redisTemplate;

    @Autowired(required=true)
    private ElasticsearchTemplate elasticsearchTemplate;

    @RequestMapping("toindex")
    public String toIndex(){
        return "index";
    }

    @RequestMapping("queryHourse")
    @ResponseBody
    public List<Houses> queryHourse(){
        List<Houses> housesList = null;

        String houseStr = (String) redisTemplate.opsForValue().get("house");
        if(houseStr != null){
            housesList = (List<Houses>) JSONArray.parse(houseStr);
        }else{
            housesList = houseService.queryHourse();
            String str = JSONArray.toJSONString(housesList);
            redisTemplate.opsForValue().set("house", str);
        }
        return housesList;
    }

    @RequestMapping("toIndex2")
    public String toIndex2(String city,HttpServletRequest request, Model model){
        //System.out.println(city+"-"+startDate+"-"+endDate);
        request.getSession().setAttribute("city",city);
        return "index2";
    }

    @RequestMapping(value = "queryHouse2")
    @ResponseBody
    public JSONObject queryHouse2(Integer page,Integer pageSize,HouseInfo_xc_es houses){

        JSONObject json = new JSONObject();
        List<Houses> list = houseService.queryHouse2();

        //判断index 是否存在
        if (!elasticsearchTemplate.indexExists("houseindex")) {
            elasticsearchTemplate.createIndex("houseindex");
        }

        BoolQueryBuilder queryBuilder2 = QueryBuilders.boolQuery();
        queryBuilder2.mustNot();
        SearchQuery searchQuery = new NativeSearchQueryBuilder()
                .withIndices("houseindex")//索引名
                .withTypes("house")//类型名
                .withQuery(queryBuilder2)// 查询条件对象
                .build();

        List<HouseInfo_xc_es> houseList3 = elasticsearchTemplate.queryForList(searchQuery,HouseInfo_xc_es.class);


        if(houseList3.size()== 0 || houseList3 == null){

            for (int i=0;i<list.size();i++){
                HouseInfo_xc_es house3 = new HouseInfo_xc_es();
                house3.setUsername(list.get(i).getUsername());
                house3.setHousenam(list.get(i).getHousenam());
                house3.setDayprice(list.get(i).getDayprice());
                house3.setLeasetypes(list.get(i).getLeasetypes());
                house3.setLeasetype(list.get(i).getLeasetype());
                house3.setHouseadderss(list.get(i).getHouseadderss());
                house3.setBedtypename(list.get(i).getBedtypename());
                house3.setHouseshow(list.get(i).getHouseshow());
                house3.setHousearea(list.get(i).getHousearea());
                house3.setCommensalismtype(list.get(i).getCommensalismtype());
                house3.setHousetypeid(list.get(i).getHousetypeid());
                house3.setRoomnum(list.get(i).getRoomnum());
                house3.setBedtypeid(list.get(i).getBedtypeid());
                house3.setHallnum(list.get(i).getHallnum());
                house3.setVerandanum(list.get(i).getVerandanum());
                house3.setToiletnum(list.get(i).getToiletnum());
                house3.setKitchennum(list.get(i).getKitchennum());
                house3.setCommensalismtype(list.get(i).getCommensalismtype());
                house3.setSimilarproperties(list.get(i).getSimilarproperties());
                house3.setSuitablenum(list.get(i).getSuitablenum());
                house3.setBedwidth(list.get(i).getBedwidth());
                house3.setBedlength(list.get(i).getBedlength());
                house3.setBedtypename(list.get(i).getBedtypename());
                house3.setHoseid(list.get(i).getHoseid());
                house3.setHousetypes(list.get(i).getHousetypes());
                house3.setImg(list.get(i).getImg());
                house3.setKetingimgurl(list.get(i).getKetingimgurl());
                house3.setChufangimgurl(list.get(i).getChufangimgurl());
                house3.setWsjimgurl(list.get(i).getWsjimgurl());
                house3.setQitaimgurl(list.get(i).getQitaimgurl());
                IndexQuery indexQuery = new IndexQueryBuilder().withId(Integer.toString(house3.getHoseid())).withObject(house3).build();
                elasticsearchTemplate.index(indexQuery);
            }

        }

        Integer rows = pageSize;

        //房屋名 房间名，或房间介绍，或房东名
        QueryBuilder queryBuilder = QueryBuilders.multiMatchQuery(houses.getHousenam(),
                "housenam", "username").analyzer("ik_max_word");//搜索name中或interest中包含有music的文档（必须与music一致）


        //获取 查询组件
        BoolQueryBuilder boolQueryBuilder = new BoolQueryBuilder();

        if(houses.getHousenam() !=null && !"".equals(houses.getHousenam())){
            boolQueryBuilder.must(queryBuilder);
        }

        //地区
        if (houses.getHouseadderss() != null && !"".equals(houses.getHouseadderss())){
            boolQueryBuilder.must(QueryBuilders.matchQuery("houseadderss",houses.getHouseadderss()));
        }
        if (houses.getLeasetypes() != null && !"".equals(houses.getLeasetypes())){
            boolQueryBuilder.filter(QueryBuilders.matchQuery("leasetypes",houses.getLeasetypes()));
            //  boolQueryBuilder.must(QueryBuilders.matchQuery("copy",c.getCartype()));
        }

        if (houses.getRoomnum() != null && houses.getRoomnum()>0){
            boolQueryBuilder.filter(QueryBuilders.termQuery("roomnum",houses.getRoomnum()));
            //  boolQueryBuilder.must(QueryBuilders.matchQuery("copy",c.getCartype()));
        }
        if (houses.getLeasetypes() != null && !"".equals(houses.getLeasetypes())){
            boolQueryBuilder.filter(QueryBuilders.matchQuery("leasetypes",houses.getLeasetypes()));
            //  boolQueryBuilder.must(QueryBuilders.matchQuery("copy",c.getCartype()));
        }


        //价格
        if ( houses.getDayprice()!=null && houses.getEndprice() !=null){
            boolQueryBuilder.filter(QueryBuilders.rangeQuery("dayprice").from(houses.getDayprice()).to(houses.getEndprice()));
        }else {
            if (houses.getDayprice() != null){
                boolQueryBuilder.filter(QueryBuilders.rangeQuery("dayprice").gte(houses.getDayprice()));
            }
            if (houses.getEndprice() !=null)
                boolQueryBuilder.filter(QueryBuilders.rangeQuery("dayprice").lte(houses.getEndprice()));
        }

        //获取高亮的组件
        HighlightBuilder highlightBuilder = new HighlightBuilder();
        highlightBuilder.field("housenam");
        highlightBuilder.preTags("<span style='color:red;'>");
        highlightBuilder.postTags("</span>");
        highlightBuilder.field("houseshow");
        highlightBuilder.preTags("<span style='color:red;'>");
        highlightBuilder.postTags("</span>");
        highlightBuilder.field("leasetypes");
        highlightBuilder.preTags("<span style='color:red;'>");
        highlightBuilder.postTags("</span>");
        highlightBuilder.field("houseadderss");//地区
        highlightBuilder.preTags("<span style='color:red;'>");
        highlightBuilder.postTags("</span>");
        highlightBuilder.field("bedtypename");
        highlightBuilder.preTags("<span style='color:red;'>");
        highlightBuilder.postTags("</span>");


        //通过模板  获取搜索请求组件
        SearchRequestBuilder houseindex = elasticsearchTemplate.getClient().prepareSearch("houseindex")
                .setExplain(true)  //设置是否对相关度进行排序   这里设置的是 是
                .highlighter(highlightBuilder)  // 设置高亮策略
                .setQuery(boolQueryBuilder) //设置查询策略
                .setTypes("house")    //设置 索引中的类名
                .addSort("hoseid", SortOrder.DESC) //设置 排序 策略  这里是对  商品价格  进行  逆序排序
                .setSearchType(SearchType.DFS_QUERY_THEN_FETCH)//设置查询的类型  有四种
                .setFrom((page - 1)*rows) //设置分页其实位置
                .setSize(rows);//设置每页条数


        //获取响应体
        SearchResponse searchResponse = houseindex.get();

        SearchHits hits = searchResponse.getHits();


        //获取数据存放的组件
        SearchHit[] hitsHits = hits.getHits();

        ArrayList<HouseInfo_xc_es> houseList2 = new ArrayList<>();

        for (SearchHit searchHit : hitsHits){
            //创建一个实体
            HouseInfo_xc_es house2 = new HouseInfo_xc_es();

            Map<String, HighlightField> highlightFields = searchHit.getHighlightFields();

            HighlightField housenam = highlightFields.get("housenam");
            HighlightField houseadderss = highlightFields.get("houseadderss");




            //处理高亮字段
            if (houseadderss == null)//如果高亮字段是空  那么 就用查找出的 普通的 字段
                house2.setHouseadderss(searchHit.getSourceAsMap().get("houseadderss").toString());
            else //如果 不是空那么 就用 高亮字段  替换掉  普通的字段
                house2.setHouseadderss(houseadderss.fragments()[0].toString());


            house2.setHoseid((Integer) searchHit.getSourceAsMap().get("hoseid"));
            house2.setHousetypeid((Integer) searchHit.getSourceAsMap().get("housetypeid"));
            house2.setLeasetype((Integer) searchHit.getSourceAsMap().get("leasetype"));
            house2.setRoomnum((Integer) searchHit.getSourceAsMap().get("roomnum"));
            house2.setHallnum((Integer) searchHit.getSourceAsMap().get("hallnum"));
            house2.setVerandanum((Integer) searchHit.getSourceAsMap().get("verandanum"));
            house2.setToiletnum((Integer) searchHit.getSourceAsMap().get("toiletnum"));
            house2.setToilettypeid((Integer) searchHit.getSourceAsMap().get("toilettypeid"));
            house2.setDayprice((Integer) searchHit.getSourceAsMap().get("dayprice"));
            house2.setBedtypeid((Integer) searchHit.getSourceAsMap().get("bedtypeid"));
            house2.setBedlength((Double) searchHit.getSourceAsMap().get("bedlength"));
            house2.setBedwidth((Double) searchHit.getSourceAsMap().get("bedwidth"));
            house2.setBednum((Integer) searchHit.getSourceAsMap().get("bednum"));
            house2.setSuitablenum((Integer) searchHit.getSourceAsMap().get("suitablenum"));
            house2.setCommensalismtype((Integer) searchHit.getSourceAsMap().get("commensalismtype"));
            house2.setSimilarproperties((Integer) searchHit.getSourceAsMap().get("similarproperties"));
            house2.setHousearea((String) searchHit.getSourceAsMap().get("housearea"));
            house2.setHousenam((String) searchHit.getSourceAsMap().get("housenam"));
            house2.setHouseshow((String) searchHit.getSourceAsMap().get("houseshow"));
            house2.setAddress((String) searchHit.getSourceAsMap().get("address"));//可以去掉
            house2.setUsername((String) searchHit.getSourceAsMap().get("username"));
            house2.setHousetypes((String) searchHit.getSourceAsMap().get("housetypes"));
            house2.setBedtypename((String) searchHit.getSourceAsMap().get("bedtypename"));
            house2.setLeasetypes((String) searchHit.getSourceAsMap().get("leasetypes"));
            house2.setKetingimgurl((String) searchHit.getSourceAsMap().get("ketingimgurl"));
            house2.setQitaimgurl((String) searchHit.getSourceAsMap().get("qitaimgurl"));
            house2.setWsjimgurl((String) searchHit.getSourceAsMap().get("wsjimgurl"));
            house2.setChufangimgurl((String) searchHit.getSourceAsMap().get("chufangimgurl"));
            house2.setImg((String) searchHit.getSourceAsMap().get("img"));


            houseList2.add(house2);
        }

        //获取总条数
        int totalHits = (int) hits.totalHits;

        Integer maxPage = 0;
        if(totalHits%rows==0){
            maxPage=totalHits/rows;
        }else {
            maxPage=totalHits/rows+1;
        }
        json.put("total",totalHits);
        json.put("rows",houseList2);
        json.put("maxPage",maxPage);
        json.put("msg","success");
        return json;
    }

    @RequestMapping("toShowAll")
    public String toShowAll(Integer id,HttpServletRequest request){
        Map<String, Object> sourceAsMap = elasticsearchTemplate.getClient()
                .prepareGet("houseindex", "house", String.valueOf(id))
                .execute()
                .actionGet()
                .getSourceAsMap();
        request.getSession().setAttribute("m",sourceAsMap);
        System.out.println(sourceAsMap+"++++++++++++++++++++");
        //Integer suitablenum = (Integer) sourceAsMap.get("suitablenum");
        //System.out.println(suitablenum+"++++++++++===================++++++");
        //  return byId.get();
        return "52219901";
    }




}