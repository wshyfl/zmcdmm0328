cc.Class({
    extends: cc.Component,

    properties: {
        pidian:[cc.Node],
        juese:[sp.Skeleton],
        zi:cc.Label,
        jieshao:cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.dh();
        for(var i=0;i<this.juese.length;i++){
            this.juese[i].node.active=false
        }
        this.juese[SHUJU.wantu].node.active=true;
        this.xiao();
    },

    onEnable(){
        this.ding=30;
        this.zi.string=this.ding+"s";
        this.sui2=Math.floor(Math.random()*8+5)
        this.hui=function(){
            this.ding--;
            this.zi.string=this.ding+"s";
            if(this.ding<=30-this.sui2){
                if(SHUJU.data.yijin[SHUJU.moshi]){
                    this.chuang()
                    SHUJU.data.yijin[SHUJU.moshi]=false;
                    SHUJU.baocun();
                }
                this.node.active=false;
                return;
            }
        }
        this.schedule(this.hui, 1);
    },

    chuang(){
        this.cus = cc.instantiate(this.jieshao);
        this.cus.getComponent("jieshao").chu(SHUJU.moshi);
        this.cus.parent = this.node.parent;
        this.cus.zIndex=200;
        this.cus.setPosition(0, 0);
    },

    onDisable(){
        this.unschedule(this.hui);
    },

    xiao(){
        this.sui=Math.random()+3*2;
        this.scheduleOnce(function() {
            this.juese[SHUJU.wantu].setAnimation(0, "fun", false);
            this.juese[SHUJU.wantu].setCompleteListener((a, evt) => {
                switch (a.animation.name) {
                    case "fun":
                        this.juese[SHUJU.wantu].setAnimation(0, "idle", true);
                        break;
                }
            })
            this.xiao()
        }, this.sui);
    },

    dh() {
        cc.tween(this.node)
            .call(() => {
                this.pidian[0].active = false;
                this.pidian[1].active = false;
                this.pidian[2].active = false;
            })
            .delay(0.2)
            .call(() => { this.pidian[0].active = true; })
            .delay(0.2)
            .call(() => { this.pidian[1].active = true; })
            .delay(0.2)
            .call(() => { this.pidian[2].active = true; })
            .delay(0.3)
            .call(() => { this.dh()})
            .start()
    },

    // update (dt) {},
});
