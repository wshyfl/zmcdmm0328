cc.Class({
    extends: cc.Component,

    properties: {
        pi:[cc.Node],
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    chu(id){
        this.node.active=true;
        if(id!=2){
            this.pi[0].active=true;
        }else{
            this.pi[1].active=true;
        }
    },

    // update (dt) {},
});
