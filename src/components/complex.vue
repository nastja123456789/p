<template>
<div class="complex-list">
  <table class="table mb-3">
    <thead >
    <tr>
      <td colspan="4" align="center">
        <h2>Комплексный обед - 120 рублей</h2>
         <h2> С 11:30 до 16:00 </h2>
      </td>

    <tr>
    <th scope="col" >Наименование</th>

    <th scope="col">гр.</th>
    </tr>

    <tr v-for="i in complex" :key="i"  id="complex-ul">
      <th  class="  align-items-center h1">{{i.name}}</th>
    <th  class="badge badge-dark badge-pill h3">{{i.weight}}</th></tr>
    </thead>
  </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
name: "complex",
  data() {
    return {
      data: [],
      complex:""
    }
  },
  mounted() {
    axios
        .get('http://192.168.255.133/api/food')
    //    .then(response => (this.data = response.data.menu));
        .then(response => (this.complex = response.data.complex));
        //.then(response => (this.data = response.data.complex));
  },
}
</script>

<style>
.badge {
  padding-top: 10px;
  margin-top: 10px;
}
#complex-ul{
  width: 70%;
  max-width: 70%;
}
#complex-list{
  display: table-cell;
  width: 100vw;
  padding-top: 10vh;
}

</style>