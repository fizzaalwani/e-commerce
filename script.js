let arr=[1,2,3,4,5,6,7,8,9,10];

let arr2=arr.filter((item,index)=>item%2===0
)
console.log(arr2); // Output: [2, 4, 6, 8, 10]
let arr3=arr2.splice(0,3)
console.log(arr3); // Output: [10]
let data=[];

// const getData=async()=>{
//     try{
//         let res=await fetch('https://fakestoreapi.com/products');
//         data=await res.json();
//         console.log(data);
//         let category=data.map((item)=>{
//    return console.log(item.category)
// })
// console.log(category)
//     }catch(err){
//         console.error("Error fetching data:", err);
//     }
// }
// getData();

(async function getData(){
     try{
        let res=await fetch('https://fakestoreapi.com/products');
        data=await res.json();
        console.log(data);
        let category=data.map((item)=>{
   return console.log("Category : ",item.category)
})
console.log(category)
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
          <div class="p-name">${item.category}</div>
          <div class="p-desc">${item.title}.</div>
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

