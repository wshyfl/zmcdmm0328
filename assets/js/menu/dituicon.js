cc.Class({
    extends: cc.Component,

    properties: {
        id:-1,
        tanchuang:cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

        
    },

    onEnable(){
        this.qian=0
        if(this.id==1){
            this.qian=500;
        }else{
            this.qian=1000;
        }
        this.zhuang=false;
        cc.director.on("刷地图",this.shuaxin,this);
        this.shuaxin()
    },

    dian(){
        cc.find("hc").getComponent("hc").yinguan(13);
        cc.find("hc").getComponent("hc").yinkai(13,false);
        if(this.zhuang)
            return;
        if(SHUJU.data.jinbi<this.qian){
            AD.showAD(this.hui,this);
        }else{
            SHUJU.zengjia(0,-this.qian)
            this.hui();
        }
    },

    hui(){
        SHUJU.data.ditu[this.id]=true;
        SHUJU.baocun()
        cc.director.emit("刷地图")
    },

    shuaxin(){
        if(SHUJU.data.ditu[this.id]){
            this.zhuang=true;
            this.node.getChildByName("yong").active=true;
            this.node.getChildByName("mai").active=false;
            this.node.getChildByName("zhuang3").active=false;
        }else{
            this.zhuang=false;
            this.node.getChildByName("yong").active=false;
            this.node.getChildByName("mai").active=false;
            this.node.getChildByName("zhuang3").active=false;
            if(SHUJU.data.jinbi<this.qian){
                this.node.getChildByName("zhuang3").active=true;
            }else{
                this.node.getChildByName("mai").active=true;
            }
        }
    },

    // update (dt) {},
});
