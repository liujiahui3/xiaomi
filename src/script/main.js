import 'jquery';
import '../stylesheets/index1.css';
import '../stylesheets/details.css';
import "../stylesheets/cartlist.css";
import "../stylesheets/register.css";

//首页渲染
import {
    Render
} from './render';

//详情页渲染
import {
    Detalist
} from './render_de.js';
//详情页效果
import {
    Fdj
} from './result_de.js';
//首页效果
import {
    LunbotSeamless
} from './index.js';
//购物车效果
import {
    Cart
} from './cart.js';
//公共结构
import {
    renderHNF
} from './render_H_N_F';
//公共结构的效果
import {
    result_H
} from './rensult_H';
//注册页面
import {
    Register
} from './register';

import{
    Login
}from './login';


switch ($('script').attr('id')) {
    case 'index': new Render().init(
        result_H
    );new LunbotSeamless().init();
        break;
    case 'detalist': new Detalist().init();
        new Fdj().init();
        new renderHNF().init();
        break;
    case 'cartlist': new Cart().init();
         new renderHNF().init();
         break;
    case 'register': new Register().init();
    break;
    case 'login': new Login().init();break;
}





