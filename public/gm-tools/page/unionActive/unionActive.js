$(document).ready(function() {
    let fileOptIcon;
    apiAdminGetRecord('configModel', 0, 100, {key: "unionActiveImgArr"}, function (data) {
        let imgArr = data.msg.recordArr.length > 0?data.msg.recordArr[0].value:"[]";
        imgArr = JSON.parse(imgArr);
        fileOptIcon = $("#imgArr").initUpload({
            "uploadUrl":"/file/uploadImage",                            //上传文件信息地址
            "deleteUrl":"/file/deleteFiles",                            //删除文件信息地址
            "size":2048,                                                //文件大小限制，单位kb,默认不限制
            "maxFileNumber":4,                                          //文件个数限制，为整数
            "filelSavePath":"static/uploadcache/",                      //文件上传地址，后台设置的根目录
            "beforeUpload": null,                                       //在上传前执行的函数
            "autoCommit":false,                                         //文件是否自动上传
            "showSummerProgress": false,                                //是否显示上传进度
            "fileType":['png','jpg'],                                    //文件类型限制，默认不限制，注意写的是文件后缀
            "originalFileList": imgArr,                                 //初始文件
            "success": function (opt, fileList) {
                fileList = fileList || [];

                apiAdminUpdateRecord("configModel", {key: "unionActiveImgArr"}, {value: JSON.stringify(fileList)}, function () {
                    alert("提交成功");
                })
            },
            "error": function (err) {
                console.error(err);
            }
        });
    });

    $('#btnSend').click(function(){
        $("#imgArr").uploadFile(fileOptIcon);
        return false;
    });
});