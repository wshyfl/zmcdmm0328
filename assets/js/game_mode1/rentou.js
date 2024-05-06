cc.Class({
    extends: cc.Component,

    properties: {
        id:-1,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        cc.director.on("刷头叉", () => {
            this.zhua();
        }, this);
    },

    zhua() {
        // if((this.id+1)==8){
        //     if(SHUJU.wanzhuang==2){

        //     }
        // }else 
        if (SHUJU.npczhuang[this.id] == 2) {
            this.node.getChildByName("cha").active = true;
        } else {
            this.node.getChildByName("cha").active = false;
        }

    },

    // update (dt) {},
});
