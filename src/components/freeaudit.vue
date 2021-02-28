<template>
  <div class="slide" id="slide2" data-anchor="Аудитории">
    <div class="btn-toolbar mb-3" role="toolbar" aria-label="Toolbar with button groups">
						<span class="col-3" id="amount" style="line-height: 38px; font-size: 17pt;">Интервал:
              <span id="lesson-num"></span>
							<span id="lesson-count"></span>
							<span id="lesson-time"></span>
							<span id="lesson-load" style="display: none;"><i class='fa fa-spinner fa-pulse fa-fw'></i></span>
						</span>
      <div class="m-auto col-3">
        <div id="slider-range"></div>
      </div>
      <div class="input-group input-date m-auto">
        <div class="range-slider">
        <input @change="onChange" type="range" min="1" max="7" step="1"
               :value="this.i" @input="e => this.i = e.target.value "
        />

<div>Свободные аудитории на {{this.i}}ю пару</div>

</div>
        <input @change="onChange" type="number" :value="this.i" @input="e => this.i = e.target.value" id="classrooms-datepicker" class="form-control form-control-lg">


      </div>

    </div>
    <div v-if="floors.length > 0" >
      <div class="free-classes" v-for="floor in floors" :key="floor.floor">
        <h6 class="floar">
          {{ floor.floor }} Этаж
        </h6>
        <div class="classes" v-for="number in floor.rooms" :key="number">
          {{ number }}
        </div>
      </div>
    </div>

  </div>

</template>

<script>


import axios from "axios";

export default {
  name: 'freeaudit',
  data() {
    return {
      i: 1,
      a:1,
      b:8,
      f: '',
      audit: [],
      map: {},
      rooms: [],
      floors: [],
      lessonTime: {
        1: {
          "begin": "09:00",
          "end": "10:20"
        },
        2: {
          "begin": "10:20",
          "end": "11:50"
        },
        3: {
          "begin": "11:50",
          "end": "13:30"
        },
        4: {
          "begin": "13:30",
          "end": "15:00"
        },
        5: {
          "begin": "15:00",
          "end": "16:30"
        },
        6: {
          "begin": "16:30",
          "end": "18:00"
        },
        7: {
          "begin": "18:00",
          "end": "19:30"
        },
        8: {
          "begin": "19:30",
          "end": "21:00"
        }
      },
    }
  },
  methods: {

    onChange: function() {
      axios
          .get('https://api.hseapp.ru/gateway/ruz/rooms/2211?classes=' + this.i)
          .then(response => {
            this.floors = []
            response.data.rooms.forEach(room => {
              if (room.floor) {
                let index = this.floors.map(floor => floor.floor).indexOf(room.floor)
                if (index == -1) {
                  this.floors.push({
                    floor: room.floor,
                    rooms: [room.number]
                  })
                } else {
                  this.floors[index].rooms.push(room.number)
                }
              }
            })
          });
      // if (this.i > this.a) {
      //   this.a=this.i
      //   this.f += this.i
      //   axios
      //       .get('https://api.hseapp.ru/gateway/ruz/rooms/2211?classes=' + this.f)
      //       .then(response => {
      //         this.floors = []
      //         response.data.rooms.forEach(room => {
      //           if (room.floor) {
      //             let index = this.floors.map(floor => floor.floor).indexOf(room.floor)
      //             if (index == -1) {
      //               this.floors.push({
      //                 floor: room.floor,
      //                 rooms: [room.number]
      //               })
      //             } else {
      //               this.floors[index].rooms.push(room.number)
      //             }
      //           }
      //         })
      //       });
      // }
      // if (this.i<this.a) {
      //   this.f-=this.a
      //   this.a=this.i
      //   axios
      //       .get('https://api.hseapp.ru/gateway/ruz/rooms/2211?classes=' + this.f)
      //       .then(response => {
      //         this.floors = []
      //         response.data.rooms.forEach(room => {
      //           if (room.floor) {
      //             let index = this.floors.map(floor => floor.floor).indexOf(room.floor)
      //             if (index == -1) {
      //               this.floors.push({
      //                 floor: room.floor,
      //                 rooms: [room.number]
      //               })
      //             } else {
      //               this.floors[index].rooms.push(room.number)
      //             }
      //           }
      //         })
      //       });
      // }
    }

  },

  mounted() {
    if (!this.f) {
      this.f += this.i
      axios

          .get('https://api.hseapp.ru/gateway/ruz/rooms/2211?classes=' + this.i)
          .then(response => {
            response.data.rooms.forEach(room => {
              if (room.floor) {
                let index = this.floors.map(floor => floor.floor).indexOf(room.floor)
                if (index == -1) {
                  this.floors.push({
                    floor: room.floor,
                    rooms: [room.number]
                  })
                } else {
                  this.floors[index].rooms.push(room.number)
                }
              }
            })
          });
    }
  }
}
</script>

<style>
.classes{
 display:inline;
  margin-left: 2%;
}
#sleep_menu{
  position: relative;
  display: none;
  z-index: 10000;
  width: 100%;
  height: 100%;
  background: #000;
}

.left-menu{
  background: #fff;
  position: absolute;
  z-index: 1;
  font-size: 10pt;
  left: 0;
  bottom: 0;
  height: 90%;
  width: 20%;
  box-sizing: border-box;
}

.free-class-title{
  padding: 20px;
  font-size: 14pt;
}

.floar{
  list-style: none;
  padding: 15px 10px 15px 0;
  border-top: 1px solid rgb(182, 182, 182);
  margin-left: 30px;
}

.floar>*{
  font-size: 13pt;
}

.floar h6{
  color: rgb(74, 111, 177);
}
.floar p{
  color: #000;
}
.floar small{
  color: rgba(0, 0, 0, 0.5);
}

.top-menu{
  background: rgb(74, 111, 177);
  color: #fff;
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  height: 10%;
  width: 100%;
}

.top-menu>div{
  display: inline-flex;
}

.top-left-menu{
  background: rgb(74, 111, 177);
  height: 100%;
  width: 20%;
  text-align: center;
}
#time{
  color: #fff;
  /*line-height: 200%;*/
  font-size: 32pt;
  margin: auto;
}

.sleep_slide{
  position: absolute;
  right: 0;
  bottom: 0;
  opacity: 0;
  transition: opacity 1s;
  width: 80%;
  height: 90%;
}

.news_slide{
  width: 100%;
  height: 91%;
  top: 0;
}

.current{
  opacity: 1;
}

.sleep_slide_content{
  position: absolute;
  z-index: 1;
  text-align: center;
  color: white;
  width: 100%;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  min-height: 10rem;
  padding: 2rem;
}

.sleep_slide_content>p{
  font-size: 12pt;
}

.sleep_slide_img{
  width: 100%;
}

.sleep_slide_qrcode{
  position: absolute;
  z-index: 2;
  top: 0;
  right: 0;
  text-align: center;
  border: 5px solid #fff;
}
.sleep_slide_qrcode img{
  height: 7rem;
  width: 7rem;
}

</style>
