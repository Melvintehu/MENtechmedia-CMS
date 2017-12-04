class Search {

    constructor() {

    }

    /**
     * 
     * @param {*} searchValue the value to search for in the data. 
     * @param {*} data, the data to perform the search on.
     * @param {*} attributesToUse, the attributes of the data to search on.
     * 
     * The function skips the attributes that aren't included in the attributesToUse array|object 
     */
    find(searchValue, data, attributesToUse) {
        let results = [];

        for(let index in data) {
            for(let field in attributesToUse) {
                let record = data[index][field] + '';

                // implement a search function here that returns the new result set.
                if(_.includes(record.toLowerCase(), searchValue.toLowerCase())) {
                    results.push(data[index]);
                    break;
                }
                
            }
        } 
        
        return results;
    }

}

export default Search;