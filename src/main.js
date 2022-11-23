import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'
import store from './store'
import { clickOutsideDirective, focusDirective, rainbowDirective } from './directives'

import './styles/main.scss'

const app = createApp(App)

app.directive('outside-click', clickOutsideDirective)
app.directive('focus', focusDirective)
app.directive('rainbow', rainbowDirective)
app.use(router)
app.use(store)
app.use(ElementPlus)

app.mount('#app')
