cc.Class({
    extends: cc.Component,

    properties: {
        touxiang:[cc.Node],
        txbg:[cc.SpriteFrame],
        jian:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.touxiang[0].getChildByName("tou").getComponent(cc.Sprite).spriteFrame=this.txbg[SHUJU.youren]
        for(var i=1;i<this.touxiang.length;i++){
            this.touxiang[i].getChildByName("tou").getComponent(cc.Sprite).spriteFrame=this.txbg[SHUJU.npcren[i-1]]
        }
        if(this.jian)
            this.dh();
    },

    dh(){
        cc.tween(this.jian)
            .delay(0.3)
            .to(0.3, { y: 80 })
            .to(0.3, { y: 90 })
            .call(() => { this.dh() })
            .start()
    },

    // update (dt) {},
});
