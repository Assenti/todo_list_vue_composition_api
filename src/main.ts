import Vue from 'vue';
import App from './App.vue';
import VueCompositionApi from '@vue/composition-api';
import { Icon, Button, Input, Tag, Checkbox, Tooltip, Popover, Badge, Modal, message } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

Vue.use(VueCompositionApi);
Vue.config.productionTip = false;
Vue.use(Button);
Vue.use(Input);
Vue.use(Tag);
Vue.use(Checkbox);
Vue.use(Tooltip);
Vue.use(Popover);
Vue.use(Icon);
Vue.use(Badge);
Vue.use(Modal);
Vue.prototype.$message = message;

new Vue({
  render: h => h(App),
}).$mount('#app')
