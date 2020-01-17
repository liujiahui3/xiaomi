class Register{
    constructor(){
        this.username = $('#username');
        this.userphone = $('#userphone');
        this.password = $('#password');
        this.form = $('form');
        this.email = $('#email');
        this.tishi = $('.tishi');
    }
    init(){
        let user = true;
        let phone =true;
        let pass =true;
        let email =true;
        //用户名验证
        this.username.on('blur',()=>{
            let reg = /^[\u4e00-\u9fa5a-zA-Z0-9]+$/g;
            let strlen = this.username.val().replace([/\u4e00-\u9fa5/],'**').length;
            $.ajax('http://10.31.152.32/xiaomi/php/register.php',{
                data:{
                    username:this.username.val()
                },
                type:'POST'
            }).done((d)=>{
                if(strlen<16){
                    if(reg.test(this.username.val())){
                        this.username.css('border-color','#ccc');
                        this.tishi.empty();
                        if(!d){
                            this.username.css('border-color','#ccc');
                            this.tishi.empty();
                            user = true;
                        }else{
                            this.tishi.html('用户名已存在');
                            this.username.css('border-color','#ff6666');
                            user = false;
                        }
                    }else{
                        this.tishi.html('用户名只能为中文,数字,字母');
                        this.username.css('border-color','#ff6666');
                        user = false;
                    }
                }else{
                    this.tishi.html('用户名长度不能超过16位');
                    this.username.css('border-color','#ff6666');
                    user = false;
                }
                
            })
        });
        //手机号验证
        this.userphone.on('blur',()=>{
            let reg = /^1[3578]\d{9}$/;
            let strlen = this.userphone.val().length;
            if(strlen == 11){
                if(reg.test(this.userphone.val())){
                    this.userphone.css('border-color','#ccc');
                    this.tishi.empty();
                    phone = true;
                }else{
                    this.tishi.html('手机号格式错误');
                    this.userphone.css('border-color','#ff6666');
                    phone = false;
                }
            }else{
                this.tishi.html('手机号码长度错误');
                this.userphone.css('border-color','#ff6666');
                phone = false;
            }
            
        });
        //密码验证
        this.password.on('blur',()=>{
            let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
            let strlen = this.password.val().length;
            if(strlen <= 16 && strlen >=8){
                if(reg.test(this.password.val())){
                    this.password.css('border-color','#ccc');
                    this.tishi.empty();
                    pass = true;
                }else{
                    this.tishi.html('密码必须有数字和字母');
                    this.password.css('border-color','#ff6666');
                    pass = false;
                }
            }else{
                this.tishi.html('密码长度为8到16位');
                this.password.css('border-color','#ff6666');
                pass = false;
            }
            
        });
        //邮箱验证
        this.email.on('blur',()=>{
            let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
            if(reg.test(this.email.val())){
                this.email.css('border-color','#ccc');
                this.tishi.empty();
                email = true;
            }else{
                this.tishi.html('邮箱格式错误');
                this.email.css('border-color','#ff6666');
                email = false;
            }
        });
        this.form.on('submit',()=>{
            this.userphone.blur();
            this.password.blur();
            this.email.blur();
            if(this.username.val() == ''){
                this.tishi.html('用户名不能为空');
                this.username.css('border-color','#ff6666');
                user = false;
            }
            if(this.userphone.val() === ''){
                this.tishi.html('手机号不能为空');
                this.userphone.css('border-color','#ff6666');
                phone = false;
            }
            if(this.password.val() === ''){
                this.tishi.html('密码不能为空');
                this.password.css('border-color','#ff6666');
                pass = false;
            }
            if(this.email.val() === ''){
                this.tishi.html('邮箱不能为空');
                this.email.css('border-color','#ff6666');
                email = false;
            }
            
            if(!user || !phone || !pass || !email){
                return false;
            }
        })
    }
}
export{
    Register
}