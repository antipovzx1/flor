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
            "count": 1,
            "flor": e.dataset.flor
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
        "flor": e.dataset.flor
    });
    addStorage();
}

let loads = (filter) => {
    fetch('db/swadba.json')
        .then(response => { return response.json() })
        .then(data => {
            let countItem = 0;
            womanList.innerHTML = '';
            for (let i = 0; i < data.totalCount; i++) {
                item = data.item[i];
                if (item.flor.includes(filter)) {
                    womanList.innerHTML += `
                        <div class="section-card">
                            <img src="${item.img}" alt="">
                            <span>${item.prace} р</span>
                            <button data-id=${item.id} data-img="${item.img}" data-prace=${item.prace} data-category="swadba" data-flor="${item.flor}"" onclick="addToCart(this)">В корзину</button>
                        </div>
                    `;
                    countItem++;
                }
            }
            if(countItem == 0){
                womanList.innerHTML = `<h2 class="pustoList">Товаров с цветами - <span>${filter}</span></span></h2>`;
            }
        })
}

let filter = (item) => {
    if(item.dataset.type == "flor"){
        document.getElementById('listFlor').querySelector('.active').classList = "item-sorted";
        selectFlor = item.innerHTML;
        item.classList += " active";
    };
    loads(selectFlor);
}

fetch('db/categoryesj.json')
    .then(response => { return response.json() })
    .then(data => {
        selectFlor = data.flor[0];
        data.flor.forEach(el => {
            document.getElementById('listFlor').innerHTML += `<span class="item-sorted" onclick="filter(this)" data-type="flor">${el}</span>`;
        })
        loads(selectFlor);
        document.querySelectorAll('.item-sorted').forEach(el => {
            if (el.innerHTML == selectFlor) el.classList += " active";
        })
    })