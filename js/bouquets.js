const womanList = document.getElementById('womanList');

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
            "count": 1,
            "flor": e.dataset.flor,
            "wrapColor": e.dataset.wrapColor,
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
        "count": 1,
        "flor": e.dataset.flor,
        "wrapColor": e.dataset.wrapColor,
    });
    addStorage();
}

let loads = (filter) => {
    fetch('db/Bouquets.json')
        .then(response => { return response.json() })
        .then(data => {
            let countItem = 0;
            womanList.innerHTML = '';
            for (let i = 0; i < data.totalCount; i++) {
                item = data.item[i];
                if (item.flor.includes(filter[0]) && item.wrapColor.includes(filter[1])) {
                    womanList.innerHTML += `
                        <div class="section-card">
                            <img src="${item.img}" alt="">
                            <span>${item.prace} р</span>
                            <button data-id=${item.id} data-img="${item.img}" data-prace=${item.prace} data-category="bouquets" data-flor="${item.flor}" data-wrapColor="${item.wrapColor}" onclick="addToCart(this)">В корзину</button>
                        </div>
                    `;
                    countItem++;
                }
            }
            if(countItem == 0){
                womanList.innerHTML = `<h2 class="pustoList">Товаров с цветами - <span>${filter[0]}</span> и цветом обёртки - <span>${filter[1]}</span></h2>`;
            }
        })
}

let filter = (item) => {
    if(item.dataset.type == "flor"){
        document.getElementById('listFlor').querySelector('.active').classList = "item-sorted";
        selectFlor = item.innerHTML;
        item.classList += " active";
    };
    if(item.dataset.type == "color"){
        document.getElementById('listColor').querySelector('.active').classList = "item-sorted";
        selectColor = item.innerHTML;
        item.classList += " active";
    };
    loads([selectFlor, selectColor]);
}

fetch('db/categoryesj.json')
    .then(response => { return response.json() })
    .then(data => {
        selectFlor = data.flor[0];
        selectColor = data.wrapColor[0];
        data.flor.forEach(el => {
            document.getElementById('listFlor').innerHTML += `<span class="item-sorted" onclick="filter(this)" data-type="flor">${el}</span>`;
        })
        data.wrapColor.forEach(el => {
            document.getElementById('listColor').innerHTML += `<span class="item-sorted" onclick="filter(this)" data-type="color">${el}</span>`;
        })
        loads([selectFlor, selectColor]);
        document.querySelectorAll('.item-sorted').forEach(el => {
            if (el.innerHTML == selectFlor || el.innerHTML == selectColor) el.classList += " active";
        })
    })