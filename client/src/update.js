function run() {
    new Vue({
      el: '#update',
      data: {
        id: '',
        message: '',
        sup: {}
      },
      created: function () {

        let uri = window.location.search.substring(1);
        let params = new URLSearchParams(uri);
        this.id = params.get("id");

        axios.get('http://localhost:3000/sups/'+this.id).then(
            (response) => {
                this.sup = response.data;
            }
        );
      },
      methods: {
        update: function(){
            console.dir(this.sup);

            return axios.post('http://localhost:3000/sups', this.sup).then(
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
  