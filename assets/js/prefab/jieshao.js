cc.Class({
    extends: cc.Component,

    properties: {
        tu:cc.Node,
        bg:[cc.SpriteFrame],
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    chu(id){
        this.node.getChildByName("zhu").scale=0.6;
        console.log("介绍id:"+id)
        this.tu.getComponent(cc.Sprite).spriteFrame=this.bg[id];
        cc.tween(this.node.getChildByName("zhu"))
            .to(0.15, { scale: 1.1 })
            .to(0.1, { scale: 1 })
            .call(() => {cc.director.pause();})
            .start()
    },

    guan(){
        cc.director.resume();
        cc.tween(this.node.getChildByName("zhu"))
            .to(0.1, { scale: 1.1 })
            .to(0.15, { scale: 0.6 })
            .call(() => {
                this.node.destroy();
            })
            .start()
    },

    // update (dt) {},
});
