class Detalist {
    constructor() {
        this.url = location.href;
        this.img = $('#container img');
        this.right = $('#right');
        this.title = $('#right h2');
        this.describe = $('#right p');
        this.price = $('#right .price');
        this.join = $('#right .join');
        this.num = $('#right .num');
    }
    init() {
        $.ajax('http://10.31.152.32/xiaomi/php/detalist.php', {
            data: {
                sid: this.url.substr(-1)
            },
            dataType: 'json'
        }).done((d) => {//渲染对应内容
            this.img.attr('src', d.url);
            this.describe.html(d.describe);
            this.title.html(d.title);
            this.price.html(d.cprice);
        });
        this.num.val(1);
        this.num.on('input',()=>{
            let reg = /^\d+$/;
            if(!reg.test(this.num.val())){
                this.num.val('');
            }
        })
        this.crat();
    }
    crat() {
        let _this = this;
        let sid = this.url.substr(-1);
        this.join.on('click', () => {//将购物信息添加进本地存储
            if(this.num.val()!==''){
            let cartnum = [];
            let cartsid = [];
            exist();
            localStorage.setItem('cartnum', cartnum);
            localStorage.setItem('cartsid', cartsid);
            function exist() {
                if (localStorage.getItem('cartsid') && localStorage.getItem('cartnum')) {
                    cartsid = localStorage.getItem('cartsid').split(',');
                    cartnum = localStorage.getItem('cartnum').split(',');
                    let index = cartsid.indexOf(sid);
                    if (index !== -1) {
                        cartnum[index] = parseInt(_this.num.val()) + parseInt(cartnum[index]);
                    } else {
                        cartnum.push(_this.num.val());
                        cartsid.push(sid);
                    }
                }else{
                    cartnum.push(_this.num.val());
                    cartsid.push(sid);
                }
            }
            }else{
                alert('数量不能为空');
            }
        })
    }
}

export {
    Detalist
}