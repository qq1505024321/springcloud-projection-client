	function getDivByUrl(urls){
		var div="";
		$.ajax({
			url:urls,
			type:"post",
			async:false,
			dataType:"text",
			success: function(data){
				div=data;	
			},
			error : function(){
				alert("系统错误，请联系管理员")
			}
		})
		return div;
	}
	
	function tipDiag(tit){
		
	    var d = dialog({
	        content: tit
	    });
	    d.show();
	    setTimeout(function () {
	        d.close().remove();
	    }, 2000);

		
	}