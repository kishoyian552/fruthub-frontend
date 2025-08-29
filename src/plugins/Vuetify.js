import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'/////
import * as directives from 'vuetify/directives'// Import Vuetify components and directives
import { aliases, mdi } from 'vuetify/iconsets/mdi'// Import mdi icon set

const customTheme = {
  dark: false,
  colors: {
    primary: '#4CAF50',
    secondary: '#81C784',
    accent: '#FFC107',
    error: '#F44336',
    warning: '#FF9800',
    info: '#2196F3',
    success: '#4CAF50',
    surface: '#FFFFFF',
    background: '#F8F9FA',
  }//  colors
}// Theme

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },// sets
  },// Icon configuration
  theme: {
    defaultTheme: 'customTheme',
    themes: {
      customTheme,
    },//  themes
  },// Theme configuration
})// Export Vuetify instance