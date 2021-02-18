<template>

  <div id="app">

    <div style="text-align: left; background-color:#FFCC90;">
      <button class="toggle" @click="drawerVisible = true">
        &#8942;&#8942;&#8942;
      </button>
      <input class="date left" type="date" v-model="date">
    </div>
    <div
        class="left-drawer"
        :style="{
        width: drawerVisible ? '25vw' : '0',
        paddingLeft: drawerVisible ? '10px' : '0',
      }"
    >
<img class="image" src="../../../src/components/Логотип_МИЭМ.png">
      <b-nav-item-dropdown left >
        <template #button-content>
          <h4 style="color:black"> <router-link :to="{ name: 'RUS' }">РУЗ</router-link></h4></template>

        <b-dropdown-item href="#" >
          <a class="dropdown-item h4" href="#РУЗ/Аудитории"><router-link :to="{name: 'freeaudit'}">Свободные аудитории</router-link>
        </a>
        </b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown left>
        <template #button-content>
          <h4> <router-link :to="{ name: 'MENY' }">Меню</router-link></h4></template>
        <b-dropdown-item href="#">
          <a class="dropdown-item h2" href="#Столовая/Комплекс"><router-link :to="{name: 'complex'}">Комплекс</router-link></a>
        </b-dropdown-item>
      </b-nav-item-dropdown>
      <h4><a class="sleep-menu" href="#Меню при спящем режиме"><router-link :to="{name: 'sleepmenu'}">Меню:спящий режим</router-link></a></h4>
      <h4><a class="nav-link" href="#Новости"><router-link :to="{ name: 'news' }">Новости</router-link></a></h4>
      <h4><a class="nav-link" href="#Навигация"><router-link :to="{ name: 'navigation' }">Навигация</router-link></a></h4>
    </div>
    <div class="drawer-mask"></div>
    <!-- We will make the mask fill the screen while the menu is visible. Because its z-index is 1 less than that of the menu, the menu will still be displayed on top of it -->
    <div
        class="drawer-mask"
        :style="{
        width: drawerVisible ? '100vw' : '0',
        opacity: drawerVisible ? '0.6' : '0',
      }"
        @click="drawerVisible = false"
    ></div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Master",
  data() {
    return {
      date: new Date().toISOString().substr(0, 10) ,
      drawerVisible: false,
    };
  },
}
</script>

<style>

.image{
  margin-top: 10px;
}
h4{
 color:black;
}
.toggle{
  padding-right:10px;
}
.left-drawer {
  position: absolute;
  top: 0;
  left: 0;
  width: 0; /* initially */
  overflow: hidden;
  height: 100vh;
  padding-left: 0; /* initially */
  border-left: 1px solid whitesmoke;
  background: white;
  z-index: 200;
}

.drawer-mask {
  position: absolute;
  right: 0;
  top: 0;
  width: 0; /* initially */
  height: 100vh;
  background: #000;
  opacity: 0.3;
  z-index: 199;
}
</style>
