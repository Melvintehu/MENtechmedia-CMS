import Model from '../../../models/Model';
import Validator from '../../../../app/Validator/Validator';
import File from './file';


class Folder extends Model {

    constructor(data = {}) {
        super(data);

        let folder = new Folder();
        folder.children().then((children) => {
            this.children = children;
        });
        
    }
    

    children() {
        return Folder.where([
            ['parent_id', '=', this.id],
        ]);
       }

    files() {

    }


}

export default Folder;