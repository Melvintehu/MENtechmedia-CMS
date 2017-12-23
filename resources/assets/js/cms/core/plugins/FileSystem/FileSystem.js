import Plugin from '../Plugin';

class FileSystem extends Plugin {

    boot() {
        this.name = "Bestanden";
        this.entry = 'index';
        this.entryComponent = 'file-system';
        this.icon = "cloud_upload";
    }
    

}

export default FileSystem;