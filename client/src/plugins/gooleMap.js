import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyAdOxQ8xLbG4myEibquVReWi8yYdZ1YPUA',
        libraries: 'places',

    },
})