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
    createHtmlElement("h1", data.nomCommercial, div);
    createHtmlElement("p", data.phraseAccroche, div);
    createHtmlElement("button", data.texteAppelAction, header);
}

function initMain(data) {
    for (let i = 0; i < data.activites.length; i++) {
        let section = createHtmlElement("section", null, main);

        initActivity(data, i, section);

        initAvis(data, i, section)

    } 
}

function initActivity(data, i, parent) {
    let section = createHtmlElement("section", null, parent)
    section.className = "activity"
        createHtmlElement("p", data.avantagesClients[i], section);
        let div = createHtmlElement("div", null, section);
            createHtmlElement("img", data.activites[i]["image-url"], div);
            let innerDiv = createHtmlElement("div", null, div);
                createHtmlElement("h2", data.activites[i]["nom"], innerDiv);
                createHtmlElement("p", data.activites[i]["description"], innerDiv);
                createHtmlElement("button", data.texteAppelAction, innerDiv);
            
}

function initAvis(data, i, parent) {
    let section = createHtmlElement("section", null, parent);
    section.className = "avis"
        let div = createHtmlElement("div", null, section);
            createHtmlElement("h3", data.temoignages[i]["prenom"], div);
            createHtmlElement("p", `Note : ${data.temoignages[i]["note"]}/5`, div);
        createHtmlElement("p", data.temoignages[i]["typeExperience"], section);
        createHtmlElement("p", data.temoignages[i]["commentaire"], section);
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