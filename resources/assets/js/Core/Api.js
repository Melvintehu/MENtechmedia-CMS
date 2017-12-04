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
          console.log(parameters[field]);
          data += field + '=' + parameters[field] + '&';
        }

        return data.substring(0, data.length - 1);
     }

     headers()
     {
        var headers = {
           'Authorization': 'Bearer ' + Laravel.user.api_token,
           'X-CSRF-TOKEN': Laravel.csrfToken
        }
        return headers;
     }
     removeFile(id)
     {
        console.log('removeFile', id);
        this.delete('upload', id);
     }
     uploadURL()
        {
           return 'upload';
        }
        /**
         * Simple wrapper for vue upload
         */
     uploadImage(base, $parameters)
     {
        return window.axios.post(this.uploadURL, $parameters).then(function(response) {});
     }
     put(base, data, success, failure = null)
        {
           return window.axios.put(this.version() + base, data).then((response) =>
           {
              success(response);
           }, failure);
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
     post(base, parameters, success, failure = null ) {

        parameters.user_id = this.user_id;

        return window.axios.post(this.version() + base, parameters).then(function(response) {
          var data = response.data;
          success(data);

        }, failure);
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