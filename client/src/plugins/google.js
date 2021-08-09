import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyDsYFGBdd9wFaBi81T09no5-4UkYHn36CM',
        libraries: 'places',

    },
})
