cc.Class({
    extends: cc.Component,

    properties: {
        id:0,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        if(this.id==0){
            this.dong=-30;
        }else{
            this.dong=30;
        }
        this.jianhuan()
    },

    jianhuan(){
        cc.tween(this.node)
            .delay(0.8)
            .to(0.15, { x: this.dong })
            .to(0.15, { x: 0 })
            .call(() => { this.jianhuan() })
            .start()
    },

    // update (dt) {},
});
