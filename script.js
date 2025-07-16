// let arr=[1,2,3,4,5,6,7,8,9,10];
// console.log(arr.includes(2))
// let arr2=arr.filter((item,index)=>item%2===0
// )
// console.log(arr2); // Output: [2, 4, 6, 8, 10]
// let arr3=arr2.splice(0,3)
// console.log(arr3); // Output: [10]
let data=[];
const favourites=[];
const cart=[];



(async function getData(){
     try{
        let res=await fetch('https://fakestoreapi.com/products');
        data=await res.json();
        console.log(data);
       renderProducts(data);

       
    }catch(err){
        console.error("Error fetching data:", err);
    }  
    
})();

const renderProducts=(data)=>{
    const productContainer=document.querySelector('.products');
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
(function filterDataCategory(){
let categories=document.querySelectorAll('.category-container li')
console.log(categories)

categories.forEach((category,index)=>{
    category.addEventListener('click',()=>{
        console.dir(category.outerText)

       if(category.outerText=="Home"){
          renderProducts(data)
       }
    else{
          let filteredData=data.filter((data,index)=>{
           return data.category.trim().toLowerCase()==category.outerText.trim().toLowerCase()
        })
        console.log(filteredData)
        renderProducts(filteredData)
    } 
       
    })
})
})();

let product=document.querySelector('.products')
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

function addToCart(productTitle){
    
    existingProduct=cart.find((item)=> item.productTitle===productTitle)
    console.log(existingProduct)
    if(existingProduct){
       existingProduct.quantity+=1
    }
    else{
         let product={productTitle,quantity:1}
         cart.push(product)
    }
      renderCartIcon(cart.length)
}

function addToFavourite(productTitle){
       existingProduct=cart.find((item)=> item.productTitle===productTitle)
    console.log(existingProduct)

    if(existingProduct){
       existingProduct.quantity+=1
    }
    else{
        let product={productTitle,quantity:1}
        favourites.push(product)
    }
    renderHeartIcon(favourites.length)
}
function renderCartIcon(count){
    document.querySelector('.cart-count').innerText=count
}
function renderHeartIcon(count){
    document.querySelector('.heart-count').innerText=count
}
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




