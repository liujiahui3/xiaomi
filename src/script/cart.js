class Cart {
    constructor() {
        this.ul = $('#bg .bottom ul');
        this.gong = $('#total-prices .gong');
        this.yixuan = $('#total-prices .yixuan');
        this.heji = $('#total-prices .heji');
        this.checkAll = $('#bg .top input');
    }
    init() {
        if (localStorage.getItem('cartsid') && localStorage.getItem('cartnum')) {//本地存储的数据是否存在
            let arrsid = localStorage.getItem('cartsid').split(',');
            let arrnum = localStorage.getItem('cartnum').split(',');
            this.render(arrsid, arrnum);
        }
    }
    render(arrsid, arrnum) {
        let _this = this;
        $.each(arrsid, (index, sid) => {
            $.ajax('http://10.31.152.32/xiaomi/php/detalist.php', {
                data: {
                    sid: sid
                },
                dataType: 'json',
                async: false
            }).done((d) => {//购物车列表渲染
                $(`
                     <li sid="${d.sid}">
                        <input type="checkbox" checked="true">
                        <img src="${d.url}" alt="">
                        <div class="list-name">${d.title}</div>
                        <div class="list-price">${parseFloat(d.cprice)}</div>
                        <span>-</span>
                        <input class="list-num" type="text" value="${arrnum[index]}">
                        <span>+</span>
                        <div class="xiaoji">${parseFloat(d.cprice) * parseInt(arrnum[index])}</div>
                        <i class="iconfont icon-cuo"></i>
                     </li>
                     `).appendTo(this.ul);
            })
        });
        this.calc();
        this.changeList();
    }
    calc() {
        let $num = 0;
        $('#bg .bottom li').each(function () {
            if ($(this).find('input[type="checkbox"]:checked').length > 0) {
                $num += parseFloat($(this).find('.xiaoji').html());
            }
        });
        this.heji.html($num);//合计

        $num = 0;
        $('#bg .bottom li').each(function () {
            $num += parseFloat($(this).find('.list-num').val());
        });
        this.gong.html($num);//共几件

        $num = 0;
        $('#bg .bottom li').each(function () {
            if ($(this).find(':checked').length !== 0) {
                $num += parseFloat($(this).find('.list-num').val());
            }
        });
        this.yixuan.html($num);//选中几件
    }
    changeList() {
        let _this = this;
        let $checkUnit = $('#bg .bottom li').find('input[type="checkbox"]');//勾选按钮
        let $listNum = $('#bg .bottom li').find('.list-num');//数量

        this.checkAll.on('change', () => {//全选按钮
            $checkUnit.prop('checked', this.checkAll.prop('checked'));
            this.calc();//从新计算总价和件数
        });
        function all() {//判断全选按钮是否选中
            $checkUnit = $('#bg .bottom li').find('input[type="checkbox"]');
            if ($('#bg .bottom li').find('input[type="checkbox"]:checked').length !== $checkUnit.length) {
                _this.checkAll.prop('checked', false);
            } else {
                _this.checkAll.prop('checked', true);
            }
        }

        $checkUnit.on('click', () => {//全选按钮
            all();//判断全选按钮是否选中
            this.calc();//从新计算总价和件数
        });
        $listNum.prev().on('click', function () {
            $(this).next().val($(this).next().val() - 1);//数量减一再放回元素
            if ($(this).next().val() <= 0) {
                $(this).parent('li').remove();
                all();//判断全选按钮是否选中
            }
            $(this).siblings('.xiaoji').html(//从新计算小计
                $(this).siblings('.list-price').html() * $(this).next().val()
            );
            //更新本地存储
            let sid = $(this).parent('li').attr('sid');
            let num = $(this).next().val();
            _this.local(sid,num);

            _this.calc();//从新计算总价和件数
        });
        $listNum.next().on('click', function () {
            $(this).prev().val(+$(this).prev().val() + 1);//数量加一再放回元素
            $(this).siblings('.xiaoji').html(//从新计算小计
                $(this).siblings('.list-price').html() * $(this).prev().val()
            );
            //更新本地存储
            let sid = $(this).parent('li').attr('sid');
            let num = $(this).prev().val();
            console.log(num);
            _this.local(sid,num);

            _this.calc();//从新计算总价和件数
        });
        $listNum.siblings('.iconfont').on('click', function () {//从购物车删除
            $(this).parent('li').remove();

            let sid = $(this).parent('li').attr('sid');
            _this.local(sid)
            
            all();//判断全选按钮是否选中
            _this.calc();//从新计算总价和件数
        });
        $listNum.on('input', function () {
            let reg = /^\d+$/;
            if (!reg.test($(this).val()) || $(this).val() < 0) {
                $(this).val(1);
            };
            $(this).siblings('.xiaoji').html(//从新计算小计
                $(this).siblings('.list-price').html() * $(this).val()
            );
            _this.calc();
        })
    }
    local(sid,num){
        //从本地存储中删除对应的数据
        let cartsid = localStorage.getItem('cartsid').split(',');
        let cartnum = localStorage.getItem('cartnum').split(',');
        let index = cartsid.indexOf(sid);
        if(num && num>0){
            cartnum[index] = num;
        }else{
            cartsid.splice(index, 1);
            cartnum.splice(index, 1);
        }
        //更新本地存储
        localStorage.setItem('cartsid', cartsid.toString());
        localStorage.setItem('cartnum', cartnum.toString());
    }
}
export {
    Cart
}