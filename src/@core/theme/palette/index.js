const DefaultPalette = (mode, themeColor) => {
  // ** Vars
  const lightColor = '58, 53, 65'
  const darkColor = '231, 227, 252'
  const mainColor = mode === 'light' ? lightColor : darkColor

  const primaryGradient = () => {
    if (themeColor === 'primary') {
      return '#7366FF'
    } else if (themeColor === 'secondary') {
      return '#9C9FA4'
    } else if (themeColor === 'success') {
      return '#93DD5C'
    } else if (themeColor === 'error') {
      return '#FF8C90'
    } else if (themeColor === 'warning') {
      return '#FFCF5C'
    } else {
      return '#6ACDFF'
    }
  }

  return {
    customColors: {
      main: mainColor,
      primaryGradient: primaryGradient(),
      tableHeaderBg: mode === 'light' ? '#F9FAFC' : '#3D3759',
      borderPrimary: mode === 'light' ? '#eaebee' : '#4a4b4f',
      listHover: mode === 'light' ? '#f1f0ff' : 'rgba(115, 102, 255, 0.2)',
      svgIcon: mode === 'light' ? 'rgba(58, 53, 65, 0.38)' : 'rgba(231, 227, 252, 0.38)'
    },
    common: {
      black: '#000',
      white: '#FFF'
    },
    mode: mode,
    primary: {
      light: '#9E69FD',
      main: '#7366FF',
      hover: '#8378f9',
      dark: '#804BDF',
      contrastText: '#FFF',
      chart: 'rgb(224, 242, 254)',
      chartDark: '#0ea5e933'
    },
    secondary: {
      light: '#9C9FA4',
      main: '#8A8D93',
      dark: '#777B82',
      contrastText: '#FFF'
    },
    success: {
      light: '#6AD01F',
      main: '#56CA00',
      dark: '#4CB200',
      contrastText: '#FFF'
    },
    error: {
      light: '#FF6166',
      main: '#FF4C51',
      dark: '#E04347',
      contrastText: '#FFF'
    },
    warning: {
      light: '#FFCA64',
      main: '#FFB400',
      dark: '#E09E00',
      contrastText: '#FFF'
    },
    info: {
      light: '#32BAFF',
      main: '#16B1FF',
      dark: '#139CE0',
      contrastText: '#FFF'
    },
    grey: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      A100: '#D5D5D5',
      A200: '#AAAAAA',
      A400: '#616161',
      A700: '#303030'
    },
    text: {
      primary: `rgba(${mainColor}, 0.87)`,
      secondary: `rgba(${mainColor}, 0.68)`,
      disabled: `rgba(${mainColor}, 0.38)`
    },
    divider: `rgba(${mainColor}, 0.12)`,
    background: {
      paper: mode === 'light' ? '#FFF' : '#312D4B',
      default: mode === 'light' ? '#F4F5FA' : '#28243D'
    },
    action: {
      active: `rgba(${mainColor}, 0.54)`,
      hover: `rgba(${mainColor}, 0.04)`,
      selected: `rgba(${mainColor}, 0.08)`,
      disabled: `rgba(${mainColor}, 0.3)`,
      disabledBackground: `rgba(${mainColor}, 0.18)`,
      focus: `rgba(${mainColor}, 0.12)`
    },
    buttons: {
      statusSuccess: mode === 'light' ? 'rgb(210, 244, 238)' : '#24978233',
      statusError: mode === 'light' ? 'rgb(254, 226, 226)' : '#ef444433',
      statusPending: mode === 'light' ? 'rgb(254, 249, 195)' : '#eab30833',
      statusBorder: mode === 'light' ? 'rgb(160, 232, 219)' : '#24978233',
      statusDisable: mode === 'light' ? 'rgb(241, 245, 249)' : '#64748b33',
      statusDisableBorder: mode === 'light' ? 'rgb(226, 232, 240)' : '#64748b33',
    }
  }
}

export default DefaultPalette
