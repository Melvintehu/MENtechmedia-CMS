import Plugin from '../Plugin';

class NewsLetter extends Plugin {

    boot() {
        this.name = "Nieuwsbrieven";
        this.entry = 'index';
        this.entryComponent = 'newsletter-menu';
        this.icon = "mail";
    }
    

}

export default NewsLetter;