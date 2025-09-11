
export const jy_status_bar = {
    overlaysWebView (overlaysWebView) {
        if (window.mock)
            return
        window.StatusBar.overlaysWebView(overlaysWebView);
    },
    styleDefault () {
        if (window.mock)
            return
        window.StatusBar.styleDefault();
    },
    styleLightContent() {
        if (window.mock)
            return
        window.StatusBar.styleLightContent();
    },
    backgroundColorByHexString(color) {
        if (window.mock)
            return
        window.StatusBar.backgroundColorByHexString(color);
    },
    hide() {
        if (window.mock)
            return
        window.StatusBar.hide();
    },
    show() {
        if (window.mock)
            return
        window.StatusBar.show();
    },
    isVisible() {
        if (window.mock)
            return
        return window.StatusBar.isVisible
    },
    height () {
        return new Promise((resolve, reject) => {
            window.cordova.plugins.StatusBarHeight.getValue( value => {
                resolve(value)
            }, err => {
                reject(err)
            })
        })
    }
}

export const apiInstaller = () => {
    return {
        name: 'jy_status_bar',
        api: jy_status_bar,
    }
}
