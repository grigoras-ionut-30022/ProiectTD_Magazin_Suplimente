function run() {
  let indexComponent = new Vue({
    el: '#app',
    data: {
      sups: [],
      supsService: null,
      message: ''
    },
    created: function () {
      this.supsService = sups();
      console.log(sups());
      this.supsService.get().then(response => (this.sups = response.data));
      console.log( this.sups );
    },
    methods: {
      deleteSup: function(id) {
        console.log('HTTP DELETE spre backend, sup: '+id);
        this.supsService.remove(id).then(response => {
          this.supsService.get().then(response => (this.sups = response.data));
        });
      },
    }
  });

//  indexComponent.use(VueMaterial);

}

document.addEventListener('DOMContentLoaded', () => {
  run();
});
