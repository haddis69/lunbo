var $banner=(function () { 
    var index = 1;
    var timer;
    var isMoving = false;
    var $innerHtml=$('<div class="slider" id="slider">'
    +'<div class="slide"><img src="img/b5.png" alt=""></div>'
    +'<div class="slide"><img src="img/b1.png" alt=""></div>'
    +'<div class="slide"><img src="img/b2.png" alt=""></div>'
    +'<div class="slide"><img src="img/b3.png" alt=""></div>'
    +'<div class="slide"><img src="img/b4.png" alt=""></div>'
    +'<div class="slide"><img src="img/b5.png" alt=""></div>'
    +'<div class="slide"><img src="img/b1.png" alt=""></div>'
    +'</div>'
    +'<span id="left"><</span>'
    +'<span id="right">></span>'
    +'<ul class="nav" id="navs">'
        +'<li>1</li>'
        +'<li>2</li>'
        +'<li>3</li>'
        +'<li>4</li>'
        +'<li>5</li>'
        +'</ul>');
    function show() {
        var $box =$('#box');
        $box.append($innerHtml);
        var $oNavlist = $('#navs').children(),
            $slider = $('#slider'),
            $left=$('#left'),
            $right=$('#right');

        $oNavlist[0].className='active';
        timer = setInterval(next, 3000);
        $right.click(next);
        $left.click(prev);
        $box.mouseover(function(){
            clearInterval(timer)
            $left.css({'opacity':.6});
			$right.css({'opacity':.6});
        })
        $box.mouseout(function(){
			$left.css({'opacity':0});
			$right.css({'opacity':0});
			timer = setInterval(next, 3000);
        })
        for(var i=0; i<$oNavlist.length; i++){
			(function(i){
                $oNavlist[i].onclick=function(){
                    index = i+1;
					navmove();
					animate(slider,{left:-1200*index});
                }
            })(i);
        }
        function next(){
			if(isMoving){
                return;
			}
			isMoving = true;
			index++;
			navmove();
			animate(slider,{left:-1200*index},function(){
				if(index==6){
					$slider.css({"left":"-1200px"});
					index = 1;
				}
				isMoving = false;
			});
        }
        function prev(){
			if(isMoving){
				return;
			}
			isMoving = true;
			index--;
			navmove();
			animate(slider,{left:-1200*index},function(){
				if(index==0){
					$slider.css({left:'-6000px'});
					index = 5;
				}
				isMoving = false;
			});
        }
        function navmove(){
			for( let i=0; i<$oNavlist.length; i++ ){
                $oNavlist[i].className = "";
			}
			if(index >5 ){
				$oNavlist[0].className = "active";
			}else if(index<=0){
				$oNavlist[4].className = "active";
			}else {
				$oNavlist[index-1].className = "active";
			}
		}
        function getStyle(obj, attr){
            if(obj.currentStyle){
                return obj.currentStyle[attr];
            } else {
                return getComputedStyle(obj, null)[attr];
            }
        }
        function animate(obj,json,callback){
            clearInterval(obj.timer);
            obj.timer = setInterval(function(){
                var isStop = true;
                for(var attr in json){
                    var now = 0;
                    if(attr == 'opacity'){
                        now = parseInt(getStyle(obj,attr)*100);
                    }else{
                        now = parseInt(getStyle(obj,attr));
                    }
                    var speed = (json[attr] - now) / 8;
                    speed = speed>0?Math.ceil(speed):Math.floor(speed);
                    var cur = now + speed;
                    if(attr == 'opacity'){
                        obj.style[attr] = cur / 100;
                    }else{
                        obj.style[attr] = cur + 'px';
                    }
                    if(json[attr] !== cur){
                        isStop = false;
                    }
                }
                if(isStop){
                    clearInterval(obj.timer);
                    callback&&callback();
                }
            }, 30)
        }
    }
    return {
        show:show
    }
}())