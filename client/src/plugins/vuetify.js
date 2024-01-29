// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'

const light = { 
  dark: false,
  colors: { 
    background: '#f3efe0',
    primary: '#633018',
    'brand-red': '#a61123',
    surface: '#FFFFFF',
    'text-light': '#FFF',
    'text-dark': '#000',
    'primary-darken-1': '#3700B3',
    secondary: '#f3efe0',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  }
}
const dark = { 
  dark: true,
  colors: { 
    primary: '#a61123',
    'text-light': '#FFF',
    'text-dark': '#000',
    'brand-red': '#a61123',
    secondary: '#f3efe0'
  }
}

export default createVuetify(
  {
    theme: {
      defaultTheme: 'light', 
      themes:  {
        light, 
        dark
      }
    }
  }
)
