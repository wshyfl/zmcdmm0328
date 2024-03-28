cc.Class({
    extends: cc.Component,

    properties: {
        duo:[cc.Node],
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        for(var i=0;i<this.duo.length;i++){
            this.duo[i].getChildByName("cang").active=true;
            SHUJU.duoshu[i]=1;
        }
    },

    shua(){
        for(var i=0;i<this.duo.length;i++){
            if(SHUJU.duoshu[i]==2){
                this.duo[i].getChildByName("cang").active=false;
                this.duo[i].getChildByName("hao").active=false;
                this.duo[i].getChildByName("huai").active=true;
            }
        }
    },

    // update (dt) {},
});
