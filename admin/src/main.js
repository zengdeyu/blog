import Vue from 'vue'
import App from './App'
import router from './router'
import 'iview/dist/styles/iview.css'
import 'animate.css'
import Velocity from 'velocity-animate'
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
  Radio,
  Breadcrumb,
  BreadcrumbItem,
  Upload,
  Message,
  Select,
  Option
} from 'iview'

Vue.prototype.$Message = Message;
//配置网络

import axios from "axios"
Vue.prototype.$axios=axios;


Vue.component('Menu', Menu);
Vue.component('MenuItem', MenuItem);
Vue.component('Icon', Icon);
Vue.component('Submenu', Submenu);
Vue.component('MenuGroup', MenuGroup);
Vue.component('Row', Row);
Vue.component('Col', Col);
Vue.component('Button', Button);
Vue.component('Tabs', Tabs);
Vue.component('TabPane', TabPane);
Vue.component('Progress', Progress);
Vue.component('Slider', Slider);
Vue.component('Badge', Badge);
Vue.component('Carousel', Carousel);
Vue.component('CarouselItem', CarouselItem);
Vue.component('Input', Input);
Vue.component('Avatar', Avatar);
Vue.component('RadioGroup', RadioGroup);
Vue.component('Radio', Radio);
Vue.component('Breadcrumb', Breadcrumb);
Vue.component('BreadcrumbItem', BreadcrumbItem);
Vue.component('Upload', Upload);
Vue.component('Select', Select );
Vue.component('Option', Option );

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
