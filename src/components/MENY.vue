<template>
  <div>

    <table class="table mb-3" style="background-color:#FFF;">
      <thead >
                        <tr>
      <td colspan="4" align="center">
        <h2>Меню  </h2>
      </td>
      </tr>
      <tr>
        <th scope="col" style="background: #C0C0C0">Наименование</th>
        <th scope="col" style="background: #C0C0C0">Цена</th>
        <th scope="col" style="background: #C0C0C0">гр.</th>
        <th scope="col" style="background: #C0C0C0">Калории</th>
      </tr>

                        <th class="dish">ХОЛОДНЫЕ ЗАКУСКИ К ОБЕДУ</th>
                        <th class="dish"></th>
                        <th class="dish"></th>
                        <th class="dish"></th>
                        <tr class="part" v-for="type in data['ХОЛОДНЫЕ ЗАКУСКИ К ОБЕДУ']" :key="type" >

                          <th>{{type.name}}</th>
                          <th>{{type.price}}</th>
                          <th >{{type.weight}}
                          </th>
                          <th>{{type.calories}}</th>
                        </tr>
                        <th class="dish">ПЕРВЫЕ БЛЮДА</th>
                        <th class="dish"></th>
                        <th class="dish"></th>
                        <th class="dish"></th>
                        <tr class="part" v-for="type in data['ПЕРВЫЕ БЛЮДА']" :key="type" >
                          <th>{{type.name}}</th>
                          <th>{{type.price}}</th>
                          <th >{{type.weight}}
                          </th>
                          <th>{{type.calories}}</th>
                        </tr>
                        <th class="dish">ВТОРЫЕ БЛЮДА</th>
                        <th class="dish"></th>
                        <th class="dish"></th>
                        <th class="dish"></th>
                        <tr class="part" v-for="type in data['ВТОРЫЕ БЛЮДА']" :key="type" >
                          <th>{{type.name}}</th>
                          <th>{{type.price}}</th>
                          <th >{{type.weight}}
                          </th>
                          <th>{{type.calories}}</th>
                        </tr>
                        <th class="dish">ГАРНИР</th>
                        <th class="dish"></th>
                        <th class="dish"></th>
                        <th class="dish"></th>
                        <tr class="part" v-for="type in data['ГАРНИР']" :key="type" >
                          <th>{{type.name}}</th>
                          <th>{{type.price}}</th>
                          <th >{{type.weight}}
                          </th>
                          <th>{{type.calories}}</th>
                        </tr>
                        <th class="dish">СЛАДКИЕ БЛЮДА И ВЫПЕЧЕНЫЕ ИЗДЕЛИЯ</th>
                        <th class="dish"></th>
                        <th class="dish"></th>
                        <th class="dish"></th>
                        <tr class="part" v-for="type in data['СЛАДКИЕ БЛЮДА И ВЫПЕЧЕНЫЕ ИЗДЕЛИЯ']" :key="type">
                          <th>{{type.name}}</th>
                          <th>{{type.price}}</th>
                          <th >{{type.weight}}
                          </th>
                          <th>{{type.calories}}</th>
                        </tr>
      </thead>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
name: "MENY",
  data() {
  return {
    data: []
  }
  },
  mounted() {
    axios
        .get('http://192.168.255.133/api/food')
        .then(response => (this.data = response.data.menu));

    },

  /*method: function () {

    axios
        .get(`/api/food`)
        .then(response => (this.data = response));

  },*/
}
</script>

<style>
.part{
  color:#000;
  background: #fff;
}
.dish{
  background: #FFCC80;
  color: #FFF;
  font: Medium Italic;
}
</style>