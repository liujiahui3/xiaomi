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
        this.pullDown(this.navList, this.navGoods);
    }
    pullDown(hov, obj) {//下拉效果
        let _this = this;
        hov.hover(function () {
            obj.stop().slideDown(300);
            _this.navContent.eq(hov.index(this)).show();
        },
            function () {
                obj.stop().slideUp(300);
                _this.navContent.eq(hov.index(this)).hide();
            }
        );
    }
}
//淡入淡出轮播图效果-------------------------------------------
class LunbotFade {
    constructor() {
        this.lunbot = $('#lunbot');
        this.img = $('#lunbot .lun-list img');//轮播图
        this.ollsit = $('#lunbot .ollsit li');//小按钮
        this.right = $('#lunbot .icon-fenye-xiayiye');//右箭头按钮
        this.left = $('#lunbot .icon-shangyiye');//左箭头按钮
        this.num = 0;
        this.timer = null;
    }
    init() {
        let _this = this;
        this.right.on('click', () => {//下一页
            this.num++;
            if (this.num === 5) {
                this.num = 0;
            }
            this.opacityNo();//淡入淡出
            this.listbg();//右下按钮位置判断
        });
        this.left.on('click', () => {//上一页
            this.num--;
            if (this.num === -1) {
                this.num = 4;
            }
            this.listbg();//淡入淡出
            this.opacityNo();//右下按钮位置判断
        });
        this.ollsit.on('click', function () {//右下按钮点击效果
            _this.num = $(this).index();
            _this.ollsit.css('background', '#666');
            _this.ollsit.eq($(this).index()).css('background', '#aaa');
            _this.opacityNo();
        });
        this.timer = setInterval(() => {//自动轮播
            this.num++;
            if (this.num === 5) {
                this.num = 0;
            }
            this.listbg();
            this.opacityNo();
            // this.right.click();
        }, 4000);
        this.lunbot.hover(() => {//移入时关闭自动轮播
            clearInterval(this.timer);
        },
            () => {
                this.timer = setInterval(() => {//移入时开启自动轮播
                    this.num++;
                    if (this.num === 5) {
                        this.num = 0;
                    }
                    this.listbg();
                    this.opacityNo();
                    // this.right.click();
                }, 4000);
            })
    }
    opacityNo() {
        this.img.eq(this.num).fadeIn();//显示当前
        this.img.not(this.img.eq(this.num)).fadeOut();//除了当前的其他的图片都隐藏
    }
    listbg() {
        this.ollsit.css('background', '#666');
        this.ollsit.eq(this.num).css('background', '#aaa');
    }
}
//无缝轮播轮播图------------------------------------------------
class LunbotSeamless{
    constructor(){
        this.listUl = $('#section_1 .bottom ul');
        this.listLi = $('#section_1 .bottom li');
        this.right = $('#section_1 .top .icon-fenye-xiayiye');
        this.left = $('#section_1 .top .icon-shangyiye');
        this.liwidth = $('#section_1 .bottom li').width();
        this.num = 0;
        this.timer = null;
    }
    init(){
        this.right.on('click',()=>{//下一页
            this.num+=4;
            if(this.num<=this.listLi.length - 4){
                this.listMove();
            }else{
                this.num = this.listLi.length -4;
                this.listMove();
            }
        });
        this.left.on('click',()=>{//上一页
            if(this.num>=4){
                this.num-=4;
                this.listMove();
            }else{//不够4个商品时位置移动到索引为0的位置
                this.num = 0;
                this.listMove();
            }
        });
        this.timer = setInterval(()=>{//自动轮播
            this.right.click();
        },5000);
        this.listUl.hover(()=>{
            clearInterval(this.timer);//移入列表关闭自动轮播
        },
        ()=>{
            this.timer = setInterval(()=>{//移出列表打开自动轮播
                this.right.click();
            },5000);
        })
    }
    listMove(){
        this.listUl.stop().animate({
            left:-this.liwidth*this.num
        })
    }
}
//楼梯效果--------------------------------------------------
class Stairs {
    constructor() {
        this.stairs = $('#stairs')
        this.louti = $('#stairs li');
        this.louceng = $('.louceng');
    }
    init() {
        let _this = this;
        this.stairs.on('click', 'li:nth-child(-n+7)', function () {//点击添加背景
            _this.louti.removeClass('orange');
            $(this).addClass('orange');
            let $top = _this.louceng.eq($(this).index()).offset().top;//对应楼层的top滚动条的值
            $('html').stop().animate({
                scrollTop: $top
            });
        });
        $(window).on('scroll',()=>{
            this.scrollMove();
        });//移动滚动条时判断楼层位置
        this.scrollMove();//刷新时判断楼层位置
        this.louti.last().on('click',()=>{//回到顶部
            $('html').stop().animate({
                scrollTop:0
            })
        })
    }
    scrollMove() {
        this.louceng.each((index, element) => {
            if($(window).scrollTop()>500){
                this.stairs.show();
                if ($(element).offset().top+250 >= $(window).scrollTop()) {
                    this.louti.removeClass('orange');
                    this.louti.eq(index).addClass('orange');
                    return false;
                }
            }else{
                this.stairs.hide();
            }
        })

    }
}
//tab切换
class Tab{
    constructor(){
        this.btns = $('.section_3 .list-cut li');
        this.listUl = $('.section_3 .list-goods');
    }
    init(){
        let _this = this;
        this.btns.hover(function(){
            $(this)
            .parents('.section_3')
            .find('.list-cut li')
            .removeClass('hove');//去除类名
            $(this).addClass('hove');//移入元素家类名

            $(this).
            parents('.section_3')
            .find('.list-goods')
            .removeClass('show');//去除所有列表的类名
            $(this).parents('.section_3')
            .find('.list-goods')
            .eq($(this).index())
            .addClass('show');//对应列表添加类名
        })
    }
}



class result_index{
    init(){
        new Header().init();
        new LunbotFade().init();
        new LunbotSeamless().init();
        new Stairs().init();
        new Tab().init();
    }
}
export{
    result_index
}
