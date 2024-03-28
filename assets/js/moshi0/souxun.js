cc.Class({
    extends: cc.Component,

    properties: {
        id:-1,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.zijix=[525,700,800,1920,2600,2995,3405];
        this.zp=false;
        cc.director.on("指人牌开", () => {
            this.zp=true;
        }, this);
        cc.director.on("指人牌关", () => {
            this.zp=false;
        }, this);
        cc.director.on("欧气药水开", () => {
            this.oq=true;
        }, this);
        cc.director.on("欧气药水关", () => {
            this.oq=false;
        }, this);
    },

    dian(){
        if(SHUJU.sou[this.id]==2){
            return;
        }
        if(SHUJU.guichu==1)
            return;
        if(this.zp)
            return;
        if(this.oq)
            return;
        this.node.parent.getComponent("bg1").dianyi(this.zijix[this.id],this.id)
    },

    // update (dt) {},
});
