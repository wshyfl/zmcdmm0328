cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.huan()
    },

    huan(){
        cc.tween(this.node)
            .to(0.4, { opacity: 0 })
            .to(0.4, { opacity: 255 })
            .delay(0.1)
            .call(() => {this.huan()})
            .start()
    },

    // update (dt) {},
});
