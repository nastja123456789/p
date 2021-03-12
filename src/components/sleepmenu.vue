<template>
  <div >

    <div class="split left">

      <Slider id="slider"
          animation="fade"
          v-model="sliderValue"
          :duration="5000"
          :speed="1000"
      >
        <SliderItem
            v-for="i in list"
            :key="i.link"
            @click="changeIndex(1);"
            :style="i"
        >
<!--            <h6 v-for="i in news.data" :key="i"></h6>-->
          <div>
            <p >{{i["text"]}}</p>
          </div>
          <h2>{{i["title"]}}</h2>
          <div >
            <img  v-bind:src="i['img']" >
          </div>
          <a v-bind:href="i['link']">{{i["link"]}}</a>



        </SliderItem>
      </Slider>
      </div>
<!--      <br/>-->
<!--      <h6 v-for="i in news.data" :key="i">-->


<!--        <div class="news-slides-content">-->

<!--          <p >{{i["text"]}}</p>-->
<!--        </div>-->
<!--        <h2>{{i["title"]}}</h2>-->
<!--        <div class="slider-element">-->
<!--          <img class="slider-img" v-bind:src="i['img']" >-->
<!--        </div>-->
<!--        <a v-bind:href="i['link']">{{i["link"]}}</a>-->
<!--      </h6>-->

    <div class="split right">

      <time class="clock">
    <span class="clock__hour">{{ hours }}</span
    ><!--
    --><span
          class="clock__colon"
          :style="{
        visibility: !blink || seconds % 2 === 0 ? 'visible' : 'hidden'
      }"
      >:</span
      ><!--
    --><span class="clock__minutes">{{ minutes }}</span
      ><!--
    --><span
          class="clock__colon"
          v-if="displaySeconds"
          :style="{
        visibility: !blink || seconds % 2 === 0 ? 'visible' : 'hidden'
      }"
      >:</span
      ><!--
    --><span v-if="displaySeconds" class="clock__seconds">{{ seconds }}</span
      ><!--
    --><span v-if="twelveHour" class="clock__ampm">{{ amPm }}</span>
      </time>
<!--      <div class="free-class-title">Свободные аудитории на {{this.i}}ю пару</div>-->
      <div v-if="lessonIndex != null">У вас пара под номером {{lessonIndex}}</div>
      <div v-else>Сейчас неучебное время, проверьте свою пару в промежутке с 9:00 до 21:00</div>
      <div v-if="floors.length > 0" >
        <div class="free-classes" v-for="floor in floors" :key="floor.floor">
          <h6 class="floar">
            {{ floor.floor }} Этаж
          </h6>
          <div class="c" v-for="number in floor.rooms" :key="number">
            {{ number}}

          </div>

        </div>
      </div>
      </div>
  </div>
          </template>

          <script>
          function padZero(number) {
            if (number < 10) {
              return "0" + number;
            }
            return number;
          }
          const getDate = () => new Date();
          const getSeconds = () => padZero(getDate().getSeconds());
          const getMinutes = () => padZero(getDate().getMinutes());
          const getHour = twelveHour => {
            let hours = getDate().getHours();
            if (twelveHour && hours > 12) {
              hours = hours - 12;
            }
            return padZero(hours);
          };
          const getAmPm = () => (getDate().getHours() > 12 ? "pm" : "am");
          import { Slider, SliderItem } from "vue-easy-slider";
           // import VueClock from '@dangvanthanh/vue-clock';
          import axios from "axios";

          export default {
          name: "sleepmenu",
            props: ["blink", "displaySeconds", "twelveHour"],
            components: {
            // VueClock,
              Slider,
              SliderItem,

            },
            data(){
            return {
              ticker: null,
            a:null,
              minutes: getMinutes(),
              hours: getHour(this.twelveHour),
              seconds: getSeconds(),
              amPm: getAmPm(),
              list: [],
              sliderValue: 0,
              news:[],
              i:1,
              audit: [],
              map: {},
              lessonIndex:null,
              rooms: {},
              floors: [],
              capacities:[],
              lessonTime: {
                1: {
                  "start": "09:00",
                  "end": "10:20"
                },
                2: {
                  "start": "10:20",
                  "end": "11:50"
                },
                3: {
                  "start": "11:50",
                  "end": "13:30"
                },
                4: {
                  "start": "13:30",
                  "end": "15:00"
                },
                5: {
                  "start": "15:00",
                  "end": "16:30"
                },
                6: {
                  "start": "16:30",
                  "end": "18:00"
                },
                7: {
                  "start": "18:00",
                  "end": "19:30"
                },
                8: {
                  "start": "19:30",
                  "end": "21:00"
                }
              },
            }
            },
            methods: {
              getLessonIndex() {
                console.log("lalala")
                const lessons = [
                  {
                    from: Date.parse( new Date().toDateString() + " 09:00:00"),
                    to: Date.parse(new Date().toDateString() +  " 10:50:00")
                  },
                  {
                    from: Date.parse(new Date().toDateString() +  " 10:50:00"),
                    to: Date.parse(new Date().toDateString() + " 12:30:00")
                  },
                  {
                    from: Date.parse(new Date().toDateString() + " 12:30:00"),
                    to: Date.parse(new Date().toDateString() + " 14:20:00")
                  },
                  {
                    from: Date.parse(new Date().toDateString() + " 14:20:00"),
                    to: Date.parse(new Date().toDateString() + " 16:00:00")
                  },
                  {
                    from: Date.parse(new Date().toDateString() + " 16:00:00"),
                    to: Date.parse(new Date().toDateString() + " 17:40:00")
                  },
                  {
                    from: Date.parse(new Date().toDateString() + " 17:40:00"),
                    to: Date.parse(new Date().toDateString() + " 19:30:00")
                  },
                  {
                    from: Date.parse(new Date().toDateString() + " 19:30:00"),
                    to: Date.parse(new Date().toDateString() + " 21:00:00")
                  }
                ];
                const currentTime = Date.now();
                lessons.forEach((lesson, index) => {

                  if (lesson.from <= currentTime && lesson.to > currentTime) {
                    this.lessonIndex = index + 1;
                  }

                })

              },
              changeIndex(index) {
                this.sliderValue = index;
              },
              created() {
                this.ticker = setInterval(() => {
                  this.minutes = getMinutes();
                  this.hours = getHour(this.twelveHour);
                  this.seconds = getSeconds();
                }, 1000);
              },
              destroyed() {
                clearInterval(this.ticker);
              },
            },


          mounted() {

            // if (this.hours>9 &&this.hours<11 ) {
            //   this.i=1
            // }
            // else
            //   if (this.hours>11 && this.hours<13) {
            //      this.i=2
            //   }
            // else
            //   if (this.hours>13 && this.hours<14) {
            //     this.i=3
            //   }
            // else
            //   if (this.hours>14 && this.hours<16) {
            //     this.i=4
            //   }
            // else
            //   if (this.hours>16 && this.hours<18) {
            //     this.i=5
            //   }
            // else
            //   if (this.hours>18 && this.hours<19) {
            //     this.i=6
            //   }
            // else
            //   if (this.hours>19 && this.hours<21) {
            //     this.i=7
            //   }
            // else
            //   if (this.hours>21) {
            //     this.i = 7
            //   }
            // else
            //   if (this.hours<9) {
            //     this.i=1
            //   }

            console.log(this.getLessonIndex())
            this.i=this.lessonIndex

            axios
                .get('http://192.168.255.133/api/news')
                .then(response => (this.list = response.data));

            axios
          .get('https://api.hseapp.ru/gateway/ruz/rooms/2211?classes=' + this.i)
                .then(response => {
                  response.data.rooms.forEach(room => {
                    if (room.floor) {
                      let index = this.floors.map(floor => floor.floor).indexOf(room.floor)
                      if (index == -1) {
                        this.floors.push({
                          floor: (room.floor),
                          rooms: [room["number"],room["capacity"]],
                        })
                      } else {
                        this.floors[index].rooms.push(room["number"],room["capacity"])
                      }
                    }
                  })
                });
          }
          }

          </script>

          <style >
          .c:nth-child(2n+1) {

            color: #A3A3A3;
            size: B5;
          }
          .c{
            display:inline;
            margin-left: 2%;
          }

          .split {
            height: 100%;
            width: 50%;
            position: fixed;
            z-index: 1;
            top: 5%;
            overflow-x: hidden;
            padding-top: 20px;
          }

          /* Control the left side */
          .left {
            left: 0;

          }
          #slider {
            position:relative;
            overflow: visible;
            margin-top: 15px;
          }

          /* Control the right side */
          .right {
            right: 0;

          }

          /* If you want the content centered horizontally and vertically */


          /* Style the image inside the centered container, if needed */
          .centered img {
            width: 150px;
            border-radius: 50%;
          }
          .clock{
            margin-top: 15px;
            float: right;
          }
          </style>
