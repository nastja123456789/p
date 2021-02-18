<template>

  <div >
<br/>
    <h6 v-for="i in news.data" :key="i">


      <div class="news-slides-content">

        <p >{{i["text"]}}</p>
      </div>
      <h2>{{i["title"]}}</h2>
      <div class="slider-element">
        <img class="slider-img" v-bind:src="i['img']" >
      </div>
      <a v-bind:href="i['link']">{{i["link"]}}</a>


    </h6>
    <p></p>

  </div>


</template>

<script>
import axios from "axios";

export default {
name: "news",
  data() {
    return {
      news: []
    }
  },
  mounted() {
    axios
        .get('http://192.168.255.133/api/news')
        .then(response => (this.news = response));

  },
}
</script>

<style>
#news-slides{
  height: 100%;
  max-width: 100vw;
}
.slider-element{
  height: 90vh;
}

.slick-list{
  height: 100%;
}
.slick-track{
  height: 100%;
}
.slick-slide{
  margin: 0 100px;
}
.slick-slide .slider-img{
  width: 100%;
  height: 100%;
  max-height: 90vh;
}
.slick-prev, .slick-next{
  z-index: 100;
}
.slick-prev:before, .slick-next:before{
  font-size: 75px;
}
.slick-prev{
  left: 10px;
}
.slick-next{
  right: 60px;
}

.news-slides-content{
  position: center;
  z-index: 1;
  text-align: center;
  color: white;
  width: 100%;
  bottom: 10rem;
  background-color: rgba(0, 0, 0, 0.7);
  min-height: 10rem;
  padding: 1rem;
}
.news-slides-content>p{
  font-size: 12pt;
}

.news-slides-qrcode{
  position: absolute;
  z-index: 100;
  top: 0;
  text-align: center;
  border: 5px solid #fff;
}
.news-slides-qrcode img{
  height: 7rem;
  width: 7rem;
}

#news-slider-bg{
  width: 100vw;
  height: 100vh;
  background-size: 100% 100%;
  position: absolute;
  z-index: 0;
  filter: blur(10px);
}

</style>