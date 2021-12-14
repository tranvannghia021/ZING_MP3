const $ =document.querySelector.bind(document);
const $$= document.querySelectorAll.bind(document);
const PLAYER_STORAGE_KEY='TVN_PLAYER';
const player = $('.player');
const heading =$('header h2');
const cdThumb= $('.cd-thumb');
const audio =$('#audio');
const cd =$('.cd');
const playBtn =$('.btn-toggle-play');
const progress = $('#progress');
const btnNext= $('.btn-next');
const btnPrev= $('.btn-prev');
const btnRandom=$('.btn-random');
const btnRepeat =$('.btn-repeat');
const playList =$('.playlist');

const app ={
  currentIndex:0,
  isPlaying:false,
  isRandom:false,
  isRepeat:false,
  config:JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) ||{},
    songs: [
        {
            name: 'yêu là cưới',
            singer: 'Phát Hồ',
            path: './assets/music/song-1.mp3',
            image:'./assets/img/song-1.jpg'
        },
        {
            name: 'Chưa bao giờ quên em',
            singer: 'Hương Ly',
            path: './assets/music/song-2.mp3',
            image:'./assets/img/song-2.jpg'
        },
        {
            name: 'Độ tộc 2',
            singer: 'Masew,Phúc Du,Mixigaming,Pháo',
            path: './assets/music/song-3.mp3',
            image:'./assets/img/song-3.jpg'
        },
        {
            name: 'Em là con thuyền cô đơn',
            singer: 'Thái Học',
            path: './assets/music/song-4.mp3',
            image:'./assets/img/song-4.jpg'
        },
        {
            name: 'Người lạ thoáng qua',
            singer: 'Đinh Hùng Huy,ACV',
            path: './assets/music/song-5.mp3',
            image:'./assets/img/song-5.jpg'
        },
        {
            name: 'Khuê mộc lan',
            singer: 'Hương Ly,Jombie',
            path: './assets/music/song-6.mp3',
            image:'./assets/img/song-6.jpg'
        },
        {
            name: 'Rồi tới luôn',
            singer: 'Nal',
            path: './assets/music/song-7.mp3',
            image:'./assets/img/song-7.jpg'
        },
        {
            name: 'Khi thế giới đó mất đi',
            singer: 'Hương Ly,Tăng phúc',
            path: './assets/music/song-8.mp3',
            image:'./assets/img/song-8.jpg'
        },
        {
            name: 'Nếu có kiếp sau',
            singer: 'Hương Ly',
            path: './assets/music/song-9.mp3',
            image:'./assets/img/song-9.jpg'
        },
        {
            name: 'Sầu tương tư',
            singer: 'Nhật Phong',
            path: './assets/music/song-10.mp3',
            image:'./assets/img/song-10.jpg'
        }
    ],
    setConfig:function(key,value){
      this.config[key] =value;
      localStorage.setItem(PLAYER_STORAGE_KEY,JSON.stringify(this.config));
    },
    render: function(){
      const htmls= this.songs.map((song,index) =>{
          return ` 
          <div class="song ${index===this.currentIndex ? 'active' :' '}" data-index="${index}">
              <div class="thumb" 
                  style="background-image: url('${song.image}')">
               </div>
              <div class="body">
                  <h3 class="title">${song.name}</h3>
                  <p class="author">${song.singer}</p>
              </div>
              <div class="option">
                  <i class="fas fa-ellipsis-h"></i>
              </div>
          </div>`;

      });
      playList.innerHTML = htmls.join('');
    },   
    defineProperties:function(){
      Object.defineProperty(this,'currentSong',{
          get:function(){
              return this.songs[this.currentIndex];
          }
      });
     
    },
    handleEvents:function(){
      //xử lý phóng to thu nhỏ cd
        const cdWidth =cd.offsetWidth;
        // xu ly cd quay
        const cdThumbAnimate = cdThumb.animate([
          {transform:'rotate(360deg)'}
        ],
        {
          duration:10000,
          iterations:Infinity
        });
        cdThumbAnimate.pause();
        document.onscroll=function(){
           const scrollTop= window.scrollY ||document.documentElement.scrollTop;
           const newCdWidth=cdWidth-scrollTop;
           cd.style.width= newCdWidth >0 ? newCdWidth + 'px' :0;
           cd.style.opacity=newCdWidth /cdWidth ;
        }
           //xử lý khi click play
           playBtn.onclick = function(){
             if(app.isPlaying){
               audio.pause();
             }else{
               audio.play();
              }
            }
            //khi song duoc play
            audio.onplay=function(){
              app.isPlaying=true;
              player.classList.add('playing');
              cdThumbAnimate.play();

           }
           //khi song duoc pause
           audio.onpause=function(){
              app.isPlaying=false;
              player.classList.remove('playing');
              cdThumbAnimate.pause();

           }
           //khi tiến độ bài hát thay đổi 
           audio.ontimeupdate=function(){
             if(audio.duration){
               const progressPercent = Math.floor(audio.currentTime / audio.duration*100);
               progress.value=progressPercent;
             }

           }
           //xu lý tua song
           progress.oninput=function(e){
             const seekTime = audio.duration/100*e.target.value;
             audio.currentTime=seekTime;
           }
           // khi next song
           btnNext.onclick=function(){
             if(app.isRandom){
               app.playRandomSong();
             }else{
               app.nextSong();
             }
            
             audio.play();
             app.render();
             app.scrollToActiveSong();
           }
           //khi prev song
            btnPrev.onclick=function(){
              if(app.isRandom){
               app.playRandomSong();
             }else{
               app.prevSong();
             }
              audio.play();
              app.render();
              app.scrollToActiveSong();
            }
        // random bai hat
        btnRandom.onclick=function(e){
          app.isRandom=!app.isRandom;
          app.setConfig('isRandom',app.isRandom);
          btnRandom.classList.toggle('active',app.isRandom);
        }
        // xu lys btn lap lai
        btnRepeat.onclick=function(){
          app.isRepeat=!app.isRepeat
          app.setConfig('isRepeat',app.isRepeat);
          btnRepeat.classList.toggle('active',app.isRepeat);
        }
        
        
        //xu ly next song khi audio ended
        audio.onended=function(){
          if(app.isRepeat){
            audio.play()
          }else{
            btnNext.click();
          }
        }
        //lắng nghe hành ci click vào playlist
        playList.onclick=function(e){
          const songNode =e.target.closest('.song:not(.active)');
          if(songNode || e.target.closest('.option')){
            // xu ly khi vao song
            if(songNode){
              app.currentIndex=Number(songNode.dataset.index);
              app.loadCurretnSong();
              audio.play();
              app.render();
            }
            //xu ly khi click vao song option
            if(e.target.closest('.option')){

            }
          }
        }
    },
    loadCurretnSong:function(){
        
      heading.textContent= this.currentSong.name;
      cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
      audio.src=this.currentSong.path;

    },
    loadConfig: function(){
      this.isRandom = this.config.isRandom;
      this.isRepeat= this.config.isRepeat;
    },
    nextSong:function(){
        this.currentIndex++;
        if(this.currentIndex >= this.songs.length){
          this.currentIndex=0;
        }
        this.loadCurretnSong();
    },
    prevSong:function(){
      this.currentIndex--;
      if(this.currentIndex <0){
        this.currentIndex=this.songs.length-1;
      }
      this.loadCurretnSong();
    },
    playRandomSong:function(){
      let newIndex;
      do{
        newIndex= Math.floor(Math.random()*this.songs.length);

      }while(newIndex === this.currentIndex);
      this.currentIndex=newIndex;
      this.loadCurretnSong();
    },
    scrollToActiveSong:function(){
      setTimeout(()=>{
        $('.song.active').scrollIntoView({
          behavior:'smooth',
          block:'center',
        });
      },300);
    },
    start: function(){
      // gán câu hình từ config vao ung dung
      this.loadConfig()
        // Định nghĩa các thuộc tính cho object
        this.defineProperties();
        //Lắng nghe /xử lý các sự kiện (DOM events)
        this.handleEvents();
        //tải thông tin bài hát đầu tiên vào UI khi start ứng dụng
        this.loadCurretnSong();
        //render playlist
           this.render();
           //hien thi trang thái ban đầu của btn 
           btnRandom.classList.toggle('active',app.isRandom);
           btnRepeat.classList.toggle('active',app.isRepeat);
        }
  }
  app.start();