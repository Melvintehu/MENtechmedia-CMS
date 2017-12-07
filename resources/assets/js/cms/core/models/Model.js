import Validator from '../../app/Validator/Validator';
import WalkThrough from '../../app/WalkThrough/WalkThrough';

class Model {

    constructor(data) {
        this.relations = {};
        _.each(data, (value, attribute) => {
            this[attribute] = value;
        });
    }

    data() {
        return Object.assign({}, this);
    }

    static all() {

        // TODO : throw an exception if Factory.className is undefined
        return new Promise((resolve, reject) => {
            
            let className = Factory.classNames.shift();

            API.get(className).then((objects) => {

                resolve(
                    _.map(objects, (object) => {
                        return Factory.getInstanceOf(className, object);
                    })
                );
            }, reject);

        });
    }

    static find(id) {        
        // TODO : throw an exception if Factory.className is undefined
        return new Promise((resolve, reject) => {
            
            let className = Factory.classNames.shift();
            API.get(`${className}/${id}/edit`).then((data) => {
                 resolve(Factory.getInstanceOf(className, data));
            }, reject);
        });
    }


    static where(parameters) {
        // TODO : throw an exception if Factory.className is undefined
        return new Promise((resolve, reject) => {
            let className = Factory.classNames.shift();

            let data = API.buildQueryString(parameters);
            API.get(`${className}/where?` + data).then((objects) => {
                resolve(
                    _.map(objects, (object) => {
                        return Factory.getInstanceOf(className, object);
                    })
                );
            }, reject);

            });
    }

    save() {
        return new Promise((resolve, reject) => {
            API.post(this.constructor.name.toLowerCase(), this.data()).then((data) => {
                resolve(data);
            }, reject);
        });
    }

    update() {
        return new Promise((resolve, reject) => {
            API.put(`${this.constructor.name.toLowerCase()}/` + this.id, this.data()).then((data) => {
                resolve(data);
            }, reject);
        });
    }

    delete(className, success) {
        API.delete(className.toLowerCase(), this.id);
        success();
    }

    belongsToMany(relation) {

        return new Promise((resolve, reject) => {
            
            let className = this.constructor.name.toLowerCase();
            let parameters = {};

            parameters['relation'] = relation;
            parameters['id'] = this.id;
            let data = API.buildQueryString(parameters);    
             API.get(`${className}/belongsToMany?` + data).then((objects) => {
                resolve(
                    _.map(objects, (object) => {
                        return Factory.getInstanceOf(Factory.className, object);
                    })
                );
            }, reject);

          

        });
    }

    belongsTo(relation) {
        return new Promise((resolve, reject) => {

            let className = this.constructor.name.toLowerCase();
            Factory.getStaticInstance(relation.toLowerCase())
                    .find(relation.toLowerCase(), this[relation.toLowerCase() + '_id'])
                    .then((data) => {
                    resolve(data);
            });
        });
    }

    hasMany(relation) {
        return new Promise((resolve, reject) => {
            let className = this.constructor.name.toLowerCase();
            let parameters = {};

            parameters[className + '_id'] = this.id;

            Factory.getStaticInstance(relation.toLowerCase())
                    .where(relation.toLowerCase(), parameters)
                    .then((data) => {
                    resolve(data);
            });
        });
    }



}

export default Model;

