
window.onload = function () {
    var user_email = localStorage.getItem("customer_email");
    if(user_email == '' || user_email == null){
        window.location.href = "../karma-master/login.html";
    }else{
        $("#login_btn").hide();
        $("#customer_name").html('<i class="fas fa-user"></i>&nbsp;&nbsp;' + localStorage.getItem("customer_name"))
        $("#customer_name").show();
        getAllProducts();
        getAllCategories();
    }

};

function getProductOnCategory(id){
    var productCard = '';

    fetch("http://localhost:9192/getProductByCategoryId/"+id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            console.log(response)
            if (!response.ok) {
                throw new Error("Network response was not ok.");
            }
            return response.json();
        })
        .then(data => {
            if(data.status_code == 200){
                $("#products_row").html("");
                data.data.forEach((products, index) => {
                    productCard = '<div class="col-lg-3 col-md-6">\n' +
                        '           <div class="single-product">\n' +
                        '            <img class="img-fluid product-image" src="'+products.image+'" alt="">\n' +
                        '            <div class="product-details">\n' +
                        '             <h6>'+products.name+'</h6>\n' +
                        '             <h7>'+products.categoryname+'</h7>\n' +
                        '             <div class="price">\n' +
                        '              <h6 class="product-price">Rs.'+products.price+'</h6>\n' +
                        '              <h6>'+products.description+'</h6>\n' +
                        '             </div>\n' +
                        '            <div class="prd-bottom">\n' +
                        '             <input class="buy-now-button" onclick="buyProduct('+products.id+', '+products.categoryid+', '+products.price+', \''+products.name+'\')" type="button" value="BUY NOW">\n' +
                        '            </div>\n' +
                        '           </div>\n' +
                        '          </div>\n' +
                        '         </div>';
                    $("#products_row").append(productCard);
                    // Get the offset of the target div
                    const targetOffset = $('#products_row').offset().top;
                    // Scroll to the target div using the scrollTop method
                    $('html, body').animate({
                        scrollTop: targetOffset - 130
                    }, 1000); // Adjust the scroll speed as needed
                });
            }else{
                alert("Authentication failed!");
            }
        })
        .catch(error => {
            console.log(error);
            alert("Something went wrong!");
        });
}


function getAllCategories(){

    var category = '';

    fetch("http://localhost:9192/getallcategory", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            console.log(response)
            if (!response.ok) {
                throw new Error("Network response was not ok.");
            }
            return response.json();
        })
        .then(data => {
            if(data.status_code == 200){
                data.data.forEach((category) => {
                    category = '<li class="nav-item"><b class="nav-link" onclick="getProductOnCategory('+category.id+')">'+category.name+'</b></li>'
                    $("#categoriesdropdown").append(category)
                });
            }else{
                alert("Authentication failed!");
            }
        })
        .catch(error => {
            console.log(error);
            alert("Something went wrong!");
        });
}

function logout_user(){
    localStorage.removeItem("customer_name");
    localStorage.removeItem("customer_phone");
    localStorage.removeItem("customer_id");
    localStorage.removeItem("customer_email");
    localStorage.removeItem("customer_address");
    window.location.href = "../karma-master/login.html";
}

function buyProduct(id, catid, price, name){
    $("#cname").val(localStorage.getItem("customer_name"));
    $("#cphone").val(localStorage.getItem("customer_phone"));
    $("#cemail").val(localStorage.getItem("customer_email"));
    $("#caddress").val(localStorage.getItem("customer_address"));
    $("#prdid").val(id);
    $("#prdcatid").val(catid);
    $("#prdprice").val(price);
    $("#buy_p_name").text(name);
    $("#bookingdetails").show();
    $("#paymentdetails").hide();
    $("#thankyou").hide();
    $("#bookmodal").show();
}

function addLeadingZero(number) {
    return number < 10 ? '0' + number : number;
}

function showPaymentScreen(){
    const today = new Date();
    // Get the day, month, and year
    const day = today.getDate();
    const month = today.getMonth() + 1; // Months are zero-based, so add 1
    const year = today.getFullYear();
    const formattedDate = year + '-' + addLeadingZero(month) + '-' + addLeadingZero(day);

    const data = {
        customerid: localStorage.getItem("customer_id"),
        productid: $("#prdid").val(),
        categoryid: $("#prdcatid").val(),
        quantity: "1",
        price: $("#prdprice").val(),
        date: formattedDate,
        orderstatus: "Confirmed",
    }

    fetch("http://localhost:9192/placeOrder", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            console.log(response)
            if (!response.ok) {
                throw new Error("Network response was not ok.");
            }
            return response.json();
        })
        .then(data => {
            if(data.status_code == 200){
                $("#bookingdetails").hide();
                $("#paymentdetails").show();
            }else{
                $("#error_msg").show();
            }
        })
        .catch(error => {
            console.log(error)
            alert("Something went wrong!");
        });
}

function makePayment(){
    const data = {
        customerid: localStorage.getItem("customer_id"),
        cardno: $("#cardno").val(),
        cvv: $("#cvv").val(),
        expirydate: $("#expiryMonth").val()+"-"+$("#expiryYear").val(),
    }

    fetch("http://localhost:9192/savepaymentdetails", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            console.log(response)
            if (!response.ok) {
                throw new Error("Network response was not ok.");
            }
            return response.json();
        })
        .then(data => {
            if(data.status_code == 200){
                $("#paymentdetails").hide();
                $("#thankyou").show();
            }else{
                $("#error_msg").show();
            }
        })
        .catch(error => {
            console.log(error)
            alert("Something went wrong!");
        });
}

function closemodal(){
    $("#bookmodal").hide();
}

function getAllProducts(){

    var productCard = '';

    fetch("http://localhost:9192/getAllProducts", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            console.log(response)
            if (!response.ok) {
                throw new Error("Network response was not ok.");
            }
            return response.json();
        })
        .then(data => {
            if(data.status_code == 200){
                data.data.forEach((products, index) => {
                    productCard = '<div class="col-lg-3 col-md-6">\n' +
                        '           <div class="single-product">\n' +
                        '            <img class="img-fluid product-image" src="'+products.image+'" alt="">\n' +
                        '            <div class="product-details">\n' +
                        '             <h6>'+products.name+'</h6>\n' +
                        '             <h7>'+products.categoryname+'</h7>\n' +
                        '             <div class="price">\n' +
                        '              <h6 class="product-price">Rs.'+products.price+'</h6>\n' +
                        '              <h6>'+products.description+'</h6>\n' +
                        '             </div>\n' +
                        '            <div class="prd-bottom">\n' +
                        '             <input class="buy-now-button" onclick="buyProduct('+products.id+', '+products.categoryid+', '+products.price+', \''+products.name+'\')" type="button" value="BUY NOW">\n' +
                        '            </div>\n' +
                        '           </div>\n' +
                        '          </div>\n' +
                        '         </div>';
                    $("#products_row").append(productCard);
                });
            }else{
                alert("Authentication failed!");
            }
        })
        .catch(error => {
            console.log(error);
            alert("Something went wrong!");
        });
}