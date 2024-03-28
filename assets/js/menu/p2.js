cc.Class({
    extends: cc.Component,

    properties: {
        pidian: [cc.Node],
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.dh()
        this.kai()
    },

    dh() {
        cc.tween(this.node)
            .call(() => {
                this.pidian[0].active = false;
                this.pidian[1].active = false;
                this.pidian[2].active = false;
            })
            .delay(0.2)
            .call(() => { this.pidian[0].active = true; })
            .delay(0.2)
            .call(() => { this.pidian[1].active = true; })
            .delay(0.2)
            .call(() => { this.pidian[2].active = true; })
            .delay(0.3)
            .call(() => { this.dh() })
            .start()
    },

    kai() {
        AD.showBanner();
        this.scheduleOnce(function () {
            SHUJU.data.tili--;
            SHUJU.baocun();
            cc.director.loadScene("moshi2");
        }, 4)
    },

    // update (dt) {},
});
