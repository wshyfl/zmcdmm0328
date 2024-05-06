cc.Class({
    extends: cc.Component,

    properties: {
        yingbg: [cc.SpriteFrame],
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        cc.director.on("躲藏", (id) => {
            this.duocang(id);
        }, this);
        cc.director.on("选抓", (id) => {
            this.xuanzhua(id);
        }, this);
        cc.director.on("下一关", () => {
            this.xiayiguan();
        }, this);
        this.node.getChildByName("jueseying").getComponent(cc.Sprite).spriteFrame = this.yingbg[SHUJU.youren]
    },

    xuanzhua(id) {

        if (this.duowei == id)
            SHUJU.xuannpc = this.node;
    },

    xiayiguan(){
        SHUJU.wanzhuang=0;
        SHUJU.xzy=false;
        this.node.getChildByName("juese").active = true;
    },

    duocang(id) {
        SHUJU.xzy = true;
        this.duowei=id;
        this.scheduleOnce(function () {
            SHUJU.wanzhuang = 1;
            if (this.panduan()) {
                SHUJU.kaishi()
            }else{
                if(SHUJU.wanzhuang==1){
                    SHUJU.djan.npccang()
                }
            }
        }, 0.02);
        this.node.getChildByName("juese").active = false;
        this.node.getChildByName("jueseying").opacity = 255;
        cc.tween(this.node.getChildByName("jueseying"))
            .to(0.3, { opacity: 0 })
            .call(() => { })
            .start()
    },

    panduan() {
        if (SHUJU.wanzhuang == 0)
            return false;
        for (var i = 0; i < SHUJU.youdang.length; i++) {
            if (SHUJU.youdang[i] == 0)
                return false;
        }
        return true;
    },

    // update (dt) {},
});
