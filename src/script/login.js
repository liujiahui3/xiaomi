class Login{
    constructor(){
        this.name = $('#username');
        this.pass = $('#userpass');0
        this.submit = $('.submit');
        this.tishi = $('.tishi');
    }
    init(){
        this.submit.on('click',()=>{
            $.ajax('http://10.31.152.32/xiaomi/php/register.php',{
                data:{
                    username:this.name.val(),
                    userpass:this.pass.val()
                },
                type:'POST'
            }).done((d)=>{
                if(this.name.val()!==''){
                    if(this.pass.val()!==''){
                        if(d){
                            location.href = 'http://10.31.152.32/xiaomi/dist/index.html';
                        }else{
                            this.tishi.html('用户名或密码错误');
                        }
                    }else{
                        this.tishi.html('密码不能为空');
                    }
                }else{
                    this.tishi.html('用户名不能为空');
                }
                
            })
        })
    }
}
export{
    Login
}