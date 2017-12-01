  /**
   * Use this class if you want to make call to the API
   * @type {API}
   */
  window.API = new class
  {
     constructor()
     {
        this.user_id = window.user_id;
        this.vue = new Vue();
        this.vue.data = {
           data: null,
        }
     }
     version()
     {
        return '/api/';
     }

     buildQueryString(parameters) {
      let data = "";

        for(let field in parameters) {
          data += field + '=' + parameters[field] + '&';
        }

        return data.substring(0, data.length - 1);
     }


 
  
      put(base, data){
        return new Promise((resolve, reject) => {
          window.axios.put(this.version() + base, data).then((response) => {
            resolve(response);
          }, reject);
        });
      }

    /**
     * Simple wrapper for vue delete request
     * @param  {[base]} api route
     * @param  {[id]} object id
     * @return {[void]}
     */
     delete(base, id) {
         window.axios.delete(this.version() + base + '/' + id,
         {}).then(function()
         {
            
         }, function()
         {
            
         });
      }
        /**
         * Deletes an object from an array, if the object exists in the database
         * a call to the api is made to delete that object in the database
         * @param  {[type]}  object  [ The object to delete ]
         * @param  {[type]}  array   [ The target array ]
         * @param  {String}  apiCall [ The call to the api (/users, /customers, /projects)]
         * @param  {Boolean} confirm [ Ask the user for confirmation ]
         * @return {[boolean]}          [Return a boolean if succeeded or not]
         */
     deleteObjectFrom(object, array, apiCall = '', confirm = true)
        {
           if (!Helper.hasProperty(object, 'id'))
           {
              Helper.removeFromArray(array, object);
              return false;
           }
           if (confirm == true)
           {
              this.vue.$confirm('Weet u zeker dat u dit wilt verwijderen?', 'Warning',
              {
                 confirmButtonText: 'OK',
                 cancelButtonText: 'Cancel',
                 type: 'warning'
              }).then(() =>
              {
                 Helper.removeFromArray(array, object);
                 API.delete(apiCall, object.id);
              }).catch(() =>
              {});
           }
           else
           {
              Helper.removeFromArray(array, object);
              API.delete(apiCall, object.id);
           }
        }
        /**
         * Simple wrapper for vue POST request.
         * @param  {[base]}
         * @return {[vue http request]}
         */
     post(base, parameters) {

         return new Promise((resolve, reject) => {
            parameters.user_id = this.user_id;

            window.axios.post(this.version() + base, parameters).then( (response) => {
                var data = response.data;
                resolve(data);

            }, reject);
         });

    }


        /**
         * Simple wrapper for vue get request.
         * @param  {[base]}
         * @return {[vue http request]}
         */
     get(base, parameters = {})
     {
        return new Promise((resolve, reject) => {
          window.axios.get(this.version() + base, parameters).then((response) => {
            resolve(response.data); 
          }, reject);
        }); 
     }
  }