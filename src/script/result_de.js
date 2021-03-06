class Fdj {
    constructor() {
        this.spic = $('.spic');
        this.sf = $('.sf');
        this.bpic = $('.bpic');
        this.bf = $('.bf');
        this.ul = $('.overflow ul');
        this.left = $('.icon-shangyiye');
        this.right = $('.icon-fenye-xiayiye');
        this.num = 4;
    }
    init() {
        this.bili = this.bpic.outerWidth() / this.spic.outerWidth();
        this.spic.on('mouseover', () => {
            this.sf.show();
            this.bf.show();
            this.spic.on('mousemove', (e) => {
                this.sf.width(this.bf.width() / 2);
                this.sf.height(this.bf.height() / 2);
                let $l = e.pageX - this.spic.offset().left - this.sf.outerWidth() / 2;
                let $t = e.pageY - this.spic.offset().top - this.sf.outerHeight() / 2;
                if ($l < 0) {
                    $l = 0;
                } else if ($l > this.spic.outerWidth() - this.sf.outerWidth()) {
                    $l = this.spic.outerWidth() - this.sf.outerWidth() - 2;
                }
                if ($t < 0) {
                    $t = 0;
                } else if ($t > this.spic.outerHeight() - this.sf.outerHeight()) {
                    $t = this.spic.outerHeight() - this.sf.outerHeight() - 2;
                }
                this.sf.css({
                    left: $l,
                    top: $t
                });
                this.bpic.css({
                    left: -$l * this.bili,
                    top: -$t * this.bili
                })
            });
        })
        this.spic.on('mouseout', () => {
            this.sf.hide();
            this.bf.hide();
        })
        this.right.on('click',()=>{
            let lilength = $('.overflow li').length;
            if(this.num<lilength){
                this.ul.stop().animate({
                    left:-$('.overflow li').outerWidth(true)
                },()=>{
                    this.num++;
                })
            }
        });
        this.left.on('click',()=>{
            let lilength = $('.overflow li').length;
            if(this.num>=lilength){
                this.ul.stop().animate({
                    left:0
                },()=>{
                    this.num--;
                })
            }
        });
        
    }
}

export {
    Fdj
}