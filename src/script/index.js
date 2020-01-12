; (function ($) {
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
            this.pullDown(this.app,this.erimg);//下载二维码
            this.pullDown(this.cart,this.cartGoods);//购物测下拉
            this.pullDown(this.navList,this.navGoods);
        }
        pullDown(hov,obj){//下拉效果
            let _this = this;
            hov.hover(function() {
                obj.stop().slideDown(300);
                _this.navContent.eq(hov.index(this)).show();
                },
                function() {
                    obj.stop().slideUp(300);
                    _this.navContent.eq(hov.index(this)).hide();
                }
            );
        }
    }
    //轮播图效果-------------------------------------------
    class Lunbot{
        constructor(){
            this.lunbot = $('#lunbot');
            this.img = $('#lunbot .lun-list img');//轮播图
            this.ollsit = $('#lunbot .ollsit li');//小按钮
            this.right = $('#lunbot .icon-fenye-xiayiye');//右箭头按钮
            this.left = $('#lunbot .icon-shangyiye');//左箭头按钮
            this.num = 0;
            this.timer = null;
        }
        init(){
            let _this = this;
            this.right.on('click',()=>{//下一页
                this.num++;
                if(this.num === 5){
                    this.num = 0;
                }
                this.opacityNo();//淡入淡出
                this.listbg();//右下按钮位置判断
            });
            this.left.on('click',()=>{//上一页
                this.num--;
                 if(this.num === -1){
                    this.num = 4;
                }
                this.listbg();//淡入淡出
                this.opacityNo();//右下按钮位置判断
            });
            this.ollsit.on('click',function(){//右下按钮点击效果
                _this.num = $(this).index();
                _this.ollsit.css('background','#666');
                _this.ollsit.eq($(this).index()).css('background','#aaa');
                _this.opacityNo();
            });
            this.timer=setInterval(()=>{//自动轮播
                this.num++;
                if(this.num === 5){
                    this.num = 0;
                }
                this.listbg();
                this.opacityNo();
            },4000);
            this.lunbot.hover(()=>{//移入时关闭自动轮播
                clearInterval(this.timer);
            },
            ()=>{
                this.timer=setInterval(()=>{//移入时开启自动轮播
                    this.num++;
                    if(this.num === 5){
                        this.num = 0;
                    }
                    this.listbg();
                    this.opacityNo();
                },4000);
            })
        }
        opacityNo(){
            this.img.eq(this.num).fadeIn();//显示当前
            this.img.not(this.img.eq(this.num)).fadeOut();//除了当前的其他的图片都隐藏
        }
        listbg(){
            this.ollsit.css('background','#666');
            this.ollsit.eq(this.num).css('background','#aaa');
        }
    }
    //楼梯效果--------------------------------------------
    class Stairs{
        constructor(){
            this.stairs = $('#stairs')
            this.louti = $('#stairs li');
            this.louceng = $('.louceng');
        }
        init(){
            let _this = this;
            this.stairs.on('click','li:nth-child(-n+7)',function(){//点击添加背景
                _this.louti.removeClass('orange');
                $(this).addClass('orange');
                let $top = _this.louceng.eq($(this).index()).offset().top;//对应楼层的top滚动条的值
                $(window).scrollTop($top);
            });
            
            
        }
    }
    $('#header').load('./header.html', () => {//头部渲染
        new Header().init();
    });
    new Lunbot().init();
    new Stairs().init();
})(jQuery);
