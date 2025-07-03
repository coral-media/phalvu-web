export default {
  install: (app: any, options: any) => {
    const screenSize = {
      width: window.screen.width,
      height: window.screen.height,
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      offsetWidth: document.body.offsetWidth,
      offsetHeight: document.body.offsetHeight,
      availHeight: window.screen.availHeight,
      availWidth: window.screen.availWidth,
      prWidth: window.screen.width * window.devicePixelRatio,
      prHeight: window.screen.height * window.devicePixelRatio,
      prAvailHeight: window.screen.availHeight * window.devicePixelRatio,
      prAvailWidth: window.screen.availWidth * window.devicePixelRatio,
    }
    const isMobile = window.screen.width < 600
    const isTablet = window.screen.width > 600 && window.screen.width < 960
    const isLaptop = window.screen.width > 960 && window.screen.width < 1280
    const isDesktop = window.screen.width > 1280 && window.screen.width < 1920
    const is2K = window.screen.width > 1920 && window.screen.width < 2560
    const is4K = window.screen.width > 2560

    if (options.globalInjection === true) {
      app.config.globalProperties.$screenSize = () => screenSize
      app.config.globalProperties.$isMobile = () => isMobile
      app.config.globalProperties.$isTablet = () => isTablet
      app.config.globalProperties.$isLaptop = () => isLaptop
      app.config.globalProperties.$isDesktop = () => isDesktop
      app.config.globalProperties.$is2K = () => is2K
      app.config.globalProperties.$is4K = () => is4K
    }

    app.provide('screenSize', screenSize)
    app.provide('isMobile', isMobile)
    app.provide('isTablet', isTablet)
    app.provide('isLaptop', isLaptop)
    app.provide('isDesktop', isDesktop)
    app.provide('is2K', is2K)
    app.provide('is4K', is4K)
  },
}
