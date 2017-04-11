$(function() {
	var gTable = $("table.data");
	var data_url ='data.php?action=initDataList';
	$.get(data_url,function(data){
		//alert(data);
		//debugger;
		var rowItems = $.parseJSON(data);
		for(var i=0,j=rowItems.length;i<j;i++){
			var dataDom =createRow(rowItems[i]);
			gTable.append(dataDom);
		}
	});
	function delHandel(){
			var dataId = $(this).attr("dataId");
			var meButton =$(this);
			$.post("data.php?action=delRow",{dataId:dataId},function(res){
				if ("ok" == res) {
					$(meButton).parent().parent().remove();
				}else{
					alert("删除失败");
				}

			});
		}

	function editHandel(){
			var dataId = $(this).attr("dataId");
			var meButton =$(this);
			var meRow =$(this).parent().parent();//no events

			var editRow =$("<tr></tr>");

			for(var i=0;i<8;i++){
				var editTd = $("<td><input type='text' class='txtField' /></td>");
				var v=meRow.find('td:eq('+i+')').html();//注意引号
				editTd.find('input').val(v);
				editRow.append(editTd);

			}
			var optTd =$('<td></td>');
			var saveButton =$("<a href='javascript:;' class='optLink'>保存&nbsp;</a>");
			//保存编辑事件
			saveButton.click(function(){
				var currentRow = $(this).parent().parent();
				var inputFields =currentRow.find("input");
				var postFields ={};
				for(var i=0,j=inputFields.length;i<j;i++){
					postFields['col_'+i] =inputFields[i].value;
				}
				postFields['id'] =dataId;
				$.post("data.php?action=editRow",postFields,function(res){
					//alert(res);
					if( res=="ok"){
						var newUpdateRow = createRow(postFields);		
						currentRow.replaceWith(newUpdateRow);
			    	} else {
						alert("数据更新失败...");	
					}
				});
			});
			var cancelButton =$("<a href='javascript:;' class='optLink'>取消&nbsp;</a>");

			//取消编辑事件
			cancelButton.click(function(){
				var currentRow =$(this).parent().parent();
			    meRow.find('a:eq(0)').click(delHandel);
				meRow.find('a:eq(1)').click(editHandel);
				currentRow.replaceWith(meRow);


			});
			optTd.append(saveButton);
			optTd.append(cancelButton);
			editRow.append(optTd);
			meRow.replaceWith(editRow);
		}


	function createRow(dataItem){
		//debugger;
		var rowObj =$("<tr></tr>")
		for( var k in dataItem){
			//alert(k);
			if ("id"!=k) {
				var colTd =$("<td></td>");
				colTd.html(dataItem[k]);
				rowObj.append(colTd);
			};
		}
		

		var delButton =$('<a class="optLink" href="javascript:;">删除&nbsp;</a>');
		delButton.attr("dataId",dataItem['id']);
		delButton.click(delHandel);

		var editButton =$('<a class="optLink" href="javascript:;">编辑&nbsp;</a>');
		var optTd =$('<td></td>');
		editButton.attr("dataId",dataItem['id']);
		editButton.click(editHandel);

		optTd.append(delButton);
		optTd.append(editButton);
		rowObj.append(optTd);
		return rowObj;
		//return $("<tr><td colspan='9'><h1>hello</h1></td><tr>");
	}
	
	$("#addBtn").click(function(){
		var addRow = $("<tr></tr>");

		for (var i = 0; i < 8; i++) {
			var colTd =$('<td><input type="text" class="txtField"/></td>');
			addRow.append(colTd);
		}
		var colOpt =$("<td></td>");
		var confirmBtn =$("<a href='javascript:;' class='optLink'>确认&nbsp;</a>");

		confirmBtn.click(function(){
			var currentRow = $(this).parent().parent();
			var inputFields =currentRow.find("input");
			var postFields ={};
			for(var i=0,j=inputFields.length;i<j;i++){
				postFields['col_'+i] =inputFields[i].value;
			}
			$.post("data.php?action=addRow",postFields,function(res){
				if (res>0) {
					postFields['id'] =res;
					var postAddRow =createRow(postFields);
					currentRow.replaceWith(postAddRow);
				}else{
					alert("插入失败");
				}
			});
		});
		var cancleBtn =$("<a href='javascript:;' class='optLink'>取消&nbsp;</a>");

		cancleBtn.click(function(){
			$(this).parent().parent().remove();

		});


		colOpt.append(confirmBtn);
		colOpt.append(cancleBtn);

		addRow.append(colOpt);
		gTable.append(addRow);
	});

});