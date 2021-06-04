function run() {
    new Vue({
      el: '#add',
      data: {
        id: '',
        message: '',
        sup: {}
      },
      created: function () {
      },
      methods: {
       add: function(){
            console.dir(this.sup);
            return axios.put('http://localhost:3000/sups', this.sup).then(
                (response) => {
                    this.message = response.data; // saved
                }
            );

        }
      }
    });
  }
  document.addEventListener('DOMContentLoaded', () => {
    run();
  });