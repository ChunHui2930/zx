/**
 * 根据id获取元素的封装
 */
function $id(id){
    return document.getElementById(id);
}

/**
 * 封装好的动画
 */
function animate(element,target){
    //保证计时器唯一不叠加
    clearInterval(element.timer);
    //重新设新的计时器
    element.timer = setInterval(
        function(){
            //获取当前位置
            var currentLeft = element.offsetLeft;
            //计算下一步的位置
            var step = 40;
            currentLeft += target >= currentLeft ? step : -step;
            //重新设定位置
            element.style.left = currentLeft + "px";
            //停下来
            if(Math.abs(target - currentLeft) <= step){
                clearInterval(element.timer);
                element.style.left = target + "px";
            }
        },20
    );
}