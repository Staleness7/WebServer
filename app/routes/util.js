let express = require('express');
let router = express.Router();
let exec = require('child_process');
const path = require('path');

// -------------------------------------公用相关-----------------------------------
router.get('/exec_sh', function (req, res, next) {
    let filePath = req.query.filePath;
    exec.exec('sh ' + filePath, {cwd: path.join(__dirname, "../../")}, (err, stdout) => {
        if(err) {
            console.error(err);
            res.end("fail:" + JSON.stringify(err));
        }else{
            console.log(`stdout: ${stdout}`);
            res.end("success");
        }
    });
});

module.exports = router;