cc.Class({
    extends: cc.Component,

    properties: {
        zi: [cc.Node],
        biao: cc.Node,
        kuangbg:[cc.SpriteFrame],
        yanwu:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        SHUJU.biannode = this;
    },

    start() {
        this.shua()
        this.xz = 0;
        this.di = 0;
    },

    shua() {
        this.num = 0;
        for (var i = 0; i < this.zi.length; i++) {
            if (SHUJU.data.bianshen[i]) {
                this.zi[i].active = true;
                this.num++;
            } else {
                this.zi[i].active = false;
            }
        }
        this.zi[0].parent.width = 50 + this.num * 75 + 10;
    },

    xuan(even,id){
        cc.find("hc").getComponent("hc").yinguan(13);
        cc.find("hc").getComponent("hc").yinkai(13,false);
        this.chushi()
        this.zi[id].getComponent(cc.Sprite).spriteFrame=this.kuangbg[1];
        var a=parseInt(id);
        if(a==10){
            SHUJU.bianshen=11;
        }else if(a==11){
            SHUJU.bianshen=10;
        }else{
            SHUJU.bianshen=a;
        }
        SHUJU.play.bianshen()
    },

    chushi(){
        for(var i=0;i<this.zi.length; i++){
            this.zi[i].getComponent(cc.Sprite).spriteFrame=this.kuangbg[0];
        }
    },

    dian() {
        if (this.xz == 1)
            return;
        this.xz = 1;
        this.di++;
        if (this.di == 2) {
            this.di = 0;
        }
        if (this.di == 1) {
            cc.tween(this.biao)
                .to(0.15, { x: 65 })
                .call(() => {this.xz=0;})
                .start()
        }else{
            cc.tween(this.biao)
                .to(0.15, { x: 400 })
                .call(() => {this.xz=0;})
                .start()
        }

    },

    // update (dt) {},
});
