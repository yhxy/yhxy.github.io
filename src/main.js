//列表及头部
Vue.component('my-component', {
    template: '#myComponent',
    data: function () {
        return {
            list: [],
            searchText: '',
        }
    },
    methods: {
        parseData: function (datas) {
            this.caechData = datas.data.pageList;
            this.list = this.getPageData(1);
        },
        doop() {},
        search() {
            var text = this.searchText.replace(/(^\s*)|(\s*$)/g, '');
            if (text) {
                this.list = this.caechData.filter(function (item) {
                    return item.title.indexOf(text) > -1;
                })
            } else {
                this.searchText = '';
                this.list = this.caechData;
            }
        },
        goto: function(index){
            this.list = this.getPageData(index);
            this.$nextTick(function(){
                try{
                    document.documentElement.scrollTop = 0;
                }catch(){}
            });
        },
        getPageData(index){
            return this.caechData.slice((index - 1) * 30 , index * 30);
        }
    },
    mounted: function () {
        this.parseData(MYDATALIST);
    },
    watch: {
        searchText() {
            this.search();
        }
    }
})
//分页组件
Vue.component("pagination", {
    props: {
        showItem: {
            type: Number,
            default: 5,
            required: false
        },
        allpage: {
            type: Number,
            default: function(){
                return  Math.ceil(MYDATALIST.data.pageList.length / 30)
            }
        },
        jump: {
            type: Function,
            default: undefined,
            required: false
        }
    },
    template: "#page",
    data: function () {
        return {
            current: 1,
            showItem: 5,
            allpage: 13
        }
    },
    computed: {
        pages: function () {
            var pag = [];
            if (this.current < this.showItem) { //如果当前的激活的项 小于要显示的条数
                //总页数和要显示的条数那个大就显示多少条
                var i = Math.min(this.showItem, this.allpage);
                while (i) {
                    pag.unshift(i--);
                }
            } else { //当前页数大于显示页数了
                var middle = this.current - Math.floor(this.showItem / 2), //从哪里开始
                    i = this.showItem;
                if (middle > (this.allpage - this.showItem)) {
                    middle = (this.allpage - this.showItem) + 1
                }
                while (i--) {
                    pag.push(middle++);
                }
            }
            return pag
        }
    },
    methods: {
        goto: function (index) {
            this.jump && this.jump(index);
        },
        prev: function () {
            if (this.current == 1) return;
            this.current--;
            this.goto(this.current);
        },
        next: function () {
            if (this.current == this.allpage) return;
            this.current++;
            this.goto(this.current);
        }
    }
})

var app = new Vue({
    el: '#app'
})