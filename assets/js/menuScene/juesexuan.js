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
        if(this.id<10){
            if(SHUJU.data.juese[this.id]){
                this.node.getChildByName("shipin").active=false;
            }else{
                this.node.getChildByName("shipin").active=true;
            }
        }else if(this.id==10){
            if(SHUJU.data.jue[1]){
                this.node.getChildByName("wen").active=false;
                this.node.getChildByName("tou").active=true;
            }else{
                this.node.getChildByName("wen").active=true;
                this.node.getChildByName("tou").active=false;
            }
        }else{
            if(SHUJU.data.jue[0]){
                this.node.getChildByName("wen").active=false;
                this.node.getChildByName("tou").active=true;
            }else{
                this.node.getChildByName("wen").active=true;
                this.node.getChildByName("tou").active=false;
            }
        }
    },

    // update (dt) {},
});
