import Vue from "vue";
import VueSocketIO from "vue-socket.io";
import * as io from "socket.io-client";
/*https://098.diciwall.com/api/*/
Vue.use(
    new VueSocketIO({
        debug: true,
        connection:io('https://098.diciwall.com/api/',{
            transports:["websocket"],
        }) ,

    })
);