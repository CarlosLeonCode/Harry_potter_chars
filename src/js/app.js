document.addEventListener('DOMContentLoaded', () => {
    try{
        const container = document.querySelector('.container-cards')

        function createCards(data){
            const wrapperNodes = document.createDocumentFragment()

            data.forEach( character => {
                const node = card(character)
                wrapperNodes.appendChild(node)
            });

            container.append(wrapperNodes)
        }
        // Fetchin data 
        fetch('https://hp-api.herokuapp.com/api/characters')
            .then(response => response.json())
            .then(data => createCards(data))
        
    }catch(err){
        console.error(err)
    }    
})

function card(data){
    // nodes 
    const card = document.createElement('div'),
          img = document.createElement('img'),
          card_body = document.createElement('div'),
          card_title = document.createElement('h5'),
          house = document.createElement('span'),
          role = document.createElement('span');
    
    // ! --- Card setup 
    card.classList.add('card','col-sm-4', 'col-md-6', 'm-5')

    // ! --- Image setup
    img.classList.add('custom-img')
    img.setAttribute('src', data.image)
    img.setAttribute('alt', `${data.name} - image`)

    // ! --- Card body setup
    card_body.classList.add('card-body')

    // ! --- Title setup
    card_title.classList.add('card-title', 'text-center')
    card_title.textContent = data.name

    // ! --- Details setup 
    house.classList.add('house-pill')
    house.textContent = data.house 
    // --
    role.classList.add('role-pill')

    if(data.hogwartsStudent){
        role.textContent = 'Student'
    }
    
    if(data.hogwartsStaff){
        role.textContent = 'Hogwarts staff'
    }
    
    // ! Building component 
    card_body.appendChild(card_title)
    card.append(img, card_body, house, role)

    // Response 
    return card
}