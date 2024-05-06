cc.Class({
    extends: cc.Component,

    properties: {
        yao:[cc.Node],
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        SHUJU.diaoyao=this.node
    },

    chu(idd,id,xuan){
        this.id=id;
        this.idd=idd;
        this.xuan=xuan;
        for(var i=0;i<idd;i++){
            this.yao[i].active=true;
        }
    },

    onCollisionEnter(other,self){
        if(this.xuan==false)
            return;
        console.log("碰撞")
        if(other.tag==10){
            if(SHUJU.wanzhuang==2)
                return
            other.node.parent.parent.getChildByName("bg").getComponent("bg1").jian(this.id,this.idd)
        }else if(other.tag==20){
            other.node.parent.getComponent("npcren").jian(this.id,this.idd)
        }
        // cc.director.emit("捡", this.id,this.idd);
    },

    // update (dt) {},
});
