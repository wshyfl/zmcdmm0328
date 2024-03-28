cc.Class({
    extends: cc.Component,

    properties: {
        yong:cc.Node,
        qian:cc.Node,
        tanchuang:cc.Prefab,
        id:-1,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        
    },

    onEnable(){
        this.money=[0,500,1000];
        cc.director.on("刷屠夫",this.shua,this);
        this.shua()
    },

    dian(){
        if(SHUJU.data.tufu[this.id]){
            return;
        }
        if(SHUJU.data.jinbi>=this.money[this.id]){
            SHUJU.zengjia(0,-this.money[this.id])
            this.hui()
        }else{
            AD.showAD(this.hui,this);
        }
    },

    hui(){
        SHUJU.data.tufu[this.id]=true;
        SHUJU.baocun()
        cc.director.emit("刷屠夫")
    },

    shua(){
        if(SHUJU.data.tufu[this.id]){
            this.yong.active=true;
            this.qian.active=false;
            this.node.getChildByName("zhuang3").active = false;
        }else{
            this.yong.active=false;
            this.qian.active=false;
            this.node.getChildByName("zhuang3").active = false;
            if(SHUJU.data.jinbi >= this.money[this.id]){
                this.qian.active=true;
            }else{
                this.node.getChildByName("zhuang3").active = true;
            }
        }
    },

    // update (dt) {},
});
