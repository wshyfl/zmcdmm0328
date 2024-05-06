cc.Class({
    extends: cc.Component,

    properties: {
        yong:cc.Node,
        qian:cc.Node,
        id:-1,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    onEnable(){
        if(SHUJU.data.tufu[this.id]){
            this.yong.active=true;
            this.qian.active=false;
        }else{
            this.yong.active=false;
            this.qian.active=true;
        }
    },

    dian(){
        if(SHUJU.data.tufu[this.id]){
            this.hui();
        }else{
            AD.showAD(this.hui,this)
        }
    },

    hui(){
        SHUJU.wantu=this.id;
        SHUJU.data.tufu[this.id]=true;
        SHUJU.baocun();
        this.node.parent.parent.parent.getComponent("zhunbei").xuanwan()
    },

    // update (dt) {},
});
