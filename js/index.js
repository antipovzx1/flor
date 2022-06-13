const womanList = document.getElementById('womanList');
const manList = document.getElementById('manList');
const itemList = document.getElementById('itemList');
const swadbaList = document.getElementById('swadbaList');
const foodList = document.getElementById('foodList');
const decorationList = document.getElementById('decorationList');

let cartArr = [];

let loadArrStorageIndex = () =>{
    if(JSON.parse(localStorage.getItem('cart'))) cartArr = JSON.parse(localStorage.getItem('cart'));
    else cartArr = [];
}

let addStorage = () => {
    localStorage.setItem('cart', JSON.stringify(cartArr));
    cartArr = JSON.parse(localStorage.getItem('cart'));
}



let addToCart = (e) => {
    loadArrStorageIndex();
    if(cartArr.length == 0){
        cartArr.push({
            "id":e.dataset.id,
            "img":e.dataset.img,
            "category":e.dataset.category,
            "prace": e.dataset.prace,
            "count": 1
        });
        addStorage();
        return;
    }
    for(let i = 1; i <= cartArr.length; i++){
        if(cartArr[i-1].id==e.dataset.id && cartArr[i-1].category==e.dataset.category){
            cartArr[i-1].count++;
            addStorage();
            return;   
        }
    }
    cartArr.push({
        "id":e.dataset.id,
        "img":e.dataset.img,
        "category":e.dataset.category,
        "prace": e.dataset.prace,
        "count": 1
    });
    addStorage();
}

fetch('db/Bouquets.json')
.then(response=>{return response.json()})
.then(data=>{
    womanList.innerHTML = ''; 
    for(i=0;i<4;i++){
        item = data.item[i];
        womanList.innerHTML += `
            <div class="section-card">
                <img src="${item.img}" alt="">
                <span>${item.prace} р</span>
                <button data-id=${item.id} data-img="${item.img}" data-prace=${item.prace} data-category="bouquets" onclick="addToCart(this)">В корзину</button>
            </div>
        `;
    }
})

fetch('db/Compositions.json')
.then(response=>{return response.json()})
.then(data=>{
    manList.innerHTML = '';
    for(i=0;i<4;i++){
        item = data.item[i];
        manList.innerHTML += `
            <div class="section-card">
                <img src="${item.img}" alt="">
                <span>${item.prace} р</span>
                <button data-id=${item.id} data-img="${item.img}" data-prace=${item.prace} data-category="compositions" onclick="addToCart(this)">В корзину</button>
            </div>
        `;
    }
})

fetch('db/pottedPlants.json')
.then(response=>{return response.json()})
.then(data=>{
    itemList.innerHTML = '';
    for(i=0;i<4;i++){
        item = data.item[i];
        itemList.innerHTML += `
            <div class="section-card">
                <img src="${item.img}" alt="">
                <span>${item.prace} р</span>
                <button data-id=${item.id} data-img="${item.img}" data-prace=${item.prace} data-category="pottedPlants" onclick="addToCart(this)">В корзину</button>
            </div>
        `;
    }
})

fetch('db/swadba.json')
.then(response=>{return response.json()})
.then(data=>{
    swadbaList.innerHTML = '';
    for(i=0;i<4;i++){
        item = data.item[i];
        swadbaList.innerHTML += `
            <div class="section-card">
                <img src="${item.img}" alt="">
                <span>${item.prace} р</span>
                <button data-id=${item.id} data-img="${item.img}" data-prace=${item.prace} data-category="pottedPlants" onclick="addToCart(this)">В корзину</button>
            </div>
        `;
    }
})

fetch('db/food.json')
.then(response=>{return response.json()})
.then(data=>{
    foodList.innerHTML = '';
    for(i=0;i<4;i++){
        item = data.item[i];
        foodList.innerHTML += `
            <div class="section-card">
                <img src="${item.img}" alt="">
                <span>${item.prace} р</span>
                <button data-id=${item.id} data-img="${item.img}" data-prace=${item.prace} data-category="pottedPlants" onclick="addToCart(this)">В корзину</button>
            </div>
        `;
    }
})

fetch('db/decoration.json')
.then(response=>{return response.json()})
.then(data=>{
    decorationList.innerHTML = '';
    for(i=0;i<4;i++){
        item = data.item[i];
        decorationList.innerHTML += `
            <div class="section-card">
                <img src="${item.img}" alt="">
                <span>${item.prace} р</span>
                <button data-id=${item.id} data-img="${item.img}" data-prace=${item.prace} data-category="pottedPlants" onclick="addToCart(this)">В корзину</button>
            </div>
        `;
    }
})