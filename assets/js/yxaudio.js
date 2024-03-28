cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        cc.find("hc").getComponent("hc").yinguan(12);
        cc.find("hc").getComponent("hc").yinkai(11,true);
    },

    // update (dt) {},
});
