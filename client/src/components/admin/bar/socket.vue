<template>
  <div class="text-center">
    <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="300"

        offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            color="dark"
            dark
            v-bind="attrs"
            v-on="on"
            @click="playSound"
        >
          <v-badge
              color="green"

          >
            <span slot="badge">{{count}}</span>
            <v-icon
                small
            >
              {{icons.mdiBellRing}}
            </v-icon>
          </v-badge>
        </v-btn>
      </template>

      <v-card >
        <v-list dense>

          <v-list-item
          >
            <v-list-item-title> Bildirimler</v-list-item-title>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list
            max-height="400px"
            class="overflow-y-auto"
        >

          <v-list-item-group
          >
            <v-list-item class="px-8 py-4 my-2" v-for="not in notifications" :key="not.not+Date.now()">
               <v-icon class="mr-6">
                 mdi-clock
            </v-icon>  <div v-html="not.not"></div>
            </v-list-item>
          </v-list-item-group>


        </v-list>

      </v-card>
    </v-menu>
  </div>
</template>

<script>
import { mdiBellRing } from '@mdi/js';
export default {
  name: "socket",
  data: () => ({
    icons:{
      mdiBellRing
    },
    menu: false,
    notifications:[],
    count:0
  }),
  methods: {
    playSound() {
      var audio = new Audio(require('../../../assets/pristine-609.mp3'));
      audio.play()
      audio.muted=true
      if(this.menu===false){
        this.notifications.forEach(not=>{
          if(not.read===0){
            not.read=1
          }
        })
        localStorage.setItem("notifications",JSON.stringify(this.notifications))
        this.countChange(this.notifications)

      }


      },
    playSoundNot() {
      var audio = new Audio(require('../../../assets/pristine-609.mp3'));
      console.log(audio)
      audio.play()
      audio.muted=false
    },
    countChange(array){
      let countArray= array.filter(not=>not.read===0)
      this.count=countArray.length
    }
  },
  created(){
    this.notifications=  localStorage.getItem("notifications")?JSON.parse(localStorage.getItem("notifications")):localStorage.setItem("notifications",JSON.stringify(this.notifications))
    const notRead=this.notifications.filter(not=>not.read===0)
    this.count=notRead.length
    this.sockets.subscribe('notifications', (not) => {
      console.log("geliyooo")
      this.notifications.unshift({not,read:0})
      localStorage.setItem("notifications",JSON.stringify(this.notifications))
      this.playSoundNot()
      this.notifications=JSON.parse(localStorage.getItem("notifications"))
      this.countChange(this.notifications)
    });
  }
}
</script>

<style scoped>

</style>