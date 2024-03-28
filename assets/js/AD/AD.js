window.AD = {
    chanelName: "WX",
    chanelName1: "WX",//android touTiao  vivo oppo huaWei QQ uc WX 4399Box BD
    delayTime: 0,
    wuDianRate: 0,
    btnCloseIsBig: false,
    gameOverTimes: 0,


    showAD(_caller, _call, ...data) {
        if (_call) {
            console.log("激励视频广告:  " + _call.name)
        }
        this.callN = _call;
        this.callerN = _caller;

        if (this.chanelName != this.chanelName1)//广告不可用  直接成功
            this.reward();
        else
            this.shiPin();
    },
    //视频广告播放完毕/成功的回调
    reward() {
        console.log("回调成功")
        if (AD.callN && AD.callerN)
            AD.callerN.call(AD.callN);
    },
    shiPin() {
        switch (this.chanelName) {
            case "android":
                AD_android.shiPin();
                break;
            case "touTiao":
                AD_TouTiao.shiPin();
                break;
            case "vivo":
                AD_vivo.shiPin();
                break;
            case "oppo":
                AD_oppo.shiPin();
                break;
            case "huaWei":
                AD_HuaWei.shiPin();
                break;
            case "QQ":
                AD_QQ.shiPin();
                break;
            case "uc":
                AD_UC.shiPin();
                break;
            case "WX":
                AD_WX.shiPin();
                break;
            case "4399":
                AD_4399.shiPin();
                break;
            case "4399Box":
                AD_4399Box.shiPin();
                break;
            case "BD":
                AD_BD.shiPin();
                break;
        }
    },
    //插屏
    chaPing(...show) {//结算界面传true，否则传false
        if (this.chanelName != this.chanelName1)
            return
        setTimeout(() => {
            switch (this.chanelName) {
                case "android":
                    AD_android.chaPing();
                    break;
                case "touTiao":
                    AD_TouTiao.chaPing();
                    break;
                case "vivo":
                    if (AD_vivo.chaPingBoo)
                        AD_vivo.chaPing();
                    else {
                        if (show)
                            AD_vivo.chaPing();
                    }
                    break;
                case "huaWei":
                    AD_HuaWei.chaPing();
                    break;
                case "QQ":
                    AD_QQ.chaPing();
                    break;
                case "uc":
                    AD_UC.chaPing();
                    break;
                case "WX":
                    AD_WX.chaPing();
                    break;
                case "oppo":
                    cc.director.emit("显示原生大插屏");
                    break;
            }
        }, 200)

    },
    //显示banner
    showBanner(...placeName) {//true互推banner,false普通banner
        if (this.chanelName != this.chanelName1)
            return
        switch (this.chanelName) {
            case "android":
                AD_android.showBanner();
                break;
            case "touTiao":
                AD_TouTiao.showBanner();
                break;
            case "vivo":
                AD_vivo.showBanner();
                break;
            case "huaWei":
                AD_HuaWei.showBanner();
                break;
            case "QQ":
                AD_QQ.showBanner();
                break;
            case "uc":
                AD_UC.showBanner();
                break;
            case "WX":
                AD_WX.showBanner();
                break;
            case "4399Box":
                AD_4399Box.showBanner();
                break;
            case "oppo":
                AD_oppo.showBanner();
                break;
        }
    },
    //隐藏banner
    hideBanner() {
        switch (this.chanelName) {
            case "android":
                AD_android.hideBanner();
                break;
            case "touTiao":
                AD_TouTiao.hideBanner();
                break;
            case "vivo":
                AD_vivo.hideBanner();
                break;
            case "huaWei":
                AD_HuaWei.hideBanner();
                break;
            case "QQ":
                AD_QQ.hideBanner();
                break;
            case "uc":
                AD_UC.hideBanner();
                break;
            case "WX":
                AD_WX.hideBanner();
                break;
            case "4399Box":
                AD_4399Box.hideBanner();
                break;
            case "oppo":
                AD_oppo.hideBanner();
                break;
        }
    },
    moreGame() {
        switch (this.chanelName) {
            case "android":
                AD_android.moreGame();
                break;
            case "WX":
                AD_WX.shareAndCallback("");
                break;
            case "WX":
                AD_4399.moreGame4399();
                break;
        }
    },
    gameOver() {
        this.gameOverTimes++;
        switch (this.chanelName) {
            case "android":
                AD_android.chaPingVideo();
                break;
            case "touTiao":
                AD_TouTiao.luPingOver();
                break;
            case "vivo":
                break;
            case "oppo":
                break;
            case "huaWei":
                if (this.gameOverTimes % 2 == 0)
                    AD_HuaWei.addDesktop();
                break;
            case "QQ":
                if (AD.wuDianRate > 0 )
                    this.showAD(null, null);
                if (this.gameOverTimes % 3 == 0)
                    AD_QQ.saveToDesktopQQ();
                break;
            case "4399Box":
                if (this.gameOverTimes % 2 == 0)
                    AD_4399Box.chaPing();
                break;
            case "BD":
                if (AD.wuDianRate > 0 && this.gameOverTimes % 2 == 0)
                    this.showAD(null, null);
                break;
        }
    },

    tianjiazhuomian() {//添加到桌面
        switch (this.chanelName) {
            case "vivo":
                AD_vivo.addDesktop();
                break;
            case "oppo":
                AD_oppo.addDesktop();
                break;
            case "QQ":
                AD_QQ.saveToDesktopQQ();
                break;
        }
    },


    couldZDJ() {
        if (Tools.random(1, 100) < this.wuDianRate)
            return true;
        return false;
    },

    //是否是长屏手机
    isBigScreen() {
        console.log("是长屏吗  " + (cc.winSize.width / cc.winSize.height))
        if (cc.winSize.width / cc.winSize.height > 1.8) {
            return true;
        }
        return false;
    },
    switchZDJ() {
        AD.delayTime = 1;
    },
}