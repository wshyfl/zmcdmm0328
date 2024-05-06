cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.huan()
    },

    huan() {
        cc.tween(this.node.getChildByName("tou"))
            .to(0.2, { y: -90 })
            .call(()=>{SHUJU.dianyin=false;})
            .delay(Math.random()+2)
            .to(0.2, { y: -50 })
            .call(()=>{SHUJU.dianyin=true;})
            .delay(Math.random()+3)
            .call(() => {this.huan()})
            .start()
    },

    // update (dt) {},
});
