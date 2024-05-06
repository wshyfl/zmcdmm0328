cc.Class({
    extends: cc.Component,

    properties: {
        id: 0,
        tanchuang: cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        
    },

    onEnable() {
        this.jin = [0, -100, -100, -100, -100, -100, -150, -300, -300, -300, -999, -999];
        this.yong = false;
        cc.director.on("刷角色",this.shuaxin,this);
        this.shuaxin()
    },

    dian() {
        if (this.yong)
            return;
        if (SHUJU.data.jinbi < Math.abs(this.jin[this.id])) {
            AD.showAD(this.hui,this);
        }else{
            SHUJU.zengjia(0,this.jin[this.id])
            this.hui()
        }

    },

    hui(){
        SHUJU.data.juese[this.id]=true;
        SHUJU.baocun()
        cc.director.emit("刷角色")
    },

    shuaxin(){
        if (this.id < 10) {
            if (SHUJU.data.juese[this.id]) {
                this.yong = true;
                this.node.getChildByName("zhuang1").active = true;
                this.node.getChildByName("zhuang2").active = false;
                this.node.getChildByName("zhuang3").active = false;
            } else {
                this.yong = false;
                this.node.getChildByName("zhuang1").active = false;
                this.node.getChildByName("zhuang2").active = false;
                this.node.getChildByName("zhuang3").active = false;
                if(SHUJU.data.jinbi >= Math.abs(this.jin[this.id])){
                    this.node.getChildByName("zhuang2").active = true;
                }else{
                    this.node.getChildByName("zhuang3").active = true;
                }
                
            }
        } else if (this.id == 10) {
            if (SHUJU.data.jue[1]) {
                this.yong = true;
                this.node.getChildByName("zhuang1").active = true;
                this.node.getChildByName("zhuang2").active = false;
            } else {
                this.yong = false;
                this.node.getChildByName("zhuang1").active = false;
                this.node.getChildByName("zhuang2").active = true;
            }
        } else if (this.id == 11) {
            if (SHUJU.data.jue[0]) {
                this.yong = true;
                this.node.getChildByName("zhuang1").active = true;
                this.node.getChildByName("zhuang2").active = false;
            } else {
                this.yong = false;
                this.node.getChildByName("zhuang1").active = false;
                this.node.getChildByName("zhuang2").active = true;
            }
        }
    },


    // update (dt) {},
});
