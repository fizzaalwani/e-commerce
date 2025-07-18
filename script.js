let arr=[1,2,3,4,5,6,7,8,9,10];
console.log(arr.includes(2))
let arr2=arr.filter((item,index)=>item%2===0
)
console.log(arr2); // Output: [2, 4, 6, 8, 10]
// let arr3=arr2.splice(0,3)
// console.log(arr3); // Output: [10]
let data=[];
// const favourites=[];
// const cart=[];


(async function getData(){
     try{
        let res=await fetch('https://fakestoreapi.com/products');
        data=await res.json();
        console.log(data);

        if (document.querySelector('.products')) {
            renderProducts(data);
        }
        
        if (document.querySelector('.table-body') && window.location.pathname.includes('cart.html')) {
            renderCartPage();
            removeItem();
        }
        
        if (document.querySelector('.table-body') && window.location.pathname.includes('favourites.html')) {
            renderFavPage();
            removeFavItem();
        }
       
    }catch(err){
        console.error("Error fetching data:", err);
    }  
    
})();

const renderProducts=(data)=>{
    const productContainer=document.querySelector('.products');
    if(productContainer){
           productContainer.innerHTML=''
    data.forEach((item)=>{
        const product=document.createElement('div');
        product.classList.add('product');
        product.innerHTML=`
            <div class="image">
                <img src=${item.image} alt="">
            </div>
            <div class="options">
            <ul>
            <li> <i class="fa-regular fa-heart"></i></li>
            <li> <i class="fa-solid fa-eye"></i></li>
            <li> <i class="fa-solid fa-cart-shopping"></i></li>
            </ul>
            </div>
          <div class="p-name">${item.category}</div>
          <div class="p-desc">${item.title}</div>
          <div class="p-rating">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
          </div>
          <div class="p-price" style="font-weight: 600;">$${item.price}</div>`
           productContainer.appendChild(product)
    })
    }
}

(function filterDataCategory(){
let categories=document.querySelectorAll('.category-container li')
console.log(categories)

categories.forEach((category,index)=>{
    category.addEventListener('click',()=>{
        // console.dir(category.outerText)

       if(category.outerText=="Home"){
          renderProducts(data)
       }
    else{
          let filteredData=data.filter((data,index)=>{
           return data.category.trim().toLowerCase()==category.outerText.trim().toLowerCase()
        })
        // console.log(filteredData)
        renderProducts(filteredData)
    } 
       
    })
})
})();

let product=document.querySelector('.products')
if(product){
product.addEventListener('click',(e)=>{
    if(e.target.tagName!== 'I')
        return

    if(e.target.tagName=='I'){
        // console.dir(e.target)
        // console.log(e.target.classList)
        const element=e.target;
        const productDiv=element.closest('.product');
        if(element.classList.contains('fa-cart-shopping')){
              const productToAdd=productDiv.querySelector('.p-desc').innerText;
              addToCart(productToAdd)
        }
        else if(element.classList.contains('fa-heart')){
             const productToAdd=productDiv.querySelector('.p-desc').innerText;
             addToFavourite(productToAdd)
        }
         else if(element.classList.contains('fa-eye')){
            const product=productDiv.querySelector('.p-desc').innerText;
            displayProductShort(product)
         }
        
    }
   
})
}




function addToCart(productTitle){

    let cart=getCart();
    
    existingProduct=cart.find((item)=> item.productTitle===productTitle)
    console.log(existingProduct)
    if(existingProduct){
       existingProduct.quantity+=1
    }
    else{
         let product={productTitle,quantity:1}
         cart.push(product)
    }
    localStorage.setItem("cart",JSON.stringify(cart))
     renderIcon("cart",'.cart-count')
}

function addToFavourite(productTitle){

    let favourites=getFavourites();
       existingProduct=favourites.find((item)=> item===productTitle)
    console.log(existingProduct)

    if(existingProduct){
       return
    }
    else{
        let product=productTitle
        favourites.push(product)
    }
    localStorage.setItem("favourites",JSON.stringify(favourites))
    renderIcon("favourites",'.heart-count')
}


function renderIcon(key,selector){
    let items=JSON.parse(localStorage.getItem(key)) || []
    console.log(items)
    document.querySelector(selector).innerText=items.length
}

renderIcon("cart",'.cart-count');
renderIcon("favourites",'.heart-count')

function displayProductShort(productTitle){

    // product.length=0;
    console.log('in display product')
      let product=data.filter((item,index)=>{
        return item.title.trim().toLowerCase()==productTitle.trim().toLowerCase()
      })
      console.log("Product to display ",product);

      document.querySelector('.shortCut img').setAttribute('src',product[0].image)
      closeSlide();

      
}
function closeSlide(){
    document.querySelector('.shortCut').classList.toggle('hidden')
}
function renderCartPage(){
    let subtotal=0;
    let i=0;
    let cart=getCart();
    const tableBody= document.querySelector('.table-body');
    if(!tableBody) return 
    tableBody.innerHTML=''
    console.log("Added to cart items :",cart)

    cart.forEach((cart)=>{
        const product=data.find((product)=> product.title.trim().toLowerCase()===cart.productTitle.trim().toLowerCase())
        if(product){
           
           i+=1;
           tableBody.innerHTML+=`
             <tr class='productDetails'>
        <td>${i}</td>
        <td><img src=${product.image} alt="Ring"></td>
        <td>${product.title}</td>
        <td>${product.price}</td>
        <td>${cart.quantity}</td>
        <td>$${cart.quantity*product.price}</td>
        <td><button class="remove-btn"><i class="fa-solid fa-xmark"></i></button></td>
      </tr>
           `
           subtotal+=cart.quantity*product.price
        }
    })

    document.querySelector('.subtotal').innerText=`$ ${subtotal}`
    document.querySelector('.total-price').innerText=`$ ${subtotal}`
    // removeItem();
};

function renderFavPage() {
  const favourites = getFavourites();
  const tableBody = document.querySelector('.table-body');
  if (!tableBody) return;
  tableBody.innerHTML = '';
  let i = 0;

  favourites.forEach((fav) => {
    const product = data.find(p => 
      p.title.trim().toLowerCase() === fav.trim().toLowerCase()
    );
    if (product) {
      i += 1;
      tableBody.innerHTML += `
        <tr class="productDetails">
          <td>${i}</td>
          <td><img src="${product.image}" alt="product image"></td>
          <td>${product.title}</td>
          <td>$${product.price}</td>
          <td><button class="remove-fav-btn"><i class="fa-solid fa-xmark"></i></button></td>
        </tr>
      `;
    }
  });
//   bindRemoveFromFavourites();
}



function removeItem(){
    
    let tableBody=document.querySelector('.table-body')
    tableBody.addEventListener('click',(e)=>{
        if(e.target.tagName!=='I')
            return;
    

        let parent=e.target.closest('.productDetails')
        if (!parent) return;
        let productTitle=parent.children[2].innerText;
        // let quantity=parent.children[4].innerText;


        let cart=getCart();
        cart=cart.filter((item)=>{
            return item.productTitle.trim().toLowerCase()!==productTitle.trim().toLowerCase()
        })
        console.log("Updated cart : ",cart)
        localStorage.setItem("cart",JSON.stringify(cart))

        renderCartPage();
        renderIcon("cart",'.cart-count');
    })
}
function removeFavItem(){
    
    let tableBody=document.querySelector('.table-body')
    tableBody.addEventListener('click',(e)=>{
        if(e.target.tagName!=='I')
            return;
    

        let parent=e.target.closest('.productDetails')
        if (!parent) return;
        let productTitle=parent.children[2].innerText;
        // let quantity=parent.children[4].innerText;


        let fav=getFavourites();
        fav=fav.filter((item)=>{
            return item.trim().toLowerCase()!==productTitle.trim().toLowerCase()
        })
        console.log("Updated fav : ",fav)
        localStorage.setItem("favourites",JSON.stringify(fav))

        renderFavPage();
        renderIcon("favourites",'.heart-count');
    })
}


//getters
function getCart(){
    return JSON.parse(localStorage.getItem("cart")) || []
}
function getFavourites(){
    return JSON.parse(localStorage.getItem("favourites")) || []
}

function clearCart(){
    let cart=getCart();
    if(!cart || cart.length==0){
       alert("Nothing in cart");
       return;
    }

    if(confirm("Are you sure you want to delete all cart items")){
         localStorage.removeItem("cart");
         renderCartPage();
         renderIcon('cart','.cart-count')
    }
}
function clearFav(){
    let fav=getFavourites();
    if(!fav || fav.length==0){
       alert("Nothing in cart");
       return;
    }

    if(confirm("Are you sure you want to delete all your Favourites")){
         localStorage.removeItem("favourites");
         renderFavPage();
        renderIcon("favourites",'.heart-count')
    }
    // let cart=getCart();
    // console.log(cart)
}


let clearCartBtn=document.querySelector('.clear-cart-btn')
if(clearCartBtn){
    clearCartBtn.addEventListener('click',()=>{
    clearCart();
    renderCartPage();
    renderIcon('cart','.heart-count')
})
}

let clearFavBtn=document.querySelector('.clear-fav-btn');
if(clearFavBtn){
    clearFavBtn.addEventListener('click',()=>{
    clearFav();
    renderFavPage();
    renderIcon('favourites','.heart-count');
})
}




