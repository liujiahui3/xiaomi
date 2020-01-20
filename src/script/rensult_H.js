//头部的各种下拉效果-------------------------------------
class Header {
    constructor() {
        this.app = $('#header .erweima');//下载
        this.erimg = $('#header .erweima div');
        this.cart = $('#header .cart');//购物车
        this.cartGoods = $('#header .cart .goods');
        this.navList = $('#nav .nav-list li:nth-child(-n+7)');//导航栏列表
        this.navGoods = $('#nav .nav-good');//导航栏下拉列表
        this.navContent = $('#nav .nav-goods-content');
    }
    init() {
        this.pullDown(this.app, this.erimg);//下载二维码
        this.pullDown(this.cart, this.cartGoods);//购物车下拉
        this.pullDown(this.navList,this.navGoods);
    }
    pullDown(hov, obj) {//下拉效果
        // console.log(hov)
        let _this = this;
        hov.hover(function () {
            obj.stop().slideDown(300);
            console.log(obj)
            _this.navContent.hide();
            _this.navContent.eq($(this).index()).show();
        },
        function () {
            obj.hover(()=>{},()=>{
                obj.stop().slideUp(300);
            })
        }
        );
    }
}
function result_H(){
    new Header().init();
}
export{
    result_H
}