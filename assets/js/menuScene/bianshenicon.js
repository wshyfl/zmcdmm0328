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
        this.zhuang=false;
        cc.director.on("刷变身",this.shuaxin,this);
        this.shuaxin();
    },

    dian(){
        cc.find("hc").getComponent("hc").yinguan(13);
        cc.find("hc").getComponent("hc").yinkai(13,false);
        if(this.zhuang)
            return;
        if(SHUJU.data.jinbi<200){
            AD.showAD(this.hui,this);
        }else{
            SHUJU.zengjia(0,-200)
            this.hui();
        }
    },

    hui(){
        SHUJU.data.bianshen[this.id]=true;;
        SHUJU.baocun()
        cc.director.emit("刷变身")
    },

    shuaxin() {
        if(SHUJU.data.bianshen[this.id]){
            this.zhuang=true;
            this.node.getChildByName("zhuang1").active = true;
            this.node.getChildByName("zhuang2").active = false;
            this.node.getChildByName("zhuang3").active = false;
        }else{
            this.zhuang=false;
            this.node.getChildByName("zhuang1").active = false;
            this.node.getChildByName("zhuang2").active = false;
            this.node.getChildByName("zhuang3").active = false;
            if(SHUJU.data.jinbi >= 200){
                this.node.getChildByName("zhuang2").active = true;
            }else{
                this.node.getChildByName("zhuang3").active = true;
            }
        }
    }


    // update (dt) {},
});
