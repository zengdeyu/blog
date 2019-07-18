import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'
import 'iview/dist/styles/iview.css'
import './common/stylus/index.styl'
import './common/fonts/iconfont.css'
import Velocity from 'velocity-animate'
import 'animate.css'
import {
    Menu,
    Icon,
    MenuItem,
    Submenu,
    MenuGroup,
    Row,
    Col,
    Button,
    Tabs,
    TabPane,
    Progress,
    Slider,
    Badge,
    Carousel,
    CarouselItem,
    Input,
    Avatar,
    RadioGroup,
    Radio
} from 'iview'

Vue.prototype.Velocity=Velocity;
Vue.prototype.$axios=axios;

Vue.component('Menu',Menu);
Vue.component('MenuItem',MenuItem);
Vue.component('Icon',Icon);
Vue.component('Submenu',Submenu);
Vue.component('MenuGroup',MenuGroup);
Vue.component('Row',Row);
Vue.component('Col',Col);
Vue.component('Button',Button);
Vue.component('Tabs',Tabs);
Vue.component('TabPane',TabPane);
Vue.component('Progress',Progress);
Vue.component('Slider',Slider);
Vue.component('Badge',Badge);
Vue.component('Carousel',Carousel);
Vue.component('CarouselItem',CarouselItem);
Vue.component('Input',Input);
Vue.component('Avatar',Avatar);
Vue.component('RadioGroup',RadioGroup);
Vue.component('Radio',Radio);



Vue.config.productionTip = false;

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
