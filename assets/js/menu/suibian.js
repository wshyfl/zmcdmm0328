cc.Class({
    extends: cc.Component,

    properties: {
        kuang: cc.Node,
        kuangbg: [cc.SpriteFrame],
        id:-1,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.weix = [-253,-70,115,296,-253,-70,115,296,-253,-70,115,296];
        this.weiy = [128,128,128,128,-2,-2,-2,-2,-125,-125,-125,-125];
    },

    onEnable() {
        this.kuang.x = this.weix[0];
        this.kuang.y = this.weiy[0];
        this.kuang.getComponent(cc.Sprite).spriteFrame = this.kuangbg[0];
        this.sui = Math.floor(Math.random() * 12 + 13)
        SHUJU.bianshen=(this.sui-1)%12
        this.ji = 1;
        this.speed = 1.3;
        this.scheduleOnce(function () { this.dh() }, 0.05);
    },

    onDisable(){
        this.unscheduleAllCallbacks();
    },

    start () {
        
    },

    dh() {
        this.scheduleOnce(function () {
            this.shi();
            this.ji++;
            this.kuang.x = this.weix[(this.ji - 1)%12];
            this.kuang.y = this.weiy[(this.ji - 1)%12];
            if (this.ji == this.sui) {
                this.xia()
                cc.find("hc").getComponent("hc").yinguan(17);
                cc.find("hc").getComponent("hc").yinkai(17,false);
                return;
            }
            cc.find("hc").getComponent("hc").yinguan(16);
            cc.find("hc").getComponent("hc").yinkai(16,false);
            this.dh()
        }, this.speed);
    },

    shi() {
        if (this.ji < 8) {
            this.speed = 0.1 + (9 - this.ji) * 0.005
        }
        if (this.ji > 9) {
            this.speed = 0.1 + (this.ji - 8) * 0.005
        }
        if (this.ji >= 8 && this.ji <= 9) {
            this.speed = 0.1;
        }
    },

    xia() {
        this.unscheduleAllCallbacks();
        this.kuang.getComponent(cc.Sprite).spriteFrame = this.kuangbg[1];
        this.scheduleOnce(function () {
            if(this.id!=-1){
                this.node.parent.active=false;
                cc.director.emit("下一关");
            }else{
                this.node.parent.getComponent("zhunbei").suiwan()
            }
        }, 0.6);
    },

    // update (dt) {},
});
