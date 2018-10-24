/**
 * Created by gaoying on 2017/11/3.
 */

var get = require('../tools/promis').get;

module.exports = {
    getData:function(){
        var url ='http://rap2api.taobao.org/app/mock/95244/mockjsdata';
         return get(url);
    }
};

