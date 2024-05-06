cc.Class({
    extends: cc.Component,

    properties: {
        shi:cc.Node,
        dh:sp.Skeleton,
        icon:[cc.Node],
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.shux=[-33,101,235,369,-33,101,235,369,-33,101,235,369];
        this.shuy=[82,82,82,82,-45,-45,-45,-45,-170,-170,-170,-170];
    },

    onEnable(){
        this.node.getChildByName("ye").getChildByName("wen").active=true;
        this.node.getChildByName("ye").getChildByName("juese").active=false;
        this.node.getChildByName("shi").active=false;
        this.shi.active=false;
    },

    dian(even,id){
        cc.find("hc").getComponent("hc").yinguan(13);
        cc.find("hc").getComponent("hc").yinkai(13,false);
        this.id=parseInt(id)
        if(this.id<10){
            if(SHUJU.data.juese[this.id]==false){
                AD.showAD(this.hui,this)
            }else{
                this.jixu()
            }
        }else{
            this.jixu()
        }
        
    },

    hui(){
        SHUJU.data.juese[this.id]=true;
        SHUJU.baocun()
        this.icon[this.id].getComponent("juesexuan").shua()
        this.jixu();
    },

    jixu(){
        if(this.id<10){
            if(SHUJU.data.juese[this.id]==false){
                return;
            }else{
                this.dh.node.active=true;
                this.dh.setSkin("juese"+(this.id+1))
                this.node.getChildByName("ye").getChildByName("wen").active=false;
            }
        }else if(this.id==10){
            if(SHUJU.data.jue[1]){
                this.dh.node.active=true;
                this.dh.setSkin("juese"+(11))
                this.node.getChildByName("ye").getChildByName("wen").active=false;
            }else{
                this.node.getChildByName("ye").getChildByName("wen").active=true;
                this.dh.node.active=false;
                return
            }
        }else if(this.id==11){
            if(SHUJU.data.jue[0]){
                this.dh.node.active=true;
                this.dh.setSkin("juese"+(12))
                this.node.getChildByName("ye").getChildByName("wen").active=false;
            }else{
                this.node.getChildByName("ye").getChildByName("wen").active=true;
                this.dh.node.active=false;
                return
            }
        }
        this.shi.active=true;
        this.shi.x=this.shux[this.id];
        this.shi.y=this.shuy[this.id];
        SHUJU.youren=parseInt(this.id);
        this.node.parent.getComponent("zhunbei").xuanrenji(this.id)
    },

    // update (dt) {},
});
