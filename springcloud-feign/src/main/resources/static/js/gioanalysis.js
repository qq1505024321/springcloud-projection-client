(function(){
    //GIO
    var gioxz = document.createElement('script'); gioxz.type = 'text/javascript'; gioxz.async = true;
    var gioxzjs ="!function(e,t,n,g,i){e[i]=e[i]||function(){(e[i].q=e[i].q||[]).push(arguments)},n=t.createElement('script'),tag=t.getElementsByTagName('script')[0],n.async=1,n.src=('https:'==document.location.protocol?'https://':'http://')+g,tag.parentNode.insertBefore(n,tag)}(window,document,'script','assets.giocdn.com/2.1/gio.js','gio');"+
    "gio('init', '59a81cc7d8c04307ba183d331c373ef6', {});"+
    "gio('config', {'hashtag':true});"+
    "var userkey = localStorage.getItem('jsversion') + 'xzuser';"+
    "var userStr = localStorage.getItem(userkey);"+
    "if(userStr){"+
    "var userInfoObj = JSON.parse(userStr);"+
    "gio('setUserId', userInfoObj.userid);"+
    "}"+
    "gio('send');"+
    "if(!userStr){"+
    "gio('clearUserId');"+
    "}";
    var gioxzcode = document.createTextNode(gioxzjs);
    gioxz.appendChild(gioxzcode);
    document.body.appendChild(gioxz);
})();
