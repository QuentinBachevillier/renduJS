fetch('https://js-dynamic-portfolio-data-makerslab-emlyon-cdweb-8f83155c64a0cc.gitlab.io/json/escape-game.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to load JSON data');
        }
        return response.json();
    })
    .then(data => {
       //ici vous ecrivez votre code
        initPage(data);
       
       console.log(data); 
    })
    .catch(error => console.error('Error:', error));


let header = document.getElementsByTagName("header")[0];
let main = document.getElementsByTagName("main")[0];   


function initPage(data) {
    initHeader(data);
    initMain(data);
}

function initHeader(data) {

    let div = createHtmlElement("div", null, header);
        let sousDiv = createHtmlElement("div", null, div);
            createHtmlElement("h1", data.nomCommercial, sousDiv);
            createHtmlElement("p", data.phraseAccroche, sousDiv);
        createHtmlElement("button", data.texteAppelAction, div);
}

function initMain(data) {
    for (let i = 0; i < data.activites.length; i++) {
        let avClients = createHtmlElement("p", data.avantagesClients[i], main);
        avClients.className = "avClients"
        switch (i) {
            case 0:
                avClients.id = "manoir";
                break;
            case 1:
                avClients.id = "espace";
                break;
            case 2:
                avClients.id = "paris";
                break;
            default:
                break;
        }

        let section = createHtmlElement("section", null, main);
        

        initActivity(data, i, section);

        initAvis(data, i, section)

    } 
}

function initActivity(data, i, parent) {
    let section = createHtmlElement("section", null, parent);
    section.className = "activity";
        createHtmlElement("img", data.activites[i]["image-url"], section);
        let Div = createHtmlElement("div", null, section);
            createHtmlElement("h2", data.activites[i]["nom"], Div);
            createHtmlElement("p", data.activites[i]["description"], Div);
            createHtmlElement("button", data.texteAppelAction, Div);
        
}

function initAvis(data, i, parent) {
    let section = createHtmlElement("section", null, parent);
    section.className = "avis"
        let div = createHtmlElement("div", null, section);
            createHtmlElement("h2", data.temoignages[i]["prenom"], div);
            let note = createHtmlElement("p", `Note : ${data.temoignages[i]["note"]}/5`, div);
            note.className = "note"
        let commentDiv = createHtmlElement("div", null, section);
        commentDiv.className = "comment"
            createHtmlElement("h3", data.temoignages[i]["typeExperience"], commentDiv);
            createHtmlElement("p", data.temoignages[i]["commentaire"], commentDiv);
}

function createHtmlElement(element, content, parent) {
    let htmlElement = document.createElement(element);
    if (element === "img") {
        htmlElement.src = content;
    }
    else {
        htmlElement.textContent = content;
    }
    parent.appendChild(htmlElement);
    return htmlElement;
}

