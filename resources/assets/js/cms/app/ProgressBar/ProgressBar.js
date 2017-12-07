class ProgressBar {
    constructor(identifier, totalInputs) {

    }

    updateProgressbar() {
        // we reset the completed inputs
        this.completedInputs = 0;


        // we recount all the fields that are filled in 
        for(let attribute in this.completed) {
            if(this.completed[attribute]) {
                this.completedInputs++;
            }
        }

        // we calculate the percentage
        this.currentWidth = ((100 / this.totalInputs) * this.completedInputs) + '';
        // if the percentage is @ 0% we change it to 1%
        if(this.currentWidth === '0') {
            this.currentWidth = '1';
        }
    }


    resetProgressbar() {
        this.completed = {};
        this.completedInputs = 0;  
    }

    roundPercentage(percentage) {
        return Helper.roundPercentage(percentage) 
    }
}

export default ProgressBar;