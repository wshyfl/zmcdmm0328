cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    onDisable(){
        AD.hideBanner();
    },
    xianshi() {
        cc.find("hc").getComponent("hc").yinguan(13);
        cc.find("hc").getComponent("hc").yinkai(13, false);
        this.node.active = true;
        AD.chaPing();
        AD.showBanner();
        this.node.getChildByName("zhuti").scale = 0.6
        cc.tween(this.node.getChildByName("zhuti"))
            .to(0.15, { scale: 1.1 })
            .to(0.15, { scale: 1 })
            .call(() => {
                // this.scheduleOnce(function () {cc.game.pause();}, 0.15)
            })
            .start()
    },

    yincang(even, id) {
        cc.find("hc").getComponent("hc").yinguan(13);
        cc.find("hc").getComponent("hc").yinkai(13, false);
        if (id == "1") {
            // cc.game.resume();
            cc.audioEngine.stopAll();
            cc.director.loadScene("menu");
            AD.chaPing();
            // AD.showBanner();

            AD.hideBanner();
        }

        // cc.game.resume();
        this.node.active = false;
    },

    // update (dt) {},
});
