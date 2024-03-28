window.AD_WX = {

    chaPingID: "adunit-d96b73cc1f625c73",
    shiPinID: "adunit-249e1e68d7cb0ae7",
    bannerID: "adunit-682a10b0e57436d3",

    geZi_onlyOne: "adunit-33ed60f98321dc2e",//单个
    geZi_mid: "adunit-",//竖条格子
    geZi_more: "adunit-3f406295f43fd5c9",//网状格子

    bannerWX: null,
    share_wx_title: "一来来躲猫猫呀",
    share_wx_imageUrlId: "JLBO4aO9T1WAbB5gQRaJoA==",
    share_wx_imageUrl: "https://mmocgame.qpic.cn/wechatgame/Btj9NjFkVaZIMcT3mILQno0LZ7spxSYOnzibR1kia0AkjxiaB8Z0nic3v1yLyeOgST3v/0",
   videoIsShowing: false,
    yuanShengIsOk: false,
    shareCount: 1,
    geZiShuLeft: null,
    geZiShuRight: null,



    chaPingInterval: 20,
    couldShowChaPing: true,
    chaPing() {
        if (AD.chanelName != "WX") return;
        if (!this.couldShowChaPing) {
            console.log("***插屏间隔中.. 间隔时长 " + this.chaPingInterval + " S");
            return;
        }


        var _chaPingWX = wx.createInterstitialAd({
            adUnitId: AD_WX.chaPingID,
        })
        _chaPingWX.onLoad(function () {
            _chaPingWX.show()
                .then(() => {
                    console.log("***插屏展示成功 ")

                })
                .catch(err => {
                    console.log("***插屏展示失败 " + JSON.stringify(err))
                });
            _chaPingWX.offLoad();
        })


        _chaPingWX.onError((res) => {
            console.log("***插屏错误 " + res.errMsg + "errCode " + res.errCode)
        });

        _chaPingWX.onClose(() => {
            console.log("***插屏关闭 ");
            _chaPingWX = null;
        })

    },

    shiPin() {
        console.log("视频展示 ");
        if (AD.chanelName != "WX") return

        AD_WX.videoIsShowing = false;
        let video_retry_times = 0;
        let videoAd = wx.createRewardedVideoAd({
            adUnitId: AD_WX.shiPinID,
        });
        videoAd.load()
            .then(() => {
                cc.game.pause();
                videoAd.show()
                AD_WX.hideYuanSheng();
                AD_WX.videoIsShowing = true;
                // cc.director.pause();//暂停creator
            })
            .catch(err => {
                console.log(err.errMsg)
            });
        let loadCallback = () => { };
        let errorCallback = (res) => {
            console.log('视频加载失败'+JSON.stringify(res));
            videoAd.offLoad(loadCallback);
            videoAd.offClose(closeCallback);
            videoAd.offError(errorCallback);
            wx.showToast({
                title: '视频加载失败',
                icon: 'success',
                duration: 2000
            })
            // if (video_retry_times >= 0 && video_retry_times < 1) {
            //     videoAd.load()
            //         .then(() => {
            //             videoAd.show();
            //             AD_WX.hideYuanSheng();
            //             AD_WX.videoIsShowing = true;
            //         })
            //         .catch(err => { console.log("视频错误 " + res.errMsg + "errCode " + res.errCode) });
            //     video_retry_times++;
            // } else if (video_retry_times >= 1) {
            //     videoAd.offLoad(loadCallback);
            //     videoAd.offClose(closeCallback);
            //     videoAd.offError(errorCallback);
            //     console.log("miaoju_watch_retry_times" + video_retry_times);
            //     video_retry_times = -1;
            // }
        };
        let closeCallback = (res) => {
            cc.game.resume();
            console.log(res);
            AD_WX.videoIsShowing = false;
            if (res.isEnded) {
                //发道具 
                AD.reward();
            }
            cc.director.resume();//
            videoAd.offLoad(loadCallback);
            videoAd.offClose(closeCallback);
            videoAd.offError(errorCallback);
        };
        videoAd.onLoad(loadCallback);
        videoAd.onError(errorCallback);
        videoAd.onClose(closeCallback);
    },
    showBanner() {
        console.log("banner 调用");
        if (AD.chanelName != "WX")
            return;


        this.hideBanner();

        let winSize = wx.getSystemInfoSync();

        console.log(winSize);
        let bannerHeight = 80;
        let bannerWidth = 300;

        AD_WX.bannerWX = wx.createBannerAd({
            adUnitId: AD_WX.bannerID, //填写广告id
            adIntervals: 40,
            style: {
                left: (winSize.windowWidth - bannerWidth) / 2,
                top: winSize.windowHeight - bannerHeight,
                width: bannerWidth,
            }
        });
        AD_WX.bannerWX.show(); //banner 默认隐藏(hide) 要打开
        //微信缩放后得到banner的真实高度，从新设置banner的top 属性
        AD_WX.bannerWX.onResize(res => {
            AD_WX.bannerWX.style.top = winSize.windowHeight - AD_WX.bannerWX.style.realHeight;
        })

        let errorCallback = (res) => {
            console.log("banner错误 " + res.errMsg + "  errCode : " + res.errCode)
        };
        AD_WX.bannerWX.onError(errorCallback);
    },
    hideBanner() {
        if (AD.chanelName != "WX") return
        if (AD_WX.bannerWX) {
            console.log("banner 隐藏 ")
            AD_WX.bannerWX.hide();
            AD_WX.bannerWX.destroy();
        }
    },
    //单格子--样式类似于QQ的积木广告
    showYuanSheng() {
        if (AD.chanelName != "WX" || AD_WX.videoIsShowing)
            return;

        const {
            screenHeight,
            screenWidth,
        } = wx.getSystemInfoSync();

        console.log("屏幕高度：" + screenHeight);
        console.log("屏幕宽度：" + screenWidth);
        AD_WX.yuanSheng = wx.createCustomAd({
            adUnitId: AD_WX.geZi_onlyOne, //填写广告id
            adIntervals: 30,
            style: {
                top: 80, //根据系统约定尺寸计算出广告高度 1440 - (700 / 16 * 9)
                left: screenWidth - 70,

                fixed: true,
            }
        });
        AD_WX.yuanSheng.onLoad((res) => {
            AD_WX.yuanShengIsOk = true;
            AD_WX.yuanSheng.show();
            console.log("原生广告加载成功 展示");
            AD_WX.yuanSheng.offLoad();
        })

        AD_WX.yuanSheng.onError((res) => {
            console.log("原生广告加载错误  errMsg " + res.errMsg + "     errCode  " + res.errCode);
            AD_WX.yuanSheng.offError();
        })

    },

    hideYuanSheng() {
        if (AD_WX.yuanSheng) {
            AD_WX.yuanSheng.destroy();
            AD_WX.yuanSheng = null;
            AD_WX.yuanShengIsOk = false;
        }

    },
    //竖条多格子
    geZiShu(_show, _directionLeft) {
        if (AD.chanelName != "WX")
            return;
        if (!_show) {//隐藏
            if (_directionLeft && AD_WeiXin.geZiShuLeft) {
                AD_WeiXin.geZiShuLeft.destroy();
            }
            if (!_directionLeft && AD_WeiXin.geZiShuRight) {
                AD_WeiXin.geZiShuRight.destroy();
            }
            return;
        }
        const {
            screenHeight,
            screenWidth,
        } = wx.getSystemInfoSync();

        console.log("屏幕高度：" + screenHeight);
        console.log("屏幕宽度：" + screenWidth);

        var _left = 0;
        var _top = screenHeight / 2 - 100;
        if (!_directionLeft) {
            _left = screenWidth - 75
        }

        var _geZiAD = wx.createCustomAd({
            adUnitId: AD_WeiXin.geZi_mid, //填写广告id
            // adIntervals: 60,
            style: {
                // top: screenHeight / 2 - 100, //根据系统约定尺寸计算出广告高度 1440 - (700 / 16 * 9)
                top: _top,
                left: _left,
                fixed: true,
            }
        });
        _geZiAD.onLoad((res) => {
            _geZiAD.show();
            console.log("原生广告加载成功 展示  在左边吗?" + _directionLeft);
            if (_directionLeft) {
                if (AD_WeiXin.geZiShuLeft) {
                    AD_WeiXin.geZiShuLeft = null;
                }
                AD_WeiXin.geZiShuLeft = _geZiAD;
            }
            else {
                if (AD_WeiXin.geZiShuRight) {
                    AD_WeiXin.geZiShuRight = null;
                }
                AD_WeiXin.geZiShuRight = _geZiAD;
            }
            _geZiAD.offLoad();
        })

        _geZiAD.onError((res) => {
            console.log("原生广告加载错误  errMsg " + res.errMsg + "     errCode  " + res.errCode);
            _geZiAD.offError();
        })
        _geZiAD.onClose(() => {
            console.log("格子 关闭")
            // _geZiAD.offClose();
        })
    },

    geZiADISShowing: false,
    //网状格子
    geZi() {
        if (AD.chanelName != "WX" || AD_WX.geZiADISShowing)
            return;
        AD_WX.geZiADISShowing = true;
        const {
            screenHeight,
            screenWidth,
        } = wx.getSystemInfoSync();

        console.log("屏幕高度：" + screenHeight);
        console.log("屏幕宽度：" + screenWidth);

        var _left = 0;
        var _top = 0;
        var _width = 300;
        if (screenWidth > screenHeight) {//横屏
            _width = screenWidth * 0.4;
            _left = screenWidth / 2 - _width / 2;
            _top = 50;
            console.log("横屏  _width" + _width + "  _left  " + _left + "  _top:" + _top)
        }
        else {//竖屏
            _width = screenWidth * 0.9;
            _left = screenWidth / 2 - _width / 2;
            _top = screenHeight / 2 - 150;
            console.log("竖屏  _width" + _width + "  _left  " + _left + "  _top:" + _top)
        }
        var _geZiAD = wx.createCustomAd({
            adUnitId: AD_WX.geZi_more, //填写广告id
            // adIntervals: 60,
            style: {
                // top: screenHeight / 2 - 100, //根据系统约定尺寸计算出广告高度 1440 - (700 / 16 * 9)
                top: _top,
                left: _left,
                width: _width, // 用于设置组件宽度，只有部分模板才支持，如矩阵格子模板
                fixed: true,
            }
        });
        _geZiAD.onLoad((res) => {
            AD_WX.geZiADISShowing = false;
            _geZiAD.show();
            console.log("原生广告加载成功 展示");
            _geZiAD.offLoad();
        })

        _geZiAD.onError((res) => {
            AD_WX.geZiADISShowing = false;
            console.log("原生广告加载错误  errMsg " + res.errMsg + "     errCode  " + res.errCode);
            _geZiAD.offError();
        })
        _geZiAD.onClose(() => {
            AD_WX.geZiADISShowing = false;
            console.log("格子 关闭")
            // _geZiAD.offClose();
        })
    },

    shareOver(num, adType) {//分享结束

        var _times = 0;
        if (AD_WX.shareCount == 1)
            _times = 0;
        else if (AD_WX.shareCount == 2 || AD_WX.shareCount == 3)
            _times = 1;
        else if (AD_WX.shareCount == 4 || AD_WX.shareCount == 5)
            _times = 2;
        else if (AD_WX.shareCount == 6 || AD_WX.shareCount == 7)
            _times = 3;
        else if (AD_WX.shareCount == 8 || AD_WX.shareCount == 9)
            _times = 4;
        else if (AD_WX.shareCount == 10 || AD_WX.shareCount == 11)
            _times = 5;
        else
            _times = 6;

        if (num > (3000 + _times * 500)) {//分享成功 
            AD_WX.shareCount++;
            GlobalData.saveDiamondNum(20);
        }
        else //分享失败
        {
            AD_WX.shareLose();
        }
    },
    shareLose() {//分享失败
        cc.director.emit("系统提示", "分享失败，请稍后重试")
    },
    shareAndCallback(adType) {
        let startShare = false;
        let startCountTime = false;
        let endTime = 0;
        let shareTime = 1;
        // let shareTime = _getShareTime();
        let startTime = Tools.getDate("millisecond");

        wx.offShow();
        wx.offHide();
        wx.onShow((res) => {
            console.log("显示:" + JSON.stringify(res) + startShare + startCountTime);

            if (startShare && startCountTime) {
                endTime = Tools.getDate("millisecond");
                let timee = endTime - startTime;
                console.log(timee + "...花费时间");
                AD_WX.shareOver(timee, adType);
            }
            else if (startShare) {
                console.log("分享失败2");
                AD_WX.shareLose(adType);
            }
            else {
                AD_WX.shareLose(adType);
            }
        });
        wx.onHide(() => {
            console.log("隐藏" + startShare + startCountTime);
            if (startShare && !startCountTime) {
                console.log("开始计时");
                startCountTime = true;
                endTime = 0;

            }
        });
        startShare = true;

        var shareContent = {
            title: AD_WX.share_wx_title,
            imageUrlId: AD_WX.share_wx_imageUrlId,
            imageUrl: AD_WX.share_wx_imageUrl,
        };
        wx.shareAppMessage(shareContent);

    },


    init() {
        if (AD.chanelName1 != "WX") return
        console.log("微信初始化  ********** ");
        wx.showShareMenu({
            withShareTicket: true,
            menus: ['shareAppMessage', 'shareTimeline']
        })
        wx.onShareAppMessage(function () {
            return {

                title: AD_WX.share_wx_title,
                imageUrl: AD_WX.share_wx_imageUrl

            }
        })
        // wx.showShareMenu({
        //     withShareTicket: true,
        //     menus: ['shareAppMessage', 'shareTimeline']
        //   })
    },

}