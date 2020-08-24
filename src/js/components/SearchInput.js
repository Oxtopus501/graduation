export class SearchInput {
    constructor(manageRequest) {
        this.manageRequest = manageRequest; 
    }

    validate(requestText) {
        if (requestText == ''){
            return true;
        }
    }

    setSubmitButtonState() {

    }

}