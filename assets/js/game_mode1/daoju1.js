cc.Class({
    extends: cc.Component,

    properties: {
        id: -1,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        SHUJU.duodi[this.id] = this.node;
    },

    // update (dt) {},
});
