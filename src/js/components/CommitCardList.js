export class CommitCardList{
    constructor(container, cardsArray){
        this.container = container;
        this.cardsArray = cardsArray;
    }

    render(){
        this.cardsArray.forEach(item => {
            this.container.appendChild(item);
        })   
    }
}