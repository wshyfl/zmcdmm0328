cc.Class({
    extends: cc.Component,

    properties: {
        ditu:[cc.Node],
        deng:cc.Node,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.ditu[SHUJU.youtu].active=true;
        this.deng.active=true;
        cc.director.getCollisionManager().enabled = true;
    },

    onDisable(){
        SHUJU.replay()
    },

    start () {
        AD.hideBanner();
    },

    // update (dt) {},
});
