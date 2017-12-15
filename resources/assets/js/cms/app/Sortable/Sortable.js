class Sortable {

    types() {
        return {
            alphabetical: [
                'A-Z',
                'Z-A',
            ],
            numerical: [
                'Laag - Hoog',
                'Hoog - Laag',
            ],
            date: [
                'Oud - Nieuw',
                'Nieuw - Oud',
            ],
            time: [
                'Begin - Eind',
                'Eind - Begin',
            ],
        };
    }

    constructor() {
        this.selectedSortType = null;
        this.options = [];

        this.types = getTypes();
    }

    findSortableOptions(object) {
        for(let index in object) {
            let attribute = object[index];

            if(attribute.sortBy !== undefined && this.types[attribute.sortBy] !== undefined) {
                this.options.push(this.types[attribute.sortBy]);
            }

        }
    }

    sort() {
        // implement sort function
        this.broadCastChanges(data);
    }

    broadCastChanges(data) {
        Event.fire('sortable:changed', data);
    }

}

export default Sortable;