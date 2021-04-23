<template>
  <AdminNav />

  <div class="dash">
    <div class="list">
      <span>
        <router-link to="/created" class="btn-primary"> Created </router-link>
      </span>
    </div>
    <div class="data">
      <div class="card" style="width: 10rem" v-for="(item,index) in contact" :key="index" >
        <img class="card-img-top" :src="img" />
        <div class="card-body">
          <h5 class="card-title">{{item.firstName}} - {{item.lastName}} </h5>
          <p class="card-text">
           <ul>
             <li> Email : {{item.email}}</li>
             <li> Company : {{item.company}} </li>
             <li> Telephone : {{item.phone}} </li>
           </ul>
          </p>
          <a class="btn btn-primary">Details</a>
        </div>
      </div>
    </div>
  </div>
  <router-view />
</template>
<script>
import { onMounted } from '@vue/runtime-core';
import AdminNav from '../components/AdminNav.vue';
//import axios from "axios";
import {GET_DATA} from '../store/actions/actions';
export default {
  components: { AdminNav },

  name: "Dashboard",
  data() {
    return {
      img: require('../assets/contact.png'),
      contact: [],
      data: {},
    
    };
  },
  setup() {
    
    onMounted(()=>{
      this.load();
      console.log(this.contact)
    })
  },
  methods: {
  
    load: function () {
        this.$store.dispatch(GET_DATA)
        .then((resp) => {
          this.contact = resp.data;
          console.log(resp);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.dash {
  position: absolute;
  top: 25%;
  left: 20%;
}
.list span {
  color: white;
  text-decoration: none;
  padding-top: 10px;
}
</style>
