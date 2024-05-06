cc.Class({
    extends: cc.Component,

    properties: {
        id:-1,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    onEnable(){
        this.shua()
    },

    shua(){
        if(SHUJU.data.ditu[this.id]){
            this.node.getChildByName("zhu").getChildByName("yong").active=true;
            this.node.getChildByName("zhu").getChildByName("mai").active=false;
        }else{
            this.node.getChildByName("zhu").getChildByName("yong").active=false;
            this.node.getChildByName("zhu").getChildByName("mai").active=true;
        }
    },

    dian(){
        cc.find("hc").getComponent("hc").yinguan(13);
        cc.find("hc").getComponent("hc").yinkai(13,false);
        if(SHUJU.data.ditu[this.id]){
            this.cheng()
        }else{
            AD.showAD(this.cheng,this)
        }
    },

    cheng(){
        SHUJU.data.ditu[this.id]=true;
        SHUJU.baocun();
        SHUJU.youtu=this.id;
        this.node.parent.parent.parent.getComponent("zhunbei").jinpipei(1)
    },

    // update (dt) {},
});
