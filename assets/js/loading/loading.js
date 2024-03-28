cc.Class({
    extends: cc.Component,

    properties: {
        jindu:cc.ProgressBar,
		ca:cc.Node,
		dian:[cc.Node],
        kaishi:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.jindu.progress=0;
	},

    start () {
        this.xzdian=false;
		this.dh()
        this.kaishi.active=false;
        this.jindu.active=true;
		cc.tween(this.jindu)
			.delay(1)
			.to(3.5, { progress: 1 })
			.call(() => {this.tiao()})
			.start()
    },

    dianji(){
        if(this.xzdian){
            return;
        }
        this.xzdian=true;
        console.log("开始跳转")
		cc.director.loadScene("menu")
    },

	tiao(){
		if (this.ca.getComponent("loadBundle").xz==1){
            this.kaishi.active=true;
            this.jindu.node.active=false;
		}else{
			this.scheduleOnce(function () {
				this.tiao()
			},0.5)
		}
	},

	dh() {
        cc.tween(this.node)
            .call(() => {
                this.dian[0].active = false;
                this.dian[1].active = false;
                this.dian[2].active = false;
            })
            .delay(0.3)
            .call(() => { this.dian[0].active = true; })
            .delay(0.3)
            .call(() => { this.dian[1].active = true; })
            .delay(0.3)
            .call(() => { this.dian[2].active = true; })
            .delay(0.5)
            .call(() => { this.dh() })
            .start()
    },

    // update (dt) {

	// },
});
