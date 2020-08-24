export class Statistics {
    constructor(request, cards, totalResults) {
        this.requets = request;
        this.cards = cards;
        this.totalResults = totalResults;
    }

    countMatchesInTitles() {
        let counter = 0;
        this.cards.forEach(element => {
            if (element.title.indexOf(this.requets) !== -1){
                counter++;
            }    
        });
        return counter;
    }

    calculateDailyAmount(date, daysBeforeRequest) {
        //console.log(date);
        //console.log(this.cards);
        date.setDate(date.getDate() - daysBeforeRequest);
        const titlesCountersArray = [];
        for (let i = 0; i < 7; i++) {
            let currentDate = new Date();
            //const countingDay = today.getDate() - daysBeforeRequest + i;
            currentDate.setDate(date.getDate() + i);
            //console.log(date);
            let number = currentDate.getMonth() + 1;
            if (number < 10 ) {
                number = '0' + number;
            }
            const dateString = `${currentDate.getFullYear()}-${number}-${currentDate.getDate()}`;
            let counter = 0;
            this.cards.forEach(element => {
                if (element.publishedAt.indexOf(dateString) !== -1) {
                    counter++;
                }
            })
            titlesCountersArray.push(counter);
        }
        return titlesCountersArray;
    }

    signDiagLines(elementArr, date){
        //console.log(date);
        //console.log(date.getDay());
        elementArr.forEach(element => {
            //const dayNumber = date.getDate();
            let dayName = date.getDay();
            //console.log(dayName);
            //console.log(dayNumber);
            //console.log(dayNameNumber);
            switch (dayName) {
                case 0: 
                    dayName = 'вс';
                    break;
                case 1: 
                    dayName = 'пн';
                    break;
                case 2: 
                    dayName = 'вт';
                    break; 
                case 3: 
                    dayName = 'ср';
                    break;
                case 4: 
                    dayName = 'чт';
                    break;
                case 5: 
                    dayName = 'пт';
                    break;
                case 6: 
                    dayName = 'сб';
                    break;       
            };
            element.textContent = `${date.getDate()}, ${dayName}`;
            date.setDate(date.getDate() + 1);
        }) 
    }

    renderDiagRows(elementsArr, statisticsArr) {
        elementsArr.forEach((element, index) => {
            element.style.width = `${statisticsArr[index] / this.totalResults * 100}%`;
        })
    }
}