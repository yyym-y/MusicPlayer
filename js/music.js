const Top = document.querySelector('.top')
const Next = document.querySelector('.next')
const Center = document.querySelector('.center')
const Pre = document.querySelector('.pre')
const Left = document.querySelector('.left')
const obj = document.querySelector('.center>img')
const end_time = document.querySelector(".end-time")
const up_bar = document.querySelector(".up-bar")
const now_time = document.querySelector(".now-time")
const Name = document.querySelector('.name')
const botton_bar = document.querySelector('.botton-bar')
const menu = document.querySelector(".menu");
const list = document.querySelector(".list");
const repeat = document.querySelector('.repeat')
const repeatOne = document.querySelector(".repeatOne")
let now = 0
let now2 = -45
let origin = 360
let flag = 0
let Deg = 0;
let flagNow = 0
let flagtem = 0
let Length = 0
let type = 1
let Use = [Next, Center, Pre, Top, Left]
function Change(){
    Top.style.marginTop = (origin - now) + "px"
    Top.style.height = now + "px"
}
function MenuOpen(){
    if(Length == 110) return;
    menu.style.visibility = "visible"
    let Index = setInterval(function(){
        menu.style.height = Length + "px"
        menu.style.transform = "translate(145px, " + (110 - Length) + "px)";
        Length++
        if(Length == 110) clearInterval(Index);
    },1)
}
function MenuClose(){
    if(Length == 0) return;
    let Index = setInterval(function(){
        menu.style.height = Length + "px"
        menu.style.transform = "translate(145px, " + (110 - Length) + "px)";
        Length--
        if(Length == -1){
            Length = 0;
            clearInterval(Index);
        }
    },1)
}
Left.addEventListener('click',function(){
    if(Length == 0 || Length == 110){
        if(Length == 110) MenuClose()
        else MenuOpen()  
    }
})
function Open(Num){
    flag = 1
    if(now == 130)
        return
    let index = setInterval(function(){
        if(now < 130){
            Left.style.boxShadow = "0px 2px 20px 2px rgba(0,0,0,0.5)"
            now+=2
            Change()
            if(now2 > -65){
                now2--;
                Left.style.transform = "translateY(" + now2 + "px)"
            }
        }else{
            clearInterval(index)
        }
    })
}
function Close(Num){
    flag = 0
    setTimeout(function(){
        if(flag == 1){
            return
        }
        MenuClose();
        menu.style.visibility = "hidden"
        let index = setInterval(function(){
            if(now > 0){
                Left.style.boxShadow = "none"
                now-=2
                Change()
                if(now2 < -45){
                    now2++;
                    Left.style.transform = "translateY(" + now2 + "px)"
                }
                if(flag == 1)
                    clearInterval(index)
            }else{
                clearInterval(index)
            }
        })
    },200)
}
function Round(){
    flagtem = 1
    if(flagNow == 1) return
    flagNow = 1;
    let Index = setInterval(function(){
        Deg++;
        Left.style.transform = "translateY(" + now2 + "px) rotate(" + Deg + "deg)"
    },10)
    window.Index = Index;
}
function Stop(){
    flagtem = 0
    setTimeout(function(){
        if(flagtem == 1) return
        flagNow = 0
        clearInterval(Index)
        Deg = 0
    }, 200)

}
for(let i = 0 ; i < Use.length ; i++){
    Use[i].addEventListener('mouseover', Open)
    Use[i].addEventListener('mouseleave', Close)
    Use[i].addEventListener('mouseover', Round)
    Use[i].addEventListener('mouseleave', Stop)
}
for(let i = 0 ; i < 3 ; i++){
    Use[i].addEventListener('mousedown', function(){
        this.style.backgroundColor = "#d7dae1"
    })
    Use[i].addEventListener('mouseup', function(){
        this.style.backgroundColor = "white"
    })
}
let MusicName = ['DAOKO (ダヲコ) - 打上花火',
                'スパークル (movie ver.)(花火)',
                "Grand Escape",
                "紅蓮華",
                "前前前世",
                "花海-美依礼芽-龚琳娜",
                "灶门炭治郎之歌",
                "アイドル"]

let MusicRoad = ["./MusicSourse/DAOKO (ダヲコ) - 打上花火.mp3",
                 './MusicSourse/スパークル (movie ver.)(花火).mp3',
                 './MusicSourse/Grand Escape.mp3',
                 './MusicSourse/紅蓮華.mp3',
                 './MusicSourse/前前前世.mp3',
                 './MusicSourse/花海-美依礼芽-龚琳娜.mp3',
                 './MusicSourse/灶门炭治郎之歌.mp3',
                 './MusicSourse/アイドル.mp3']

let PicRoad = ["url('./MusicSourse/Img/DAOKO (ダヲコ) - 打上花火.jpg')",
               "url('./MusicSourse/Img/スパークル (movie ver.)(花火).jpg')",
               "url('./MusicSourse/Img/Grand Escape.jpg')",
               "url('./MusicSourse/Img/紅蓮華.jpg')",
               "url('./MusicSourse/Img/前前前世.jpg')",
               "url('./MusicSourse/Img/花海-美依礼芽-龚琳娜.png')",
               "url('./MusicSourse/Img/灶门炭治郎之歌.jpg')",
               "url('./MusicSourse/Img/アイドル.jpg"]

let now_music_index = 0;
function nextMusicIndex(put){
    put++;
    return put % MusicName.length
}
function preMusicIndex(put){
    put--;
    return (put + MusicName.length) % MusicName.length
}
let Music = new Audio(MusicRoad[now_music_index])
window.Music = Music
function secToString(total_time){
    total_time = Math.floor(total_time)
    let M = Math.floor(total_time / 60), S = total_time % 60
    let One, Two
    if(M >= 10) One = toString(M)
    else One = "0" + M
    if(S >= 10) Two = S
    else Two = "0" + S
    return One + ":" + Two
}
function CountTime(put){
    let Time = put.duration;
    return secToString(Time)
}
function ChangeTime(Music){
    Music.addEventListener('loadedmetadata', function() {
        end_time.innerHTML = CountTime(Music)
    });   
}
function ChangeCenter(){
    let use = obj.src;
    if(use === "https://gitee.com/qq3109778990/remem_pic/raw/master/img/play.png"){
        obj.src="https://gitee.com/qq3109778990/remem_pic/raw/master/img/pause.png"
        Music.play()
        Name.innerHTML = MusicName[now_music_index]
        end_time.innerHTML = CountTime(Music)
        Left.style.backgroundImage = PicRoad[now_music_index]
    }else{
        obj.src="https://gitee.com/qq3109778990/remem_pic/raw/master/img/play.png"
        Music.pause()
    }    
}
function OtherChangeCenter(){
    let use = obj.src;
    if(use === "https://gitee.com/qq3109778990/remem_pic/raw/master/img/play.png")
        obj.src="https://gitee.com/qq3109778990/remem_pic/raw/master/img/pause.png"
}
Center.addEventListener('click', ChangeCenter)
function playNextMusic(){
    Music.pause();
    now_music_index = nextMusicIndex(now_music_index)
    Music.src = MusicRoad[now_music_index];
    Name.innerHTML = MusicName[now_music_index]
    Music.load()
    Music.play();
    ChangeTime(Music)
    OtherChangeCenter()
    Left.style.backgroundImage = PicRoad[now_music_index]
}
Next.addEventListener('click', playNextMusic)
Music.addEventListener('ended',function(){
    if(type == 1)
        playNextMusic();
    else if(type == 2){
        Music.play();
    }
})
Pre.addEventListener('click', function(){
    now_music_index = preMusicIndex(now_music_index)
    Music.pause()
    Music.src = MusicRoad[now_music_index]
    Name.innerHTML = MusicName[now_music_index]
    Music.load()
    Music.play();
    ChangeTime(Music)
    OtherChangeCenter()
    Left.style.backgroundImage = PicRoad[now_music_index]
})
function changeInBarLen(sec){
    let now = sec / Music.duration
    let newL = 230 * now;
    up_bar.style.width = newL + "px"
}

setInterval(function(){
    changeInBarLen(Music.currentTime)
    now_time.innerHTML = secToString(Music.currentTime)
}, 500)

let dis = 0;
botton_bar.addEventListener('mousedown', function(event){
    dis = event.pageX - botton_bar.offsetLeft
    console.log(dis)
    up_bar.style.width = dis + "px"
    if(dis < 0) dis = 0;
    if(dis > 230) dis = 230;
    document.onmousemove=function(event){
        dis = event.pageX - botton_bar.offsetLeft
        console.log(dis)
        up_bar.style.width = dis + "px"
        if(dis < 0) dis = 0;
        if(dis > 230) dis = 230;
    }
})
document.addEventListener('mouseup', function(){
    if(dis == 0) return
    document.onmousemove = null;
    let now = dis / 230
    Music.currentTime = Music.duration * now;
    now_time.innerHTML = secToString(Music.currentTime)
    dis = 0  
})

for(let i = 0 ; i < MusicName.length ; i++){
    NEW_P = document.createElement('p');
    NEW_P.innerHTML = MusicName[i]
    NEW_P.className = "pName"
    NEW_P.addEventListener('click', function(){
        now_music_index = preMusicIndex(i);
        playNextMusic();
    })
    NEW_P.addEventListener('mousedown',function(){
        this.style.color = "black";
        this.style.backgroundColor = "#9E9D9E"
    })
    NEW_P.addEventListener('mouseup',function(){
        this.style.color = "#4D4C4D";
        this.style.backgroundColor = "#d4d3d4"
    })
    list.appendChild(NEW_P)
}

TypeList = [repeat, repeatOne]
for(let i = 0 ; i < TypeList.length ; i++){
    TypeList[i].addEventListener('click',function(){
        if(TypeList[i].style.backgroundColor == "#949394") return;
        for(let j = 0 ; j < TypeList.length ; j++)
            TypeList[j].style.backgroundColor = "#c0bfc0"
        TypeList[i].style.backgroundColor = "#949394"
        type = i + 1;
    })
}
