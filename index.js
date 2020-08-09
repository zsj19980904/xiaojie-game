//对象收编变量
//动画 animate 去管理所有动画
var bird={
    skyPostion:0,
    skyStep:2,
    birdTop: 220,
    birdstepY:0,
    strarColor:'blue',
    
    // 动画的一个函数
    strarFlag:false,
    minTop:0,
    maxTop:570,
    //初始化函数，要调用函数的时候，调用这给即可
    init:function(){
    this.initDate();
    this.animate();
    this.handle();
    

}, 
//这是一个在函数内部的方法，跟着匿名函数
 initDate:function(){
     //获得全部的DOM
        this.el=document.getElementById('game');
        /*约定熟成的对象，只要是DON元素,变量名前面加个O*/
        this.oBird=this.el.getElementsByClassName('bird')[0];
        this.ostart=this.el.getElementsByClassName('start')[0];
        this.oScore=this.el.getElementsByClassName('score')[0];
        this.omask=this.el.getElementsByClassName('mask')[0];
        this.oend=this.el.getElementsByClassName('end')[0];
    },
animate:function() {
    // 优化代码
    count=0;
    var self=this;
    this.timer = setInterval(function(){
  self.skyMove();
 
  //用变量计算运算10次运行一次
  if( ++ count % 10===0){
    //   当strarflag为假的时候执行
      if(!self.strarFlag){ 
       self.birdJump(); 
       self.startBound();
      }
     
       self.birdFly(count);
       
  } 
  if(self.strarFlag){
          self.birdDrop();
      }
    },30)
    //this === bird
   
  

    
},
/*移动天空*/
skyMove:function(){
    var self=this;//为什么要加这句，因为如果不加这句话，函数回调的三种方式都没有，因此就是用默认值windon
    // setInterval(function(){
    self.skyPostion -= self.skyStep;
    self.el.style.backgroundPositionX = self.skyPostion + 'px';
        // },30)
},
/*小鸟跳跃*/
birdJump: function(){
   var self=this;
//    setInterval(function(){
       //判断小鸟的值为多少如果220
       self.birdTop = self.birdTop === 220 ? 260 : 220;
    self.oBird.style.top = self.birdTop + 'px';
//    },300) 
},
birdFly:function(count){
this.oBird .style.backgroundPositionX=count % 3*-30+'px'
},
// 小鸟下坠
birdDrop:function(){
   this.birdTop += ++ this.birdstepY;
   this.oBird.style.top=this.birdTop +'px';
   this.judegkonck();
},
// 文字颜色
startBound:function(){
    /*保存上一次的颜色*/
     var pstrarColor = this.strarColor;
     /*更改现在的颜色*/
     this.strarColor = pstrarColor ==='blue' ? 'white' :'blue';
    // 删除dom元素
     this.ostart.classList.remove('start-'+pstrarColor);
    //  增加一个dom元素
     this.ostart.classList.add('start-'+this.strarColor);
    },
//边界碰撞检测
judegkonck(){
this.judegBoundary(),
this.judergpipe()
},
//边界碰撞检测
judegBoundary:function(){
    if(this.birdTop<this.minTop||this.birdTop>this.maxTop){
        this.failGame();
    }
},
//柱子碰撞检测
judergpipe:function(){},

    // 事件监听函数
    handle:function(){
        var self=this;
      this.ostart.onclick = function(){
          self.strarFlag=true;
          self.ostart.style.display='none';
          self.oScore.style.display='block';
          self.skyStep = 5;
          self.oBird.style.left='80'+'px';

      };
    },
    failGame:function(){
        //清除定时器
        clearInterval(this.timer);
        this.omask.style.display='block';
        this.oend.style.display='block';
        this.oBird.style.display='none';
        this.oScore.style.display='none';


}
};
bird.init();