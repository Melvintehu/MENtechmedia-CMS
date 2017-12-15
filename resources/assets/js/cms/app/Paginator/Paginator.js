class Paginator {
    
    constructor() {

    }

    /**
     * 
     * @param {*} amountPerPage, amount of records per page
     * @param {*} pageNumber, the page number that needs to be displayed
     * @param {*} data, the data that needs to be paginated
     * 
     */
    paginate(amountPerPage, pageNumber, data) {
        let startItemNumber = (amountPerPage * pageNumber) - amountPerPage;
        let paginatedData = data.slice(startItemNumber, startItemNumber + amountPerPage);
        this.broadcastChanges(paginatedData);
    }

    broadcastChanges(data) {
        Event.fire('paginator:changed', data);
    }
}
    
export default Paginator;