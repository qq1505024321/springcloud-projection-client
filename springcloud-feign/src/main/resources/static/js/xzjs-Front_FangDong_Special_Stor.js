 
 var topLevelDomain = "xiaozhu.com";
var domain = "www.xiaozhu.com";
var webimIframUrl = window.location.protocol+"//xiaozhu.com/webim.html";
var uploadImageUrl = "https://imageupload.xiaozhu.com/imgin4uploadify.php";
var jciUrl = "http://jci.xiaozhustatic3.com";
var webimYUI = "{{{webimYUI}}}";
var webimV2 = "{{{webimV2}}}";
var client_id_youku = '16edde5f79e61324';
var lodgeUnitCenterDomain = "wirelesspub-lodgeunit.xiaozhu.com";

document.domain = topLevelDomain;

var hostArray = window.location.hostname.split('.');
if (hostArray.length == 5 && hostArray[2] == 'partner') {
    topLevelDomain = hostArray[1] + '.' + hostArray[2] + '.xiaozhu.com';
} else if (hostArray.length == 4 && hostArray[1] == 'partner') {
    topLevelDomain = hostArray[0] + '.' + hostArray[1] + '.xiaozhu.com';
}

if (typeof(window.jQuery) != "undefined")
{
    if ($("#head_newmsg2"))
    {
        $("#head_newmsg2").hover(
            function () {
                $("#head_newmsg2 a.icon_arrowB").addClass("nav_current");
                $("#head_newmsg2 a.icon_arrowB").removeClass("icon_arrowB");
                $("#head_newmsg2 div.nav_pop ").show();
            },
            function () {
                $("#head_newmsg2 a.nav_current").addClass("icon_arrowB");
                $("#head_newmsg2 a.nav_current").removeClass("nav_current");
                $("#head_newmsg2 div.nav_pop ").hide();
            }
        );
    }
}

function tipBackyardSuccess(classname)
{
    if (typeof(classname) == 'undefined' || classname == '')
        classname = 'tips_right';

    $('.'+classname).show();

    var displayText = 3;
    var showtime=setInterval(function(){
    if(displayText>0)
    {
        displayText--;
        $('.'+classname).show();
    }
    else {
        $('.'+classname).hide();
        clearInterval(showtime);
    }
    },1000);
}

function tipBackyardError(errmsg,classname)
{
    if (typeof(classname) == 'undefined' || classname == '')
        classname = 'tips_error';

    $('.'+classname).html(errmsg);
    $('.'+classname).show();

    var displayText = 3;
    var showtime=setInterval(function(){
    if(displayText>0)
    {
        displayText--;
        $('.'+classname).show();
    }
    else {
        $('.'+classname).hide();
        clearInterval(showtime);
    }
    },1000);
}

function tipBackyardReset(classnameSucc, classnameErr)
{
    if (typeof(classnameSucc) == 'undefined' || classnameSucc == '')
        classnameSucc = 'tips_right';
    $('.'+classnameSucc).hide();

    if (typeof(classnameErr) == 'undefined' || classnameErr == '')
        classnameErr = 'tips_error';
    $('.'+classnameErr).hide();

}
function loadNyroModal()
{
}

//百度站长统计
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?92e8bc890f374994dd570aa15afc99e1";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();

 
 var XZWebUrlWriter = {
    getWebPhp : function () {
        return 'xzweb.php';
    },
    getAjaxPhp : function () {
        return '/ajaxRequest/';
    },
    getRequest : function(url,type) {
        var nexturl = $('input[name=next]').val();
        //if (nexturl).next = nexturl;
        var returnData;
        type = (type == undefined) ? 'json' : type;
        var that = this;
        $.ajax({
            type     : "GET",
            url      : url,
            dataType : type,
            async    : false,
            data     : {'_':Math.random()},
            success  : function(datas,statusText,XMLHttpRequest){
                returnData = datas; 
                that.revoltReptile(XMLHttpRequest)
            },
            beforeSend : function(XHR){ XHR.setRequestHeader('xSRF-Token',$('#xz_srf_token').val()); },
            error : function (XMLHttpRequest, textStatus, errorThrown){
                that.revoltReptile(XMLHttpRequest);
            }
        });
        return returnData;
    },
    getRequestSpider : function(busiKey,isReload,url,type, cb, reRequest) {
        var nexturl = $('input[name=next]').val();
        //if (nexturl).next = nexturl;
        var returnData;
        var spiderAvoidToken = localStorage.getItem('SPIDER_AVOID_TOKEN_' + busiKey);
        if (cookieApi.getCookie('isAutoTest') === 'yes' && busiKey == 'calendar') {
            spiderAvoidToken = 'spider_avoid_token_calendar';
        }
        if (spiderAvoidToken && spiderAvoidToken !== 'undefined') {
            var separator = url.indexOf('?') === -1 ? '?' : '&';
            url = url + separator + 'spiderAvoidToken=' + spiderAvoidToken;
        }
        type = (type == undefined) ? 'json' : type;
        var that = this;
        $.ajax({
            type     : "GET",
            url      : url,
            dataType : type,
            async    : false,
            data     : {'_':Math.random()},
            success  : function(datas){
                captchaInterceptors(busiKey,isReload, datas, function () {
                    that.getRequestSpider(busiKey,isReload,url,type, cb, true);
                }, function () {
                    returnData = datas;
                    if (reRequest && cb) {
                        cb();
                    }
                });
            },
            beforeSend : function(XHR){ XHR.setRequestHeader('xSRF-Token',$('#xz_srf_token').val()); },
            error : function (XMLHttpRequest, textStatus, errorThrown){
                that.revoltReptile(XMLHttpRequest);
            }
        });
        return returnData;
    },
    postRequest : function(url,requestParam) {
        if (!requestParam) var requestParam = {};
        var nexturl = $('input[name=next]').val();
        if (nexturl) requestParam.next = nexturl;
        var that =this;
        var returnData;
        $.ajax({
            type     : "POST",
            url      : url,
            data     : requestParam,
            dataType : 'json',
            async    : false,
            beforeSend : function(XHR){ XHR.setRequestHeader('xSRF-Token',$('#xz_srf_token').val()); },
            success  : function(datas){returnData = datas;},
            error : function (XMLHttpRequest, textStatus, errorThrown){
                that.revoltReptile(XMLHttpRequest);
            }
        });
        return returnData;
    },
    revoltReptile:function(XMLHttpRequest){
        var reaponseHeader  = XMLHttpRequest.getResponseHeader('x-bizguard-redirect');
        if(reaponseHeader){
            var urls = reaponseHeader.split('slideRedirect=');
            var host = urls[0] + 'slideRedirect=';
            if (urls.length > 1) {
                host = host + encodeURIComponent(urls[1]);
            }
            window.location.href = host;
        }
    },
    headTest_ReqUrl :function() {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CheckBlock';
    },
    getWebIm_ServerUrl: function() {
        return window.location.protocol+'//'+domain+'/webim.php?op=getServerUrl';
    },
    getWebIm_DrawIframeUrl : function (userid) {
        return window.location.protocol+'//'+domain+'/webim.php?op=drawIframe&userid=' + userid;
    },
    getWebIm_DrawBaseBtnUrl: function(next) {
        return window.location.protocol+'//'+domain+'/webim.php?op=drawImBaseBtn&next=' + next;
    },
    getWebIm_DrawZhunaIframeUrl : function () {
        return window.location.protocol+'//'+domain+'/webim.php?op=drawZhunaIframe';
    },
    getWebIm_IframeUrl : function (userId) {
        return webimIframUrl;
    },
    getWebIm_LodgeUnitData: function (roomid) {
        return window.location.protocol+'//'+domain+'/webim.php?op=getLodgeUnitData&roomid=' + roomid;
    },
    getWebIm_FavoriteList: function (userid) {
        return window.location.protocol+'//'+domain+'/webim.php?op=getFavoriteList&userid=' + userid;
    },
    getWebIm_FavoriteGroupDetail: function (groupId) {
        return window.location.protocol+'//'+domain+'/webim.php?op=getFavoriteGroupDetail&groupId=' + groupId;
    },
    getWebIm_RequestNotificationUrl : function (userid) {
        return window.location.protocol+'//'+domain+'/webim.php?op=getNotification&terminal=all_web&userid=' + userid;
    },
    getWebIm_RequestUserSysNoticeCnt : function (userid, userrole) {
        return window.location.protocol+'//'+domain+'/webim.php?op=getUserSysNoticeCnt&userid=' + userid + '&userrole=' + userrole;
    },
    getWebIm_RequestUserSysNotice : function (userid, userrole) {
        return window.location.protocol+'//'+domain+'/webim.php?op=getUserSysNotice&userid=' + userid + '&userrole=' + userrole;
    },
    getWebIm_UserData : function(userid) {
        return window.location.protocol+'//'+domain+'/webim.php?op=getUserData&userid=' + userid;
    },
    getWebIm_talkHis : function(isTenant,offset,length) {
        return window.location.protocol+'//'+doamin+'/webim.php?op=loadTalkHis&isTenant=' + isTenant + '&offset=' + offset + '&length=' + length + '&userId=' + currentUser;
    },
    getWebIm_talkMagHis: function(tenantId,luId,length,lastMessageId) {
        return window.location.protocol+'//'+domain+'/webim.php?op=loadTalkMsgHis&tenantId= ' + tenantId + '&luId=' + luId +'&length=' + length + '&lastMessageId= ' + lastMessageId;
    },
    getWebIm_TalkHisUrl : function (landlordid, tenantid, objid, userid) {
        return window.location.protocol+'//'+domain+'/webim.php?op=getTalkHisUrl&landlordid=' + landlordid + '&tenantid=' + tenantid + '&objid=' + objid + '&userid=' + userid + '&_t=' + new Date().getTime();
    },
    getFkScreenListUrl : function(){
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangKe_ChatSet' + '&_t=' + new Date().getTime();
    },
    getWebIm_RequestFastReplyUrl : function (userid) {
        return window.location.protocol+'//'+domain+'/webim.php?op=getFastReply&userid=' + userid + '&_t=' + new Date().getTime();
    },
    getWebIm_FangDongSpecialLodgeUnitUrl : function (userid) {
        return window.location.protocol+"//" + topLevelDomain + "/fangdong/" + userid +"/fangzi.html";
    },
    getWebIm_RequestRecommendLuUrl : function (userid) {
        return window.location.protocol+'//'+domain+'/webim.php?op=getRecommendLuList&userid=' + userid;
    },
    getWebIm_RequestUserStateUrl : function (userid,imuserrole) {
        return window.location.protocol+'//'+domain+'/webim.php?op=getUserState&userid=' + userid + '&imuserrole=' + imuserrole;
    },
    getWebIm_RequestSynTalkMsgUrl: function (userid,synMinTime,synMaxTime) {
        return window.location.protocol+'//'+domain+'/webim.php?op=SynTalkMsg&userId=' + userid + '&synMinTime=' + synMinTime + '&synMaxTime=' + synMaxTime;
    },
    getWebIm_RequestTalkMsgSetRead: function(tenantId,luId,isTenant) {
        return window.location.protocol+'//'+domain+'/webim.php?op=talkMsgSetRead&tenantId=' + tenantId + '&luId=' + luId + '&isTenant=' + isTenant + '&_t=' + new Date().getTime();
    },
    getWebIm_AlipayTrustZMInfoPair : function (applyUserId,ownerUserId) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetZminfo_Pair?applyUserId=' + applyUserId + '&ownerUserId='+ownerUserId+'&_t=' + new Date().getTime();
    },
    getWebIm_AlipayTrustLayer : function (landlordid) {
        return window.location.protocol+'//'+domain+'/webim.php?op=getAlipayTrustLayer&landlordid=' + landlordid + '&_t=' + new Date().getTime();
    },
    getWebIm_CheckKeywordUrl : function (dataArr, type) {
        return 'https://greatwall.xiaozhu.com/greatwall.php?content=' + JSON.stringify(dataArr) + '&type=' + type + '&_t=' + new Date().getTime();
    },
    getWebIm_AllFriendAndLuData : function (allfriendid,allluid) {
        return window.location.protocol+'//'+domain+'/webim.php?op=getAllFriendAndLuData';
        // return window.location.protocol+'//'+domain+'/webim.php?op=getAllFriendAndLuData&userlist=' + allfriendid + '&lulist=' + allluid + '&_t=' + new Date().getTime();
    },
    getOperateScreen: function (toUserId,operate) {
        return window.location.protocol+'//'+domain+'/webim.php?op=doOperateImScreen&toUserId=' + toUserId+ '&operate=' + operate+ '&_t=' + new Date().getTime();
    },
    checkIsInScreenList: function (toUserId) {
        return window.location.protocol+'//'+domain+'/webim.php?op=checkIsInScreenList&toUserId=' + toUserId+ '&_t=' + new Date().getTime();
    },
    getLodgeUnitState: function(luId){
        return window.location.protocol+'//'+domain+'/webim.php?op=getLodgeUnitState&luId=' + luId+ '&_t=' + new Date().getTime();
    },
    getWeb_NoticeReachedFeedbackUrl : function (timerid,operate) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=NotificationReachedFeedback&timerid=' + timerid + '&operate=' + operate;
    },

    getWeb_InfoEventReachUrl : function (timerid,operate,receiverId) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=InfoEventReach&timerid=' + timerid + '&operate=' + operate + '&receiverid='+receiverId;
    },

    getInfoEventDealActionUrl : function (dealaction,objid,objtype,receiverid,displaystrategy) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=GetInfoEventDealActionUrl&dealaction=' + dealaction + '&objid=' + objid + '&objtype=' + objtype + '&receiverid=' + receiverid + '&displaystrategy='+displaystrategy;
    },

    getWeb_FangDong_FangDong_ShowLetter: function() {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_ShowLetter';
    },
    getWeb_FangKe_FangKe_ShowLetter: function() {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangKe_ShowLetter';
    },
    getWeb_FangKe_Special_Index: function(tenantid) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=Front_FangKe_Special_Index&tenantid=' + tenantid;
    },
    getWeb_FangDong_Special_Index: function(landlordid) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=Front_FangDong_Special_Index&landlordid=' + landlordid;
    },
    getWeb_FangDong_ResetFastReplyUrl : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_ChatSet';
    },
    getWeb_FangDong_NoticeUrl : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_ShowSysNotice';
    },
    getWeb_FangKe_NoticeUrl : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangKe_ShowSysNotice';
    },

    getWeb_FangKe_DoPostCommentUrl : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangKe_DoPostComment';
    },
    getWeb_FangDong_DoPostCommentUrl : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_DoPostComment';
    },
    getWeb_FangKe_IndexUrl : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangKe_Index';
    },
    getWeb_FangDong_IndexUrl : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_Index';
    },
    getWeb_FavoriteGroupDetailUrl : function (groupId) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=Favorite_MyFavoriteDetail&groupId='+groupId;
    },
    getWeb_FavoriteGroupListUrl : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangKe_MyFavorite';
    },

    //打开点评详情页
    getWeb_FangKe_AddCommentUrl : function (bookorderId) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangKe_Comment_Self&bookorderId=' + bookorderId + '&random=' + new Date().getTime();
    },
    getWeb_FangKe_DeleteTenantUrl : function (tenantId) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangKe_DeleteUserTenant&tenantId=' + tenantId;
    },
    getWeb_FangKe_UserTenantDetailUrl : function (tenantId) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangKe_UserTenantDetail&tenantId=' + tenantId;
    },
    getWeb_FangKe_EditUserTenantUrl : function (tenantId,realName,tenantSex,ageGroup,cardType,cardNo,yearOfBirth,monthOfBirth,dayOfBirth,mobile,phonecode) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangKe_UpdateUserTenant&tenantId=' + tenantId + '&realName=' + realName + '&tenantSex=' + tenantSex + '&ageGroup=' + ageGroup + '&cardType=' + cardType + '&cardNo=' + cardNo + '&yearOfBirth=' + yearOfBirth + '&monthOfBirth=' + monthOfBirth + '&dayOfBirth=' + dayOfBirth + '&mobile=' + mobile + '&phonecode=' + phonecode + '&random=' + new Date().getTime();
    },
    getWeb_FangKe_EditUserTenantAfterOverseaUrl : function (tenantId,realName,mobile,sex,birth,oversea,nation,mobileNation,IDCardNo,passportNo) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangKe_UpdateUserTenantAfterOversea&tenantId=' + tenantId + '&realName=' + realName + '&mobile=' + mobile + '&sex=' + sex + '&birth=' + birth + '&oversea=' + oversea + '&nation=' + nation + '&mobileNation=' + mobileNation + '&IDCardNo=' + IDCardNo + '&passportNo=' + passportNo + '&random=' +new Date().getTime();
    },
    getWeb_FangKe_EditHaiwaiUserTenantUrl : function (tenantId,realName,tenantSex,ageGroup,cardType,cardNo,yearOfBirth,monthOfBirth,dayOfBirth,email) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangKe_UpdateUserTenant&tenantId=' + tenantId + '&realName=' + realName + '&tenantSex=' + tenantSex + '&ageGroup=' + ageGroup + '&cardType=' + cardType + '&cardNo=' + cardNo + '&yearOfBirth=' + yearOfBirth + '&monthOfBirth=' + monthOfBirth + '&dayOfBirth=' + dayOfBirth + '&email=' + email + '&random=' + new Date().getTime();
    },
    getWeb_GetCityUrl : function (provinceId) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=Pub_SelCityJson&provinceid=' + provinceId ;
    },
    getFangDong_CutUserHeadImageFrameUrl : function (headImageUrl) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_CutUserHeadImageFrame&headImageUrl='+headImageUrl;
    },
    /*07-03*/
    getFangDong_SetNoticeSetUrl : function (smsLodgeunitSucc,smsBookorderTimeout,smsPayTimeout,smsNewComment,emailLodgeunitSucc,emailBookorderTimeout,emailPayTimeout,emailNewComment) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_NoticeSetSub&sms_lodgeunitsucc='+smsLodgeunitSucc+'&sms_bookordertimeout='+smsBookorderTimeout+'&sms_paytimeout='+smsPayTimeout+'&sms_newcomment='+smsNewComment+'&email_lodgeunitsucc='+emailLodgeunitSucc+'&email_bookordertimeout='+emailBookorderTimeout+'&email_paytimeout='+emailPayTimeout+'&email_newcomment='+emailNewComment+'&random'+new Date().getTime();
    },
    getFangDong_OrderByStateUrl : function (orderState,pageNo,sortType) {
        sortType = ('undefined' !== typeof sortType) ? sortType : "";
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_OrderByState&orderState='+orderState+'&sortType='+sortType+'&p='+pageNo+'&random='+new Date().getTime();
    },
    getFangDong_PayListUrl : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_PayList';
    },
    getFangDong_SetBankPaymentUrl : function (id, ownerId) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_SetBankPayment&id='+id+'&ownerid='+ownerId;
    },
    getFangDong_SetAlipayPaymentUrl : function (id, ownerId) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_SetAlipayPayment&id='+id+'&ownerid='+ownerId;
    },
    getFangDong_GetTenpayInfoUrl : function (id, ownerId) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_GetTenpayInfo&id='+id+'&ownerid='+ownerId;
    },
    getFangDong_CleanServiceAddOrder_step2Url : function(luId) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_CleanServiceAddOrder_step2&luId='+luId;
    },
    getFangDong_CleanServiceOrderDetailRefreshState : function(orderId,lastState) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_CleanServiceOrderDetailRefreshState&lastState='+lastState+'&orderId='+orderId;
    },
    getFangDong_IsCanClean : function (){
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_CleanServiceOrderGetIsCanClean';
    },
    getFangDong_UserInfoUrl : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_UserInfo';
    },
    getFront_Login_KernelUrl : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=Front_Login_Kernel';
    },
    getFront_Register_KernelUrl : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=Front_Register_Kernel';
    },
    getFront_DetailPageMapUrl : function (luid) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=Front_DetailPageMap&id='+luid;
    },
    getFront_Login_SubmitUrl : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=Front_Login_Submit';
    },
    getFront_BookOrderPayFail : function (orderId) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=Front_BookOrderPayFail&bookorderid='+orderId;
    },
    getFangDong_FlashBookUrl : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_FlashBook';
    },

    getAjax_RegisterWithPhoneAndPass : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_RegisterWithPhoneAndPass';
    },
    /* dpv2
    getAjax_SendCommentShareUrl : function (commentid, source) {
        return window.location.protocol+'//'+domain+'/ajax.php?op=Ajax_SendCommentShare&commentid='+commentid+'&source='+source+'&random='+new Date().getTime();
    },
    可能废弃 或者是张晨的分享
    */
    getAjax_CommentShareUrl : function (commentid) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CommentShare?commentid='+commentid+'&random='+new Date().getTime();
    },
    getAjax_CommentFangKeShareUrl : function (commentid) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CommentFangKeShare?commentid='+commentid+'&random='+new Date().getTime();
    },
    getAjax_FangKe_BookOrder_RefundShowUrl : function (bookOrderId) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangKe_BookOrder_RefundShow?bookOrderId='+bookOrderId;
    },
    getAjax_SaveDefaultUserHeadImageUrl : function (imgId) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SaveDefaultUserHeadImage?id='+imgId;
    },
    getAjax_SaveUserHeadImageUrl : function (imgurl, gcx, gcy, gcw, gch) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SaveUserHeadImage?imgurl='+encodeURIComponent(imgurl)+'&x='+gcx+'&y='+gcy+'&w='+gcw+'&h='+gch;
    },
    /*07-03*/
    getAjax_DelCommentUrl : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_DelComment';
    },
    getAjax_BookOrderCancelReasonUrl : function (bookorderId, rejectType, rejectText) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_BookOrderCancelReason?bookorderid='+bookorderId+'&cancelType='+rejectType+'&cancelReason='+encodeURIComponent(rejectText);
    },
    getAjax_RefuseBookOrderSetLuUnBookAble : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_RefuseBookOrderSetLuUnBookAble';
    },
    getAjax_FangKe_CheckInCodeVerifyUrl : function (bookorderId,code) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangKe_CheckInCodeVerify?orderid='+bookorderId+'&code='+code;
    },
    getAjax_DelUserPaymentUrl : function (id) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_DelUserPayment?id='+id;
    },
    getAjax_BankCityJsonUrl : function (provinceId) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_BankCityJson?provinceid='+provinceId;
    },
    getAjax_BankJsonUrl : function (bankName,bankProviceId,bankCityId) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_BankJson?banktypeid='+bankName+'&bankprovinceid='+bankProviceId+'&bankcityid='+bankCityId;
    },
    getAjax_CheckTenpayInfoParam : function (tenpayno,tenpayusername) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CheckTenpayInfo?tenpayno='+tenpayno+'&tenpayusername='+tenpayusername;
    },
    getAjax_GetDefaultLandMarkUrl : function (cityDomain) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetDefaultLandMark?domain='+cityDomain;
    },
    /*08-19*/
    getAjax_CheckLodgeUnitUrl : function (cityDomain) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CheckLodgeunit?luid='+cityDomain;
    },
    getAjax_CheckSearchConditionUrl : function (searchCity,cityDomain,startDate,endDate) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CheckSearchCondition?searchCity='+searchCity+"&cityDomain="+cityDomain+"&startDate="+startDate+"&endDate="+endDate;
    },
    getAjax_BuildFilterSearchUrl : function (partner,startDate,endDate,citydomain,putkey,keywordType,keywordValue,checkedHouseType,checkedfacilities,checkedrentType,guestnum,price) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_BuildFilterSearch?partner='+partner+'&startDate='+startDate+'&endDate='+endDate+'&citydomain='+citydomain+'&putkey='+putkey+'&keywordType='+keywordType+'&keywordValue='+keywordValue+'&housetyperoomcnt='+checkedHouseType+'&facilities='+checkedfacilities+'&leasetype='+checkedrentType+'&guestnum='+guestnum+'&price='+price;
    },
    getAjax_GetDatas4Map : function (partner,startDate,endDate,city,putkey,district,landmark,checkedHouseType,checkedfacilities,checkedrentType,guestnum,lowprice,highprice,pageNo,sort) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetDatas4Map?partner='+partner+'&startDate='+startDate+'&endDate='+endDate+'&city='+city+'&putkey='+putkey+'&district='+district+'&landmark='+landmark+'&housetyperoomcnt='+checkedHouseType+'&facilities='+checkedfacilities+'&leasetype='+checkedrentType+'&guestnum='+guestnum+'&lowprice='+lowprice+'&highprice='+highprice+'&pageno='+pageNo+'&sort='+sort;
    },
    getAjax_GetMapDatasLodgeUnit : function (partner,startDate,endDate,city,putkey,district,landmark,checkedHouseType,checkedfacilities,checkedrentType,guestnum,lowprice,highprice,pageNo,sort,radius,lat,lng) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetDatas4MapLodgeUnit?partner='+partner+'&startDate='+startDate+'&endDate='+endDate+'&city='+city+'&putkey='+putkey+'&district='+district+'&landmark='+landmark+'&housetyperoomcnt='+checkedHouseType+'&facilities='+checkedfacilities+'&leasetype='+checkedrentType+'&guestnum='+guestnum+'&lowprice='+lowprice+'&highprice='+highprice+'&pageno='+pageNo+'&sort='+sort+'&radius='+radius+'&lat='+lat+'&lng='+lng;
    },
    getAjax_getDatasMapLodgeunit4Page : function (partner,startDate,endDate,city,putkey,district,landmark,checkedHouseType,checkedfacilities,checkedrentType,guestnum,lowprice,highprice,pageNo,sort,radius,lat,lng) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getDatasMapLodgeunit4Page?partner='+partner+'&startDate='+startDate+'&endDate='+endDate+'&city='+city+'&putkey='+putkey+'&district='+district+'&landmark='+landmark+'&housetyperoomcnt='+checkedHouseType+'&facilities='+checkedfacilities+'&leasetype='+checkedrentType+'&guestnum='+guestnum+'&lowprice='+lowprice+'&highprice='+highprice+'&pageno='+pageNo+'&sort='+sort+'&radius='+radius+'&lat='+lat+'&lng='+lng;
    },
    getAjax_doFullTextSearch4Map : function (offset,url) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_doFullTextSearch4Map?offset='+offset+'&url='+encodeURIComponent(url);
    },
    getAjax_GetBookLodgeUnitDetailUrl : function (lodgeId,sameRoomNum,startDate,endDate) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_GetBookLodgeUnitDetail?lodgeId="+lodgeId+"&sameRoomNum="+sameRoomNum+"&startdate="+startDate+"&enddate="+endDate+"&rand="+new Date().getTime();
    },
    getAjax_GetOrderPriceDetailUrl : function (bookOrderId) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_GetOrderPriceDetail?bookOrderId="+bookOrderId+"&rand="+new Date().getTime();
    },
    getAjax_GetLazyInfoUrl : function (memkey,memtimeout,turl) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_LoadInfo?memkey="+memkey+"&memtimeout="+memtimeout+"&turl="+turl;
    },
    getAjax_AddFeedbackUrl : function (problem,contact,imageParam) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_Add_Feedback?problem="+problem+"&contact="+contact+"&imageParam="+imageParam;
    },
    getAjax_GetFeedbackUrl : function () {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_Get_Feedback";
    },




    getAjax_GetVerifyCode : function () {
        return window.location.protocol+"//"+domain+"/ajaxRequest/AJAX_GetVerifyCode?nocache="+new Date().getTime();
    },
    getAjax_CheckMobileExist : function (mobile,nationName,nationCode,source) {
        var source = source ? source : 'normal';
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_CheckMobileExist?mobile=' + mobile + '&nationName=' +nationName+ '&nationCode=' +nationCode + '&source=' +  source;
    },
    getAjax_CheckRegistExist : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_CheckRegistExist';
    },
    getAjax_CheckUsernameExist : function (username) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_CheckUsernameExist?username=' + encodeURIComponent(username);
    },
    getAjax_CheckOldUsernameExist : function (username) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_CheckOldUsernameExist?username=' + username;
    },
    getAjax_CheckEmailExist : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_CheckEmailExist';
    },
    getAjax_CheckVerifyCode : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_CheckVerifyCode';
    },
    getAjax_SendActivateCode : function (mobile, nationName, nationCode, verifyCode) {
        return window.location.protocol+'//'+domain+'/limajax/AJAX_SendActivateCode?mobile='+ mobile
            +'&nationName=' + nationName + '&nationCode=' + nationCode +'&verifycode='+ verifyCode + '&rand='+new Date().getTime() + '&fromType=pcRegister';
    },
    getAjax_SendAmendPassCode : function (mobile, verifyCode,nationName,nationCode) {
        return window.location.protocol+'//'+domain+'/limajax/AJAX_SendAmendPassCode?mobile='+ mobile +'&verifycode='+ verifyCode +'&nationName=' + nationName +'&nationCode='+nationCode+ '&rand='+new Date().getTime();
    },
    getAjax_CheckActiveCode : function (mobile,nationName,nationCode,activateCode) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_CheckActivateCode?mobile='+mobile +'&nationName='+ nationName +'&nationCode=' + nationCode +'&activatecode='+activateCode +'&rand='+new Date().getTime();
    },
    getAjax_CheckInviteCode : function (inviteCode) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_CheckInviteCode?invitecode='+inviteCode;
    },
    getAjax_SendConfirmCode : function (mobile, verifyCode,nationName,nationCode) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_SendConfirmCode?mobile='+ mobile +'&verifycode='+ verifyCode
            +'&nationName=' +nationName +'&nationCode=' + nationCode + '&rand='+new Date().getTime();
    },
    getAjax_SendQuickLoginCode : function(mobile,nationName,nationCode){
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_SendQuickLoginCode?mobile='+ mobile  +  '&nationName=' +nationName +'&nationCode=' + nationCode + '&rand='+new Date().getTime();
    },
    getAjax_CheckConfirmCode : function (mobile,confirmCode,nationName,nationCode) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_CheckConfirmCode?mobile='+mobile+'&confirmcode='+confirmCode
            +'&nationName='+ nationName + '&nationCode='+ nationCode +'&rand='+new Date().getTime();
    },
    getAjax_VerifyCodeFirstShow : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_VerifyCodeFirstShow?rand='+new Date().getTime();
    },
    getAjax_Login : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_Login';
    },
    getAjax_LoginMobile : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_LoginMobile';
    },
    getAjax_RegisterByMobile : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_RegisterByMobile';
    },
    getAjax_RegisterByEmail : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_RegisterByEmail';
    },
    getAjax_FindPasswordByEmail : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_ResetPasswordByEmail';
    },
    getAjax_ResetPasswordFromEmail : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_ResetPasswordFromEmail';
    },
    getAjax_SendRegValidateEmailUrl : function(email,next){
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_SendRegValidateEmail?email='+encodeURIComponent(email)+'&next='+encodeURIComponent(next)+'&random='+new Date().getTime();
    },
    getAjax_FindPasswordByMobile : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_ResetPasswordByMobile';
    },
    getAjax_AmendPasswordByMobile : function (){
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_AmendPasswordByMobile';
    },
    getAjax_AmendPasswordByEmail : function (){
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_AmendPasswordByEmail';
    },
    getAjax_BindOpenAccount : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_BindOpenAccount';
    },
    getAjax_OpenAccountRegister : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_OpenAccountRegister';
    },
    getAjax_ReSendActiveEmail : function (uid, uidtoken) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_ReSendActiveEmail?uid=' + uid + '&uidtoken=' + uidtoken;
    },
    getAjax_ChangeActiveEmail : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_ChangeActiveEmail';
    },
    getAjax_CheckIllegalUser : function (bidType) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CheckIllegalUser?bidType=' + encodeURIComponent(bidType);
    },













    getAjax_CheckNickNameUrlNoParam: function () {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_CheckNickName";
    },

    getAjax_GetPicCheckCodeShowUrl : function () {
        return window.location.protocol+"//"+domain+"/ajaxRequest/AJAX_PicCheckCodeShow?nocache="+new Date().getTime();
    },
    getAjax_GetSendMessageAppDownloadUrl: function (mobile,checkcode) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_Send_Message_App_Download_Url?mobile="+mobile+"&checkcode="+checkcode+"&rand="+new Date().getTime();
    },
    getAjax_SendSms4AppDownloadUrl: function (mobile,checkcode,apptype) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_SendSms4AppDownload?mobile="+mobile+"&checkcode="+checkcode+"&apptype="+apptype+"&rand="+new Date().getTime();
    },
    getAjax_CheckUserPasswordUrl : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CheckUserPassword';
    },
    getAjax_CheckPhone : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CheckPhone';
    },
    getAjax_CheckEmailUrl: function (email) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_CheckEmail?email="+email+"&random="+new Date().getTime();
    },
    getAjax_CheckEmailUrlNoParam: function () {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_CheckEmail";
    },
    getAjax_SendActiveEmailUrl: function (email) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_Send_Active_Email?email="+email;
    },
    getAjax_ReadSysNoticeUrl: function (messageId) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_ReadSysNotice?msgId="+messageId;
    },
    getAjax_DelSysNoticeUrl : function (messageId) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_DelSysNotice?msgId='+messageId;
    },
    getAjax_SetChatReplyUrl : function (replys) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SetChatReply?data='+encodeURIComponent(replys)+'&_t='+new Date().getTime();
    },
    getAjax_ResetChatReplyUrl : function (replys) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_ResetChatReply?data='+encodeURIComponent(replys)+'&_t='+new Date().getTime();
    },
    getAjax_SmsCheckCodeSendUrl : function (phonenum,nationName,nationCode,imagecode,aisle) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_SmsCheckCodeSend?phone='+phonenum+ '&nationName=' + nationName + '&nationCode=' +nationCode+'&checkcode='+imagecode+'&aisle='+aisle;
    },
    getAjax_SetUserPhoneCodeUrl : function (phonenum,phonecode,nationName,nationCode) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SetUserPhoneCode?phone='+phonenum+'&phonecode='+phonecode+'&nationName='+nationName+'&nationCode='+nationCode;
    },
    getAjax_SmsCheckCodeVerifyUrl : function (phonenum,phonecode,nationName,nationCode) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_SmsCheckCodeVerify?phone='+phonenum+'&phonecode='+phonecode+'&nationName='+nationName+'&nationCode='+nationCode;
    },
    getAjax_Front_SendPhoneCode : function (phonenum,imagecode,aisle) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SendPhoneCode?phone='+phonenum+'&checkcode='+imagecode+'&aisle='+aisle+'&rand='+new Date().getTime();
    },
    getAjax_Front_SendPhoneCodeByPhone : function (phonenum,imagecode,aisle) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_SendPhoneCodeByPhone?phone='+phonenum+'&checkcode='+imagecode+'&aisle='+aisle+'&rand='+new Date().getTime();
    },
    getAjax_PhoneIsNotExist_PhoneIsLoginUserUrl : function (phonenum) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_PhoneIsNotExist_PhoneIsLoginUser?phone='+phonenum;
    },
    getAjax_UnbindSnsOpenIdUrl : function (shareType) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_UnbindSnsOpenId?shareType='+shareType;
    },
    getAjax_FangKeOrderList_OrderByTimeUrl : function (ordertype, createtype, p) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangKeOrderList_OrderByTime?orderType='+ordertype+'&bookOrderCreateType='+createtype+'&p='+p+'&random='+new Date().getTime();
    },
    getAjax_FangKe_BookOrder_RefundDetailUrl : function (bookOrderId) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangKe_BookOrder_RefundDetail?bookOrderId='+bookOrderId;
    },
    getAjax_FangKe_InsurancePlanUrl : function (bookOrderTenantId) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangKe_InsurancePlan?bookOrderTenantId='+bookOrderTenantId;
    },
    getAjax_FangKe_RejectCashPledgeUrl : function (bookOrderId,version) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangKe_RejectCashPledge?bookOrderId='+bookOrderId+'&version='+version+'&rand='+new Date().getTime();
    },
    getAjax_FangKe_ConfirmCashPledgeUrl : function (bookOrderId,version) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangKe_ConfirmCashPledge?bookOrderId='+bookOrderId+'&version='+version+'&rand='+new Date().getTime();
    },
    getAjax_FangKe_ServiceCashPledgeUrl : function (bookOrderId,version) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangKe_ServiceCashPledge?bookOrderId='+bookOrderId+'&version='+version+'&rand='+new Date().getTime();
    },
    getAjax_FangKe_PayCashPledgeUrl : function (bookOrderId,payType,version) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangKe_PayCashPledge?bookOrderId='+bookOrderId+'&payType='+payType+'&version='+version+'&rand='+new Date().getTime();
    },

    getAjax_GetMoreTalkUrl : function (talkid,rows,requestTime) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetMoreTalk?talkid='+talkid+'&rows='+rows+'&_t='+requestTime;
    },
    getAjax_GetSettleAccountDetailUrl : function (orderId,pageNo) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetSettleAccountDetail?orderId='+orderId+'&p='+pageNo;
    },
    getAJAX_getSettlementListUrl : function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getSettlementList';
    },
    getAJAX_getSettlementMonthAccountListUrl : function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getSettlmentMonthAccount';
    },
    getAjax_createSettlementAccountUrl : function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_createSettlementAccount';
    },
    getAjax_delSettlementAccountUrl : function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_delSettlementAccount';
    },
    getAjax_FangDong_LuPromotionConditionUrl : function (luid) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangDong_LuPromotionCondition?luid='+luid+'&random='+new Date().getTime();
    },
    getAjax_FangDong_CancelPromotionUrl : function (luid) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangDong_CancelPromotion?luid='+luid+'&random='+new Date().getTime();
    },
    getAjax_FangDong_SelfPromotionUrl : function (luid,avgprice,selfpromotiondiscount,enddate) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangDong_SelfPromotion?luid='+luid+'&avgPrice='+avgprice+'&discount='+selfpromotiondiscount+'&endDay='+enddate+'&random='+new Date().getTime();
    },
    getAjax_ConvertRedPackageUrl : function (userid,convertvalue) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_ConvertRedPackage?userid='+userid+'&convertvalue='+convertvalue+'&_t='+new Date().getTime();
    },
    getAjax_FangDong_TenantAuthentication2GuoZhengTongUrl : function (tenantid,realname,cardno) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_FangDong_TenantAuthentication2GuoZhengTong?tenantid="+tenantid+"&realname="+realname+"&cardno="+cardno;
    },
    getAjax_ShowNewLetterUrl : function (content) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_ShowNewLetter?content='+encodeURIComponent(content);
    },
    getAjax_DelTalkUrl : function (talkid) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_DelTalk?delid='+talkid;
    },
    getAjax_SetTenpayInfoUrl : function (tenpayno,tenpayusername,balanceForm) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SetTenpayInfo?tenpayno='+tenpayno+'&tenpayusername='+tenpayusername+'&balanceform='+balanceForm;
    },
    getAjax_CheckAlipayInfoUrl : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CheckAlipayInfo';
    },
    getAjax_SaveAlipayInfoUrl : function (alipayno,alipayusername) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SaveAlipayInfo?alipayno='+alipayno+'&alipayusername='+alipayusername;
    },
    getAjax_SetAlipayInfoUrl : function (alipayno,alipayusername,balanceForm,id) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SetAlipayInfo?alipayno='+alipayno+'&alipayusername='+alipayusername+'&balanceform='+balanceForm+'&id='+id;
    },
    getAjax_SetDefaultUserPaymentUrl : function (id) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SetDefaultUserPayment?id='+id+'&rand='+Math.random();
    },
    getAjax_SetNationalSecurityInfo : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SetNationalSecurityInfo';
    },
    getAjax_FangDong_DelMyRoomsUrl : function (roomId) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangDong_MyRooms_Del?lodgeunitid='+roomId;
    },
    getAjax_FangDong_MyRoomsSwithStateUrl : function (roomId,switchstr) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangDong_MyRooms_SwithState?lodgeunitid='+roomId+'&switchval='+switchstr+'&random='+new Date().getTime();
    },
    getAjax_FangDong_MyPartRoomsUrl : function (lodgeId,pageNo) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_FangDong_MyPartRooms?parentId='+lodgeId+'&p='+pageNo;
    },
    getAjax_SetLodgeUnitCalendarUrl : function (lodgeUnitId, startDate, endDate, subPrice, bookable, roomnum) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SetLodgeUnitCalendar?lodgeunitid='+lodgeUnitId+'&startdate='+startDate+'&enddate='+endDate+'&price='+subPrice+'&bookable='+bookable+'&housenum='+roomnum+'&random='+new Date().getTime();
    },
    getAjax_GetLodgeUnitPromotionUrl : function (lodgeUnitId, startdate, enddate) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetLodgeUnitPromotion?lodgeunitid='+lodgeUnitId+'&startdate='+startdate+'&enddate='+enddate;
    },
    getAjax_GetLodgeUnitCalendarUrl : function (lodgeUnitId, startdate, enddate, vstartdate) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetLodgeUnitCalendar?lodgeunitid='+lodgeUnitId+'&startdate='+startdate+'&enddate='+enddate+'&editable=true&_vstartdate='+vstartdate+'&_t='+new Date().getTime();
    },
    getAjax_GetLodgeUnitCalendar : function (lodgeUnitId, startdate, enddate,calendarCode) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetLodgeUnitCalendar?lodgeunitid='+lodgeUnitId+'&startdate='+startdate+'&enddate='+enddate+'&calendarCode='+calendarCode+'&_t='+new Date().getTime();
    },
    getAjax_CheckCalendarVerifyCodeUrl : function(luId,verifyCode){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CheckCalendarVerifyCode?luid='+luId+'&calendarCode='+verifyCode;
    },
    getAjax_SetLodgeUnitDayPriceUrl : function (lodgeUnitId, price) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SetLodgeUnitDayPrice?lodgeunitid='+lodgeUnitId+'&price='+price+"&_t="+new Date().getTime();
    },
    getAjax_SetLodgeUnitWeekPriceUrl : function (lodgeUnitId, monValue,tueValue,wedValue,thuValue,friValue,satValue,sunValue,startDate,endDate) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_SetLodgeUnitWeekPrice?lodgeunitid="+lodgeUnitId+"&mon="+monValue+"&tue="+tueValue+"&wed="+wedValue+"&thu="+thuValue+"&fri="+friValue+"&sat="+satValue+"&sun="+sunValue+"&startdate="+startDate+"&enddate="+endDate+"&_t="+new Date().getTime();
    },
    getAjax_FangDong_WeekMonthPromotionUrl : function (lodgeUnitId, discountPerWeek,discountPerMonth) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_FangDong_WeekMonthPromotion?lodgeunitid="+lodgeUnitId+"&discountperweek="+discountPerWeek+"&discountpermonth="+discountPerMonth+"&_t="+new Date().getTime();
    },
    getAjax_SetLodgeUnitDateIntervalPriceUrl : function (lodgeUnitId, price) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_SetLodgeUnitDateIntervalPrice?lodgeunitid="+lodgeUnitId+"&price="+price+"&_t="+new Date().getTime();
    },
    getAjax_GetLodgeUnitPromotionUrl: function (lodgeUnitId, startdate, enddate) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetLodgeUnitPromotion?lodgeunitid='+lodgeUnitId+'&startdate='+startdate + '&enddate='+enddate;
    },
    getAjax_FangDong_EditOrderPriceUrl: function () {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_FangDong_EditOrderPrice";
    },
    getAjax_Pub_GetStepPreviewUrl: function (step,houseId,roomId) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_Pub_GetStep"+step+"_Preview?houseId="+houseId+"&roomId="+roomId+"&_t="+new Date().getTime();
    },
    getAjax_Pub_GetStepEditUrl: function (step,houseId,roomId) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_Pub_GetStep"+step+"?houseId="+houseId+"&roomId="+roomId+"&_t="+new Date().getTime();
    },
    getAjax_FangKe_BookOrder_RefundSubmitUrl : function (bookOrderId, cancelBookOrderType, cancelBookOrderReason) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangKe_BookOrder_RefundSubmit?bookOrderId='+bookOrderId+'&cancelBookOrderType='+cancelBookOrderType+'&cancelBookOrderReason=' + encodeURIComponent(cancelBookOrderReason);
    },
    getAjax_Pub_GetProvinceJson : function (nation_id) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getProvinceInfoJson?nationid='+nation_id+'&_t=' + new Date().getTime();
    },
    getAjax_Pub_GetCityJson : function (province_id) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getCityJson?provinceid='+province_id+'&_t=' + new Date().getTime();
    },
    getAjax_Pub_GetDistrictJson : function (city_id) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getDistrictJson?cityid='+city_id+'&_t=' + new Date().getTime();
    },
    getAjax_Pub_GetStreetJson : function (district_id) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getLocaltion?districtid='+district_id+'&_t=' + new Date().getTime();
    },
    getAjax_Pub_GetStreetsJson : function (district_id) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getStreetJson?districtid='+district_id+'&_t=' + new Date().getTime();
    },
    getAjax_Pub_CheckAlipayInfo : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CheckAlipayInfo';
    },
    getAjax_Pub_SaveAlipayInfo : function (alipayno,alipayusername) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SaveAlipayInfo?alipayno='+alipayno+'&alipayusername='+encodeURIComponent(alipayusername);
    },
    getAjax_Pub_SetAlipayInfo : function (alipayno,alipayusername,balanceForm) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SetAlipayInfo';
        //return window.location.protocol+'//'+domain+'/ajax.php?op=Ajax_SetAlipayInfo&alipayno='+alipayno+'&alipayusername='+alipayusername+'&alipaybalanceform='+balanceForm;
    },
    getAjax_Pub_PreBankPayMent_Submit : function (bankname,bankprovice,bankcity,bankaccountid,bankbranchname,pubpri,bankbranchtex,bankaccountname) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_PUB_PreBanckPayMent_Submit?bankname='+bankname+'&bankprovice='+bankprovice+'&bankcity='+bankcity+'&bankaccountid='+bankaccountid+'&bankbranchname='+bankbranchname+'&pubpri='+pubpri+'&bankbranchtext='+bankbranchtex+'&bankaccountname='+bankaccountname;
    },
    getAjax_Pub_Set_SelfPromotion : function (luid) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_Set_SelfPromotion?luid='+luid;
    },
    getAjax_Pub_CutImage : function (url,width,height) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CutImage?key='+url+'&_w='+width+'&_h='+height;
    },
    getAjax_Pub_UploadCutAfterIamge : function (key,value) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_uploadCutAfterImage?key='+key+'&value='+value;
    },
    getAjax_Pub_PreGetUserHeadImg : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_PUB_PreGetUserHeadImg';
    },
    getPub_Step1_SubmitSave : function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_HouseDetail_Submit';
    },
    getPub_Step1_RoomBase_SubmitSave : function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_RoomBase_Submit';
    },
    getPub_Step2_SubmitSave : function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_RoomDetail_Submit';
    },
    getPub_Step3_SubmitSave : function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_RoomFacilities_Submit';
    },
    getPub_Step4_SubmitSave : function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_RoomPicture_Submit';
    },
    getPub_Step5_SubmitSave : function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_RoomPrice_SubmitSave';
    },
    getAjax_RoomProcessPass : function(roomId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_RoomProcessPass?roomId='+roomId;
    },
    getPub_HouseDetail : function(roomId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_GetStep1map?roomId='+roomId;
    },
    getPub_PreviewHouseDetail : function(roomId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_GetStep1map_Preview?roomId='+roomId;
    },
    getPub_PreviewHouseRoomDetail : function(roomId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_PreviewHouseRoomDetail?roomId='+roomId;
    },
    getPub_Preview_HouseRoomDetail : function(roomId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_Preview_HouseRoomDetail?roomId='+roomId;
    },
    getPub_PreviewDetail : function(roomId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_PreviewDetail?roomId='+roomId;
    },
    getPub_Preview_RoomDetail : function(roomId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_Preview_RoomDetail?roomId='+roomId;
    },
    getPub_PreviewFacilities : function(roomId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_PreviewFacilities?roomId='+roomId;
    },
    getPub_Preview_RoomFacilities : function(roomId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_Preview_RoomFacilities?roomId='+roomId;
    },
    getPub_PreviewPicture : function(roomId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_PreviewPicture?roomId='+roomId;
    },
    getPub_Preview_RoomPicture : function(roomId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_Preview_RoomPicture?roomId='+roomId;
    },
    getPub_PreviewPrice : function(roomId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_PreviewPrice?roomId='+roomId+'&room_type=2';
    },
    getPub_Preview_Price : function(roomId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_Preview_RoomPrice?roomId='+roomId;
    },
    getPub_PreviewPriceQequest : function(roomId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_PreviewPriceQequest?roomId='+roomId+'&room_type=3';
    },
    getPub_Preview_PriceQequest : function(roomId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_Preview_RoomPriceQequest?roomId='+roomId;
    },
    getPub_Preview_Success : function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_Preview_Success';
    },
    getPub_LodgeUnitSite : function(houseId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_GetLodgeUnitSite?houseId='+houseId+'&rand='+Math.random();
    },
    getPub_LodgeUnitSite_Save : function(houseId,nationId,provinceId,cityId,districtId,streetId,inputAddress,latlng,doorNumber){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_GetLodgeUnitSite_Save?houseId='+houseId+'&nationId='+nationId+'&provinceId='+provinceId+'&cityId='+cityId+'&districtId='+districtId+'&streetId='+streetId+'&inputAddress='+inputAddress+'&latlng='+latlng+'&doorNumber='+doorNumber+'&rand='+Math.random();
    },
    getPub_EditAddress : function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_EditAddress';
    },
    getPub_CheckAddressUrl : function(provinceId,longitude,latitude){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_CheckAddress?provinceId='+provinceId+'&longitude='+longitude+'&latitude='+latitude+'&rand='+Math.random();
    },
    getFront_Map_GetMapData : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetMapData';
    },
    getFront_Map_GetSubway4Map : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetSubway4Map';
    },
    getFront_Map_CheckSearchCondition : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CheckSearchCondition';
    },
    getAjax_Map_GetLandMarkSuggestion : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getLandMarkSuggestion';
    },
    getAjax_FangDong_SetAutoCheck : function (isAutoCheck) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SetAutoCheck?isAutoCheck=' + isAutoCheck;
    },
    getAjax_Front_GetCancelRule : function (luid,roomNum,startDate,endDate) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_GetCancelRule?luid='+luid+'&roomNum='+roomNum+'&startdate='+startDate+'&enddate='+endDate+'&rand='+new Date().getTime();
    },
    getAjax_Front_GetBookAbleRoomNum : function (lodgeId,startDate,endDate) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetBookAbleRoomNum?lodgeunitid='+lodgeId+'&startdate='+startDate+'&enddate='+endDate;
    },
    getAjax_Front_GetRoomBookAble : function (lodgeId,sameRoomNum,startDate,endDate,bookOrderId,version) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetRoomBookAble?lodgeId='+lodgeId+'&sameRoomNum='+sameRoomNum+'&startdate='+startDate+'&enddate='+endDate+'&bookorderid='+bookOrderId+'&version='+version+'&rand='+new Date().getTime();
    },
    getAjax_Front_GetTotalPrice4BookOrder : function (lodgeId,sameRoomNum,startDate,endDate) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetTotalPrice4BookOrder?lodgeId='+lodgeId+'&sameRoomNum='+sameRoomNum+'&startdate='+startDate+'&enddate='+endDate+'&rand='+Math.floor(Math.random()*10000);
    },
    getAjax_Front_PicCheckCodeVerify : function (checkcode,phone) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_PicCheckCodeVerify?checkcode='+checkcode+'&phone='+phone;
    },
    getAjax_Front_UpdateLoginUser : function (name,sex) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_UpdateLoginUser?realName='+encodeURIComponent(name)+'&sex='+sex+'&random='+new Date().getTime();
    },
    getAjax_Front_PhoneIsLoginUser : function (mobile,name,sex) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_PhoneIsLoginUser?mobile='+mobile+'&realName='+encodeURIComponent(name)+'&sex='+sex+'&random='+new Date().getTime();
    },
    getAjax_Front_CollegeStudentShare : function (status,image,state,objId,objType,friendName,phone,phonecode,email) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/SendCollegeStudentShare?status='+status+'&image='+image+'&state='+state+'&objId='+objId+'&objType='+objType+'&friendName='+friendName+"&phone="+phone+"&phonecode="+phonecode+"&email="+email;
    },
    getAjax_Front_PhoneIsNotExist_PhoneIsLoginUser : function (value) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_PhoneIsNotExist_PhoneIsLoginUser?phone='+value+'&rand='+new Date().getTime();
    },
    getAjax_Front_GaoXiao_RoomComment : function (luid) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetComment4GaoXiao?luid='+luid;
    },
    getWeb_FangDong_CommentUrl : function (filter) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_Comment&filter='+filter;
    },
    getAjax_Front_UserTenantList : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangKe_UserTenant?rand='+new Date().getTime();
    },
    getWeb_FangKe_CommentUrl : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangKe_Comment';
    },
    getAjax_UserReal_RenZheng : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_UserReal_RenZheng';
    },
    getAjax_FD_DelDiaryUrl : function (id) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FD_DelDiary?id='+id;
    },
    getAJAX_FD_RealNameVerifyImgSubUrl : function (data,flag) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_FD_RealNameVerifyImgSub?data=' + data +"&flag=" + flag;
    },
    getFangDong_CutSpecialHeadImageFrameUrl : function (imageUrl,markdw,markdh) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_CutSpecialHeadImageFrame&imageUrl=' + imageUrl + '&markdw=' + markdw + '&markdh=' + markdh;
    },
    getAjax_FD_SaveSpecialHeadImage : function (cutx,cuty,cutw,cuth,oriw,orih,oriurl,cutbkgw,cutbkgh,imgIntro) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FD_SaveSpecialHeadImage?cutx=' + cutx +"&cuty=" + cuty + "&cutw=" + cutw + "&cuth=" + cuth + "&oriw=" + oriw + "&orih=" + orih + "&oriurl=" + oriurl + "&cutbkgw=" + cutbkgw + "&cutbkgh=" + cutbkgh + "&imgIntro=" + encodeURIComponent(imgIntro);
    },
    getAjax_FD_DiaryCountUrl : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FD_DiaryCount';
    },
    getAjax_FD_Special_OfflineUrl : function (id) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FD_Special_Offline?id=' + id;
    },
    getAjax_FD_Special_OnlineUrl : function (id) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FD_Special_Online?id=' + id;
    },
    getAjax_FD_RealNameVerifySubUrl : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FD_RealNameVerifySub';
    },
    getAjax_FD_Diary_ToTopUrl : function (id) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FD_Diary_ToTop?id=' + id;
    },
    getAjax_FD_Diary_ToTop_CountUrl : function (id) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FD_Diary_ToTop_Count';
    },
    getFDDiaryUploadImgUrl : function () {
        return window.location.protocol+'//'+domain+'/imgin4ImageText.php';
    },
    getAjax_GetTenantTagsUrl: function (tenantId) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetTenantTags?tenantid=' + tenantId;
    },
    getAjax_UpdateSelfIntroUrl: function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_UpdateSelfIntro';
    },
    getAjax_UpdateCheckInInfoDisplayTypeUrl: function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_UpdateCheckInInfoDisplayType';
    },
    getAjax_GetTenantSpecialHeadImgsUrl: function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetTenantSpecialHeadImgUrl';
    },
    getAjax_SetTenantSpecialHeadImgUrl: function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SetTenantSpecialHeadImgUrl';
    },
    getAjax_SearchLodgeUnit : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SearchLodgeUnit';
    },
    getWeb_NeedPub: function (cityDomain, startDate, endDate) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=Front_Need_Pub&startDate='+startDate+'&endDate='+endDate+'&searchcity='+cityDomain;
    },
    getWeb_NeedPubSubmit : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=Front_Need_Pub_Submit';
    },
    getAjax_SetTenantNeedResponseStatus : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SetTenantNeedResponseStatus';
    },
    getAjax_SetTenantNeedTimeOutStatus : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SetTenantNeedTimeOutStatus';
    },
    getAjax_NeedLodgeunit : function () {
        return window.location.protocol+'//'+domain+'//ajaxRequest/Ajax_getNeedLodgeunit';
    },
    getAjax_NeedLandlord : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getNeedLandlord';
    },
    getAjax_ValidNeedCount : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_ValidNeedCount';
    },
    getFront_Login : function (next) {
        return window.location.protocol+'//'+topLevelDomain+'/login?next='+next;
    },
    getAjax_MakeAgeInfo : function (year,month,day) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_MakeAgeInfo?year='+year+'&month='+month+'&day='+day;
    },
    getAjax_CookieNoSubmitUsernameAndEmail : function (username,email) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CookieNoSubmitUsernameAndEmail?username='+username+'&email='+email;
    },
    getAjax_IncreaseGuideVisits : function (guideType) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_IncreaseGuideVisits?type='+guideType+'&random='+ new Date().getTime();
    },
    getAjax_FK_OperatorTenantNeedOrderUrl : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FK_OperatorTenantNeedOrder';
    },
    getAjax_FD_OperatorTenantNeedOrderUrl : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FD_OperatorTenantNeedOrder';
    },
    getAjax_GetTenantNeedOrderPriceDetailUrl : function (id) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetTenantNeedOrderPriceDetail?tenantNeedOrderId=' + id + "&rand="+new Date().getTime();
    },
    getAJAX_TenantNeedOrderPaySynLockCheckUrl : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_TenantNeedOrderPaySynLockCheck';
    },
    getAjax_FD_EditTenantNeedOrderPriceUrl: function () {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_FD_EditTenantNeedOrderPrice";
    },
    getAjax_InviteFriendByEmailUrl : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_InviteFriendByEmail';
    },
    getAjax_UpdateInviteCodeUrl : function () {
        return window.location.protocol+'//' + domain + '/ajaxRequest/Ajax_UpdateInviteCode';
    },
    getAjax_InviteListUrl : function (offset) {
        return window.location.protocol+'//' + domain + '/ajaxRequest/Ajax_InviteList?offset=' + offset + '&length=10';
    },
    getAjax_InviteInfo : function () {
        return window.location.protocol+'//' + domain + '/ajaxRequest/Ajax_InviteInfo';
    },
    getAjax_GetReferrerLandlordsUrl : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetReferrerLandlords';
    },
    getAjax_doSettleUrl : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_doSettle';
    },
    getAjax_SetBankPaymentSubUrl : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SetBankPaymentSub';
    },
    getAjax_setAlipaymentSubUrl : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_setAlipaymentSub';
    },
    getAjax_TenantDoSettleUrl : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_TenantDoSettle';
    },
    getAjax_LandlordDirectsellSettleRecordDataUrl : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetLandlordDirectsellSettleRecordData';
    },
    getAjax_ShareAfter : function (objId,objType,shareContentType,channel) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_ShareAfter?objid='+objId+'&objtype='+objType+'&sharecontenttype='+shareContentType+'&channel='+channel;
    },
    getAjax_Exam : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_do_FangDong_Examination';
    },
    getAjax_Add_Cui : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangDong_Special_Add_Urge';
    },
    getAjax_FangkeInBlackList : function (mobile,cardNo) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangkeInBlackList?mobile='+mobile+'&cardNo='+cardNo;
    },
    getAjax_BookOrder_EditUserInfo : function (password,nickname) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_BookOrder_EditUserInfo?password='+password+'&nickname='+nickname;
    },
    getAjax_jsErrorLogger : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_JsErrorLogger';
    },
    getAjax_BookOrder_CheckState : function (lodgeId,sameRoomNum,startDate,endDate,bookOrderId,version) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_BookOrder_CheckState?luid="+lodgeId+"&roomnum="+sameRoomNum+"&startdate="+startDate+"&enddate="+endDate+'&bookOrderId='+bookOrderId+'&version='+version+"&rand="+new Date().getTime();
    },
    getAjax_1yuanAutumnStatus : function () {
        return window.location.protocol+"//"+domain+"/ajaxRequest/autumnDeep1yuanInStatus?time="+new Date().getTime();
    },
    getAjax_Add_Zan : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Add_Zan';
    },
    getAjax_sendCoupon4AprilFoolDay : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_sendCoupon4AprilFoolDay';
    },
    getAjax_BookPayIntegralCoupon : function (bookorderid){
       return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_BookPayIntegralCoupon?bookorderid='+bookorderid;
    },
    getAjax_CouponInfo: function (couponid){
       return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetCouponInfo?couponid='+couponid;
    },
    getAjax_BookPayAbleCoupon: function (bookorderid){
       return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_BookPayAbleCoupon?bookorderid='+bookorderid;
    },
    //dpv2 feiqi
    getWeb_FangKe_CheckCommentUrl: function (bookorderid){
       return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CommitCheck?bookorderid='+bookorderid;
    },
    getAddBillSubUrl : function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FK_AddBillSub';
    },
    getUserBillHistoryUrl : function(pageNum){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FK_BillHis?p='+pageNum+'&rand='+Math.random();
    },
    getCancelBillUrl : function(id){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FK_BillCancel?id='+id;
    },
    getAddBillUrl : function(id){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FK_AddBill?invoiceId='+id+'&rand='+Math.random();
    },
    getBillUrl : function(state,id){
        var url = '';
        if(state){
            url = '&state='+state;
        }
        if(id){
            url = '&invoiceId='+id;
        }
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FK_AddBill'+url;
    },
    getAjax_drawLottery4NoonBreakUrl : function (district,address){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_DrawLottery4NoonBreak?district='+district+'&address='+address+'&rand='+Math.random();
    },
    getAjax_getNoonBreakAwardUrl : function (name,mobile,sleepTime){
        if(name && mobile && sleepTime){
            return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getNoonBreakAward?name='+encodeURI(name)+'&mobile='+mobile+'&sleepTime='+sleepTime+'&rand='+Math.random();
        } else {
            return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getNoonBreakAward?rand='+Math.random();
        }
    },
    getAjax_getAvaliableCarBedUrl : function (){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getAvaliableCarBed?rand='+Math.random();
    },
    getAjax_LuckerList4NoonBreakUrl : function (){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_LuckerList4NoonBreak?rand='+Math.random();
    },
    getAjaxAddFavorite: function (loginUserid,lodgeUnitId){
       return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_AddFavorite?loginUserid='+loginUserid+'&lodgeUnitId='+lodgeUnitId+'&rand='+new Date().getTime();
    },
    getAjaxEditFavoriteGroup: function (){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_EditFavoriteGroup';
    },
    getAjaxAddFavoritePage: function (lodgeUnitId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getAddFavorite?lodgeUnitId='+lodgeUnitId+'&rand='+new Date().getTime();
    },
    getAjaxAddFavoriteNew: function (){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_AddFavoriteNew';
    },
    getAjaxCancelFavorite: function (lodgeUnitId,groupId){
       return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CancelFavorite?lodgeUnitId='+lodgeUnitId+'&groupId='+groupId+'&rand='+new Date().getTime();
    },
    getAjaxCancelAllFavorite: function (lodgeUnitId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CancelAllFavorite?lodgeUnitId='+lodgeUnitId+'&rand='+new Date().getTime();
    },
    getAjaxAddFavoriteGroup: function (){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_addFavoriteGroup';
    },
    getAjaxDelFavoriteGroup: function (){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_delFavoriteGroup';
    },
    getAjaxGetZhiMaNoCashPledgeList: function (cityId){
       return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getZhiMaNoCashPledgeList?cityId='+cityId+'&rand='+new Date().getTime();
    },
    getAjaxApplyCashPledgeByLandlordUrl : function(bookOrderId,pledge2Landlord,reason){
       return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FD_ApplyCashPledge';
    },
    getAjaxCancelCashPledgeByLandlordUrl : function(bookOrderId,version){
       return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FD_CancelCashPledge?bookOrderId='+bookOrderId+'&version='+version+'&rand='+new Date().getTime();
    },
    getAjaxApplyServiceByLandlordUrl : function(bookOrderId,version){
       return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FD_ApplyService4CashPledge?bookOrderId='+bookOrderId+'&version='+version+'&rand='+new Date().getTime();
    },
    getReturnCashPledgeUrl : function(bookOrderId,version){
       return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FD_ReturnCashPledge?bookOrderId='+bookOrderId+'&version='+version+'&rand='+new Date().getTime();
    },
    getAJAX_GetLodgeUnitCalendar : function (luid,startDate,endDate,editable,calendarCode,spiderAvoidToken){
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_GetLodgeUnitCalendar?lodgeunitid='+luid+'&startdate='+startDate+'&enddate='+endDate+'&editable='+editable+'&calendarCode='+calendarCode+'&rand='+Math.random();
    },
    getAJAX_ActivitySanyaXiamen : function (){
        return window.location.protocol+'//'+domain+'/yunying.php?op=YunYing_luckyDraw&rand='+Math.random();
    },
    getAJAX_ActivitySanyaXiamenShare : function (){
        return window.location.protocol+'//'+domain+'/yunying.php?op=YunYing_shareLuckyDraw&rand='+Math.random();
    },
    getAJAX_applyCleanService : function (){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_applyCleanService';
    },
    getAJAX_getMsCoupon : function (){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getMsCoupon';
    },
    getAJAXA_getServiceTimeByDate : function(date){
        return window.location.protocol+'//'+domain+'/xzweb.php?op=Ajax_getServiceTimeByDate&date='+date+'&rand='+new Date().getTime();
    },
    getAjax_submitCleanServiceOrder : function(){
        return window.location.protocol+'//'+domain+'/xzweb.php?op=Ajax_submitCleanServiceOrder';
    },
    getCleanServiceOrderDetailUrl : function(orderId){
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_CleanServiceOrderDetail&orderId='+orderId;
    },
    getAjax_cleanServiceOrderPaySubmit : function(orderId,bank) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_CleanServiceOrderPaySubmit&orderId='+orderId+'&bank='+bank;
    },
    getAjax_cancelCleanServiceOrder : function(orderId,cancelType,returnMoney,punishMoney){
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_CleanServiceOrderCancelSubmit&orderId='+orderId+'&returnMoney='+returnMoney+'&punishMoney='+punishMoney+'&cancelType='+cancelType+'&rand='+new Date().getTime();
    },
    getFangDong_MyRoomsUrl : function(){
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_MyRooms';
    },
    getAjax_sendCouponUrl: function (mobile,verifycode,state) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_sendCoupon?mobile="+mobile + "&verifycode=" + verifycode + "&state=" +state;
    },
    getBookOrderSubmitUrl: function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=Front_AddBookorderSubmit';
    },
    getAjax_nationCodeHtml: function () {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_GetNationCodeHtml";
    },
    getAjax_nationCardHtml: function () {
        return window.location.protocol+"//"+domain+"/xzweb.php?op=GetNationCardHtml";
    },
    getAjax_CheckTenantMobile: function (tenantId,mobile,mobileNation) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_CheckTenantMobile?tenantId="+tenantId+"&tenantMobile="+mobile+"&mobileNation="+mobileNation;
    },
    getAjax_checkEmailValiCodeUrl: function () {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_Front_ValidateRegEmail";
    },
    getAjax_checkFindPwdEmailValiCodeUrl: function () {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_Front_ValidateFindPwdEmail";
    },
    getAjax_checkActiveEmailValiCodeUrl: function () {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_Front_ValidateActiveEmail";
    },
    get_SetUserInfoSubUrl : function() {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=SetUserInfoSubByType';
    },
    getWeb_GetProvinceUrl : function (nationId) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=Pub_SelProvinceJson&nationid=' + nationId ;
    },
    getAjax_GetShareInfo : function (objId,objType,shareContentType,cityId,shareInvite,hideWechat) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetShareInfo?objId='+objId+'&objType='+objType+'&shareContentType='+shareContentType+'&cityId='+cityId+'&shareInvite='+shareInvite+'&hideWechat='+hideWechat;
    },
    getAjax_GetCityLightsV3Url : function() {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_DoCityLightsV3';
    },
    getAjax_GetFirstOrderReducePermission : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetFirstOrderReducePermission';
    },
    getAjax_ChannelStatistics : function (objid, opertype, channels, statisticsSign) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_StatisticsSubmit?objid='+objid+'&opertype='+opertype+'&channels='+channels+'&statisticsSign='+statisticsSign;
    },
    getAjax_UnSignFirstCheckIn : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_UnSignFirstCheckIn';
    },
    getAjax_doSignFirstCheckIn : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_doSignFirstCheckIn';
    },
    getAjax_GetQualificationConfigList: function (luId) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Qualification_QualificationConfigList?luId='+luId;
    },
    getAjax_GetQualificationInfo: function (luId) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Qualification_QualificationInfo?luId='+luId;
    },
    getAjax_Qualification_Submit: function (){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Qualification_Submit';
    },
    getAjax_QualificationMaterial: function(materialConfigId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_QualificationAvailableMaterial?materialConfigId='+materialConfigId;
    },
    getQualicationInfo : function(luId){
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_QualificationInfo&lodgeUnitId='+luId;
    },
    getFangKeUserInfo : function(){
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangKe_UserInfo';
    },
    getFdOrderDetailUrl : function(bookOrderId){
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_OrderDetail&bookOrderId='+bookOrderId;
    },
    getFkOrderDetailUrl : function(bookOrderId){
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangKe_OrderDetail&bookOrderId='+bookOrderId;
    },
    getAjax_doFullTextSearchUrl: function(offset, url){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_doFullTextSearch?offset='+offset+'&url='+url;
    },
    getAjax_CheckIDCardIfAuth : function(idcard){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CheckIDCardIfAuth?idcard='+idcard;
    },
    getAjax_SendSensitiveOPCode: function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SendSensitiveOPCode';
    },
    getAjax_SensitiveOPCodeVerify: function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SensitiveOPCodeVerify';
    },
    getAjax_PartnerSetNewsletter : function (partnerChannel,canSend) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_PartnerSetNewsletter?partnerChannel='+encodeURIComponent(partnerChannel)+'&canSend='+encodeURIComponent(canSend);
    },
    getAjax_updateOrderCashPledge : function (bookOrderId) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_UpdateOrderCashPledge?bookOrderId='+bookOrderId;
    },
    getAjax_CheckPartnerOrderPrice : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CheckPartnerOrderPrice';
    },
    getAjax_GetSameRooms : function (luId) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetSameRooms?luid='+luId;
    },
    getAjax_GetCommentDiary4Index : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getCommentDiary4Index';
    },
    getAjax_GetDetailComment : function (lodgeId,cityDomain,pageNo) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetDetailComment?lodgeId='+lodgeId+"&cityDomain="+cityDomain+"&p="+pageNo;
    },
    getAjax_GetOtherDetailComment : function (lodgeId,pageNo) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetOtherDetailComment?lodgeId='+lodgeId+'&p='+pageNo;
    },
    getAjax_FlashBook_LandlordSetting : function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FlashBook_LandlordSetting';
    },
    getAjax_FlashBook_UpdateLandlordSetting:function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FlashBook_UpdateLandlordSetting';
    },
    getAjax_GetLawPopupPage_Url:function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_GetLawPopupPage';
    },
    getAjax_GetAgreementPage_Url:function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_GetAgreementPage';
    },
    getAjax_DoAgree_Url:function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_DoAgree';
    },
    getAJAX_GetTerminalUniqueIdentification_Url:function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_GetTerminalUniqueIdentification';
    },
    getAJAX_SetTmpTerminalUniqueIdentification_Url:function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_SetTmpTerminalUniqueIdentification';
    },
    getAJAX_SetBaiTuanGetRoomInfo_Url:function(type, module, page, pagesize, random) {
    	random = typeof random !== 'undefined' ?  random : 1;
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_BaiTuanMainActivity?type='+type+'&module='+module+"&page="+page+"&pagesize="+pagesize+"&random="+random;
    },
    getAJAX_ChangeLodgeUnitRepositoryBookFlow:function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_ChangeLodgeUnitRepositoryBookFlow';
    },
    getAJAX_SetBaiTuanSendCoupond_Url:function(type,tag) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_BaiTuanCoupondSend?type='+type+"&tag="+tag;
    },
    getAJAX_SetMeisuView_Url:function(luid, module) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_BaiTuanMeisuView?luid='+luid+"&module="+module;
    },
    getAjax_CancelAuthForYunzhanggui: function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_CancelAuthForYunzhanggui';
    },
    getAjax_IsAuthToYunzhanggui: function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_IsAuthToYunzhanggui';
    },
    // 百团领券
    getAjax_baituanCoupon: function(couponActivityId,userid){
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_DoSendCouponByUser?couponActivityId='+couponActivityId+'&loginUser='+userid;
    },
    getAJAX_HomeStayActivity_Url:function(params) {
    	    var str = '';
    	    for(key in params){
            str += key+"="+params[key]+"&";
        }
        var url = window.location.protocol+'//'+domain+'/ajaxRequest?'+str;
        return url;
    },
    //百团活动页
    getWeb_baituanActivityUrl:function(){
        return window.location.protocol+'//'+domain+'/yunying.php?op=YunYing_HomeStayMain';
    },
    //图片uploadUrl
    getUpload_Url : function(params)
    {
        if(params === undefined){
            params = '';
        }
        var url = uploadImageUrl + params;
        if(uploadImageUrl.indexOf("http") != -1)
        {
            if(window.location.protocol == "https"){
                url = "https" + uploadImageUrl.substring(5) + params;
            }
        }else{
            url = window.location.protocol + '//' + uploadImageUrl + params;
        }
        return url;
    },
    
    config:{
        env: function(){
            var hostName = window.location.host;
            var envParams =['Dev','Test','Prerelease','Pro'];
            var switchPro = true,envListIndex ;
            for(var i = 0;i<envParams.length;i++){
               var reg = new RegExp(envParams[i].toLowerCase());
               if(reg.test(hostName)){
                   switchPro = false;
                   envListIndex = i;
               }
            }
            if(switchPro){
                return 'Pro';
            }else{
                return envParams[envListIndex];
            }
        },
        xzfk: '/app/xzfk/web/500/',
        // 开发环境
        mainDomainDev: 'https://wirelesspub-global.dev.xiaozhu.com',
        // 测试环境
        mainDomainTest: 'https://test-wirelesspub-global-env00.xiaozhu.com',
        // 预上线环境
        mainDomainPrerelease: 'https://prerelease-wirelesspub-global.xiaozhu.com',
        // 正式环境
        mainDomainPro: 'https://wirelesspub-global.xiaozhu.com',
        //滑动验证
        slideDomainDev: 'https://bizguard.dev.xiaozhu.com',
        slideDomainTest: 'https://test-bizguard.xiaozhu.com',
        slideDomainPrerelease: 'https://prerelease-bizguard.xiaozhu.com',
        slideDomainPro: 'https://bizguard.xiaozhu.com'
    },
    // 获取安全验证方式
    getSlideVerifyType:function(){
        return this.config['slideDomain' + this.config.env()]  + '/v2/slideVerify/type';
    },
    getSlideVerifyRes:function () {
        return this.config['slideDomain' + this.config.env()]  + '/slideVerify/check';
    },
    getProductTypeList:function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_GetProductTypeList';
    },
    getSearchCitysLists:function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SearchCitys';
    },
    getCancelRule: function(luid){
        return window.location.protocol+'//'+ domain +'/ajax.php?op=AJAX_PubSysCancelRule&luId='+ luid;
    },
    updateCancelRule: function(luid, type, limitCancelOrder){
        return window.location.protocol+'//'+ domain +'/ajax.php?op=AJAX_PubSysUpdateLodgeUnit&luId='+ luid + '&type=' + type + '&limitCancelOrder=' + limitCancelOrder;
    },
    getIndexCancelRule: function (luid) {
        return window.location.protocol+'//'+ domain +'/ajax.php?op=AJAX_LodgeUnitIndexCancelRule&luId='+ luid;
    },
    getSelectRule: function (luid) {
        return window.location.protocol+'//'+ domain +'/ajax.php?op=AJAX_CancelRuleLodgeUnitCenter&luId='+ luid;
    },
    getCancelRuleDate: function (luid, checkInDay, checkOutDay) {
        return window.location.protocol+'//'+ domain +'/ajax.php?op=AJAX_LodgeUnitIndexCancelRuleWithDate&luId='+ luid + '&checkInDay=' + checkInDay + '&checkOutDay=' + checkOutDay;
    },
    getCityInfo:function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SearchCityInfo';
    },
    getLandlordRealNameState: function (userId, luId) {
        if(!luId){
            return window.location.protocol + '//' + lodgeUnitCenterDomain + '/app/xzfd/web/500/lodgeUnit/getLandlordRealNameState?userId=' + userId;
        }
        return window.location.protocol + '//' + lodgeUnitCenterDomain + '/app/xzfd/web/500/lodgeUnit/getLandlordRealNameState?userId=' + userId + '&luId='+ luId;
    },
    getQrCode: function (luId, cityId, userId) {
        return window.location.protocol + '//' + domain + '/ajaxRequest/AJAX_getQrCode?luId=' + luId + '&cityId=' + cityId + '&userId=' + userId;
    }
}
 
 var xzRegularExpression={a:1,isNum:/^\d{1,}$/,isMobile:/^\d{11}$/,isMobileWithSplit:/^[\d-]{10,}$/,isUsername:/^[\w|\u4E00-\u9FA5|\u3400-\u4DB5|\uE815-\uE864|\u9FA6-\u9FBB]*$/,isChinese:/^[\u4E00-\u9FA5|\u3400-\u4DB5|\uE815-\uE864|\u9FA6-\u9FBB]+$/,simpleMobile:/^\d{11}$/,mobile:/^1((2[7])|(3[0-9])|(4[5-9])|(5[0-9])|(6[124567])|(7[0-8])|(8[0-9])|(9[0-9]))\d{8}$/,password:/(?!^(\d+|[a-zA-Z]+|[*!@.\-? : ;|$#%^&()_+=\[\]\\\/{}<>",~`']+)$)^[\w*!@.\-? : ;|$#%^&()_+=\[\]\\\/{}<>",~`']{0,}$/,numbers:/[1-9][0-9]{4}/,simpleEmail:/^.*?@.+$/,email:/^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9_\-]+(\.[a-zA-Z0-9_\-]+)+[a-zA-Z]+$/,passport:/^[\d\w]{4,20}$/,inviteCode:/^[A-Z0-9]{7,15}$/,simpleDate:/^([0-9]{4})-([0-9]{2})-([0-9]{2})$/,simpleDateTime:/^[1-2][0-9]{3}-[0-1][0-9]-[0-3][0-9] [0-2][0-9](:[0-5][0-9]){1,2}$/}; 
 window.captchaModel = {
    toast: function (msg, type) {
        if (!msg) return false;
        if (!$('body').find('.xz_toast_private').length) {
            var div = '<div class="xz_toast_private"><span class="toast_txt">' + msg + '</span></div>';
            $('body').append(div);
            $('.xz_toast_private').css({
                "position": "fixed",
                "z-index": '10002',
                "min-width": "380px",
                "padding": "15px 15px 15px 20px",
                "line-height": "24px",
                "text-align": "center",
                "background": "#D4EDEB",
                "color": "#26A69A",
                "font-size": "14px",
                "border-radius": "4px",
                "left": "50%",
                "transform": "translateX(-50%)",
                "top": "20px",
                "box-sizing": "border-box",
                "border": "1px solid #26A69A",
                "border-color": "#D4EDEB"
            });
            $('.xz_toast_private .toast_txt').css({
                "background-image": "url('/images/detail/icon-success.png')",
                "background-position": 'left center',
                "background-repeat": 'no-repeat',
                "padding": "10px 0 10px 30px"
            });
        } else {
            $('.xz_toast_private .toast_txt').html(msg);
        }
        $('.xz_toast_private').css({
            "background": type === "error" ? "#FFEBF2" : "#D4EDEB",
            "color": type === "error" ? "#ff4081" : "#26A69A",
            "border-color": type === "error" ? "#FFEBF2" : "#D4EDEB"
        });
        $('.xz_toast_private .toast_txt').css({
            "background-image": type === "error" ? "url('/images/detail/icon-error.png')" : "url('/images/detail/icon-success.png')"
        });
        $('.xz_toast_private').show();
        var timer = setTimeout(function () {
            $('.xz_toast_private').hide();
            $('.xz_toast_private .toast_txt').html('');
            window.clearInterval(timer);
            timer = null;
        }, 3 * 1000);
    },
    showModel: function (node) {
        if (!$('body').find('.xz_model_private').length) {
            var div = '<div class="xz_model_private"><div class="panel"><div class="slide"><div class="tips">请您完成以下验证，验证成功后可继续探索小猪。</div><div class="node">' + node + '</div></div></div></div>';

            $('body').append(div);
            $('.xz_model_private').css({
                "position": "fixed",
                "z-index": '10001',
                "background": "rgba(0, 0, 0, .6)",
                "top": "0",
                "left": "0",
                "right": "0",
                "bottom": "0",
                "display": "none"
            });
            $('.xz_model_private  .panel').css({
                "position": "fixed",
                "top": "50%",
                "left": "50%",
                "z-index": '1002',
                "width": "300px",
                "min-height": "150px",
                "padding": "25px 25px 25px 25px",
                "text-align": "center",
                "background": "#fff",
                "color": "#26A69A",
                "font-size": "14px",
                "border-radius": "4px",
                "display": "flex",
                "display": "-webkit-flex",
                "justify-content": "center",
                "-webkit-justify-content": "center",
                "align-items": "center",
                "-webkit-align-items": "center",
                "transform": "translate(-50%, -50%)",
            });
            $('.xz_model_private .tips').css({
                "margin-bottom": "20px",
                "width": "100%",
                "color": "#212121",
                "font-size": "16px",
                "text-align": "left"
            });
        } else {
            $('.xz_model_private .node').empty().append(node);
        }
        $('.xz_model_private').css('display', 'block');
    },
    hideModel: function () {
        $('.xz_model_private').css('display', 'none');
    }
};
 
 /*
*
*
* init: 操作滑动模块dom函数
* onSuccess: 验证成功的回调函数
* onLoad: 初始化成功函数
* onError: 初始化错误函数
*
*
*
* 返回实例参数：
*
*
* 验证类型 默认网易
* slideVerifyType
*
* 网易验证通过token
* NECaptchaValidate
*
*
* 阿里验证通过token
* slideVerifyToken
* slideVerifyScene
* slideVerifySessionId
* slideVerifySig
*
* 验证通过标志
* safeChecked
*
*
*
* */
var cookieApi = {
    setCookie: function (name, value, day) {
        var domain = ';path=/;domain=xiaozhu.com';
        if (day !== 0) {
            var expires = day * 24 * 60 * 60 * 1000;
            var date = new Date(+new Date() + expires);
            document.cookie = name + "=" + escape(value) + ";expires=" + date.toUTCString() + domain;
        } else {
            document.cookie = name + "=" + escape(value) + domain;
        }
    },
    getCookie: function (name){
        var arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
        if (arr = document.cookie.match(reg) ){
            return unescape(arr[2]);
        } else {
            return null;
        }
    },
    clearCookie: function (name) {
        this.setCookie(name, "", -1);
    }
};

var safeChecked
var calendarToken = cookieApi.getCookie('SPIDER_AVOID_TOKEN_calendar');
if (calendarToken) {
    localStorage.setItem('SPIDER_AVOID_TOKEN_calendar', calendarToken);
}
function Captcha(config) {
    var that = this;

    // 获取滑动验证类型接口
    var URL_GET_SLIDE_VERIFY_TYPE = XZWebUrlWriter.getSlideVerifyType();
    // 滑动验证码验证接口
    var URL_GET_SLIDE_VERIFY_RES = XZWebUrlWriter.getSlideVerifyRes();

    var fetch = function (type, url, cb) {
        // 获取滑动验证类型
        if (type === 'res') {
            url = url +
                '?NECaptchaValidate=' + that.NECaptchaValidate +
                '&slideVerifyType=' + that.slideVerifyType +
                '&slideVerifyToken=' + that.slideVerifyToken +
                '&slideVerifySessionId=' + that.slideVerifySessionId +
                '&slideVerifySig=' + that.slideVerifySig +
                '&slideVerifyScene=' + that.slideVerifyScene +
                '&ticket=' + that.tencentTicket +
                '&randstr=' + that.tencentRandstr +
                '&use=' + 'biz' +
                '&token=' + that.secondToken +
                '&busiKey=' + config.busiKey;
        }
        if(type === 'type'){
            url = url +
                '?use=' + 'biz';
        }
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                cb(xhr.responseText);
            }
        };
        xhr.send();
    };

    // 验证类型 默认网易云
    that.slideVerifyType = 'yidun';

    //二次校验token
    that.secondToken = '';

    //验证平台的appId
    that.appId = '';

    // 网易验证通过token
    that.NECaptchaValidate = '';

    // 阿里验证通过token
    that.slideVerifyToken = '';
    that.slideVerifyScene = '';
    that.slideVerifySessionId = '';
    that.slideVerifySig = '';

    // 腾讯验证通过token
    that.tencentTicket = '';
    that.tencentRandstr = '';

    // 验证通过
    that.safeChecked = false;

    //Referer
    var codeObj =  {
        pc : '0c1de00ffc10c3fe',
    };
    that.referer = 'pc'+ codeObj.pc;

    if (config.busiKey) {
        localStorage.setItem('SAFE_CHECKED_' + config.busiKey, 'no');
    }

    var uniqueId = Math.random().toString(36).substr(2);
    var initSafeCheck = function () {
        var head= document.getElementsByTagName('head')[0];
        var first= head.firstChild;
        var spidersafeScript = document.createElement("script");
        spidersafeScript.setAttribute('id', 'captcha');
        spidersafeScript.type = "text/javascript";
        if(that.slideVerifyType === 'yidun'){
            spidersafeScript.src = "https://cstaticdun.126.net/load.min.js";
        }else if(that.slideVerifyType === 'aliyun'){
            spidersafeScript.src = "https://g.alicdn.com/sd/ncpc/nc.js?t=2015052012";
        }else if(that.slideVerifyType === 'tencent'){
            spidersafeScript.src = "https://ssl.captcha.qq.com/TCaptcha.js";
        }
        function spidersafeScriptOnLoadFn(){
            var slideContainer = '<div style="margin-bottom: 10px;width: 100%;" id="'+ that.slideVerifyType + uniqueId + '" class="nc-container"></div>';
            if (that.slideVerifyType === 'yidun') {
                /*
                *
                * 网易验证
                *
                * */
                config.init(slideContainer);
                initNECaptcha({
                    // 网易key
                    captchaId: '8c35527a6e7f4dcbba3768634a3bc61f',
                    // 网易验证码容器
                    element: '#' + that.slideVerifyType + uniqueId,
                    mode: config.mode || 'embed',
                    width: 340,
                    // 验证码一切准备就绪，此时可正常使用验证码的相关功能
                    onReady: function (instance) {

                    },
                    // 验证成功
                    onVerify: function (err, data) {
                        try {
                            that.NECaptchaValidate = data.validate || '';
                            var verifySucCb = function (res) {
                                var data = typeof res === 'string' ? JSON.parse(res) : res;
                                if (data.status === 200) {
                                    if (config.busiKey) {
                                        var spiderAvoidToken = data.content.slideToken;
                                        var spiderAvoidTokenKey = 'SPIDER_AVOID_TOKEN_' + config.busiKey;
                                        if (config.busiKey === 'calendar') {
                                            cookieApi.clearCookie('SPIDER_AVOID_TOKEN_calendar');
                                            cookieApi.setCookie(spiderAvoidTokenKey, spiderAvoidToken);
                                        }
                                        localStorage.setItem(spiderAvoidTokenKey, spiderAvoidToken);
                                    }
                                    $('.input-slidecode-tip').hide();
                                    that.safeChecked = true;
                                    if (config.busiKey) {
                                        localStorage.setItem('SAFE_CHECKED_' + config.busiKey, 'yes');
                                    }
                                    if (config.onSuccess) {
                                        config.onSuccess();
                                    }
                                }
                            };
                            fetch('res', URL_GET_SLIDE_VERIFY_RES, verifySucCb);
                        } catch (error) {
                            console.log(error);
                        }

                    }
                }, function onload(instance) {
                    // 初始化成功
                    if (config.onLoad) {
                        config.onLoad();
                    }
                }, function onerror(err) {
                    // 验证码初始化失败处理逻辑，例如：提示用户点击按钮重新初始化
                    if (config.onError) {
                        config.onError();
                    }
                })
            } else if (that.slideVerifyType === 'aliyun') {
                /*
                *
                * 阿里验证
                *
                * */
                config.init(slideContainer);
                var nc_token = ['CF_APP_1', (new Date()).getTime(), Math.random()].join(':');
                var NC_Opt = {
                    renderTo: '#' + that.slideVerifyType + uniqueId,
                    appkey: 'FFFF0N0000000000703C',
                    scene: 'nc_register',
                    token: nc_token,
                    customWidth: config.width || 300,
                    trans: {
                        'key1': 'code0'
                    },
                    elementID: ['usernameID'],
                    is_Opt: 0,
                    language: 'cn',
                    isEnabled: true,
                    timeout: 3000,
                    times: 5,
                    apimap: {
                        // 'analyze': '//a.com/nocaptcha/analyze.jsonp',
                        // 'get_captcha': '//b.com/get_captcha/ver3',
                        // 'get_captcha': '//pin3.aliyun.com/get_captcha/ver3'
                        // 'get_img': '//c.com/get_img',
                        // 'checkcode': '//d.com/captcha/checkcode.jsonp',
                        // 'umid_Url': '//e.com/security/umscript/3.2.1/um.js',
                        // 'uab_Url': '//aeu.alicdn.com/js/uac/909.js',
                        // 'umid_serUrl': 'https://g.com/service/um.json'
                    },
                    callback: function (data) {
                        try {
                            that.slideVerifyToken = nc_token;
                            that.slideVerifySessionId = data.csessionid;
                            that.slideVerifySig = data.sig;
                            that.slideVerifyScene = NC_Opt.scene;
                            var verifySucCb = function (res) {
                                var data = typeof res === 'string' ? JSON.parse(res) : res;
                                if (data.status === 200) {
                                    if (config.busiKey) {
                                        var spiderAvoidToken = data.content.slideToken;
                                        var spiderAvoidTokenKey = 'SPIDER_AVOID_TOKEN_' + config.busiKey;
                                        localStorage.setItem(spiderAvoidTokenKey, spiderAvoidToken);
                                        if (config.busiKey === 'calendar') {
                                            cookieApi.clearCookie('SPIDER_AVOID_TOKEN_calendar');
                                            cookieApi.setCookie(spiderAvoidTokenKey, spiderAvoidToken);
                                        }
                                    }
                                    $('.input-slidecode-tip').hide();
                                    that.safeChecked = true;
                                    if (config.busiKey) {
                                        localStorage.setItem('SAFE_CHECKED_' + config.busiKey, 'yes');
                                    }
                                    if (config.onSuccess) {
                                        config.onSuccess();
                                    }
                                }
                            };
                            fetch('res', URL_GET_SLIDE_VERIFY_RES, verifySucCb);
                        } catch (error) {
                            console.log(error);
                        }
                    },
                    error: function () {
                        if (config.onError) {
                            config.onError();
                        }
                    }
                };
                var nc = new noCaptcha(NC_Opt);
                nc.upLang('cn', {
                    _startTEXT: '请按住滑块，拖动到最右边',
                    _yesTEXT: '验证通过',
                    _error300: '哎呀，出错了，点击<a href="javascript:__nc.reset()">刷新</a>再来一次',
                    _errorNetwork: '网络不给力，请<a href="javascript:__nc.reset()">点击刷新</a>'
                })
            }else if(that.slideVerifyType == 'tencent'){
                config.init(slideContainer);
                var html = '<div class="tencent-btn">点击进行验证</div>'
                $('#' + that.slideVerifyType + uniqueId).append(html);
                var captchaTencent = new TencentCaptcha(
                    that.appId,
                    function(res) {
                        if(res.ret === 0){
                            that.tencentTicket = res.ticket;
                            that.tencentRandstr = res.randstr;
                            let verifySucCb = function (res) {
                                let data = typeof res === 'string' ? JSON.parse(res) : res;
                                //暂时
                                if (data.status === 200 && data.content.slideToken) {
                                    if (config.busiKey) {
                                        let spiderAvoidToken = data.content.slideToken;
                                        let spiderAvoidTokenKey = 'SPIDER_AVOID_TOKEN_' + config.busiKey;
                                        localStorage.setItem(spiderAvoidTokenKey, spiderAvoidToken);
                                        if (config.busiKey === 'calendar') {
                                            cookieApi.clearCookie('SPIDER_AVOID_TOKEN_calendar');
                                            cookieApi.setCookie(spiderAvoidTokenKey, spiderAvoidToken);
                                        }
                                        localStorage.setItem(spiderAvoidTokenKey, spiderAvoidToken);
                                    }
                                    $('.input-slidecode-tip').hide();
                                    that.safeChecked = true;
                                    if (config.busiKey) {
                                        localStorage.setItem('SAFE_CHECKED_' + config.busiKey, 'yes');
                                    }
                                    $('.tencent-btn').text('验证成功');
                                    $('.tencent-btn').addClass('tencent-btn-success');
                                    if (config.onSuccess) {
                                        config.onSuccess();
                                        captchaTencent.destroy();
                                    }
                                }else{
                                    captchaTencent.show();
                                }
                            };
                            fetch('res', URL_GET_SLIDE_VERIFY_RES, verifySucCb);
                        }
                    });
                $('#' + that.slideVerifyType + uniqueId).on('click',function () {
                    if($('.tencent-btn').hasClass('tencent-btn-success')){
                        $('.tencent-btn').removeClass('tencent-btn-success');
                        localStorage.setItem('SAFE_CHECKED_' + config.busiKey, 'no');
                    }
                    captchaTencent.show();
                });
            }
        }
        //插入之前移除js
        var safeScriptHtml = 'script[src="' + spidersafeScript.src + '"]';
        if($(safeScriptHtml).length > 0){
            var self = this;
            setTimeout(function () {
                var slideContainer = '<div style="margin-bottom: 10px;width: 100%;" id="'+ that.slideVerifyType + uniqueId + '" class="nc-container"></div>';
                if (that.slideVerifyType === 'yidun') {
                    /*
                    *
                    * 网易验证
                    *
                    * */
                    config.init(slideContainer);
                    initNECaptcha({
                        // 网易key
                        captchaId: '8c35527a6e7f4dcbba3768634a3bc61f',
                        // 网易验证码容器
                        element: '#' + that.slideVerifyType + uniqueId,
                        mode: config.mode || 'embed',
                        width: 340,
                        // 验证码一切准备就绪，此时可正常使用验证码的相关功能
                        onReady: function (instance) {

                        },
                        // 验证成功
                        onVerify: function (err, data) {
                            try {
                                that.NECaptchaValidate = data.validate || '';
                                var verifySucCb = function (res) {
                                    var data = typeof res === 'string' ? JSON.parse(res) : res;
                                    if (data.status === 200) {
                                        if (config.busiKey) {
                                            var spiderAvoidToken = data.content.slideToken;
                                            var spiderAvoidTokenKey = 'SPIDER_AVOID_TOKEN_' + config.busiKey;
                                            if (config.busiKey === 'calendar') {
                                                cookieApi.clearCookie('SPIDER_AVOID_TOKEN_calendar');
                                                cookieApi.setCookie(spiderAvoidTokenKey, spiderAvoidToken);
                                            }
                                            localStorage.setItem(spiderAvoidTokenKey, spiderAvoidToken);
                                        }
                                        $('.input-slidecode-tip').hide();
                                        that.safeChecked = true;
                                        if (config.busiKey) {
                                            localStorage.setItem('SAFE_CHECKED_' + config.busiKey, 'yes');
                                        }
                                        if (config.onSuccess) {
                                            config.onSuccess();
                                        }
                                    }
                                };
                                fetch('res', URL_GET_SLIDE_VERIFY_RES, verifySucCb);
                            } catch (error) {
                                console.log(error);
                            }

                        }
                    }, function onload(instance) {
                        // 初始化成功
                        if (config.onLoad) {
                            config.onLoad();
                        }
                    }, function onerror(err) {
                        // 验证码初始化失败处理逻辑，例如：提示用户点击按钮重新初始化
                        if (config.onError) {
                            config.onError();
                        }
                    })
                } else if (that.slideVerifyType === 'aliyun') {
                    /*
                    *
                    * 阿里验证
                    *
                    * */
                    config.init(slideContainer);
                    var nc_token = ['CF_APP_1', (new Date()).getTime(), Math.random()].join(':');
                    var NC_Opt = {
                        renderTo: '#' + that.slideVerifyType + uniqueId,
                        appkey: 'FFFF0N0000000000703C',
                        scene: 'nc_register',
                        token: nc_token,
                        customWidth: config.width || 300,
                        trans: {
                            'key1': 'code0'
                        },
                        elementID: ['usernameID'],
                        is_Opt: 0,
                        language: 'cn',
                        isEnabled: true,
                        timeout: 3000,
                        times: 5,
                        apimap: {
                            // 'analyze': '//a.com/nocaptcha/analyze.jsonp',
                            // 'get_captcha': '//b.com/get_captcha/ver3',
                            // 'get_captcha': '//pin3.aliyun.com/get_captcha/ver3'
                            // 'get_img': '//c.com/get_img',
                            // 'checkcode': '//d.com/captcha/checkcode.jsonp',
                            // 'umid_Url': '//e.com/security/umscript/3.2.1/um.js',
                            // 'uab_Url': '//aeu.alicdn.com/js/uac/909.js',
                            // 'umid_serUrl': 'https://g.com/service/um.json'
                        },
                        callback: function (data) {
                            try {
                                that.slideVerifyToken = nc_token;
                                that.slideVerifySessionId = data.csessionid;
                                that.slideVerifySig = data.sig;
                                that.slideVerifyScene = NC_Opt.scene;
                                var verifySucCb = function (res) {
                                    var data = typeof res === 'string' ? JSON.parse(res) : res;
                                    if (data.status === 200) {
                                        if (config.busiKey) {
                                            var spiderAvoidToken = data.content.slideToken;
                                            var spiderAvoidTokenKey = 'SPIDER_AVOID_TOKEN_' + config.busiKey;
                                            localStorage.setItem(spiderAvoidTokenKey, spiderAvoidToken);
                                            if (config.busiKey === 'calendar') {
                                                cookieApi.clearCookie('SPIDER_AVOID_TOKEN_calendar');
                                                cookieApi.setCookie(spiderAvoidTokenKey, spiderAvoidToken);
                                            }
                                        }
                                        $('.input-slidecode-tip').hide();
                                        that.safeChecked = true;
                                        if (config.busiKey) {
                                            localStorage.setItem('SAFE_CHECKED_' + config.busiKey, 'yes');
                                        }
                                        if (config.onSuccess) {
                                            config.onSuccess();
                                        }
                                    }
                                };
                                fetch('res', URL_GET_SLIDE_VERIFY_RES, verifySucCb);
                            } catch (error) {
                                console.log(error);
                            }
                        },
                        error: function () {
                            if (config.onError) {
                                config.onError();
                            }
                        }
                    };
                    var nc = new noCaptcha(NC_Opt);
                    nc.upLang('cn', {
                        _startTEXT: '请按住滑块，拖动到最右边',
                        _yesTEXT: '验证通过',
                        _error300: '哎呀，出错了，点击<a href="javascript:__nc.reset()">刷新</a>再来一次',
                        _errorNetwork: '网络不给力，请<a href="javascript:__nc.reset()">点击刷新</a>'
                    })
                }else if(that.slideVerifyType == 'tencent'){
                    config.init(slideContainer);
                    var html = '<div class="tencent-btn">点击进行验证</div>'
                    $('#' + that.slideVerifyType + uniqueId).append(html);
                    var captchaTencent = new TencentCaptcha(
                        that.appId,
                        function(res) {
                            if(res.ret === 0){
                                that.tencentTicket = res.ticket;
                                that.tencentRandstr = res.randstr;
                                let verifySucCb = function (res) {
                                    let data = typeof res === 'string' ? JSON.parse(res) : res;
                                    //暂时
                                    if (data.status === 200 && data.content.slideToken) {
                                        if (config.busiKey) {
                                            let spiderAvoidToken = data.content.slideToken;
                                            let spiderAvoidTokenKey = 'SPIDER_AVOID_TOKEN_' + config.busiKey;
                                            localStorage.setItem(spiderAvoidTokenKey, spiderAvoidToken);
                                            if (config.busiKey === 'calendar') {
                                                cookieApi.clearCookie('SPIDER_AVOID_TOKEN_calendar');
                                                cookieApi.setCookie(spiderAvoidTokenKey, spiderAvoidToken);
                                            }
                                            localStorage.setItem(spiderAvoidTokenKey, spiderAvoidToken);
                                        }
                                        $('.input-slidecode-tip').hide();
                                        that.safeChecked = true;
                                        if (config.busiKey) {
                                            localStorage.setItem('SAFE_CHECKED_' + config.busiKey, 'yes');
                                        }
                                        $('.tencent-btn').text('验证成功');
                                        $('.tencent-btn').addClass('tencent-btn-success');
                                        if (config.onSuccess) {
                                            config.onSuccess();
                                            captchaTencent.destroy();
                                        }
                                    }else{
                                        captchaTencent.show();
                                    }
                                };
                                fetch('res', URL_GET_SLIDE_VERIFY_RES, verifySucCb);
                            }
                        });
                    $('#' + that.slideVerifyType + uniqueId).on('click',function () {
                        if($('.tencent-btn').hasClass('tencent-btn-success')){
                            $('.tencent-btn').removeClass('tencent-btn-success');
                            localStorage.setItem('SAFE_CHECKED_' + config.busiKey, 'no');
                        }
                        captchaTencent.show();
                    });
                }
            },1000);
            return;
        }
        head.appendChild(spidersafeScript);
        spidersafeScript.onload = function () {
            spidersafeScriptOnLoadFn();
        }
    };

    var getSlideVerifyTypeCb = function (res) {
        var data = typeof res === 'string' ? JSON.parse(res) : res;
        if (data.status === 200) {
            that.slideVerifyType = data.content.type || 'yidun';
            that.secondToken = data.content.token || '';
            that.appId = data.content.appKey;
            initSafeCheck();
        }
    };

    fetch('type', URL_GET_SLIDE_VERIFY_TYPE, getSlideVerifyTypeCb);
}
 
 function captchaInterceptors (busiKey, isReload, res, captchaAction, successAction,status) {
    if (typeof res === 'string' && (res.indexOf('status') !== -1)) {
        res = JSON.parse(res);
    }
    if(status && status ==307){
       if (isReload) {
          var curLocation = window.location.href;
          var host = (window.location.host.indexOf('www') === 0) ? 'www.xiaozhu.com' : window.location.host;
          window.location.href =  window.location.protocol + '//' +
             'bizverify.xiaozhu.com?slideRedirect=' +
             encodeURIComponent(curLocation);
       } else {
          var onSuccess = function () {
             window.captchaModel.hideModel();
             captchaAction();
          };
          if (busiKey === 'calendar') {
             $('#calendar-box').hide();
          }
          var captcha = new Captcha({
             init: window.captchaModel.showModel,
             onSuccess: onSuccess,
             busiKey: busiKey
          });
       }
       return;
    }
    if (typeof res === 'object' && res !== null && 'status' in res) {
        if (res.status === 6000 || res.status === 60001) {
            if (isReload) {
               var curLocation = window.location.href;
               var host = (window.location.host.indexOf('www') === 0) ? 'www.xiaozhu.com' : window.location.host;
               window.location.href =  window.location.protocol + '//' +
                   'bizverify.xiaozhu.com?slideRedirect=' +
                   encodeURIComponent(curLocation);
            } else {
                var onSuccess = function () {
                    window.captchaModel.hideModel();
                    captchaAction();
                };
                if (busiKey === 'calendar') {
                   $('#calendar-box').hide();
                }
                var captcha = new Captcha({
                    init: window.captchaModel.showModel,
                    onSuccess: onSuccess,
                    busiKey: busiKey
                });
            }
        } else {
            successAction();
        }
    } else {
        successAction();
    }

}
 
 function share_weixin()
{
    $('#weiXinShareDialog').dialog({
        autoOpen:false,
        width : 500,
        resizable: false,
        modal:true,
        position: "center"
    });

    $("#weiXinShareDialog").dialog("open");
    $('.ui-dialog-titlebar').hide();
    $('#weiXinShareDialog').parent().removeClass('ui-widget-content');
    $('#weiXinShareDialog').removeClass('ui-widget-content ui-dialog-content ui-dialog');
    var objId = $('#objid').val();  
    var objType = $('#objtype').val();  
    var shareContentType = $('#sharecontenttype').val();  
    var channel = $('#channel_weixin').val();  
    $.ajax({
        type: "GET",
        url: XZWebUrlWriter.getAjax_ShareAfter(objId,objType,shareContentType,channel),
        success: function(data){
        }
    });
}
$('#sharetool_weixin').hover(
 function(){
    if($("input[name='registersuccess']").val()=='8'){
       $("#shareWeixin").addClass('addshareweixin_code');  
    }
    $("#shareWeixin").show();
 },
 function(){
    $("#shareWeixin").hide();
 }
);
function closeShareDialog()
{
    $("#weiXinShareDialog").dialog("close");
    return false;
}

$("#share").click(function(){
    var remainWord = calRemainWord();
    var wordlimit_b = $('#wordlimit_b').val();
    if(remainWord < 0)
    {
        alert("分享内容超过"+wordlimit_b+"个字！请修改微博内容或者修改分享好友。");
        $(this).hide();
        $('#wordlimit').show();
        return false;
    }
    else 
    {
        $("form[name='shareform']").submit();
    }
})
function calRemainWord()
{
    var channel = $('#channel').val();
    var sinaWeiBo = $('#sinaweibo').val();
    var content_b_num = $("#status").val().length;
    if(channel == sinaWeiBo)
    {
        content_b_num = $("#status").val().length + Math.ceil(($('#shareUrl').val().length)/3) + $("#friendName").val().length;
    }
    var wordlimit_b = $('#wordlimit_b').val();
    var len = parseInt(wordlimit_b) - content_b_num;
    return len;
}
function checkWordCount_ex(id,wordLimit,remark)
{
    var content_num = $("#"+id).val().length;
    var len = parseInt(wordLimit) - content_num;
    if(len < 0)
    {
        alert(remark+"不能超过"+wordLimit+"字");        
        $("#"+id).focus();
        $("#share").attr('disabled',true);
        $("#share").hide();
        $("#wordlimit").show();
    }else
    {
        $("#share").attr('disabled',false);
        $("#share").show();
        $('#wordlimit').hide();
    }
}
function checkWordCount()
{
    var remainWord = calRemainWord();
    if(remainWord >= 0)
    {
        $(".rightip1").html("还可以输入"+remainWord+"字");
        $(".rightip1").show();
        $(".rightip2").hide();
        $("#share").attr('disabled',false);
        $("#share").show();
        $('#wordlimit').hide();
    }
    else 
    {
        $(".rightip2").html("已超过<span class='f16'>"+Math.abs(remainWord)+"</span>个字");
        $(".rightip2").show();
        $(".rightip1").hide();
        $("#share").hide();
        $("#share").attr('disabled',true);
        $("#wordlimit").show();
    }
}
function selectImage(obj,imgUrl)
{
    if(obj.hasClass("no_choice"))
    {
        $('.share_img').children("span").addClass("no_choice");    
        obj.removeClass("no_choice");
        $('#image').val(imgUrl);
    }else
    {
        obj.addClass('no_choice');        
        $('#image').val('');
    }
}

$("#deleteImage").click(function(){
    $('.share_img span').addClass("no_choice");
    $("#image").val('');
})
$("a[name='selectfriend']").each( function(){
    $(this).click(function(){
        if($(this).hasClass("have"))
        {
            $(this).removeClass("have");
        }
        else 
        {
            $(this).addClass("have");
        }
        resetFriendName();
        checkWordCount();
    })
})
function resetFriendName()
{
    var friendname = '';
    $(".share_text").children('a').each(function(){
       if($(this).hasClass("have"))
       {
           friendname += ' '+ '@' + $(this).html();
       }
    })
    $("#friendName").val(friendname);
}
$('#openSharev2').on('click',function(){
    showShareDialog();
});

function showShareDialog(){
    $('.sharev2_mask').show();
    $('#sharev2_pop').show(); 

    $('#sharev2_pop').on('mouseenter','.sharev2_pr',function(){
        $('.sharev2weixin_code').show();
    })
    $('#sharev2_pop').on('mouseleave','.sharev2_pr',function(){
        $('.sharev2weixin_code').hide();
    });
    $('.sharev2_cancel_btn').on('click',function(){
        $('.sharev2_w_522').hide(); 
        $('.sharev2_mask').hide();
    });
    var canClick = true;
    $('#isShareInvite').on('click',function(){
        if(!canClick) return false;
        canClick = false;
        var shareInvite = 'yes';
        if($(this).hasClass('sharev2_pink_select')){
            shareInvite = 'no';
            $(this).addClass('sharev2_gray_select').removeClass('sharev2_pink_select');
        }else{
            $(this).addClass('sharev2_pink_select').removeClass('sharev2_gray_select');
        }
        //var datas = {
        var objId = $('#share_objId').val();
        var objType = $('#share_objType').val();
        var cityId = $('#share_city').val();
        var shareContentType = $('#share_contentType').val();
        var shareInvite = shareInvite;
        var hideWechat  = $('#hideWechat').val() ? 'yes' : '';
        //};
        var html = XZWebUrlWriter.getRequest(XZWebUrlWriter.getAjax_GetShareInfo(objId,objType,shareContentType,cityId,shareInvite,hideWechat),'html');
        if(html){
            $('.sharev2_way').empty().html(html);  
        }
        canClick = true;
    })
}

 
 (function($) {
    $.fn.lazyload = function(options) {
        var settings = {
            threshold: 0,
            lazyImgWidth: 32,
            lazyImgHeight: 32,
            userAttr: "lazy_src"
        };
        if (options) {
            $.extend(settings, options);
        }

        var scrolltop = (document.body.scrollTop || document.documentElement.scrollTop+ 5);
        var visiableArea = $(window).height();
        elements = $("img[lazy_src]["+settings.userAttr+" != 'finish']");
        for(var i=0; i<elements.length; i++) {
            var imgtop = 0;
            var img = elements[i];

            imgtop = $.getElementTop(img);
            if(imgtop < scrolltop+visiableArea) {
                var truesrc = $(img).attr(settings.userAttr);
                $(img).attr("src", truesrc);
                $(img).attr(settings.userAttr, "finish");
            }
        }
        var obj = (options && options.operationobj != undefined) ?  options.operationobj : $(window)  ;
        obj.scroll(function(){
            var scrolltop = (options && options.operationobj != undefined) ? options.operationobj.scrollTop() : (document.body.scrollTop || document.documentElement.scrollTop+ 5) ;
            var visiableArea = $(window).height();
            elements = $("img[lazy_src]["+settings.userAttr+" != 'finish']");
            for(var i=0; i<elements.length; i++) {
                var imgtop = 0;
                var img = elements[i];

                imgtop = $.getElementTop(img);
                if(imgtop < scrolltop+visiableArea) {
                    var truesrc = $(img).attr(settings.userAttr);
                    $(img).attr("src", truesrc);
                    $(img).attr(settings.userAttr, "finish");
                }
            }
        });

    };
    $.getElementTop = function(element){
        var actualTop = element.offsetTop;
        var current = element.offsetParent;
        while (current !== null){
            actualTop += current.offsetTop;
            current = current.offsetParent;
        }
        return actualTop;
    };
})(jQuery);
 
 /*
* Slides, A Slideshow Plugin for jQuery
* Intructions: http://slidesjs.com
* By: Nathan Searles, http://nathansearles.com
* Version: 1.1.9
* Updated: September 5th, 2011
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
(function(a){a.fn.slides=function(b){return b=a.extend({},a.fn.slides.option,b),this.each(function(){function w(g,h,i){if(!p&&o){p=!0,b.animationStart(n+1);switch(g){case"next":l=n,k=n+1,k=e===k?0:k,r=f*2,g=-f*2,n=k;break;case"prev":l=n,k=n-1,k=k===-1?e-1:k,r=0,g=0,n=k;break;case"pagination2":k=parseInt(i,10),l=a("."+b.paginationClass+" li."+b.currentClass+" a",c).attr("href").match("[^#/]+$"),k>l?(r=f*2,g=-f*2):(r=0,g=0),n=k}h==="fade"?b.crossfade?d.children(":eq("+k+")",c).css({zIndex:10}).fadeIn(b.fadeSpeed,b.fadeEasing,function(){b.autoHeight?d.animate({height:d.children(":eq("+k+")",c).outerHeight()},b.autoHeightSpeed,function(){d.children(":eq("+l+")",c).css({display:"none",zIndex:0}),d.children(":eq("+k+")",c).css({zIndex:0}),b.animationComplete(k+1),p=!1}):(d.children(":eq("+l+")",c).css({display:"none",zIndex:0}),d.children(":eq("+k+")",c).css({zIndex:0}),b.animationComplete(k+1),p=!1)}):d.children(":eq("+l+")",c).fadeOut(b.fadeSpeed,b.fadeEasing,function(){b.autoHeight?d.animate({height:d.children(":eq("+k+")",c).outerHeight()},b.autoHeightSpeed,function(){d.children(":eq("+k+")",c).fadeIn(b.fadeSpeed,b.fadeEasing)}):d.children(":eq("+k+")",c).fadeIn(b.fadeSpeed,b.fadeEasing,function(){a.browser.msie&&a(this).get(0).style.removeAttribute("filter")}),b.animationComplete(k+1),p=!1}):(d.children(":eq("+k+")").css({left:r,display:"block"}),b.autoHeight?d.animate({left:g,height:d.children(":eq("+k+")").outerHeight()},b.slideSpeed,b.slideEasing,function(){d.css({left:-f}),d.children(":eq("+k+")").css({left:f,zIndex:5}),d.children(":eq("+l+")").css({left:f,display:"none",zIndex:0}),b.animationComplete(k+1),p=!1}):d.animate({left:g},b.slideSpeed,b.slideEasing,function(){d.css({left:-f}),d.children(":eq("+k+")").css({left:f,zIndex:5}),d.children(":eq("+l+")").css({left:f,display:"none",zIndex:0}),b.animationComplete(k+1),p=!1})),b.pagination2&&(a("."+b.paginationClass+" li."+b.currentClass,c).removeClass(b.currentClass),a("."+b.paginationClass+" li:eq("+k+")",c).addClass(b.currentClass))}}function x(){clearInterval(c.data("interval"))}function y(){b.pause?(clearTimeout(c.data("pause")),clearInterval(c.data("interval")),u=setTimeout(function(){clearTimeout(c.data("pause")),v=setInterval(function(){w("next",i)},b.play),c.data("interval",v)},b.pause),c.data("pause",u)):x()}a("."+b.container,a(this)).children().wrapAll('<div class="slides_control"/>');var c=a(this),d=a(".slides_control",c),e=d.children().size(),f=d.children().outerWidth(),g=d.children().outerHeight(),h=b.start-1,i=b.effect.indexOf(",")<0?b.effect:b.effect.replace(" ","").split(",")[0],j=b.effect.indexOf(",")<0?i:b.effect.replace(" ","").split(",")[1],k=0,l=0,m=0,n=0,o,p,q,r,s,t,u,v;if(e<2)return a("."+b.container,a(this)).fadeIn(b.fadeSpeed,b.fadeEasing,function(){o=!0,b.slidesLoaded()}),a("."+b.next+", ."+b.prev).fadeOut(0),!1;if(e<2)return;h<0&&(h=0),h>e&&(h=e-1),b.start&&(n=h),b.randomize&&d.randomize(),a("."+b.container,c).css({overflow:"hidden",position:"relative"}),d.children().css({position:"absolute",top:0,left:d.children().outerWidth(),zIndex:0,display:"none"}),d.css({position:"relative",width:f*3,height:g,left:-f}),a("."+b.container,c).css({display:"block"}),b.autoHeight&&(d.children().css({height:"auto"}),d.animate({height:d.children(":eq("+h+")").outerHeight()},b.autoHeightSpeed));if(b.preload&&d.find("img:eq("+h+")").length){a("."+b.container,c).css({background:"url("+b.preloadImage+") no-repeat 50% 50%"});var z=d.find("img:eq("+h+")").attr("src")+"?"+(new Date).getTime();a("img",c).parent().attr("class")!="slides_control"?t=d.children(":eq(0)")[0].tagName.toLowerCase():t=d.find("img:eq("+h+")"),d.find("img:eq("+h+")").attr("src",z).load(function(){d.find(t+":eq("+h+")").fadeIn(b.fadeSpeed,b.fadeEasing,function(){a(this).css({zIndex:5}),a("."+b.container,c).css({background:""}),o=!0,b.slidesLoaded()})})}else d.children(":eq("+h+")").fadeIn(b.fadeSpeed,b.fadeEasing,function(){o=!0,b.slidesLoaded()});b.bigTarget&&(d.children().css({cursor:"pointer"}),d.children().click(function(){return w("next",i),!1})),b.hoverPause&&b.play&&(d.bind("mouseover",function(){x()}),d.bind("mouseleave",function(){y()})),b.generateNextPrev&&(a("."+b.container,c).after('<a href="#" class="'+b.prev+'">Prev</a>'),a("."+b.prev,c).after('<a href="#" class="'+b.next+'">Next</a>')),a("."+b.next,c).click(function(a){a.preventDefault(),b.play&&y(),w("next",i)}),a("."+b.prev,c).click(function(a){a.preventDefault(),b.play&&y(),w("prev",i)}),b.generatePagination?(b.prependPagination?c.prepend("<ul class="+b.paginationClass+"></ul>"):c.append("<ul class="+b.paginationClass+"></ul>"),d.children().each(function(){a("."+b.paginationClass,c).append('<li><a href="#'+m+'">'+(m+1)+"</a></li>"),m++})):a("."+b.paginationClass+" li a",c).each(function(){a(this).attr("href","#"+m),m++}),a("."+b.paginationClass+" li:eq("+h+")",c).addClass(b.currentClass),a("."+b.paginationClass+" li a",c).click(function(){return b.play&&y(),q=a(this).attr("href").match("[^#/]+$"),n!=q&&w("pagination2",j,q),!1}),a("a.link",c).click(function(){return b.play&&y(),q=a(this).attr("href").match("[^#/]+$")-1,n!=q&&w("pagination2",j,q),!1}),b.play&&(v=setInterval(function(){w("next",i)},b.play),c.data("interval",v))})},a.fn.slides.option={preload:!1,preloadImage:"/img/loading.gif",container:"slides_container",generateNextPrev:!1,next:"next",prev:"prev",pagination2:!0,generatePagination:!0,prependPagination:!1,paginationClass:"pagination2",currentClass:"current",fadeSpeed:350,fadeEasing:"",slideSpeed:350,slideEasing:"",start:1,effect:"slide",crossfade:!1,randomize:!1,play:0,pause:0,hoverPause:!1,autoHeight:!1,autoHeightSpeed:350,bigTarget:!1,animationStart:function(){},animationComplete:function(){},slidesLoaded:function(){}},a.fn.randomize=function(b){function c(){return Math.round(Math.random())-.5}return a(this).each(function(){var d=a(this),e=d.children(),f=e.length;if(f>1){e.hide();var g=[];for(i=0;i<f;i++)g[g.length]=i;g=g.sort(c),a.each(g,function(a,c){var f=e.eq(c),g=f.clone(!0);g.show().appendTo(d),b!==undefined&&b(f,g),f.remove()})}})}})(jQuery)
 
 var _keywordValue = '';
var districtSearchKey = 'E';

function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}
$(function(){
    var guidForSearchResultCookieName = 'xz_guid_4se';
    if(getCookie(guidForSearchResultCookieName) == ''){
        setCookie(guidForSearchResultCookieName, guid(), 24*60*60*1000*720, '/', '.xiaozhu.com');
    }
});

function getFullDate(date){
    var _FullDate = date;
    if(date < 10)
        _FullDate = 0 + String(date);

    return _FullDate;
}
function searchCity(pageType)
{
   if($('#actionname').val()=='Front_Search'){
     var searchCity = $('#searchcityd').attr("value");
   }else{
     var searchCity = $('#searchcity').attr("value");
   }

    var cityDomain = $('#citydomain').attr("value");
    var suggestion_cityDomain = $('#suggestion_citydomain').attr("value");
    if(suggestion_cityDomain != "")
        cityDomain = suggestion_cityDomain;
    var searchKey = $('#searchkey').val();//api name
    var searchPutKey = $('#keyword').val();//user set word
    var searchLid = $('#landmarkid').val();
    var landmarktype = $('#landmarktype').val();
    var defaulturl = $('#defaulturl').val();
    var isOpenBlank = $('#isopenblank').val();
    var abroad      = $('#abroad').val();
    var timeZone    = $('#timeZone').val();
    var jumpUrl = '';
    if(searchKey == _keywordValue)
        searchKey = '';
    if(searchPutKey == _keywordValue || searchPutKey=='输入地点...')
        searchPutKey = '';

    if(!searchCity || searchCity =='城市或目的地' || searchCity == '城市')
    {
        if(abroad == 1){
            $('#tip_searchcity').html("请选择城市");
        }else{
            $('#tip_searchcity').html("请选择城市或目的地");
        }
        $('#tip_searchcity').show();
        return ;
    }
    var searchCityBak = searchCity;
    searchCity = encodeURI(searchCity);
    var startDate = $('#startdate').attr('value');
    var endDate = $('#enddate').attr('value');

    var abtest_ABTest4SearchDate = getCookie('abtest_ABTest4SearchDate');
    if (abtest_ABTest4SearchDate == 'b')
    {
        if((startDate == '' || startDate == '请选择入住日期') && (endDate == ''|| endDate == '请选择退房日期'))
        {
            startDate = '';
            endDate = '';
            deleteCookie('startDate','/','.'+topLevelDomain);
            deleteCookie('endDate','/','.'+topLevelDomain);
        }
        else if(startDate == '请选择入住日期' || startDate.length < 1 )
        {
            $('#startdate').css('color','red').fadeOut('slow').fadeIn("slow").fadeOut("slow").fadeIn("slow",function(){
                    $(this).css('color','')
                    });
            return ;
        }
        else if(endDate == '请选择退房日期' || endDate.length < 1)
        {
            $('#enddate').css('color','red').fadeOut('slow').fadeIn("slow").fadeOut("slow").fadeIn("slow",function(){
                    $(this).css('color','')
                    });
            return ;
        }
    }
    else
    {
        if((startDate == '请选择入住日期' && endDate == '请选择退房日期') || (startDate.length < 1 && endDate.length < 1))
        {
            $('#startdate').css('color','red').fadeOut('slow').fadeIn("slow").fadeOut("slow").fadeIn("slow",function(){
                    $(this).css('color','')
                    });
            $('#enddate').css('color','red').fadeOut('slow').fadeIn("slow").fadeOut("slow").fadeIn("slow",function(){
                    $(this).css('color','')
                    });
            $('#calendar_btn_s').click();
            return ;
        }
        else if(startDate == '请选择入住日期' || startDate.length < 1 )
        {
            $('#startdate').css('color','red').fadeOut('slow').fadeIn("slow").fadeOut("slow").fadeIn("slow",function(){
                    $(this).css('color','')
                    });
            return ;
        }
        else if(endDate == '请选择退房日期' || endDate.length < 1)
        {
            $('#enddate').css('color','red').fadeOut('slow').fadeIn("slow").fadeOut("slow").fadeIn("slow",function(){
                    $(this).css('color','')
                    });
            return ;
        }
    }
    var   type="^[0-9]*[1-9][0-9]*$";
    var   re   =   new   RegExp(type);


    if(searchCity.match(re) != null)
    {
        $.ajax({
            type:"get",
            url:XZWebUrlWriter.getAjax_CheckLodgeUnitUrl(searchCity),
            async : false,
            success:function(data){
               if(data)
               {
                   var obj = eval("("+data+")");
                    if(obj['error'] == '1')
                   {
                        $('#tip_searchcity').html(obj['errormsg']);
                        $('#tip_searchcity').show();
                        return;
                   }else
                    {
                        if(isOpenBlank == '1')
                        {
                            openNewPage(obj['detailurl']);
                        }else
                        {
                            location.href = obj['detailurl'];
                        }
                        return;
                    }
               }

            }

        })
    }else
   {
    if(pageType == 'search')
        cityDomain = '';
    $.ajax({
        type: "get",
        url:XZWebUrlWriter.getAjax_CheckSearchConditionUrl(searchCity,cityDomain,startDate,endDate),
        async : false,
        error : function (XMLHttpRequest, textStatus, errorThrown){

            revoltReptile(XMLHttpRequest);
        },
        success: function(data,textStatus,XMLHttpRequest) {
            revoltReptile(XMLHttpRequest);
            if(data)
            {
                var dataObj = eval("("+data+")");
                if(dataObj['error'] == '1')
                {
                    if(dataObj['cityInfo'])
                {
                    $('#tip_searchcity').html(dataObj['cityInfo']);
                    $('#tip_searchcity').show();
                };
                if(dataObj['dateInfo'])
                {
                    $('#tip_enddate').html(dataObj['dateInfo']);
                    $('#tip_enddate').show();
                };
                //setTimeout(function() { $('#tip_searchcity').hide() }, 4000);
                 setTimeout(function() { $('#tip_enddate').hide() }, 4010);
                 if($('#actionname').val()=='Front_Search'){
                        alert('对不起，没有找到相应的结果');
                        location.reload();
                      }
                }
                else
                {
                    var city = dataObj['city'] ;
                    var paramArray = new Array();
                    var paramStr = '';
                    if(startDate != '')
                    {
                        paramArray.push('startDate='+startDate);
                    }
                    if(endDate != '')
                    {
                        paramArray.push('endDate='+endDate);
                    }
                    if(searchPutKey != '' && searchPutKey != null && landmarktype != districtSearchKey)
                    {
                        paramArray.push('putkey='+encodeURIComponent(ignoreSpaces(searchPutKey)));
                    }
                    else if(searchKey != '' && searchKey != null && landmarktype != districtSearchKey)
                    {
                        paramArray.push('putkey='+encodeURIComponent(ignoreSpaces(searchKey)));
                    }


                    paramStr = paramArray.join('&');
                    if(landmarktype == districtSearchKey)
                    {
                        defaulturl = searchLid+"-duanzufang-8/";
                        if(paramStr)
                            defaulturl += "?";
                        jumpUrl = window.location.protocol + "//" + city + "." + topLevelDomain + "/" + defaulturl+paramStr;
                        if(isOpenBlank == '1')
                        {
                            openNewPage(jumpUrl);
                        }else
                        {
                            location.href = jumpUrl;
                        }
                        return false;
                    }
                    if(defaulturl)
                    {
                        defaulturl += "-duanzufang-20/";
                        if(paramStr)
                            defaulturl += "?";
                        jumpUrl = window.location.protocol + "//" + city + "." + topLevelDomain + "/" + defaulturl+paramStr;
                        if(isOpenBlank == '1')
                        {
                            openNewPage(jumpUrl);
                        }else
                        {
                            location.href = jumpUrl;
                        }
                        return false;
                    }

                    if(startDate != '' || endDate != '')
                        paramStr = paramArray.join('&');
                    if(paramStr !='')
                    {
                        if(searchLid)
                        {
                            if(searchKey)
                                var paramVal = encodeURIComponent(searchKey) + "_" + searchLid + "S-duanzufang-20/";
                            else if(searchPutKey)
                                var paramVal = encodeURIComponent(ignoreSpaces(searchPutKey)) + "_" + searchLid + "M-duanzufang-20/";

                            jumpUrl = window.location.protocol + "//"+city+'.'+topLevelDomain+"/"+paramVal+'?'+paramStr;
;
                            if(isOpenBlank == '1')
                            {
                                openNewPage(jumpUrl);
                            }else
                            {
                                location.href = jumpUrl;
                            }
                        }
                        else
                        {
                            var paramVal = "";
                            if(searchPutKey)
                            {
                                paramVal = encodeURIComponent(ignoreSpaces(searchPutKey)) + "_M-duanzufang-20/";
                            }
                            jumpUrl = window.location.protocol + "//"+city+'.'+topLevelDomain+"/"+paramVal+'?'+paramStr;

                            if(isOpenBlank == '1')
                            {
                                openNewPage(jumpUrl);
                            }else
                            {
                                location.href = jumpUrl;
                            }
                        }
                    }
                    else
                    {
                        if(!searchLid && searchPutKey)
                        {
                            var paramVal = encodeURIComponent(ignoreSpaces(searchPutKey)) + "_M-duanzufang-20/";
                            jumpUrl = window.location.protocol + "//"+city+'.'+topLevelDomain+"/"+paramVal+'?'+paramStr;
                            if(isOpenBlank == '1')
                            {
                                openNewPage(jumpUrl);
                            }else
                            {
                                location.href = jumpUrl;
                            }
                        }
                        else if(searchLid && (searchPutKey || searchKey))
                        {
                            if(searchKey)
                                var paramVal = encodeURIComponent(ignoreSpaces(searchKey)) + "_" + searchLid + "S-duanzufang-20/";
                            if(searchPutKey)
                                var paramVal = encodeURIComponent(ignoreSpaces(searchPutKey)) + "_" + searchLid + "M-duanzufang-20/";
                            jumpUrl = window.location.protocol + "//"+city+'.'+topLevelDomain+"/"+paramVal+'?'+paramStr;
                            if(isOpenBlank == '1')
                            {
                                openNewPage(jumpUrl);
                            }else
                            {
                                location.href = jumpUrl;
                            }
                        }
                        else
                        {
                            jumpUrl = window.location.protocol + "//"+city+'.'+topLevelDomain+"/";
                            if(isOpenBlank == '1')
                            {
                                openNewPage(jumpUrl);
                            }else
                            {
                                location.href = jumpUrl;
                            }

                        }
                    }
                }
            }
        }
    });
   }
}

function debug(str){
    if(window.console){
        console.debug(str);
        return;
    }

    var d = $('#debug');
    if(d.length == 0){
        $(document.body).append('<div id="debug"></div>');
        d = $('#debug');
    }

    var item = $('<div></div>').text(str);
    d.append(item);
}
//compare date
function compareDate(date){
    var newDate = date.split("-");
    var dateY = newDate[0];
    var dateM = newDate[1];
    var dateD = newDate[2];
    return Date.parse(dateM + "/" + dateD + "/" + dateY);
}

function checkBankCardNo(bankno){
    var lastNum=bankno.substr(bankno.length-1,1);

    var first15Num=bankno.substr(0,bankno.length-1);
    var newArr=new Array();
    for(var i=first15Num.length-1;i>-1;i--){
        newArr.push(first15Num.substr(i,1));
    }
    var arrJiShu=new Array();
    var arrJiShu2=new Array();

    var arrOuShu=new Array();
    for(var j=0;j<newArr.length;j++){
        if((j+1)%2==1){
            if(parseInt(newArr[j])*2<9)
                arrJiShu.push(parseInt(newArr[j])*2);
            else
                arrJiShu2.push(parseInt(newArr[j])*2);
        }
        else
            arrOuShu.push(newArr[j]);
    }

    var jishu_child1=new Array();
    var jishu_child2=new Array();
    for(var h=0;h<arrJiShu2.length;h++){
        jishu_child1.push(parseInt(arrJiShu2[h])%10);
        jishu_child2.push(parseInt(arrJiShu2[h])/10);
    }

    var sumJiShu=0;
    var sumOuShu=0;
    var sumJiShuChild1=0;
    var sumJiShuChild2=0;
    var sumTotal=0;
    for(var m=0;m<arrJiShu.length;m++){
        sumJiShu=sumJiShu+parseInt(arrJiShu[m]);
    }

    for(var n=0;n<arrOuShu.length;n++){
        sumOuShu=sumOuShu+parseInt(arrOuShu[n]);
    }

    for(var p=0;p<jishu_child1.length;p++){
        sumJiShuChild1=sumJiShuChild1+parseInt(jishu_child1[p]);
        sumJiShuChild2=sumJiShuChild2+parseInt(jishu_child2[p]);
    }
    //计算总和
    sumTotal=parseInt(sumJiShu)+parseInt(sumOuShu)+parseInt(sumJiShuChild1)+parseInt(sumJiShuChild2);

    //计算Luhm值
    var k= parseInt(sumTotal)%10==0?10:parseInt(sumTotal)%10;
    var luhm= 10-k;

    if(lastNum==luhm){
        return true;
    }
    else{
        return false;
    }
}
function is_array(test)
{
    if(typeof test == 'object' && typeof test.sort == 'function' && typeof test.length == 'number')
    {
        return true;
    }
    else
    {
        return false;
    }
}
function gaClickSta(strEvent)
{
}
function ignoreSpaces(string) {
    var temp = "";
    string = '' + string;
    splitstring = string.split(" ");
    for(i = 0; i < splitstring.length; i++)
        temp += splitstring[i];
    return temp;
}
function  checkIAgree(){
    $("#tip_affirm").css("display","none");
}

function check_all(obj){$("input." + obj).each(function(i){this.checked = true;});}
function check_no(obj){$("input." + obj).each(function(i){this.checked = false;});}
function check_fan(obj){$("input." + obj).each(function(i){this.checked = this.checked == true ? false : true;});}
function check_str(obj){str = new String();$("input." + obj).each(function(i){str = this.checked == true ? str + this.value + "," : str;});str = str.substr("0", str.lastIndexOf(","));return str;}

function keyFocus(iptName,defValue)
{

    var _text = $("#"+iptName).val();

    if(_text == defValue)
    {
        $("#"+iptName).attr("value", '');
        $("#"+iptName).attr("style",'color:#555');
    }
}
function keyBlur(iptName,defValue)
{
    var _text = $("#"+iptName).val();
    if(_text == '')
    {
        $("#"+iptName).attr("value",defValue);
        $("#"+iptName).attr("style",'color:#999');
    }
}

function getCookieVal(offset) {
    var endstr = document.cookie.indexOf(";", offset);
    if(endstr == -1) {
        endstr = document.cookie.length;
    }
    return document.cookie.substring(offset, endstr);
}
function getCookie(name) {
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    var j = 0;
    while(i < clen) {
        j = i + alen;
        if(document.cookie.substring(i, j) == arg){
            return getCookieVal(j);
        }
        i = document.cookie.indexOf(" ", i) + 1;
        if(i === 0){
            break;
        }
    }
    return '';
}
function deleteCookie(name,path,domain) {
    var exp = new Date();
    var cval = getCookie(name);
    exp.setTime(exp.getTime() - 1);
    document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString() +
        ((domain === null) ? "" : ("; domain=" + domain)) +
        ((path === null) ? "" : ("; path=" + path)) ;
}

function deleteCookie4Search(name,path,domain) {
    var exp = new Date();
    var cval = getCookie(name);
    exp.setTime(exp.getTime() - 1);
    document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString() +
        ((domain === null) ? "" : ("; domain=" + domain)) +
        ((path === null) ? "" : ("; path=" + path)) ;
}

function setCookie(name, value) {
    var argv = setCookie.arguments;
    var argc = setCookie.arguments.length;
    var exp = (argc > 2) ? argv[2] : 90;
    var path = (argc > 3) ? argv[3] : null;
    var domain = (argc > 4) ? argv[4] : null;
    var secure = (argc > 5) ? argv[5] : false;
    var expires = new Date();
    deleteCookie(name,path,domain);
    if(exp < 365) {
        expires.setTime(expires.getTime() + (exp*24*60*60*1000));
    }else{
        expires.setTime(expires.getTime() + (exp));
    }
    document.cookie = name + "=" + value +
        "; expires=" + expires.toGMTString() +
        ((domain === null) ? "" : ("; domain=" + domain)) +
        ((path === null) ? "" : ("; path=" + path)) +
        ((secure === true) ? "; secure" : "");
}
function orderDetail(lodgeId,sameRoomNum,startDate,endDate)
{
    content = '';
    XZWebAjax.get(XZWebUrlWriter.getAjax_GetBookLodgeUnitDetailUrl(lodgeId,sameRoomNum,startDate,endDate),{},false,function(data){
        content = data;
    },'html');
    $('#lodgeUnitPriceDetail').dialog({
        width : 750,
        //height:520,
        resizable: false,
        modal:false,
        position: "center"
    });
    if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style)
    {
        $('#lodgeUnitPriceDetail').dialog({
            bgiframe: true,
            height:520
        });
    }

    $('#lodgeUnitPriceDetail').html(content);
    $('#lodgeUnitPriceDetail').dialog("open");
    $('.ui-dialog-titlebar').hide();
    $('.ui-widget-content').css('border','0px');
}

function priceOrder()
{
    var bookorderid = $("#bookOrderId").val();
    orderPriceDetail(bookorderid);
}

function orderPriceDetail(bookOrderId,url)
{
    var url = (typeof url == "undefined") ? XZWebUrlWriter.getAjax_GetOrderPriceDetailUrl(bookOrderId) : url;
     content = '';
        $.ajax({
            type: "get",
            url: url,
            async:false,
            success: function(data) {
                content = data;
            }
        });
    $('#lodgeUnitPriceDetail').dialog({
        width : 750,
        resizable: true,
        modal:false,
        position: "center"
    });
    if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style)
    {
        $('#lodgeUnitPriceDetail').dialog({
            height:520
        });
    }
    $('#lodgeUnitPriceDetail').html(content);
    $('#lodgeUnitPriceDetail').dialog("open");
    $('.ui-dialog-titlebar').hide();
    $('.ui-widget-content').css('border','0px');
}

function dateTransform(date)
{
    var newDate = new Date(date);
    var dateY = newDate.getFullYear();
    var dateM = getFullDate(newDate.getMonth()+1);
    var dateD = getFullDate(newDate.getDate());
    return dateY + "-" + dateM + "-" + dateD;
}
function getSubCHString(value,len)
{
    if(value.length <= len)
        return value;
    var strlen = 0;
    var strnum = 0;
    var str = "";
    for(var i = 0;i < value.length;i++)
    {
        strlen ++;
        if(value.charCodeAt(i) <= 128)
        {
            strnum++;
        }
        if(strnum > len)
        {
            strnum = len;
        }
        str += value.charAt(i);
        if(strlen >= (len + strnum)){
            return str + '...';
        }
    }
    return str + '...';
}
$(function(){
    window.setTimeout(getLayzeLoadData,1000);
})
function getLayzeLoadData()
{
    var layzeloadObj = $('layzeload');
    if(layzeloadObj.length<0)
    {
        return false;
    }
    layzeloadObj.each(function(){
        var turl = encodeURIComponent($(this).attr('turl'));
        var memkey = $(this).attr('memkey');
        var memtimeout = $(this).attr('memtimeout');
        var jsexecafterload = $(this).attr('jsexecafterload');
        var id = 'load_'+$(this).attr('key');

        XZWebAjax.get(XZWebUrlWriter.getAjax_GetLazyInfoUrl(memkey,memtimeout,turl),{},false,function(data){
            $("#"+id).html(data);
            if (jsexecafterload)
                eval(jsexecafterload);
        },'html');
    })
    return false;
}
function isIe6()
{
    if($.browser.msie && $.browser.version=="6.0")
    {
        return true;
    }
    return false;
}
function changeDate(startDate,days)
{
    // 参数表示在当前日期下要增加的天数
    var now = new Date(startDate.replace(/-/g, "/"));
    // + 1 代表日期加，- 1代表日期减
    now.setDate((now.getDate() + 1 * days));
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    if (month < 10) {
        month = '0' + month;
    }
    if (day < 10) {
        day = '0' + day;
    }
    return year + '-' + month + '-' + day;
}
function openNewPage(url)
{
    var a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("target", "_blank");
    a.setAttribute("id", "openwin");
    document.body.appendChild(a);
    a.click();
}
function ajaxHandleCall(req,callback)
{
    if(!req || "object" !== typeof req)
    {
        return false;
    }

    $.ajax({
        tyep : req.type,
        url : req.url,
        data : req.data + '&_t=' + new Date().getTime(),
        success : function(data){
            if(data)
            {
                callback(data);
            }
        }
    });
}
function isDefined(property)
{
    return 'undefined' !== typeof property;
}
function clickEvent(urlTracker,pageType)
{
    if(!isDefined(pageType) && !isDefined(urlTracker) && !isDefined(_paq))
        return false;

    urlTracker = 'http://www.trackerlink.com/'+pageType+'/'+urlTracker;
    _paq.push(['trackLink', urlTracker, 'link']);
}
function searchEvent(pageType)
{
    var defaultStartDate = $('#defaultstartdate').val();
    var defaultEndDate = $('#defaultenddate').val();
    var startDate = $('#startdate').val();
    var endDate = $('#enddate').val();
    var url="defaultstartdate="+defaultStartDate+"&defaultenddate="+defaultEndDate+"&startdate="+startDate+"&enddate="+endDate;
    //clickEvent(url, pageType);
}
function flashChecker()
{
    var hasFlash=0;         //是否安装了flash
    var flashVersion=0; //flash版本
    var isIE=/*@cc_on!@*/0;      //是否IE浏览器

    if(isIE)
    {
        var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
        if(swf) {
            hasFlash=1;
            VSwf=swf.GetVariable("$version");
            flashVersion=parseInt(VSwf.split(" ")[1].split(",")[0]);
        }
    }else{
        if (navigator.plugins && navigator.plugins.length > 0)
        {
            var swf=navigator.plugins["Shockwave Flash"];
            if (swf)
            {
                hasFlash=1;
                var words = swf.description.split(" ");
                for (var i = 0; i < words.length; ++i)
                {
                    if (isNaN(parseInt(words[i]))) continue;
                    flashVersion = parseInt(words[i]);
                }
            }
        }
    }
    return {f:hasFlash,v:flashVersion};
}
function initDisplayLodgeUnitIndex(luidAndIndex)
{
    clickEvent('luidAndIndex_'+luidAndIndex,'search');
}
function setDialogHeight(dialogId)
{
    var dialogHeight = $("#"+dialogId).height();
    $('#'+dialogId).css({marginTop:'-'+dialogHeight/2+'px'});
    $('.ui-dialog-titlebar').hide();
}
function closeDialog(dialogId)
{
    $("#"+dialogId).dialog("close");
    return false;
}
function dateDiff(date1,date2)
{
    return parseInt((date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24));
}
function CloseWebPage(){
    if (navigator.userAgent.indexOf("MSIE") > 0) {  //IE浏览器
        if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
            window.opener = null; window.close();
        }
        else {
            window.open('', '_top'); window.top.close();
        }
    }
    else if (navigator.userAgent.indexOf("Firefox") > 0) {  //火狐浏览器
        window.location.href = 'about:blank ';
    }
    else {     //其他浏览器
        window.opener = null;
        window.open('', '_self', '');
        window.close();
    }
}

function chkstrlen(str) {     //检查输入的真实姓名的长度
    var strlen = 0;
    for(var i = 0;i < str.length; i++) {
        if(str.charCodeAt(i) > 255) { //如果是汉字，则字符串长度加2
            strlen += 2;
        }
        else {
            strlen++;
        }
    }
    return   strlen;
}
//校验姓名
function chkName(str){
   var regName =/^[\u4e00-\u9fa5,\·]{2,10}$/;
   if(regName.test(str)){
      return true;
   }else{
      return false
   }
}
//校验身份证
function chkIdCard(str){
   var regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
   if(regIdNo.test(str)){
      return true
   }else{
      return false
   }

}
function scrollPage(obj)
{
    var windowHeight = $(window).height();
    var offsetTop = parseInt(obj.offset().top);
    var scrollTop = $(document).scrollTop();
    var suggestionHeight = obj.height();
    if( (windowHeight - (offsetTop - scrollTop)) - suggestionHeight < 0 ) {
        var newTopHeight = scrollTop + (suggestionHeight + 10 ) - (windowHeight - (offsetTop - scrollTop));
        $('html,body').animate({ scrollTop: newTopHeight }, 300);
    }

}

function numToStr(n,num) {
    numStr = num.toString();
    var l = numStr.length;
    for (var i=1; i<= n - l;++i) {
        numStr = '0'+numStr;
    }
    return numStr;
}

Date.prototype.format = function(formatStr) {
    var str = formatStr;
    var Week = ['日','一','二','三','四','五','六'];

    str = str.replace(/yyyy|YYYY/,this.getFullYear());
    str = str.replace(/yy|YY/,(this.getYear() % 100)>9?(this.getYear() % 100).toString():'0' + (this.getYear() % 100));

    str = str.replace(/MM/,this.getMonth()>8?(this.getMonth()+1).toString():'0' + (this.getMonth()+1));
    str = str.replace(/M/g,this.getMonth()+1);

    str = str.replace(/w|W/g,Week[this.getDay()]);

    str = str.replace(/dd|DD/,this.getDate()>9?this.getDate().toString():'0' + this.getDate());
    str = str.replace(/d|D/g,this.getDate());

    str = str.replace(/hh|HH/,this.getHours()>9?this.getHours().toString():'0' + this.getHours());
    str = str.replace(/h|H/g,this.getHours());
    str = str.replace(/mm/,this.getMinutes()>9?this.getMinutes().toString():'0' + this.getMinutes());
    str = str.replace(/m/g,this.getMinutes());

    str = str.replace(/ss|SS/,this.getSeconds()>9?this.getSeconds().toString():'0' + this.getSeconds());
    str = str.replace(/s|S/g,this.getSeconds());

    return str;
};


function revoltReptile(XMLHttpRequest){
    var reaponseHeader  = XMLHttpRequest.getResponseHeader('x-bizguard-redirect');
    if(reaponseHeader){
        var urls = reaponseHeader.split('slideRedirect=');
        var host = urls[0] + 'slideRedirect=';
        if (urls.length > 1) {
            host = host + encodeURIComponent(urls[1]);
        }
        window.location.href = host;
    }
};


 
 var rowPic = $('#minImgNum').val();
var lastPic = rowPic - 1;
var firstPic = 0;
var maxDialogCalendarH = 560;
var minDialogCalendarH = 500;
var dialogCalendarW = 730;
var timeInterval = 15000;
var setInt;

if($.browser.msie && $.browser.version == "6.0")
{
    var maxDialogCalendarH = 563;
    var minDialogCalendarH = 516;
}

$('#bigimagediv').mousemove( function (evnt)
{
    var photopos = getpos($("#bigimagediv"));
    var picCount = $('#picList li').length;
    if(evnt && picCount > 1)
    {
        var img_height = $('#bigImage1').attr('height');
        nx = (parseInt(evnt.pageY) - photopos.top) / img_height;
        if (nx > 0.5 ) {
            if($("#bigimagediv").css('cursor').toString().indexOf("down") ==-1)
            {
                $("#bigimagediv").css('cursor',"url(/images/mousedown.cur),auto");
            }
            //$("#bigimagediv").attr('title',"点击浏览下一张>>");
            $(this).attr('nextStep','next');
        }
        if (nx <= 0.5) {
            if($("#bigimagediv").css('cursor').toString().indexOf("up") ==-1)
            {
                $("#bigimagediv").css('cursor',"url(/images/mouseup.cur),auto");
            }
            //$("#bigimagediv").attr('title',"点击浏览上一张>>");
            $(this).attr('nextStep','pre');
        }
    }
})

$('#bigimagediv').click( function () {
   if($(this).attr('nextStep') == 'pre')
        pre_pic();
   else next_pic();
})

$(function(){
    $('.passage strong').addClass('p_title');
    $('.fd_person li').first().addClass('noborT');
    $('.fd_person li').last().addClass('noborB');
    $("h3").addClass("h3class");
});

$(function(){
    var landlordid = $("#landlordid").val();
    setInt = setInterval("next_pic()",timeInterval);
    commentGoodRateAnimate();
    commentBarAnimate();
});

$(function(){
    var subNum = 0;
    $('#btn_comment').click(function(){
        if(subNum>0) {
            alert("请不要重复提交");
            return false;
        }
        var content = encodeURI($('#content').val());
        var objId = $('#objId').val();
        var toUserId = $('#toUserId').val();
        if(content != '') {
            var greatUrl = 'http://greatwall.xiaozhu.com/greatwall.php';
            var dataArr = {"content" : content};
            var type = "comment";
            try{
                var url = greatUrl + '?content=' + JSON.stringify(dataArr) + '&type=' + type + '&_t=' + new Date().getTime();
                var self = this;

                $.getJSON(url, "jsoncallback=?", function(data){
                        if(data)
                        {
                        if(data.state== '1' && data.isSpam=='1')
                        {
                        alert("您发送的内容中包含违禁词:" + data.tips + ",请检查");
                        return false;
                        }
                        }
                        subNum = 1;
                    $.ajax({
                        type: "POST",
                        url: "/ajaxRequest/Ajax_FangDong_Special_Add_Comment",
                        data: "toUserId="+toUserId+"&objId="+objId+"&content="+content,
                        success: function(data) {
                            var dataObj = (new Function("","return "+data))();
                            if(dataObj['error'] == '1') {
                                alert(dataObj['message']);
                                subNum = 0;
                            } else {
                                alert('评论成功');
                                $('#content').val("");
                                window.location.reload();
                            }
                        }
                    });
                    })
                    }catch(e){alert(e);}

        } else {
            alert('评论不能为空');
        }
//
    });

    $("#login_btn").click(function(){
        var username = $.trim($('#loginUserName').val());
        var password = $.trim($('#loginPassword').val());
        if(username == '' || password == ''){
            $("#loginerror").html('用户名或密码不能为空').show();
            return false;
        }
        var url = $('#submitUrl').val();
        $.ajax({
            type:"POST",
            url: url,
            data: "username="+username+"&password="+password,
            async:false,
            success: function(data) {
                var dataObj=eval("("+data+")");
                if (dataObj && dataObj.status == 0) {
                    $("#loginerror").html(dataObj.error).show();
                    return false;
                } else {
                    $("#loginerror").html('').hide();
                    $("#userloginDialog").dialog("close");
                    window.location.reload();
                }
            }
        });
    });

    $(".delDiaryComment").bind("click",function(){
        removeComment($(this).attr("value"));
        });
});

$(function () {
    $('#praise_btn').click(function (e) {
            e.preventDefault();
            var $diaryId = $('#objId').val();
            var $toUserId = $('#toUserId').val();
            var $backurl = $('#backurl').val();
            var $this = $(this);
            if ($.type($diaryId)!='undefined' && $.type(toUserId)!='undefined') {
                    var url = XZWebUrlWriter.getAjax_Add_Zan();;
                    var data = {diaryid:$diaryId, touserid:$toUserId};
                    $.get(url, data, function (data) {
                            if (data.error=='0') {
                                    $this.removeClass('ico_zan');
                                    $this.addClass('ico_zaned');
                                    $('#zannum').html(data.num);
                            } else {
                                    alert(data.message);
                            }
                    },'json');
            } else {
                    //	alert('请登录后在进行该操作！');
                    //	window.location.href = $backurl;
                    sessionStorage.setItem("from", "praise");
                    XZWebRegByMobileDialog.showRegForm();
            }
    });
});

function changePic(bigImgUrl,e,imgWidth,imgHeight,thumbImgUrl,img_intro)
{
    $('#bigImage1').fadeOut(1000,function(){
        $('#bigImage1').remove();
        $('#bigimagediv').html('<img id="bigImage1" src="'+bigImgUrl+'" width="'+imgWidth+'" height="'+imgHeight+'" style="position:relative" />');

        $('.pics_list li').removeClass('selected_img');
        $(e).parent().addClass('selected_img');
        $('.intro_p').text(img_intro);
        clearInterval(setInt);
        setInt = setInterval("next_pic()",timeInterval);
    });
}

function pre_pic()
{
    if(firstPic>0)
    {
        firstPic -- ;
        if(firstPic <0) firstPic = 0;
        $('#img_'+lastPic).hide();
        $('#img_'+firstPic).show();
        $('#img_'+firstPic).children('a').children('img').attr('src', $('#img_'+firstPic).children('a').children('img').attr('originalsrc'));
        lastPic--;
        if(lastPic<rowPic) lastPic = rowPic;
    }
    var li_len = $('.pics_list li').length;
    var last_li_index = li_len-1;
    if($('.pics_list .selected_img').attr('id') == 'img_0' )
    {
        if(last_li_index > rowPic-1)
        {
            firstPic = last_li_index-rowPic+1;
            lastPic = last_li_index;
            for(var n = 0;n<firstPic;n++)
            {
                $('#img_'+n).hide();
            }
            for(var i=firstPic;i<=lastPic;i++)
            {
                var imgUrl = $('#img_'+i).children('a').children('img').attr('src');
                if(imgUrl == '' || typeof(imgUrl) == 'undefined')
                {
                    var imgOriginalUrl = $('#img_'+i).children('a').children('img').attr('originalsrc');
                    $('#img_'+i).children('a').children('img').attr('src',imgOriginalUrl);
                }
                $('#img_'+i).show();
//                $('.intro_p').text($('#img_intro_'+i).val());
            }
        }
        $('#img_'+last_li_index).find('a').click();

    }else
    {
        $('.pics_list .selected_img').prev().find('a').click();
    }
}

function next_pic()
{
    var li_len = $('.pics_list li').length;
    var totalPic = li_len-1;
    if(totalPic > lastPic)
    {
        lastPic++;
        if(lastPic > totalPic )
        {
            lastPic = totalPic;
        }else
        {
            var imgUrl = $('#img_'+lastPic).children('a').children('img').attr('src');
            if(imgUrl == '' || typeof(imgUrl) == 'undefined')
            {
                var imgOriginalUrl = $('#img_'+lastPic).children('a').children('img').attr('originalsrc');
                $('#img_'+lastPic).children('a').children('img').attr('src',imgOriginalUrl);
            }
            $('#img_'+lastPic).show();
            $('#img_'+firstPic).hide();
//            $('.intro_p').text($('#img_intro_'+lastPic).val());
            firstPic++;
        }
    }
    if($('.pics_list .selected_img').attr('id') == 'img_'+totalPic )
    {
        if(totalPic > rowPic-1)
        {
            firstPic = 0;
            lastPic = rowPic-1;
            for(var n = lastPic+1;n<=totalPic;n++)
            {
                $('#img_'+n).hide();
            }
            for(var i=firstPic;i<=lastPic;i++)
            {
                $('#img_'+i).show();
            }
        }
        $('#img_0').find('a').click();

    }else
    {
        $('.pics_list .selected_img').next().find('a').click();
    }
}

function getpos(element)
{
    if (arguments.length != 1 || element == null)
        return null;
    var elmt = element;
    var offsetTop = elmt.offset().top;
    var offsetLeft = elmt.offset().left;
    //var offsetWidth = elmt.offsetWidth;
    //var offsetHeight = elmt.offsetHeight;
    while (elmt == elmt.offsetParent)
    {
        offsetTop += elmt.offset().top;
        offsetLeft += elmt.offset().left;
    }
    return {
        top: offsetTop,
        left: offsetLeft
        //right: offsetWidth + offsetLeft,
       // bottom: offsetHeight + offsetTop
    };
}

function commentGoodRateAnimate() {
    var comment_box;
    var goodRate;
    comment_box = $(".comment_percent .comment_left");
    span = comment_box.children('span');
    goodRate = span.attr('value');
    if (goodRate == undefined || goodRate <= 0 || goodRate > 100) {
        goodRate = 100;
    }
    span.text(goodRate);
    var s = 0;
    var w = setInterval(function () {
            s++;
            span.text(s+'%');
            if (s == goodRate) { clearInterval(w); }
        }, 10);
    comment_box.prepend(span);
}

function commentBarAnimate(){
    var comment_bar;
    var barRate;
    comment_bar = $(".comment_percent .comment_right em");
    comment_bar.each(function(i,item){
        barRate = $(item).attr('value');
        $(item).width(0);
        $(item).animate({
            width: barRate+"%"
        },1000);
    });
}

function moreIntro(id)
{
    $('#moreintro'+id).show();
    $('#shortintro'+id).hide();
    $('#morebtn'+id).hide();
    $('#chg2short'+id).show();
}
function shortIntro(id)
{
    $('#moreintro'+id).hide();
    $('#shortintro'+id).show();
    $('#morebtn'+id).show();
    $('#chg2short'+id).hide();
}
function moreComment(bookorderid)
{
    $('#moreComment_'+bookorderid).show();
    $('#moreCommentBtn_'+bookorderid).hide();
    $('#lessCommentBtn_'+bookorderid).show();
}
function lessComment(bookorderid)
{
    $('#moreComment_'+bookorderid).hide();
    $('#moreCommentBtn_'+bookorderid).show();
    $('#lessCommentBtn_'+bookorderid).hide();
}
function showMoreReplyComment(bookorderid)
{
    $('.hideReply_'+bookorderid).show();
    $('#showMoreReply_'+bookorderid).hide();
    $('#hideMoreReply_'+bookorderid).show();
}
function hideMoreReplyComment(bookorderid)
{
    $('.hideReply_'+bookorderid).hide();
    $('#showMoreReply_'+bookorderid).show();
    $('#hideMoreReply_'+bookorderid).hide();
}
function showMoreStorys(counter)
{
    var step = 10;
    var story_page = parseInt($('#story_page').val());
    var min = parseInt(story_page)*step+1;
    var max = (parseInt(story_page)+1)*step;
    for (i=min;i<=max;i++) {
        $('.story_title_'+i).show();
    }
    $('#story_page').val(story_page+1);
    if ((story_page+1)*step > counter) {
        $('#showStory').hide();
        $('#hideStory').show();
    }
}
function hideMoreStorys(counter)
{
    var step = 10;
    for (i=10+1;i<=counter;i++) {
        $('.story_title_'+i).hide();
    }
    $('#story_page').val(1);
    $('#hideStory').hide();
    $('#showStory').show();
}
function urgeLandlord(landlordid,visitorid) {
    if (landlordid == '' || visitorid == '') {
        alert ('要催促的房东不存在');
        return false;
    }
    $.ajax({
        type: "POST",
        url: XZWebUrlWriter.getAjax_Add_Cui(),
        data: "landlordid="+landlordid+"&visitorid="+visitorid,
        success: function(data) {
            var dataObj = (new Function("","return "+data))();
            if(dataObj['error'] == '1') {
                alert(dataObj['message']);
            } else {
                alert('催促成功');
                window.location.reload();
            }
        }
    });
}
function openLoginDialog() {
    $('.logindialog').trigger('click');
}
function closeUserDialog()
{
    $("#userloginDialog").dialog("close");
    return false;
}
function disFangKeComment(obj) {
    $(obj).hide();
    $(obj).parent().siblings('.comment_p').show();
    $(obj).parent().siblings('.comment_p').children('.btn_fd_close').show();
    $(obj).parent('.comment_p').removeClass('paddingB40');
}
function hideFangKeComment(obj) {
    $(obj).hide();
    $(obj).parent().hide();
    $(obj).parent().siblings('.comment_p').children('.btn_fd_dp').show();
    $(obj).parent().siblings('.comment_p').addClass('paddingB40');
}

function removeComment(commentId)
{
    if(confirm("是否删除此评论?")){
        if(commentId)
        {
            $.ajax({
                url:XZWebUrlWriter.getAjax_DelCommentUrl(),
                type:"post",
                data:{commentId:commentId},
                dataType:"json",
                success:function(res){
                    if(parseInt(res.error)){
                        alert(res.message);
                    }else{
                        alert('删除成功');
                        window.location.reload();
                    }
                },
                error : function(){alert("删除失败");}
            });
        }
    };
}
/*
$('#diary-elite').load('/ajax.php?op=Ajax_Search_Diary&cityid=12&type=diary', function(){
    if ($('#diary-elite').text() == '' ){
        $('#diary-elite').hide();
        return ;
    }
    $('.center_con_q').slides({
        preload: true,
        preloadImage: '/images/loading_gray.gif',
        play: 0,
        pause: 0,
        generatePagination: true,
        prependPagination: true,
        paginationClass: "slides_jhhpzt",
        slidesLoaded:function(){
        },
        currentClass: "onshow",
        next:"slides-next",
        prev:"slides-prev"
    });
    $('.slides_jhhpzt li').live('mouseover',function(){
        var slide_num = parseInt($(this).find('a').text()) - 1;
        var slide_img = $('.slidess').eq(slide_num).find('img');
        if (slide_img.attr('xz_src') != 'ok') {
            slide_img.attr('src', slide_img.attr('xz_src'));
            slide_img.attr('xz_src', 'ok')
        }
        $(this).find('a').trigger('click');
        $('.slides_container_box').find('.jschangewidth270').css('width','270px');
    })
});
*/
 
 $(document).bind("click",function(e){                            
    var target = $(e.target);
    var commentIdDialog = $('#commentIdDialog').val();
    if(target.closest('.img_big_con').length == 0 && target.closest('.img_intro').length == 0 && target.closest('.img_arrow_R').length == 0 && target.closest('.img_arrow_L').length == 0 && target.closest('.thumbimg').length == 0 && target.closest('#bigimagediv').length == 0){
        if (commentIdDialog != '') {
            closeCommentDialog(commentIdDialog);
        }
    }
});
$(function(){
    var button = 1;
    var current = 1;
    $('#oper_tag').click(function(){
        oper_tag(this);
    });

});
function oper_tag(obj) {
    $(obj).siblings('.hid_tag').toggle();
    $(obj).toggleClass('tag_close');
}
function openBigImgDialog(obj,commentid) {
    var commentImgObj = $('#commentBigImage_'+commentid).find('.img_big_con img');
    commentImgObj.each(function(k,v) {
        var xz_src = $(this).attr('xz_src');
        if (xz_src && xz_src != 'ok') {
            $(this).attr('src', xz_src).attr('xz_src','ok');
        }
    });
    $('#commentBigImage_'+commentid).dialog({
        width: '100%',
        height: 'auto',
        resizable: false,
        modal: true,
        closeOnEscape: false,
        position: 'top'
    });
    if ($('.contentFD').length > 0) {
        clearInterval(setInt);
    }
    $('.ui-dialog-titlebar').remove();
    $('#commentBigImage_'+commentid).parent().css({"background":"none","padding":"0px","z-index":"999999"}).after("<div style=\" _position:absolute; _height:expression(document.body.clientHeight + 'px');\" class=\"img_pop_mask\"></div>");
    $('.ui-widget-overlay').css({"z-index":"1001"});
    var imgid = $(obj).attr('imgid');
    $('#big_'+commentid+'_'+imgid).siblings('.img_big_wrapper').hide();
    $('#big_'+commentid+'_'+imgid).show();
    $('#intro_'+commentid+'_'+imgid).siblings('p').hide();
    //$('#intro_'+commentid+'_'+imgid).show();
    $('#close'+commentid+'_'+imgid).siblings('.img_big_close').hide();
    $('#close_'+commentid+'_'+imgid).show();
    imageCount = $('#commentBigImage_'+commentid).children('.img_big_wrapper').length;
    if (imageCount <= 1){
        $('#commentBigImage_'+commentid).children().children('.img_arrow_L').hide();
        $('#commentBigImage_'+commentid).children().children('.img_arrow_R').hide();
    }
    $('#commentId_'+commentid).val(commentid);
    $('#imgId_'+commentid).val(imgid);
    $('#commentIdDialog').val(commentid);
    $("body").eq(0).css("overflow","hidden");
    bindkeyDownEvent(commentid);
}
function changeCommentNextPic(obj,commentid) {
    images = $('#commentBigImage_'+commentid).children('.img_big_wrapper').length;
    button = $(obj).attr('imgid');
    current = button;
    current++;
    if(current==(images + 1)){
        current = 1;
    }
    changeCommentPic(current, button, commentid);
}
function changeCommentPrevPic(obj,commentid) {
    images = $('#commentBigImage_'+commentid).children('.img_big_wrapper').length;
    button = $(obj).attr('imgid');
    current = button;
    current--;
    if(current == 0){
        current = images;
    }
    changeCommentPic(current, button, commentid);
}
function changeCommentPic(current, button, commentid){
    $('#big_' + commentid + '_' + button).hide();
    $('#intro_' + commentid + '_' + button).hide();
    $('#big_' + commentid + '_' + current).show();
    //$('#intro_' + commentid + '_' + current).show();
    $('#imgId_'+commentid).val(current);
}
function closeCommentDialog(commentId) {
    if($("#commentBigImage_" + commentId).dialog("isOpen") != true)
    {
        return false;
    }
    if ($('.contentFD').length > 0) {
        setInt = setInterval("next_pic()",timeInterval);   
    }
    $('#commentBigImage_'+commentId).dialog('close');
    $(window).unbind("keydown");
    $("body").eq(0).css("overflow","scroll");
    $('.img_pop_mask').remove();
}
function bindkeyDownEvent(commentid) {
    $(window).keydown(function(event){
        var keycode = event.which;
        commentId = $('#commentId_'+commentid).val();
        imgid = $('#imgId_'+commentid).val();
        if (keycode == 37) {
            changeCommentPrevPic($('#big_'+commentId+'_'+imgid).children('.img_arrow_L'), commentId);
        }
        if (keycode == 39) {
            changeCommentNextPic($('#big_'+commentId+'_'+imgid).children('.img_arrow_R'), commentId);
        }
        if (keycode == 27) {
            closeCommentDialog(commentId);
        }
    });
}
 
 function blurImageCode(phone)
{
    var checkcode = $('#imagecode').val();
    var flag = true;
    $('#tip_imagecode').html('').hide();
    if (checkcode == '') {
        $('#tip_imagecode').html('<i></i>请输入验证码').show();
        return false;
    } else if (checkcode.length !=4 ) {
        $('#tip_imagecode').html('<i></i>验证码不正确').show();
        $('#img_imagecode').attr("src",XZWebUrlWriter.getAjax_GetPicCheckCodeShowUrl());
        return false;
    }
    else {
    $.ajax({
        type:'get',
        url : XZWebUrlWriter.getAjax_Front_PicCheckCodeVerify(checkcode,phone),
        async: false,
        success:function(data){
            var dataObj=eval("("+data+")");
            if (dataObj && dataObj.status=='1') {
                $('#tip_imagecode').html('').hide();
                flag = true;
                return true;
            } else {
                $('#tip_imagecode').html(dataObj.errmsg).show();
                $('#img_imagecode').attr("src",XZWebUrlWriter.getAjax_GetPicCheckCodeShowUrl());
                flag = false;
                return false;
            }
        }
    });
    return flag;
    }
}
function blurImageCodeInfo(phone)
{
    var checkcode = $('#imagecodeInfo').val();
    var flag = true;
    $('#tip_imagecode').html('').hide();
    if (checkcode == '') {
        $('#imagecodeInfo').addClass('bor_red');
        $('#tip_imagecode').html('<i></i>请输入验证码').show();
        return false;
    } else if (checkcode.length !=4 ) {
        $('#imagecodeInfo').addClass('bor_red');
        $('#tip_imagecode').html('<i></i>验证码不正确').show();
        $('#img_imagecodeInfo').attr("src",XZWebUrlWriter.getAjax_GetPicCheckCodeShowUrl());
        return false;
    }
    else {
    $.ajax({
        type:'get',
        url : XZWebUrlWriter.getAjax_Front_PicCheckCodeVerify(checkcode,phone),
        dataType : 'json',
        async: false,
        success:function(dataObj){
            if (dataObj && dataObj.status=='1') {
                $('#tip_imagecode').html('').hide();
                 $('#imagecodeInfo').removeClass('bor_red');
                flag = true;
                return true;
            } else {
                $('#imagecodeInfo').addClass('bor_red');
                $('#tip_imagecode').html('<i></i>' + dataObj.errmsg).show();
                $('#img_imagecodeInfo').attr("src",XZWebUrlWriter.getAjax_GetPicCheckCodeShowUrl());
                flag = false;
                return false;
            }
        }
    });
    return flag;
    }
}

function resetCheckcode(imageID,imagecode) 
{ 
    XZWebUrlWriter.getRequest(XZWebUrlWriter.headTest_ReqUrl());
    if(imageID == '' || typeof(imageID)=='undefined')
        imageID='img_imagecode';

    if(imagecode == '' || typeof(imagecode)=='undefined')
        imagecode='imagecode';

    $('#'+imageID).attr("src",XZWebUrlWriter.getAjax_GetPicCheckCodeShowUrl());
    $('#'+imagecode).val('');   
    return false;
}

 
 $('.alipay_trust').mouseover(function(){
    $('#alipay-trust-box').show();
})
$('#alipay-trust-box').mouseout(function(){
    $('#alipay-trust-box').hide();
})
jQuery.fn.isChildAndSelfOf = function(b){
    return (this.closest(b).length > 0);
};
$(document).click(function(ev){
    ev = ev || window.event || arguments.callee.caller.arguments[0];
    var target = ev.target || ev.srcElement;
    if($('#alipay-trust-box').is(':visible')){
        if($(target).isChildAndSelfOf(".alipay_trust") || /^zminfo_pair$/.test(target.id)) {
            return;
        }
        $('#alipay-trust-box').hide();
    }
});

$('#zminfo_pair').click(function(){
    var applyUserId = $(this).attr('loginuserid');
    var ownerUserId = $(this).attr('landlordid');
    $.ajax({
         type: "get",
         url: "/ajaxRequest/Ajax_GetZminfo_Pair",
         async:false,
         datatype:'json',
         data: "applyUserId="+applyUserId+"&ownerUserId="+ownerUserId+"&rand="+new Date().getTime(),
         success: function(data) {
            var dataObj=eval("("+data+")");
            if (dataObj && dataObj.status == 0) {
                alert(dataObj.errmsg);
                return false;
            } else {
                var succHtml = '<h2 class="zhima_h2 marginT20">他的芝麻分：'+dataObj.sucmsg+'</h2>';
                $('#zminfo_pair').remove();
                $('.zhima_btm').before(succHtml);
                $('.zhima_con').show();
            }
         }
    });
});
 
 /* Respond.js: min/max-width media query polyfill. (c) Scott Jehl. MIT Lic. j.mp/respondjs  */
(function( w ){

	"use strict";

	//exposed namespace
	var respond = {};
	w.respond = respond;

	//define update even in native-mq-supporting browsers, to avoid errors
	respond.update = function(){};

	//define ajax obj
	var requestQueue = [],
		xmlHttp = (function() {
			var xmlhttpmethod = false;
			try {
				xmlhttpmethod = new w.XMLHttpRequest();
			}
			catch( e ){
				xmlhttpmethod = new w.ActiveXObject( "Microsoft.XMLHTTP" );
			}
			return function(){
				return xmlhttpmethod;
			};
		})(),

		//tweaked Ajax functions from Quirksmode
		ajax = function( url, callback ) {
			var req = xmlHttp();
			if (!req){
				return;
			}
			req.open( "GET", url, true );
			req.onreadystatechange = function () {
				if ( req.readyState !== 4 || req.status !== 200 && req.status !== 304 ){
					return;
				}
				callback( req.responseText );
			};
			if ( req.readyState === 4 ){
				return;
			}
			req.send( null );
		},
		isUnsupportedMediaQuery = function( query ) {
			return query.replace( respond.regex.minmaxwh, '' ).match( respond.regex.other );
		};

	//expose for testing
	respond.ajax = ajax;
	respond.queue = requestQueue;
	respond.unsupportedmq = isUnsupportedMediaQuery;
	respond.regex = {
		media: /@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi,
		keyframes: /@(?:\-(?:o|moz|webkit)\-)?keyframes[^\{]+\{(?:[^\{\}]*\{[^\}\{]*\})+[^\}]*\}/gi,
		comments: /\/\*[^*]*\*+([^/][^*]*\*+)*\//gi,
		urls: /(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g,
		findStyles: /@media *([^\{]+)\{([\S\s]+?)$/,
		only: /(only\s+)?([a-zA-Z]+)\s?/,
		minw: /\(\s*min\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/,
		maxw: /\(\s*max\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/,
		minmaxwh: /\(\s*m(in|ax)\-(height|width)\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/gi,
		other: /\([^\)]*\)/g
	};

	//expose media query support flag for external use
	respond.mediaQueriesSupported = w.matchMedia && w.matchMedia( "only all" ) !== null && w.matchMedia( "only all" ).matches;

	//if media queries are supported, exit here
	if( respond.mediaQueriesSupported ){
		return;
	}

	//define vars
	var doc = w.document,
		docElem = doc.documentElement,
		mediastyles = [],
		rules = [],
		appendedEls = [],
		parsedSheets = {},
		resizeThrottle = 30,
		head = doc.getElementsByTagName( "head" )[0] || docElem,
		base = doc.getElementsByTagName( "base" )[0],
		links = head.getElementsByTagName( "link" ),

		lastCall,
		resizeDefer,

		//cached container for 1em value, populated the first time it's needed
		eminpx,

		// returns the value of 1em in pixels
		getEmValue = function() {
			var ret,
				div = doc.createElement('div'),
				body = doc.body,
				originalHTMLFontSize = docElem.style.fontSize,
				originalBodyFontSize = body && body.style.fontSize,
				fakeUsed = false;

			div.style.cssText = "position:absolute;font-size:1em;width:1em";

			if( !body ){
				body = fakeUsed = doc.createElement( "body" );
				body.style.background = "none";
			}

			// 1em in a media query is the value of the default font size of the browser
			// reset docElem and body to ensure the correct value is returned
			docElem.style.fontSize = "100%";
			body.style.fontSize = "100%";

			body.appendChild( div );

			if( fakeUsed ){
				docElem.insertBefore( body, docElem.firstChild );
			}

			ret = div.offsetWidth;

			if( fakeUsed ){
				docElem.removeChild( body );
			}
			else {
				body.removeChild( div );
			}

			// restore the original values
			docElem.style.fontSize = originalHTMLFontSize;
			if( originalBodyFontSize ) {
				body.style.fontSize = originalBodyFontSize;
			}


			//also update eminpx before returning
			ret = eminpx = parseFloat(ret);

			return ret;
		},

		//enable/disable styles
		applyMedia = function( fromResize ){
			var name = "clientWidth",
				docElemProp = docElem[ name ],
				currWidth = doc.compatMode === "CSS1Compat" && docElemProp || doc.body[ name ] || docElemProp,
				styleBlocks	= {},
				lastLink = links[ links.length-1 ],
				now = (new Date()).getTime();

			//throttle resize calls
			if( fromResize && lastCall && now - lastCall < resizeThrottle ){
				w.clearTimeout( resizeDefer );
				resizeDefer = w.setTimeout( applyMedia, resizeThrottle );
				return;
			}
			else {
				lastCall = now;
			}

			for( var i in mediastyles ){
				if( mediastyles.hasOwnProperty( i ) ){
					var thisstyle = mediastyles[ i ],
						min = thisstyle.minw,
						max = thisstyle.maxw,
						minnull = min === null,
						maxnull = max === null,
						em = "em";

					if( !!min ){
						min = parseFloat( min ) * ( min.indexOf( em ) > -1 ? ( eminpx || getEmValue() ) : 1 );
					}
					if( !!max ){
						max = parseFloat( max ) * ( max.indexOf( em ) > -1 ? ( eminpx || getEmValue() ) : 1 );
					}

					// if there's no media query at all (the () part), or min or max is not null, and if either is present, they're true
					if( !thisstyle.hasquery || ( !minnull || !maxnull ) && ( minnull || currWidth >= min ) && ( maxnull || currWidth <= max ) ){
						if( !styleBlocks[ thisstyle.media ] ){
							styleBlocks[ thisstyle.media ] = [];
						}
						styleBlocks[ thisstyle.media ].push( rules[ thisstyle.rules ] );
					}
				}
			}

			//remove any existing respond style element(s)
			for( var j in appendedEls ){
				if( appendedEls.hasOwnProperty( j ) ){
					if( appendedEls[ j ] && appendedEls[ j ].parentNode === head ){
						head.removeChild( appendedEls[ j ] );
					}
				}
			}
			appendedEls.length = 0;

			//inject active styles, grouped by media type
			for( var k in styleBlocks ){
				if( styleBlocks.hasOwnProperty( k ) ){
					var ss = doc.createElement( "style" ),
						css = styleBlocks[ k ].join( "\n" );

					ss.type = "text/css";
					ss.media = k;

					//originally, ss was appended to a documentFragment and sheets were appended in bulk.
					//this caused crashes in IE in a number of circumstances, such as when the HTML element had a bg image set, so appending beforehand seems best. Thanks to @dvelyk for the initial research on this one!
					head.insertBefore( ss, lastLink.nextSibling );

					if ( ss.styleSheet ){
						ss.styleSheet.cssText = css;
					}
					else {
						ss.appendChild( doc.createTextNode( css ) );
					}

					//push to appendedEls to track for later removal
					appendedEls.push( ss );
				}
			}
		},
		//find media blocks in css text, convert to style blocks
		translate = function( styles, href, media ){
			var qs = styles.replace( respond.regex.comments, '' )
					.replace( respond.regex.keyframes, '' )
					.match( respond.regex.media ),
				ql = qs && qs.length || 0;

			//try to get CSS path
			href = href.substring( 0, href.lastIndexOf( "/" ) );

			var repUrls = function( css ){
					return css.replace( respond.regex.urls, "$1" + href + "$2$3" );
				},
				useMedia = !ql && media;

			//if path exists, tack on trailing slash
			if( href.length ){ href += "/"; }

			//if no internal queries exist, but media attr does, use that
			//note: this currently lacks support for situations where a media attr is specified on a link AND
				//its associated stylesheet has internal CSS media queries.
				//In those cases, the media attribute will currently be ignored.
			if( useMedia ){
				ql = 1;
			}

			for( var i = 0; i < ql; i++ ){
				var fullq, thisq, eachq, eql;

				//media attr
				if( useMedia ){
					fullq = media;
					rules.push( repUrls( styles ) );
				}
				//parse for styles
				else{
					fullq = qs[ i ].match( respond.regex.findStyles ) && RegExp.$1;
					rules.push( RegExp.$2 && repUrls( RegExp.$2 ) );
				}

				eachq = fullq.split( "," );
				eql = eachq.length;

				for( var j = 0; j < eql; j++ ){
					thisq = eachq[ j ];

					if( isUnsupportedMediaQuery( thisq ) ) {
						continue;
					}

					mediastyles.push( {
						media : thisq.split( "(" )[ 0 ].match( respond.regex.only ) && RegExp.$2 || "all",
						rules : rules.length - 1,
						hasquery : thisq.indexOf("(") > -1,
						minw : thisq.match( respond.regex.minw ) && parseFloat( RegExp.$1 ) + ( RegExp.$2 || "" ),
						maxw : thisq.match( respond.regex.maxw ) && parseFloat( RegExp.$1 ) + ( RegExp.$2 || "" )
					} );
				}
			}

			applyMedia();
		},

		//recurse through request queue, get css text
		makeRequests = function(){
			if( requestQueue.length ){
				var thisRequest = requestQueue.shift();

				ajax( thisRequest.href, function( styles ){
					translate( styles, thisRequest.href, thisRequest.media );
					parsedSheets[ thisRequest.href ] = true;

					// by wrapping recursive function call in setTimeout
					// we prevent "Stack overflow" error in IE7
					w.setTimeout(function(){ makeRequests(); },0);
				} );
			}
		},

		//loop stylesheets, send text content to translate
		ripCSS = function(){

			for( var i = 0; i < links.length; i++ ){
				var sheet = links[ i ],
				href = sheet.href,
				media = sheet.media,
				isCSS = sheet.rel && sheet.rel.toLowerCase() === "stylesheet";

				//only links plz and prevent re-parsing
				if( !!href && isCSS && !parsedSheets[ href ] ){
					// selectivizr exposes css through the rawCssText expando
					if (sheet.styleSheet && sheet.styleSheet.rawCssText) {
						translate( sheet.styleSheet.rawCssText, href, media );
						parsedSheets[ href ] = true;
					} else {
						if( (!/^([a-zA-Z:]*\/\/)/.test( href ) && !base) ||
							href.replace( RegExp.$1, "" ).split( "/" )[0] === w.location.host ){
							// IE7 doesn't handle urls that start with '//' for ajax request
							// manually add in the protocol
							if ( href.substring(0,2) === "//" ) { href = w.location.protocol + href; }
							requestQueue.push( {
								href: href,
								media: media
							} );
						}
					}
				}
			}
			makeRequests();
		};

	//translate CSS
	ripCSS();

	//expose update for re-running respond later on
	respond.update = ripCSS;

	//expose getEmValue
	respond.getEmValue = getEmValue;

	//adjust on resize
	function callMedia(){
		applyMedia( true );
	}

	if( w.addEventListener ){
		w.addEventListener( "resize", callMedia, false );
	}
	else if( w.attachEvent ){
		w.attachEvent( "onresize", callMedia );
	}
})(this);
 
 
$(function () {

    var oLA = $(".city_list_left>li>a");//左边的城市集合
    var oRA = $(".city_list_right>li>a");//右边的字母集合
    var oLS = $(".city_list_left>li>span");//左边的字母集合

    /*  点击事件：选择城市  */
    oLA.each(function (index, ele) {
        var cName = $(this).attr("data-en")[0].toUpperCase();
        var eq = index;
        $(this).click(function () {
            // hot change , eq = hot city number - 1
            if (eq <= 7) {
                $("#hot").css("background-position", "0 0");
            } else if (eq > 7) {
                $("#hot").css("background-position", "0 -15px");
            }

            for (var i = 0; i < oLA.length; i++) {
                oLA[i].className = "";
            }
            oRA.each(function () {
                $(this).removeClass();
            });
            $(this).addClass("active");

            /*   选择关闭  */
            $(".city_wrap i").html($(this).find("span").html());
            $(".city_list").hide();
            $("#invite_city_list").attr("class", "region_spread");
            stack = !stack;

            $('#' + cName + '').attr("class", "active");
            var enName = $(this).attr('data-en');
            var flagName = (enName == 'HongKong' || enName == 'Macau' || enName == 'TaiWan') ? 'China' : enName.replace(/\s+/g, "_");
            if (enName == 'Ascension' || enName == 'French Guiana' || enName == 'Reunion') {
                $("#invite_country_box img").remove();
            } else {
                if (!$("#invite_country_box i").prev().is("img")) {
                    $("#invite_country_box i").before("<img>");
                }
                $("#invite_country_box img").attr('src', '/images/flag/' + flagName + ".jpg");
            }
            $('#invite_country').attr('countrycode', $(this).attr('data-code')).attr('countryname', $(this).attr('data-shortname')).attr('countryflag', flagName).text('+' + $(this).attr('data-code'));
        })
    });
    /*  点击事件：选择字母  */
    oRA.each(function (index, ele) {
        var oId = this.id;  //当前ID
        var eq = index;
        $(this).click(function () {
            if (eq == 0) {
                $("#hot").css("background-position", "0 0");
                $('.city_list').scrollTop(0);
                oRA.each(function () {
                    $(this).removeClass();
                })
            } else if (eq != 0) {
                $("#hot").css("background-position", "0 -15px");
                for (var i = 0; i < oLA.length; i++) {
                    var LName = oLA[i].getAttribute("data-en")[0].toUpperCase();
                    if (LName == oId) {
                        var sNum = oLA[i].offsetTop - 143;
                        $('.city_list').scrollTop(sNum);
                        return;
                    }
                }
            }
        });
    });
    /*  滚动事件：城市选框  */
    $(".city_list").scroll(function () {
        var top = this.scrollTop + 10 + "px";
        $(".city_list_right").css("top", top);
        if (this.scrollTop > 150) {
            $("#hot").css("background-position", "0 -15px");
            for (var i = 0; i < oLS.length; i++) {
                var Otop = oLS[i].offsetTop - this.scrollTop;
                var tName = oLS[i].innerHTML;

                if (Otop <= 150) {
                    oRA.each(function () {
                        $(this).removeClass();
                    });

                    $('#' + tName + '').attr("class", "active");
                }
            }
        } else {
            $("#hot").css("background-position", "0 0");
            oRA.each(function () {
                $(this).removeClass();
            });
        }

    });
    /*点击事件：展开&收缩*/
    var stack = false;
    $("#invite_country_box").click(function () {
        if (stack) {
            $(".city_list").hide();
            $("#invite_city_list").attr("class", "city_list_spread");
            stack = !stack;
        } else {
            $(".city_list").show();
            $("#invite_city_list").attr("class", "city_list_shrink");
            stack = !stack;
        }
    });
    $('#goregister').on('click', function () {
        var url = [];
        var defaultNationCode = '86';
        var phone = $('#invitePhone').val();
        var directUrl = $('#inviteRegisterUrl').val()
        if (phone) {
            url.push('regphone=' + phone);
            if (defaultNationCode != $('#invite_country').attr('countrycode')) {
                url.push('countryname=' + $('#invite_country').attr('countryname'));
                url.push('countrycode=' + $('#invite_country').attr('countrycode'));
                url.push('countryflag=' + $('#invite_country').attr('countryflag'));
            }
            directUrl = directUrl + '&' + url.join('&');
        }
        window.location = directUrl;
    });
    $('#closeShareInvite').on('click',function(){
        $('#shareInvitePop').hide();
    });

});


