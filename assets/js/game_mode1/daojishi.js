cc.Class({
    extends: cc.Component,

    properties: {
        zi:cc.Label,
        cangan:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        SHUJU.daojishi=this;
    },

    start () {
        this.jishi();
        cc.director.on("下一关", () => {
            this.xiayiguan();
        }, this);
    },

    xiayiguan(){
        this.jishi()
    },

    jishi(){
        this.unscheduleAllCallbacks();
        this.node.opacity=255;
        var a=this;
        this.time=30
        this.schedule(function() {
            a.time--;
            a.zi.string=a.time+"s";
            if(a.time==10){
                cc.find("hc").getComponent("hc").yinkai(0,false);
            }
            if(a.time==0)
                a.jixu()
        }, 1,29);
    },

    jixu(){
        this.node.opacity=0;
        if(this.cangan)
            this.cangan.active=false;
        this.unscheduleAllCallbacks();
        cc.find("hc").getComponent("hc").yinguan(0);
        if(SHUJU.biannode)
            SHUJU.biannode.node.active=false;
        cc.director.emit("抓");
        if(AD.chanelName=="QQ"&&AD.chanelName1=="QQ"&&AD_QQ.xianzhi){
            AD.chaPing();
        }
    },

    wu(){

    }

    // update (dt) {},
});
