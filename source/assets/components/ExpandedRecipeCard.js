class RecipeCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' })
    }

    set data(data) {
        if (!data) return

        const styleElem = document.createElement('style')
        const styles = `
            * {
                font-family: 'Inter', sans-serif;
                margin: 0;
            }

            article {
                width: 340px;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                background-color: #fff;
                overflow-x: hidden;
                border-radius: 12px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.10);
            }

            article > img {
                object-fit: cover;
                width: 100%;
                height: 80px;
            }

            .wrapper {
                width: 90%;
                padding: 12px 16px;
                display: flex;
                justify-content: space-between;
            }

            .wrapper-left > p {
                font-style: italic;
                font-size: 18px;
                font-weight: 300;
                padding: 6px 0;
            }

            .wrapper-right {
                display: flex;
                flex-direction: column;
                align-items: flex-end;
            }

            .level {
                color: #fff;
                padding: 4px 9px;
                border-radius: 50%;
                font-weight: 500;
                font-size: 18px;
                margin-bottom: 4px;
            }

            .level-1 {
                background-color: #5EAF70;
            }

            .level-2 {
                background-color: #F4BA26;
            }

            .level-3 {
                background-color: #EC8A53;
            }


            .level-4 {
                background-color: #EC5353;
            }


            .points-1 {
                color: #5EAF70;
            }

            .points-2 {
                color: #F4BA26;
            }

            .points-3 {
                color: #EC8A53;
            }


            .points-4 {
                color: #EC5353;
            }

            .tags__wrapper > span {
                font-size: 9px;
                font-weight: 500;
                color: #EC8A53;
                background-color: #FFEBE0;
                padding: 3px 5px;
                margin: 0 4px 4px 0;
                border-radius: 6px;
                border: 1px solid #EC8A53
            }

            .tags__wrapper {
                display: flex;
                flex-wrap: wrap;
            }

        `
        styleElem.innerHTML = styles;

        this.json = data;
        const card = document.createElement('article');

        const image = document.createElement('img');
        image.src = "assets/images/default.png"
        image.alt = "Image Title"

        const wrapper = document.createElement('div');
        wrapper.classList.add("wrapper");

        const wrapperLeft = document.createElement('div');
        wrapperLeft.classList.add("wrapper-left");

        const wrapperRight = document.createElement('div');
        wrapperRight.classList.add("wrapper-right");

        const title = document.createElement('p');
        const titleLink = document.createElement('a');
        titleLink.textContent = "Recipe Name";

        title.appendChild(titleLink)

        const tagWrapper = document.createElement('div');
        tagWrapper.classList.add("tags__wrapper")
        
        const tags = ["NUT-FREE", "SHELLFISH-FREE"]
        tags.forEach((tagName) => {
            const tag = document.createElement('span');
            tag.textContent = tagName
            tagWrapper.appendChild(tag);
        })

        const level = document.createElement('span');
        const setLevel = 'easy';
        let numLevel;
        switch (setLevel) {
            case 'easy':
                numLevel = 1;
                break;
            case 'medium':
                numLevel = 2;
                break;
            case 'hard':
                numLevel = 3;
                break;
            case 'very hard':
                numLevel = 4;
                break;
            default:
                break;
        }
        level.textContent = numLevel;
        level.classList.add(`level`);
        level.classList.add(`level-${numLevel}`);

        const points = document.createElement('span');
        points.classList.add("points");
        points.classList.add(`points-${numLevel}`);
        points.textContent = `43 points`;

        wrapperLeft.appendChild(title);
        wrapperLeft.appendChild(tagWrapper);
        wrapperRight.appendChild(level);
        wrapperRight.appendChild(points);

        wrapper.appendChild(wrapperLeft);
        wrapper.appendChild(wrapperRight);

        card.appendChild(image);
        card.appendChild(wrapper);
        
    
        this.shadowRoot.append(styleElem, card)
    }

    get data() {
        return this.json;
    }
}

customElements.define('expanded-recipe-card', RecipeCard)