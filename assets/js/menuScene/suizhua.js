cc.Class({
    extends: cc.Component,

    properties: {
        kuang: cc.Node,
        kuangbg: [cc.SpriteFrame],
        juese:sp.Skeleton,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.weix = [-32, 100, 235, 370, -32, 100, 235, 370, -32, 100, 235, 370];
        this.weiy = [123, 123, 123, 123, -3, -3, -3, -3, -127, -127, -127, -127];
    },

    start() {

    },

    onEnable() {
        this.kuang.x = this.weix[0];
        this.kuang.y = this.weiy[0];
        this.kuang.getComponent(cc.Sprite).spriteFrame = this.kuangbg[0];
        this.sui = Math.floor(Math.random() * 12 + 13)
        SHUJU.youren=(this.sui-1)%12
        this.ji = 1;
        this.speed = 1.3;
        this.scheduleOnce(function () { this.dh() }, 0.1);
    },

    onDisable(){
        this.unscheduleAllCallbacks();
    },

    dh() {
        this.scheduleOnce(function () {
            this.shi();
            this.ji++;
            this.kuang.x = this.weix[(this.ji - 1)%12];
            this.kuang.y = this.weiy[(this.ji - 1)%12];
            this.juese.setSkin("juese" + ((this.ji-1)%12+1));
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
            this.node.parent.getComponent("zhunbei").dixia()
        }, 0.6);
    },

    // update (dt) {},
});
