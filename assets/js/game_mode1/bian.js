cc.Class({
    extends: cc.Component,

    properties: {
        bg:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        cc.director.on("刷新", () => {
            this.bg.active=true;
        }, this);
    },

    // update (dt) {},
});
