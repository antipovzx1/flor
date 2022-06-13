let btnCart = document.getElementById('button-cart-panel');
let cartPanel = document.createElement("div");

let cartArrr = [];

let loadArrStorage = () =>{
    if(JSON.parse(localStorage.getItem('cart'))) cartArrr = JSON.parse(localStorage.getItem('cart'));
    else cartArrr = [];
}

let addStorages = () => {
    localStorage.setItem('cart', JSON.stringify(cartArrr));
    cartArrr = JSON.parse(localStorage.getItem('cart'));
}

let plusCartItem = (item) => {
    loadArrStorage();
    document.getElementById(`${item.dataset.id}`).innerHTML = Number(document.getElementById(String(item.dataset.id)).innerHTML) + 1;
    cartArrr.forEach(el => {
        if (el.id == item.dataset.id && el.category == item.dataset.category) {
            el.count++;
            addStorages();
            rendercCart();
            return;
        }
    });
    document.getElementById(`${item.dataset.id} ${item.dataset.category}`).innerHTML = item.dataset.prace * Number(document.getElementById(`${item.dataset.id}`).innerHTML) + ' p';
}
let minusCartItem = (item) => {
    loadArrStorage();
    if (Number(document.getElementById(`${item.dataset.id}`).innerHTML) > 1) {
        document.getElementById(`${item.dataset.id}`).innerHTML = Number(document.getElementById(String(item.dataset.id)).innerHTML) - 1;
        cartArrr.forEach(el => {
            if (el.id == item.dataset.id && el.category == item.dataset.category) {
                el.count--;
                addStorages();
                rendercCart();
                return;
            }
        });
        document.getElementById(`${item.dataset.id} ${item.dataset.category}`).innerHTML = item.dataset.prace * Number(document.getElementById(`${item.dataset.id}`).innerHTML) + ' p';
    }
}
let dellCartItem = (item) => {
    loadArrStorage();
    for (let o = 0; o <= cartArrr.length; o++) {
        if (cartArrr[o].id == item.dataset.id && cartArrr[o].category == item.dataset.category) {
            cartArrr.splice(o, 1);
            for (let t = 0; t <= cartArr.length-1; t++){
                if (cartArr[t].id == item.dataset.id && cartArr[t].category == item.dataset.category){
                    cartArr.splice(t, 1);
                }
            }
            addStorages();
            rendercCart();
            return;
        }
    }
}

let rendercCart = () => {
    cartPanel.classList = "cart-wrapper";
    cartPanel.id = "cartPanelShow";

    cartPanel.innerHTML = `
        <div class="shopping-cart">
            <div class="title-card">
                <div class="title">Корзина</div>
                <input type="button" class="sell-btn"value="Оформить">
                <button class="del-btn exit-btn" id="exitBtnCart">x</button>
            </div>
            <div id="cardItemList"></div>
        </div>
    `;

    document.body.appendChild(cartPanel);

    document.getElementById('cardItemList').innerHTML = '';

    if( JSON.parse(localStorage.getItem('cart')) != null ){
        if(JSON.parse(localStorage.getItem('cart')).length != 0){
            JSON.parse(localStorage.getItem('cart')).forEach(el => {
                document.getElementById('cardItemList').innerHTML += `
                    <hr>
                    <div class="item">
                        <div class="image">
                            <img src="${el.img}" alt="" />
                        </div>
                        <div class="description">
                            <span>${el.prace} р</span>
                        </div>
                        <div class="quantity">
                            <button class="plus-btn" type="button" name="button" onclick="plusCartItem(this)" data-id="${el.id}" data-prace="${el.prace}" data-category="${el.category}">+</button>
                            <span id="${el.id}">${el.count}</span>
                            <button class="minus-btn" type="button" name="button" onclick="minusCartItem(this)" data-id="${el.id}" data-prace="${el.prace}" data-category="${el.category}">-</button>
                        </div>
                        <div class="total-price" id="${el.id} ${el.category}">${el.prace * el.count} p</div>
                        <button class="del-btn" onclick="dellCartItem(this)" data-id="${el.id}" data-category="${el.category}">x</button>    
                    </div>
                `;
            });
        } else{
            document.getElementById('cardItemList').innerHTML = '<h2 class="cart-pusto">Здесь пока нет товаров!</h2>';
        }
    }else{
        document.getElementById('cardItemList').innerHTML = '<h2 class="cart-pusto">Здесь пока нет товаров!</h2>';
    }
    
    document.getElementById('exitBtnCart').addEventListener('click', e => {
        cartPanel.remove();
    });
}

btnCart.addEventListener('click', e => {
    e.preventDefault();
    rendercCart();
});
