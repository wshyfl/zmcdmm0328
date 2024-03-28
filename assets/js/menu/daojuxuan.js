cc.Class({
    extends: cc.Component,

    properties: {
        id:-1,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    onEnable(){
        this.node.getChildByName("bg").getChildByName("shuliang").getComponent(cc.Label).string="x"+SHUJU.data.daoju[this.id]
    },

    // update (dt) {},
});
