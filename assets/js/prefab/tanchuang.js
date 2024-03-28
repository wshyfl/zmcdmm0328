cc.Class({
    extends: cc.Component,

    properties: {
        jinbi: cc.Node,
        tili: cc.Node,
        jue1: cc.Node,
        jue2: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    chu(id) {
        this.id=id;
        this.node.getChildByName("bj").scale=0.6;
        switch (id) {
            case 0://金币
                this.jinbi.active = true;
                break;
            case 1://体力
                this.tili.active = true;
                break;
            case 2://角色1
                this.jue1.active = true;
                break;
            case 3://角色2
                this.jue2.active = true;
                break;
        }
        AD.chaPing();
        AD.showBanner();
        cc.tween(this.node.getChildByName("bj"))
            .to(0.15, { scale: 1.1 })
            .to(0.15, { scale: 1 })
            .call(() => {})
            .start()
    },

    cha(){
        cc.find("hc").getComponent("hc").yinguan(13);
        cc.find("hc").getComponent("hc").yinkai(13,false);
        cc.tween(this.node.getChildByName("bj"))
            .to(0.15, { scale: 1.1 })
            .to(0.15, { scale: 0.6 })
            .call(() => {this.node.destroy()})
            .start()
    },

    dian(){
        cc.find("hc").getComponent("hc").yinguan(13);
        cc.find("hc").getComponent("hc").yinkai(13,false);
        AD.showAD(this.hui,this)
    },

    hui(){
        
        switch (this.id) {
            case 0:
                SHUJU.zengjia(this.id,200)
                cc.director.emit("刷角色")
                cc.director.emit("刷道具")
                cc.director.emit("刷地图")
                cc.director.emit("刷技能")
                cc.director.emit("刷变身")
                cc.director.emit("刷屠夫")
                break;
            case 1:
                SHUJU.zengjia(this.id,5)
                break;
            case 2:
                SHUJU.data.jue[1]=true;
                SHUJU.baocun();
                break;
            case 3:
                SHUJU.data.jue[0]=true;
                SHUJU.data.kapai[2]+=5;
                SHUJU.baocun();
                break;
        }
        this.cha()
    },

    // update (dt) {},
});
