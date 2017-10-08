function animate(element,target){
//先清除上一次动画的额计时器
    clearInterval(element.timer);
    //清除之后，开启档次动画的计时器
    element.timer =  setInterval(function(){
        //1 获取当前值
        var currentLeft = element.offsetLeft;
        //2 修改当前值 -- 两个不同的方向要判断处理
        //写一个步长，方便管理
        var step = 60;
        currentLeft += target >= currentLeft ? step : -step;
        //3 设置left属性
        element.style.left = currentLeft + "px";
        //4 停下来  -- 我们处理停下来的策略：  如果目标位置和当前位置的距离小于每次移动的距离，就停下来
        if( Math.abs(target - currentLeft) <= step){
            clearInterval(element.timer);
            element.style.left = target + "px";
        }
    },20);
}

/**
 * 根据id获取元素的封装
 */
function $id(id){
    return document.getElementById(id);
}
 //轮播图
/**
 *   1  圆点切换
 *   2  左右按钮切换
 *   3  自动切换
 *   4  鼠标移入轮播区域，停止自动轮播，离开轮播区域，继续轮播
 */
    //1 获取元素
var box = document.getElementById("box");
var inner = document.getElementById("inner");
// var ul = inner.children[0];
var ul=document.getElementById("imglist");
var list = inner.children[1].children;
var leftBtn = inner.children[2].children[0];
var rightBtn = inner.children[2].children[1];
var imgWidth = ul.children[0].offsetWidth;
var currentIndex = 0;

//第一个功能：鼠标移入圆点切换图片
for(var i = 0; i < list.length ; i++){
    list[i].index = i;
    list[i].onmouseover = mouseOverHandle;
}
function mouseOverHandle(){
    //计算ul的位置并移动
    var target = this.index * imgWidth * -1;
    animate(ul,target);
    //修改圆点样式
    for(var j = 0; j < list.length ; j++){
        list[j].removeAttribute("class");
    }
    this.className = "current";
    //把两个索引同步
    currentIndex = this.index;
}

//2 左右按钮点击切换
rightBtn.onclick = autoRun;

function autoRun(){
    if(currentIndex == ul.children.length - 1){
        //重置索引和ul的位置
        currentIndex = 0;
        ul.style.left = 0;
    }
    //修改当前图片的索引
    currentIndex++;
    //计算ul的位置
    var target = currentIndex * imgWidth * -1;
    //移动ul
    animate(ul,target);
    //修改圆点样式
    for(var j = 0; j < list.length ; j++){
        list[j].removeAttribute("class");
    }
    //特殊处理：当到达最后一张的时候，用户认为该图片是第一张，所以应该修改的是第一个圆点
    if(currentIndex == ul.children.length - 1){
        //修改第一个圆点
        list[0].className = "current";
    }else {
        list[currentIndex].className = "current";
    }
}

leftBtn.onclick = function(){
    if(currentIndex == 0){
        //设置索引
        currentIndex = ul.children.length - 1;
        //设置ul的位置
        ul.style.left = currentIndex * imgWidth * -1 + "px";
    }
    //修改索引
    currentIndex--;
    //计算位置
    var target = currentIndex * imgWidth * -1;
    //移动ul
    animate(ul,target);
    //修改圆点：
    for(var j = 0; j < list.length ; j++){
        list[j].removeAttribute("class");
    }
    list[currentIndex].className = "current";
}
//第三个功能  自动轮播
var timer = setInterval(autoRun,2000);

//第四个功能：鼠标一入一出控制自动轮播
box.onmouseover = function(){
    //停止自动轮播 -- 清除计时器
    clearInterval(timer);
}
box.onmouseout = function(){
    //继续自动轮播
    timer = setInterval(autoRun,2000);
}

// //新闻栏切换
// var bgRightNews=document.getElementById("bgRightNews");
// var li=bgRightNews.getElementsByTagName("li");
// var lis=box.getElementsByTagName("li");
// for(var i=0;i<spans.length;i++){
// //        span[i].index=i
//     spans[i].setAttribute("index",i);
//     spans[i].onmouseover=function () {
//         for(var j=0;j<spans.length;j++){
// //                spans[i].className="";
// //                lis[i].className=""
//             spans[j].removeAttribute('class'); //先将其余spans标签的class属性去掉
//             lis[j].removeAttribute("class");  //先将其余lis的class 属性去掉
//         }
//         this.setAttribute('class','current'); //给当前的 span标签添加class属性
// //           this.className="current";
//
// //            var index=this.index;
//         var index=this.getAttribute("index");
//         lis[index].setAttribute("class","current");
//     }
// }
var wxHover=document.getElementById("wxHover");
var wx=document.getElementById("wx");
wx.onmouseover=function () {
    wxHover.style.display="block";
}
wx.onmouseout=function () {
    wxHover.style.display="none";
}