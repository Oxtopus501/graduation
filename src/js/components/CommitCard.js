export class CommitCard{
    constructor(name, email, date, message, avatarUrl){
        this.name = name;
        this.email = email;
        this.date = date;
        this.message = message;
        this.avatarUrl = avatarUrl;
    }
    create() {
        let month = this.date.slice(5,7);
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
        let day = this.date.slice(8,10);
        if (day[0] == '0') {
            day = day.slice(1);
        }
        
        const cardElement = document.createElement('li');
        cardElement.classList.add('commit-card');
        cardElement.classList.add('swiper-slide');

        const cardDate = document.createElement('p');
        cardDate.classList.add('commit-card__date');
        cardDate.textContent = `${day} ${month} ${this.date.slice(0,4)}`;
        //cardDate.textContent = this.date;
        cardElement.appendChild(cardDate);

        const cardAuthor = document.createElement('div');
        cardAuthor.classList.add('commit-card__author');

        const cardAuthorAvatar = document.createElement('div');
        cardAuthorAvatar.classList.add('commit-card__author-avatar');
        cardAuthorAvatar.style.background = `center/cover url(${this.avatarUrl})`;
        cardAuthor.appendChild(cardAuthorAvatar);

        const cardAuthorContacts = document.createElement('div');
        cardAuthorContacts.classList.add('commit-card__author-contacts');

        const cardAuthorName = document.createElement('h3');
        cardAuthorName.classList.add('commit-card__author-name');
        cardAuthorName.textContent = this.name;
        cardAuthorContacts.appendChild(cardAuthorName);

        const cardAuthorEmail = document.createElement('p');
        cardAuthorEmail.classList.add('commit-card__author-e-mail');
        cardAuthorEmail.textContent = this.email;
        cardAuthorContacts.appendChild(cardAuthorEmail);
        
        cardAuthor.appendChild(cardAuthorContacts);
        cardElement.appendChild(cardAuthor);

        const cardText = document.createElement('p');
        cardText.classList.add('commit-card__text');
        cardText.textContent = this.message;
        cardElement.appendChild(cardText);

        //container.appendChild(cardElement);
        return cardElement;
    }
}