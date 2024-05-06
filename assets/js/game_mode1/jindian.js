cc.Class({
    extends: cc.Component,

    properties: {
        ide:-1,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    dian(even, id) {
        cc.find("hc").getComponent("hc").yinguan(13);
        cc.find("hc").getComponent("hc").yinkai(13,false);
        this.id = id;
        if (SHUJU.jineng[id] > 0) {
            SHUJU.jineng[id]--;
            this.yong()
        } else {
            this.shu(id)
        }
    },

    shu(id) {
        if (id == 0) {
            if (SHUJU.data.kapai[3] > 0) {
                SHUJU.data.kapai[3]--;
                SHUJU.baocun();
                this.yong()
            } else {
                AD.showAD(this.yong, this);
            }
        }
        if (id == 1) {
            if (SHUJU.data.daoju[1] > 0) {
                SHUJU.data.daoju[1]--;
                SHUJU.baocun();
                this.yong()
            } else {
                AD.showAD(this.yong, this);
            }
        }
        if (id == 2) {
            if (SHUJU.data.daoju[2] > 0) {
                SHUJU.data.daoju[2]--;
                SHUJU.baocun();
                this.yong()
            } else {
                AD.showAD(this.yong, this);
            }
        }
        if (id == 3) {
            if (SHUJU.data.kapai[2] > 0) {
                SHUJU.data.kapai[2]--;
                SHUJU.baocun();
                this.yong()
            } else {
                AD.showAD(this.yong, this);
            }
        }
        if (id == 4) {
            if (SHUJU.data.daoju[3] > 0) {
                SHUJU.data.daoju[3]--;
                SHUJU.baocun();
                this.yong()
            } else {
                AD.showAD(this.yong, this);
            }
        }
    },

    yong() {
        this.shua();
        switch (this.id) {
            case "0":
                cc.director.emit("先知关")
                cc.director.emit("先知开")
                SHUJU.daojudian[0]=1;
                break;
            case "1":
                cc.director.emit("欧气药水关")
                cc.director.emit("指人牌开")
                SHUJU.daojudian[1]=1;
                break;
            case "2":
                cc.director.emit("指人牌关")
                cc.director.emit("欧气药水开")
                SHUJU.daojudian[2]=1;
                break;
            case "3":
                cc.director.emit("先知关")
                cc.director.emit("卧底关")
                cc.director.emit("卧底开")
                SHUJU.daojudian[3]=1;
                break;
            case "4":
                cc.director.emit("分身开")
                SHUJU.daojudian[4]=1;
                break;
        }
        this.node.active=false;
    },

    shua() {
        if(this.ide==-1)
            this.node.parent.getComponent("djan").shua()
        else{
            if(this.ide==10){
                this.node.parent.getComponent("shuadj").shua()
            }else{
                this.node.parent.getComponent("shaodj").shua()
            }
        }
            
    },

    // update (dt) {},
});
