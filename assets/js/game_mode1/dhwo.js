cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.dh()
    },

    dh(){
        cc.tween(this.node)
            .by(0.5, { y: -30 })
            .by(0.5, { y: 30 })
            .call(()=>{this.dh()})
            .start()
    },

    // update (dt) {},
});
