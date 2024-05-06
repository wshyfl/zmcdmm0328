cc.Class({
    extends: cc.Component,

    properties: {
        shi:cc.Node,
        zi:cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    onEnable(){
        this.zi.string="x"+(SHUJU.data.kapai[1]+SHUJU.jineng[5]);
        if(SHUJU.data.kapai[1]==0){
            this.shi.active=true;
        }else{
            this.shi.active=false;
        }
    },

    dian(even,id){
        cc.find("hc").getComponent("hc").yinguan(13);
        cc.find("hc").getComponent("hc").yinkai(13,false);
        this.id=id;
        if(SHUJU.jineng[5]>0){
            SHUJU.jineng[5]--;
            this.qiang();
        }else if(SHUJU.data.kapai[1]>0){
            SHUJU.data.kapai[1]--;
            this.qiang();
            SHUJU.baocun();
        }else{
            AD.showAD(this.qiang,this)
        }
    },

    qiang(){
        this.node.active=false;
        cc.director.emit("重新躲",this.id);
    },

    // update (dt) {},
});
