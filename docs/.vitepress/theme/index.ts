import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import KeyboardNavigation from './components/KeyboardNavigation.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'layout-bottom': () => h(KeyboardNavigation)
    })
  }
}
