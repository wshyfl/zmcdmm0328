cc.Class({
    extends: cc.Component,

    properties: {
        guitou: [cc.Node],
        rentou: [cc.Node],
        pidian: [cc.Node],
        rentu:[cc.SpriteFrame],
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.dh();
    },

    onEnable() {
        this.zu=[0,1,2,3,4,5,6,7,8,9,10,11]
        for (var i = 0; i < this.guitou.length; i++) {
            this.guitou[i].active = false;
        }
        for (var i = 0; i < this.rentou.length; i++) {
            this.rentou[i].active = false;
        }
        if(SHUJU.moshi!=1){
            this.guitou[SHUJU.youtu].active = true;
        }else{
            this.guitou[SHUJU.wantu].active = true;
        }
        
        this.rentou[0].active=true;
        this.rentou[0].getComponent(cc.Sprite).spriteFrame=this.rentu[SHUJU.youren]
        this.zu.splice(SHUJU.youren,1);
        let a=Math.floor(Math.random()*this.zu.length);
        this.zu.splice(this.zu.indexOf(a),1);
        let b=Math.floor(Math.random()*this.zu.length);
        this.zu.splice(this.zu.indexOf(b),1);
        let c=Math.floor(Math.random()*this.zu.length);
        this.zu.splice(this.zu.indexOf(c),1);
        this.suiji();
        AD.chaPing();
        AD.showBanner();
    },

    suiji(){
        this.zu1=SHUJU.getNewArr(this.zu,this.zu.length);
        SHUJU.npcren=this.zu1;
        for(var i=1;i<this.rentou.length;i++){
            this.yan(i)
        }
        this.scheduleOnce(function() {
            SHUJU.data.tili--;
            SHUJU.baocun();
            switch(SHUJU.moshi){
                case 0:
                    cc.director.loadScene("moshi0");
                    break;
                case 1:
                    cc.director.loadScene("moshi1");
                    break;
                case 3:
                    cc.director.loadScene("moshi3");
                    break;
                case 4:
                    cc.director.loadScene("moshi4");
                    break;
            }
        },6)
    },

    yan(i){
        this.scheduleOnce(function() {
            this.rentou[i].active=true;
            this.rentou[i].getComponent(cc.Sprite).spriteFrame=this.rentu[this.zu1[i-1]];
        }, Math.random()*5+0.5);
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
