cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        if(AD.chanelName1!="oppo"){
            this.node.active=false;
        }else{
            this.node.active=true;
        }
    },

    gengduo() {
        AD_oppo.showBox()
    },

    // update (dt) {},
});
