cc.Class({
    extends: cc.Component,

    properties: {
        yemian: [cc.Node],
        jian: [cc.Node],
        menutop:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.id = 0;
        for (var i = 0; i < 4; i++) {
            this.jianhuan(i)
        }
    },

    onEnable() {
        SHUJU.jiantou = [false, false, false,false];
        for (var i = 0; i < 3; i++) {
            this.jian[i].active = true;
        }
    },

    qiehuan(even, id) {
        if (id == this.id)
            return;
        this.shualie()
        switch (id) {
            case "0":
                this.id = 0;
                if (SHUJU.jiantou[0]) {
                    this.jian[0].active = false;
                } else {
                    this.jian[0].active = true;
                }
                break;
            case "1":
                this.id = 1;
                break;
            case "2":
                this.id = 2;
                if (SHUJU.jiantou[1]) {
                    this.jian[1].active = false;
                } else {
                    this.jian[1].active = true;
                }
                break;
            case "3":
                this.id = 3;
                break;
            case "4":
                this.id = 4;
                if (SHUJU.jiantou[2]) {
                    this.jian[2].active = false;
                } else {
                    this.jian[2].active = true;
                }
                break;
            case "5":
                this.id = 5;
                if (SHUJU.jiantou[3]) {
                    this.jian[3].active = false;
                } else {
                    this.jian[3].active = true;
                }
                break;

        }
        this.yemian[id].active = true;
    },

    shualie() {
        for (var i = 0; i < this.yemian.length; i++) {
            this.yemian[i].active = false;
        }
    },

    gun(even, c, id) {
        switch (id) {
            case "0":
                if (SHUJU.jiantou[0])
                    return;
                SHUJU.jiantou[0] = true;
                this.jian[0].active = false;
                break;
            case "1":
                if (SHUJU.jiantou[1])
                    return;
                SHUJU.jiantou[1] = true;
                this.jian[1].active = false;
                break;
            case "2":
                if (SHUJU.jiantou[2])
                    return;
                SHUJU.jiantou[2] = true;
                this.jian[2].active = false;
                break;
            case "3":
                if (SHUJU.jiantou[3])
                    return;
                SHUJU.jiantou[3] = true;
                this.jian[3].active = false;
                break;

        }
    },

    jianhuan(i) {
        var e=i;
        cc.tween(this.jian[e])
            .delay(0.8)
            .to(0.15, { x: 605 })
            .to(0.15, { x: 585 })
            .call(() => { this.jianhuan(e) })
            .start()
    },

    fanhui() {
        cc.find("hc").getComponent("hc").yinguan(13);
        cc.find("hc").getComponent("hc").yinkai(13,false);
        this.node.active = false;
        this.menutop.active=true;
        AD.chaPing()
    },

    // update (dt) {},
});
