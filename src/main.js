Vue.component('my-component',{
    template: '#myComponent',
    data: function(){
        return {
            list: []
        }
    },
    methods: {
        parseData: function(datas){
            this.list = datas.data.pageList;
        }
    },
    mounted: function() {
        var _this = this;
        // axios.get('/server/getTaobao')
        // .then(function (res) {
        //     if(res.status == 200){
        //         _this.parseData(JSON.parse(res.data));
        //     }
        // }).catch(function (err) {
        //     console.log(error);
        // });
        _this.parseData(MYDATALIST);
    }
})

var app = new Vue({
    el: '#app'
})