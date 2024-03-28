cc.Class({
    extends: cc.Component,

    properties: {
        yinyue: [cc.AudioClip],
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        cc.game.addPersistRootNode(this.node);
        SHUJU.chu();

        //屏幕宽高
        this.pingw = cc.view.getFrameSize().width;
        this.pingh = cc.view.getFrameSize().height;

        //设计宽高
        this.shew = cc.view.getDesignResolutionSize().width;
        this.sheh = cc.view.getDesignResolutionSize().height;

        //可看见的尺寸
        this.jianw = cc.view.getVisibleSize().width;
        this.jianh = cc.view.getVisibleSize().height;

        //canvas的尺寸
        this.canw = cc.view.getCanvasSize().width;
        this.canh = cc.view.getCanvasSize().height;

        //不知道是什么宽高，总之用这个就对了
        this.coh = cc.winSize.height;
        this.cow = cc.winSize.width;
    },

    start() {

        var a = cc.sys.localStorage.getItem("shijian");
        if (a) {
            this.shijian = JSON.parse(a);
        } else {
            var time = new Date()
            this.shijian = time.getTime();
            cc.sys.localStorage.setItem("shijian", JSON.stringify(this.shijian));
        }
        this.yin = []
        this.jiati()
        setInterval(function () {//每隔1分钟刷新一次体力
            this.jiati()
        }.bind(this), 300000)
        
    },

    jiati() {
        var time = new Date()
        if (Math.trunc(time.getTime() / 60000) > Math.trunc(this.shijian / 60000)) {
            if (SHUJU.data.tili < 10) {
                var ww=Math.floor((time / 60000 - this.shijian / 60000) / 5)
                if (ww >= 1) {
                    if(SHUJU.data.tili+ww<=10){
                        SHUJU.zengjia(1, ww)
                        cc.sys.localStorage.setItem("shijian", JSON.stringify(time.getTime()));
                        var c = cc.sys.localStorage.getItem("shijian");
                        this.shijian = JSON.parse(c);
                    }else{
                        SHUJU.zengjia(1, 10-SHUJU.data.tili)
                        cc.sys.localStorage.setItem("shijian", JSON.stringify(time.getTime()));
                        var c = cc.sys.localStorage.getItem("shijian");
                        this.shijian = JSON.parse(c);
                    }
                }
            } else {
                SHUJU.data.tili = 10;
                cc.sys.localStorage.setItem("shijian", JSON.stringify(time.getTime()));
                var c = cc.sys.localStorage.getItem("shijian");
                this.shijian = JSON.parse(c);
            }

        }
    },
    yinkai(id, zhuang) {
        this.yin[id] = cc.audioEngine.play(this.yinyue[id], zhuang)
    },

    yinguan(id) {
        cc.audioEngine.stop(this.yin[id])
    },

    // update (dt) {

    // },
});
//预加载音量
// cc.audioEngine.uncache(filePath);
//停止播放所有音频
// cc.audioEngine.stopAll();

//当组件或者节点被显示的时候自动执行一次
// onEnable(){}
//当组件或者节点被隐藏的时候自动执行一次
// onDisable(){}
//当组件或者节点被销毁的时候自动执行一次
// onDestroy(){}

//隐藏组件
// this.image.getComponent(cc.Sprite).enabled=false;

//获取子节点的数量
// this.node.childrenCount;

//设置接收全局监听，必须先设置再发送
// cc.director.on("猫被击中",()=>{cc.log();},this);
//设置取消全局监听
// cc.director.off("猫被击中",()=>{cc.log();},this);
//发送全局监听
// cc.director.emit("重新躲");


//需要传入一个预制体globalTips，预制体里的label需要命名tips
//发送消息#######################################
// cc.director.emit("系统提示","hhhhhhhhhhhhhhhhhhhh")
//设置消息#######################################
// cc.director.on("系统提示", (_content) => {
//     this.showTips(_content);
// }, this);
//提示方法#######################################
// showTips(_content) {
//     var _tips = cc.instantiate(this.globalTips);
//     _tips.parent = cc.find("Canvas");
//     //_tips.group = "UI";
//     if (cc.director.getScene().name == "gameScene")
//         _tips.position = cc.v2(0, 260);
//     else
//         _tips.position = cc.v2(0, 60);
//     _tips.getChildByName("tips").getComponent(cc.Label).string = _content;
//     _tips.scaleY = 0;

//     // this.scheduleOnce(() => {
//     //     cc.find("kuai0", _tips).x = -_tips.getChildByName("tips").width / 2 - 20
//     //     cc.find("kuai1", _tips).x = _tips.getChildByName("tips").width / 2 + 20
//     // }, 0.01)
//     cc.tween(_tips)
//         .to(0.2, { scaleY: 1 }, { easing: "backInOut" })
//         .delay(0.8)
//         // .by(0.1,{y:-20},{easing:"sineInOut"})
//         .by(0.5, { y: 100, opacity: -255 },{easing:"sineInOut"})
//         // .to(0.2, { scaleY: 0 }, { easing: "backInOut" })
//         .call(() => {
//             _tips.destroy();
//         })
//         .start();
// },



//动画动作完毕监听事件(sp.skeleton)
//   this.anim.setCompleteListener((a, evt) => {
//     switch (a.animation.name) {
//         case "gongji_kaishi"://角色1 攻击结束
//             self.playAct("角色1冲刺");
//             break;
//         case "gongji_jieshu"://角色1 攻击结束
//             self.playAct("待机");
//             break;
//         case "gongji"://角色2 gongji结束
//             self.playAct("待机");
//             if (self.type == 1)
//                 self.attackEndDuration = self.attackEndDurationSum;
//             break;
//         case "fangshou_tiao"://角色7 变小 完毕=>进入变小待机
//             self.playAct("角色7缩小待机");
//             break;
//         case "fangshou_huifu"://角色7 变大 完毕=>恢复成正常待机
//             self.playAct("待机");
//             self.scheduleOnce(() => {
//                 self.moveState = 0;
//             }, 1);//一秒后 开始移动
//             break;
//     }
// });

//动画帧事件监听(sp.skeleton)
//   this.anim.setEventListener((a, evt) => {
//     if (evt.data.name == "npc2_gongji") {//飞刀怪	近战	在循环路段巡逻，玩家靠近后，会主动攻击
//         if (self.inShootDistance) {
//             if ((self.direction == 1 && AD.playerNow.x > self.node.x) || (self.direction == -1 && AD.playerNow.x < self.node.x)) {
//                 AD.playerNow.getComponent("player").beHurt(1);
//             }
//         }
//     }
//     else if (evt.data.name == "npc4_gongji" || evt.data.name == "npc5_gongji") {///npc4_gongji:水枪女+水枪男   npc5_gongji:投掷怪
//         self.createBt();
//     }
// });

// 所有的缓动类型：
// export class Easing {
//     quadIn(t: number): number;// 平方曲线缓入函数。运动由慢到快。
//     quadOut(t: number): number;// 平方曲线缓出函数。运动由快到慢
//     quadInOut(t: number): number;// 平方曲线缓入缓出函数。运动由慢到快再到慢
//     cubicIn(t: number): number;// 立方曲线缓入函数。运动由慢到快。
//     cubicOut(t: number): number;// 立方曲线缓出函数。运动由快到慢。
//     cubicInOut(t: number): number;// 立方曲线缓入缓出函数。运动由慢到快再到慢。
//     quartIn(t: number): number;// 四次方曲线缓入函数。运动由慢到快。
//     quartOut(t: number): number;// 四次方曲线缓出函数。运动由快到慢。
//     quartInOut(t: number): number;// 四次方曲线缓入缓出函数。运动由慢到快再到慢。
//     quintIn(t: number): number;// 五次方曲线缓入函数。运动由慢到快。
//     quintOut(t: number): number;//五次方曲线缓出函数。运动由快到慢.
//     quintInOut(t: number): number;// 五次方曲线缓入缓出函数。运动由慢到快再到慢。
//     sineIn(t: number): number;// 正弦曲线缓入函数。运动由慢到快。
//     sineOut(t: number): number;// 正弦曲线缓出函数。运动由快到慢。
//     sineInOut(t: number): number;// 正弦曲线缓入缓出函数。运动由慢到快再到慢。
//     expoIn(t: number): number;// 指数曲线缓入函数。运动由慢到快。
//     expoOut(t: number): number;// 指数曲线缓出函数。运动由快到慢。
//     expoInOut(t: number): number;// 指数曲线缓入和缓出函数。运动由慢到很快再到慢。
//     circIn(t: number): number;// 循环公式缓入函数。运动由慢到快。
//     circOut(t: number): number;// 循环公式缓出函数。运动由快到慢。
//     circInOut(t: number): number;// 指数曲线缓入缓出函数。运动由慢到很快再到慢。
//     elasticIn(t: number): number;// 弹簧回震效果的缓入函数。
//     elasticOut(t: number): number;// 弹簧回震效果的缓出函数。
//     elasticInOut(t: number): number;// 弹簧回震效果的缓入缓出函数。
//     backIn(t: number): number;// 回退效果的缓入函数。
//     backOut(t: number): number;// 回退效果的缓出函数。
//     backInOut(t: number): number;// 回退效果的缓入缓出函数。
//     bounceIn(t: number): number;// 弹跳效果的缓入函数。
//     bounceOut(t: number): number;// 弹跳效果的缓出函数。
//     bounceInOut(t: number): number;// 弹跳效果的缓入缓出函数。
//     smooth(t: number): number;// 平滑效果函数。
//     fade(t: number): number;// 渐褪效果函数。
// }

// let tween = cc.tween;
// // 链式结构
// tween(this.node)
//     .to(1, { position: cc.v2(100, 100), rotation: 360 })//到
//     .by(1, { scale: 2 })//加
// 	.to(1, { scale: 2, position: { value: cc.v3(100, 100, 100), easing: 'sineOutIn' } })//easing
// 	.to(1, { scale2 }, { onUpdate: () => { /* 每帧调用*/}})
// 	.delay(1)//延迟
// 	.call(()=>{})//回调
// 	.parallel(//同时执行
//         	tween().to(1, { scale: 2 }),
//         	tween().to(2, { position: cc.v2(100, 100) })
//     	)
// 	.repeatForever()//无限循环上个操作
// 	.repeat(10)//循环上个操作9次===========注意：填1则1次都不走，填2走1次，3走2次
// 	.repeat(10,//循环上个操作9次指定tween===========注意：同上
//         	cc.tween().by(1, { scale: 1 })
//     	)
//     .start()//走一个
// //灵活的嵌套使用//
// let dt = cc.tween().delay(1)
// let scale = cc.tween().to(1, { scale: 2 })
// let rotate = cc.tween().to(1, { rotation: 90})
// let call = cc.tween().call(()=>{})
// let parallel = cc.tween().parallel(scale, rotate)
// cc.tween(this.node).then(scale).then(rotate)//插入执行
// scale.clone(this.node2).start();//克隆缓动scale到节点this.node2
// cc.tween(this.node).then(rotate).repeatForever().start();//无限重复缓动rotate
// cc.tween(this.node).then(rotate).repeat(4).start();//重复3次缓动rotate
// cc.sequence([缓动])

// tween.start() 之后会出现一个 _finalAction 成员。
//修改 _finalAction._speedMethod = true 。之后可以通过 _finalAction._speed 修改速度
// 后面直接修改_speed的值就OK（_speed默认为1值越大速度越快）
// this.nodeTween = tw(this.node)
// .sequence(
// tw().to(0.5, { position: cc.v3(10,10) }),
// tw().to(0.5, { position: cc.v3(20,20) }),
// )
// .repeatForever()
// .start()
// this.nodeTween._finalAction._speedMethod = true
// this.nodeTween._finalAction._speed = 0.3

// 跳跃方法
// var _jump = cc.jumpTo(2, cc.v2(200, 0), 200, 1);
// cc.tween(this.node).then(_jump).start()


//打乱数组方法
// getNewArr(Arr, num)	//传入2个参数，一个数组，要获取数组的长度 (目的 将一个数组打乱后重新返回)
// {
//     var arr = new Array();  //这个数组的目的是把传入进来的数组复制一份
//     for (var i in Arr) {
//         arr.push(Arr[i]);
//     }  //这个for 循环用来把传入的数组复制一份

//     var return_arr = new Array();  //存储随机数用的数组
//     for (var i = 0; i < num; i++) 	//获取随机数
//     {
//         if (arr.length > 0) {
//             var nums = Math.floor(Math.random() * arr.length);  //从arr里面随机一个地址并 赋给变量nums
//             return_arr[i] = arr[nums];	//将arr地址里的值 给   return_arr[i];
//             arr.splice(nums, 1);	//删除 地址上的数字，防止在随机出来重复的
//         }
//         else {
//             break;
//         }
//     }
//     return return_arr;		//返回获取的5个值
// },