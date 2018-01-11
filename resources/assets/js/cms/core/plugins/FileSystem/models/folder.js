import Model from '../../../models/Model';
import Validator from '../../../../app/Validator/Validator';
import File from './file';


class Folder extends Model {

    constructor(data = {}) {
        super(data);
        
   
    }
    

    children() {
        return Factory.getStaticInstance('folder').where([
            ['id', '=', 1]
        ]);
    }

    files() {
        

    }

   

}

export default Folder;