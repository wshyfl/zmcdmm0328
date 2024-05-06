cc.Class({
    extends: cc.Component,

    properties: {
        id: -1,
        tanchuang:cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    onEnable() {
        cc.director.on("刷技能",this.shuaxin,this);
        this.shuaxin();
    },

    dian(){
        cc.find("hc").getComponent("hc").yinguan(13);
        cc.find("hc").getComponent("hc").yinkai(13,false);
        if(SHUJU.data.jinbi<50){
            AD.showAD(this.hui,this);
        }else{
            SHUJU.zengjia(0,-50)
            this.hui()
        }
    },

    hui(){
        SHUJU.data.kapai[this.id]++;
        SHUJU.baocun()
        cc.director.emit("刷技能")
    },

    shuaxin() {
        this.node.getChildByName("bg").getChildByName("shuliang").getComponent(cc.Label).string = "x"+SHUJU.data.kapai[this.id]
        if(SHUJU.data.jinbi<50){
            this.node.getChildByName("an").getChildByName("jinbi").active=false;
            this.node.getChildByName("an").getChildByName("zhuang3").active=true;
        }else{
            this.node.getChildByName("an").getChildByName("jinbi").active=true;
            this.node.getChildByName("an").getChildByName("zhuang3").active=false;
        }
    }


    // update (dt) {},
});
