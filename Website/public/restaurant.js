function showToast(message) {
    var toast = document.createElement("div");
    toast.classList.add("toast_upload");
    toast.textContent = message;

    // Add toast to the page
    document.body.appendChild(toast);

    // Show the toast by adding the 'show' class
    setTimeout(function () {
        toast.classList.add("show");
    }, 100); // Adding a small delay to ensure proper animation

    // Remove toast after a certain duration (e.g., 3 seconds)
    setTimeout(function () {
        toast.remove();
    }, 3000);

    // Log toast element to console for inspection
    console.log("Toast element:", toast);
}


function redirectToPage(){
    window.location.href = "product.html";
};

function updateProductData() {
    var product = new Object();
    product.name = document.getElementById('name').value,
    product.description = document.getElementById('description').value,
    product.price = document.getElementById('price').value,
    product.category_id = document.getElementById('category_id').value,
    product.picture = document.getElementById('picture').value
    var id = document.getElementById('id').value;
    console.log("product: ", product);

    var request = new XMLHttpRequest();
    var urlLink = "/updateProduct/" + id;
    request.open("PUT", urlLink, true);
    request.setRequestHeader("Content-Type", "application/json");

    request.onload = function() {
        if (request.status === 200) {
            showToast("Product updated successfully");
        } else {
            showToast("Failed to update product");
        };
    };

    request.send(JSON.stringify(product));
};

function checkingInputs(product){
    for (var key in product) {
        if (product[key] === "") {
            console.log("Inside the loop");
            showToast("Make sure all inputs are filled up");
            return; // Exit the function early
        }
    }
}

function addProductData() {
    var product = new Object(); // create an object to be send over
    product.name = document.getElementById('name').value;
    product.description = document.getElementById('description').value;
    product.price = document.getElementById('price').value;
    product.category_id = document.getElementById('category_id').value; 
    product.picture = document.getElementById('picture').value;


    var request = new XMLHttpRequest(); // new HttpRequest instance to send student data
    request.open("POST", "/addproduct", true); //Use the HTTP POST method to send data to server
    request.setRequestHeader("Content-Type", "application/json"); //for Post method we have specific the content type

    request.onload = function () {
        // Display the popup
        showToast("Product has been added")
    }

    request.send(JSON.stringify(product)); // Convert the student object to string in JSON format to be send over
}




function loadCategoryData(){
    console.log("loadCategoryData()works")
    var request = new XMLHttpRequest();

    var categoryArray = [];
    request.open("GET", "/category", true);

    request.onload = function(){
        categoryArray = JSON.parse(request.responseText);
        console.log("->result: "+ categoryArray);
        insertCategoryDetails(categoryArray)
    };
    request.send();
}

function insertCategoryDetails(categoryArray) {
    var dynamicCategoriesList = document.getElementById("category_id");
    console.log("insertCategoryDetails()")
    dynamicCategoriesList.innerHTML = "";
    
    for (let i = 0; i < categoryArray.length; i++) {
        console.log(categoryArray[i])
        var option = document.createElement("option");
        
        option.value = categoryArray[i].id; 
        option.textContent = categoryArray[i].name; 
        
        dynamicCategoriesList.appendChild(option);
    };
};

function categorySection(){
    var idInput = document.getElementById("category_id");   
    var category_id = idInput.value;
    window.location.href = "category_page.html?category_id="+category_id;
};

function loadCategoryCard(){
    var categoryId = getQueryParam('category_id');

    console.log("category id: " + categoryId);

    var request = new XMLHttpRequest();
    
    var urlLink = "/categoryProduct/" + categoryId;
    request.open("GET", urlLink, true);

    request.onload = function() {
        console.log("delete")
        if (request.status === 200) {
            var categoryProduct = JSON.parse(request.responseText);
            console.log(categoryProduct);

            if (categoryProduct.length === 0) {
                showToast("No Product for the Category");
            };

            showToast("Product Categories");
            insertDynamicProduct(categoryProduct);
        } else {
            showToast("Failed to show products of the same category");
        }
    };
    request.send();
};

function deleteProduct(item){
    var idInput = document.getElementById("id");   
    var id = idInput.value;
 
    console.log("delete id" + id);

    var request = new XMLHttpRequest();
    
    console.log("id"+id);
    var urlLink = "/deleteProductDetails/" + id;
    request.open("DELETE", urlLink, true);

    request.onload = function(){
        if (request.status === 200) {
            // Product deleted successfully
            showToast("Product deleted successfully");
            console.log("=")
        } else {
            // Failed to delete product
            showToast("Failed to delete product");
            console.log("==")
        };
        location.href = "product.html"
    };

    request.send();
};



function loadAddedProductDetail(){
    console.log("loadAddedProductDetail() works");
    var request = new XMLHttpRequest();
    var params = new URLSearchParams(location.search);
    var id = params.get("id");

    console.log("id"+id);
    var urlLink = "/productDetails/" + id;
    request.open("GET", urlLink, true);

    request.onload = function(){
        productDetail = JSON.parse(request.responseText);
        insertAddedProductDetail(productDetail);
    };
    request.send();
};




function insertAddedProductDetail(productDetail){

    console.log(productDetail.id);
    document.getElementById("id").value = productDetail[0].id;
    document.getElementById("picture").value = productDetail[0].picture;
    document.getElementById("name").value = productDetail[0].name;
    document.getElementById("description").value = productDetail[0].description;
    document.getElementById("price").value = productDetail[0].price;
    document.getElementById("category_id").value = productDetail[0].category_id;
    document.getElementById("deleteButton").setAttribute("restId", productDetail[0].id);


    var imageURL = "/images" + productDetail[0].picture;
    
    document.getElementById("picture").src = imageURL;
    
};

function loadProductCard(){
    var productCardArray=[];
    var request = new XMLHttpRequest();
    request.open("GET", "/product", true);

    request.onload = function(){
        productCardArray = JSON.parse(request.responseText);
        console.log("productCardArray: "+productCardArray);
        insertDynamicProduct(productCardArray);
        attachClickEventToProductCards();
    };
    request.send();
};

function insertDynamicProduct(productCardArray){
    var dynamicProductList = document.getElementById("dynamicProductCardDataList");

    let newContent = "<table><tr>"

    // loop through the productCardArray elements
    for (let i=0; i<productCardArray.length; i++){
        console.log(productCardArray[i]);

        //build up the HTML string for the product
        newContent += 
            "<td id = '"+ productCardArray[i].id +"'><h4>" + productCardArray[i].name + "</h4>" +
            "<img src='images/" + productCardArray[i].picture + "' width = '150'><br>" +
            "$" + productCardArray[i].price + "<br>" + "Description: " +productCardArray[i].description + "<br>" + "Category Name:" + productCardArray[i].category
            "</td>";

        // after every thrid product, end the current row and start a new one
        if ((i+1)%3 === 0 && i < productCardArray.length - 1){
            newContent += "</tr><tr>";
        }
    }
    // close the last row and the table
    newContent += "</tr></table>"

    // update the innerHTML once, after building the complete HTML string
    dynamicProductList.innerHTML = newContent;
}

function attachClickEventToProductCards() {
    var productCards = document.querySelectorAll("#dynamicProductCardDataList td");
    console.log("This is it:")
    console.log(productCards);
    productCards.forEach(function(productCard) {
        productCard.addEventListener("click", function() {
            var productId = productCard.id; 
            console.log("Product card clicked! Product ID: " + productId);
            window.location.href = "/product-details.html?id=" + productId;
        });
    });
}
