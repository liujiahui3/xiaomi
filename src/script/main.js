import 'jquery';
import '../stylesheets/index1.css';
import '../stylesheets/details.css';
import "../stylesheets/cartlist.css";

import {
    Render
} from './render';

import {
    Detalist
} from './render_de.js';

import {
    Fdj
} from './result_de.js';

import {
    result_index
} from './index.js';

import {
    Cart
} from './cart.js';


if ($('script').attr('id') === 'index') {
    new Render().init(
        new result_index().init
    );
} else if ($('script').attr('id') === 'detalist') {
    new Detalist().init();
    new Fdj().init();
} else if ($('script').attr('id') === 'cartlist') {
    new Cart().init();
}

$('#header').load('./header.html');
$('#nav').load('./nav.html');
$('#footer').load('./footer.html');

