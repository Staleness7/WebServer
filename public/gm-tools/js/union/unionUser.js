var userDataPageSize = 20;
let curQueryUnionID = 0;

function fixData(dataArr) {
    let arr = [];
    for (let i = 0; i < dataArr.length; ++i){
        let newData = {};
        let data = dataArr[i];
        for (let key in data){
            if (key === 'unionInfo') continue;
            if (data.hasOwnProperty(key)){
                newData[key] = data[key];
            }
        }
        let unionInfo = data.unionInfo.find(function (e) {
            return e.unionID === curQueryUnionID;
        });
        if (!!unionInfo){
            for (let key in unionInfo){
                if (unionInfo.hasOwnProperty(key)){
                    newData[key] = unionInfo[key];
                }
            }
        }
        arr.push(newData);
    }
    return arr;
}

function createList(){
    let matchData = {};
    let uid = $("#txtSearch").val();
    if (!!uid){
        matchData.uid = parseInt(uid || "");
    }
    let unionID = parseInt($("#unionID").val() || "");
    if (!unionID){
        alert("请输入联盟ID");
        return;
    }
    curQueryUnionID = unionID;
    matchData["unionInfo.unionID"] = unionID;

    apiAdminGetRecord("userModel", 0, userDataPageSize, matchData, function (data) {
        if (data.code === 0){
            var dataList = $('#dataList');
            var dataPager = dataList.datagrid("getPager");

            let msg = data.msg;
            dataList.datagrid('loadData', fixData(msg.recordArr));
            dataPager.pagination({
                total: msg.totalCount,
                onSelectPage:function (pageNo, pageSize) {
                    var start = (pageNo - 1) * pageSize;
                    //var end = start + pageSize;
                    apiAdminGetRecord("userModel", start, userDataPageSize, matchData, function (data) {
                        dataList.datagrid("loadData", fixData(data.msg.recordArr));
                        dataPager.pagination('refresh', {
                            total:data.msg.totalCount,
                            pageNumber:pageNo
                        });
                    })
                }
            });
        }
    });
}

function openGrantHtml(uid){
    window.open('./changeDraw.html?uid=' + uid, "_blank", "height=300,width=800,scrollbars=no,location=no");
}

function execGrant(uid, count, cb){
    count = parseInt(count) || 0;
    if (count === 0){
        alert('输入数据错误，请检查数据');
        return;
    }

    apiUpdateUserDataEx({uid: uid, "unionInfo.unionID": curQueryUnionID}, {"unionInfo.$.totalDraw": count}, function () {
        cb();
        createList();
    })
}

$(document).ready(function() {
    // 初始化数据列名
    var dataList = $('#dataList');
    dataList.datagrid({
        nowrap: true,
        autoRowHeight: false,
        striped: true,
        pagination: true,
        showFooter: true,
        pageSize: userDataPageSize,
        pageList: [userDataPageSize],
        rownumbers: true,
        onBeforeSelect:function(){
            return false;
        },
        singleSelect: true,
        columns:[[
            {field: 'ck', checkbox: true},
            {field:'uid',title:'用户ID'},
            {field:'nickname',title:'昵称'},
            {field:'spreaderID',title:'上级用户ID'},
            {field:'score', title: '分数'},
            {field:'safeScore', title: '保险柜分数'},
            {field:'rebateRate', title: '点位'},
            {field:'totalDraw', title: '总局数'},
            {field:'joinTime', title: '加入时间',
                formatter: function (value) {
                    return new Date(value).toLocaleString();
                }
            }
        ]]
    });

    $('#btnQuery').click(function(){
        createList()
    });
    $('#btnChangeDraw').click(function (){
        var rows = $('#dataList').datagrid('getChecked');
        if (rows.length > 0){
            openGrantHtml(rows[0].uid);
        }else{
            alert("请选择操作对象");
        }
    });
});