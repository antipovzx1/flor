const womanList = document.getElementById('manList');

let cartArr;
let selectFlor = "";
let selectColor = "";

if (JSON.parse(localStorage.getItem('cart'))) {
    cartArr = JSON.parse(localStorage.getItem('cart'));
} else {
    cartArr = [];
}

let addStorage = () => {
    localStorage.setItem('cart', JSON.stringify(cartArr));
    cartArr = JSON.parse(localStorage.getItem('cart'));
}



let addToCart = (e) => {
    if (cartArr.length == 0) {
        cartArr.push({
            "id": e.dataset.id,
            "img": e.dataset.img,
            "category": e.dataset.category,
            "prace": e.dataset.prace,
            "count": 1
        });
        addStorage();
        return;
    }
    for (let i = 1; i <= cartArr.length; i++) {
        if (cartArr[i - 1].id == e.dataset.id && cartArr[i - 1].category == e.dataset.category) {
            cartArr[i - 1].count++;
            addStorage();
            return;
        }
    }
    cartArr.push({
        "id": e.dataset.id,
        "img": e.dataset.img,
        "category": e.dataset.category,
        "prace": e.dataset.prace,
        "count": 1
    });
    addStorage();
}


fetch('db/pottedPlants.json')
    .then(response => { return response.json() })
    .then(data => {
        let countItem = 0;
        womanList.innerHTML = '';
        for (let i = 0; i < data.totalCount; i++) {
            item = data.item[i];
            womanList.innerHTML += `
                        <div class="section-card">
                            <img src="${item.img}" alt="">
                            <span>${item.prace} р</span>
                            <button data-id=${item.id} data-img="${item.img}" data-prace=${item.prace} data-category="pottedPlants" onclick="addToCart(this)">В корзину</button>
                        </div>
                    `;
            countItem++;
        }
        if (countItem == 0) {
            womanList.innerHTML = `<h2 class="pustoList">Товаров этой категории нету!</span></h2>`;
        }
    })
