export class NewsCard {
    constructor(source, title, publishedAt, description, imageUrl, url) {
        this.source = source;
        this.title = title;
        this.publishedAt = publishedAt;
        this.description = description;
        this.imageUrl = imageUrl;
        this.url = url;
    }
    
    create() {
        let month = this.publishedAt.slice(5,7);
        switch (month) {
            case '01':
                month = 'января'
                break;
            case '02':
                month = 'февраля'
                break;    
            case '03':
                month = 'марта'
                break;
            case '04':
                month = 'апреля'
                break;
            case '05':
                month = 'мая'
                break;  
            case '06':
                month = 'июня'
                break;    
            case '07':
                month = 'июля'
                break;
            case '08':
                month = 'августа'
                break;  
            case '09':
                month = 'сентября'
                break;
            case '10':
                month = 'октября'
                break;
            case '11':
                month = 'ноября'
                break;
            case '12':
                month = 'декабря'
                break;
        };

        const cardElement = document.createElement('div');
        cardElement.classList.add('card');

        const cardImageContainer = document.createElement('div');
        cardImageContainer.classList.add('card__image-container');

        const cardImage = document.createElement('img');
        cardImage.classList.add('card__image');
        cardImage.src = this.imageUrl;
        cardImage.alt = this.title;
        cardImageContainer.appendChild(cardImage);
        cardElement.appendChild(cardImageContainer);

        const cardTextContainer = document.createElement('div');
        cardTextContainer.classList.add('card__text-container');

        const cardDate = document.createElement('div');
        cardDate.classList.add('card__date');
        cardDate.textContent = `${this.publishedAt.slice(8,10)} ${month} ${this.publishedAt.slice(0,4)}`;
        cardTextContainer.appendChild(cardDate);

        const cardArticle = document.createElement('div');
        cardArticle.classList.add('card__article');
        
        const cardTitle = document.createElement('div');
        cardTitle.classList.add('card__title');
        cardTitle.textContent = this.title;
        cardArticle.appendChild(cardTitle);

        const cardText = document.createElement('p');
        cardText.classList.add('card__text');
        cardText.textContent = this.description;
        cardArticle.appendChild(cardText);

        cardTextContainer.appendChild(cardArticle);
        

        const cardSource = document.createElement('div');
        cardSource.classList.add('card__source');
        cardSource.textContent = this.source.name;
        cardTextContainer.appendChild(cardSource);

        cardElement.addEventListener('click', () => {
            window.open(this.url);
        })

        cardElement.appendChild(cardTextContainer);

        

        return cardElement;
    }

}


/*newsCard.addEventListener('click', function(){
            window.open(`${item.url}`);
        })*/