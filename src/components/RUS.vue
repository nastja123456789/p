<template>


  <div class="slide" id="slide1" data-anchor="Расписание">
    <div class="btn-toolbar mb-3" role="toolbar" aria-label="Toolbar with button groups" style="margin-top: 1em;">
      <div class="input-group autocomplete-wrapper col-md-4 mt-3 mr-3">
        <div class="input-group ">
        <input v-model="ru" id="ruz-search" type="text" class="form-control form-control-lg" placeholder="Поиск...">

        <button v-on:click="search">search</button>
        </div>
        <div class="input-group-append">
          <div>
            <b-form-datepicker id="example-datepicker" v-model="value" class="mb-2"></b-form-datepicker>
            <p>Дата: {{ value }}</p>
          </div>

        </div>
      </div>


      <table style="width: 100%;">
        <tbody class="advice-variant border" v-for="i in id_type.data" :key="i" v-on:click="found">
        <tr>
          <td rowspan="2" class="p-1" style="width: 8%;">
            <i class="mdi">{{i["type"]}}</i>
          </td>
          <td class="p-1 font-weight-bold">
            <p style="font-size:10pt;">{{i["label"]}}</p>
          </td>
        </tr>
        <tr>
          <td class="pb-1 pl-1 font-weight-light">
            <small style="font-size:8pt;">{{i["description"]}}</small>
            <br>
            <small style="font-size:8pt;">{{i["id"]}}</small>
          </td>
        </tr>
        </tbody>
      </table>

<!--      <div v-for="i in id_type.data" :key="i" v-on:click="found">-->
<!--        <div >{{i["id"]}}</div>-->
<!--        <div >{{i["type"]}}</div>-->
<!--        <div >{{i["label"]}}</div>-->
<!--      </div>-->
    </div>

    <h6 v-for="i in ruz.data" :key="i">
      <center class='mt-3 pt-3'><i class='fa fa-spinner fa-pulse fa-4x fa-fw'></i></center>
      <div class="mr-3"><div class="box-wrapper"><div class="box">
        <div class="day">{{i['date']}}</div>
        <div class="week">{{i['dayOfWeekString']}}</div>

      </div>
      </div>
      </div>
      <div class='media-body day-items'></div>
      <div class="media item"><div class="type">
        <div class="time">{{i['beginLesson']}}-{{i['endLesson']}}</div>
        <div><small>{{i['lessonNumberStart']}}-я пара</small></div>
      </div></div>
      <div class='media-body'></div>
      <div class="mt-0"><div class="title">
        <span>{{i['discipline']}}</span>
        <div class="text-muted kind">
          <i class="fa fa-square mr-1 color-practice"></i>
          {{i['kindOfWork']}}
        </div>
      </div></div>
      <table class='info'></table>
        <tr>
          <th>
            <i class="fa fa-map-marker-alt fa-fw mr-1"></i>
          </th>
        <td>
          <span class="auditorium">{{i['auditorium']}}</span>
          <span class="mr-2 text-muted">({{i['building']}})</span>
      </td>

      <th title="Преподаватель">
        <i class="fa fa-user fa-fw mr-1"></i>
      </th>
      <td>
        <div class="lecturer">{{i['lecturer']}}</div>
      </td>
      </tr>

    </h6>

  </div>
</template>

<script>

import axios from "axios";

export default {
name: "RUS",

  data() {
    return {
      value:'',
      time: 6,
      id_type: [],
      i: '0',
      ru: "",
      id: "",
      type: "",
      ruz: [],

      month: {
        1: "январь",
        2: "Февраль",
        3: "март",
        4: "апрель",
        5: "май",
        6: "июнь",
        7: "июль",
        8: "август",
        9: "сентябрь",
        10: "октябрь",
        11: "ноябрь",
        12: "декабрь"

      },
      timeLesson : {
        1: {
          "begin": "09:00",
          "end": "10:20"
        },
        2: {
          "begin": "10:30",
          "end": "11:50"
        },
        3: {
          "begin": "12:10",
          "end": "13:30"
        },
        4: {
          "begin": "13:40",
          "end": "15:00"
        },
        5: {
          "begin": "15:10",
          "end": "16:30"
        },
        6: {
          "begin": "16:40",
          "end": "18:00"
        },
        7: {
          "begin": "18:10",
          "end": "19:30"
        },
        8: {
          "begin": "19:40",
          "end": "21:00"
        }
      },
      /*icons: {
        "student":"mdi-account",
        "group": "mdi-account-group",
        "lecturer": "mdi-school",
        "auditorium": "mdi-door"
      },
      currVariant: {
        id:"",
        type: ""
      },*/

    }
  },
  /*mounted() {
    axios
        //.get('http://192.168.255.133/api/search?str=ru')
        .get('http://192.168.255.133/api/schedule?type='+"student"+'&id='+"232208"+'&start=2021-01-01&finish=2021-01-31')
        .then(response => (this.ruz = response));

  },*/

  methods: {

search: function() {

  axios

      .get('http://192.168.255.133/api/search?str='+this.ru)
      //.then(response => (this.data = response.data.menu));
      .then(response => (this.id_type = response));

},
    found: function() {
  axios

    //.get('http://192.168.255.133/api/schedule?type=student&id=236358&start=2021-01-01&finish=2021-01-31')
      .get('http://192.168.255.133/api/schedule?type=student&id=236358&start='+this.value+'&finish='+this.value)

      .then(response => (this.ruz = response));
  for (let i in this.id_type.data) {
    console.log(this.id_type.data);
    if (i["label"] == this.ru) {
      this.type = i["type"]
      this.id = i["id"]
      axios
          //.get('http://192.168.255.133/api/schedule?type=' + this.type + '&id=' + this.id + '&start=2021-01-01&finish=2021-01-31')
          .get('http://192.168.255.133/api/schedule?type=' + 'student' + '&id=' + '236358' + '&start=2021-01-01&finish=2021-01-31')
          .then(response => (this.ruz = response));
    }
  }
    }

}
}
</script>

<style >
.input-group-append{
  margin-top: 10%;
}
#ruz .navbar{
  background-color: #e3f2fd;
  padding: 0 1rem;
  box-shadow: 0 0.25rem 0.75rem rgba(0,0,0,.05);
}

.langs{
  max-width: 8em;
  min-height: 2em;
  margin-left: auto;
  margin-right: 1em;
}

.ruz-nav-link.active{
  font-weight: 700;
}

.btn-toolbar{
  margin-top: 3em;
  margin-left: 2em;
}

.input-group{
  margin-left: 2em;
}

.input-date{
  margin-left: 2em;
}

#btnGroupDrop1{
  margin-left: 2em;
}

#btn-group2_id{
  margin-left: 1em;
}

/* .list{
  display: inline-block;
  width: 100%;
  height: 100%;
  overflow: auto;
} */

.box-wrapper{
  width: 78px;
  text-align: center;
  margin-left: 2em;
}

.box-wrapper .box{
  padding: 0 8px 4px;
  background-color: #e3f2fd;
}

.box-wrapper .day{
  background-color: #fff;
  margin: 4px 0;
}

.box-wrapper .box .week{
  font-weight: 700;
}

.day-items{

  display: flex;
  width: 100%;
}

.day-items{
  margin-bottom: 16px;
  padding-bottom: 8px;

}

.item .type .time{
  background-color: #eee;
  padding: 4px;
}

.ui-inplace{
  display: inline-block;
}

.item{
  margin-right: 1rem!important;
}


.title{
  font-weight: 500;
  font-size: 1.1rem;
  margin-bottom: 4px;
}

.ui-inplace .ui-inplace-display {
  /* display: inline-block; */
  padding: 0;
  border-bottom: 1px dashed #0275d8;
  border-radius: 0;
  font-weight: inherit;
  white-space: nowrap; /* Отменяем перенос текста */
  overflow: hidden; /* Обрезаем содержимое */
  text-overflow: ellipsis; /* Многоточие */
  max-width: 10rem;
}

.lecturer {
  text-transform: capitalize;
}

.kind {
  font-size: .9rem;
  font-style: italic;
  margin-top: -4px;
}

.noUi-connect {
  background: #e3f2fd;
}

.noUi-tooltip{
  font-size: 12pt;
  font-weight: bold;
}
.noUi-tooltip::after{
  content: ' пара';
}

.noUi-horizontal{
  width: 500px;
  height: 40px;
}

.noUi-horizontal .noUi-handle{
  width: 50px;
  height: 50px;
}

.noUi-handle:before{
  top: 11px;
  left: 22px;
  height: 25px;
}
.noUi-handle:after{
  top: 11px;
  left: 26px;
  height: 25px;
}

/* .noUi-active .noUi-tooltip {
  display: block;
} */
#ruz-search{
  border-right: 0;
}
#ruz-search-icon{
  border-left: 0;
  background: #fff;
}
#ruz-content{
  min-height: 500px;
}
#search-advice-wrapper{
  display:none;
  width: 31vw;
  max-height: 350px;
  background-color: white;
  color: black;
  opacity: 0.95;
  position: absolute;
  z-index:999;
  top: 5vh; left: 0px;
  overflow: auto;
  margin-left: 15px;
}
#search-advice-wrapper .advice-variant{
  cursor: pointer;
  padding: 5px;
  text-align: left;
}
#search-advice-wrapper .advice-variant:hover{
  color: black;
  background-color:#e3f2fd;
}
#search-advice-wrapper .active{
  cursor: pointer;
  padding: 5px;
  color:black;
  background-color:#e3f2fd;
}

.ruz-keyboard{
  position: absolute;
  bottom: 10vh;
  display: none;
}


.hg-ruz-custom {
  height: 80px!important;
  font-size: 24pt;
}
.hg-button-space{
  width: 70%;
}
/*
#section0 #slide0{
  min-height: 100vh;
} */

</style>
