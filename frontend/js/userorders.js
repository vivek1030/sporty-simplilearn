
window.onload = function () {
    var user_email = localStorage.getItem("customer_email");
    if(user_email == '' || user_email == null){
        window.location.href = "../karma-master/login.html";
    }else{
        $("#login_btn").hide();
        $("#customer_name").html('<i class="fas fa-user"></i>&nbsp;&nbsp;' + localStorage.getItem("customer_name"))
        $("#customer_name").show();
        getUserOrders();
    }
};

function logout_user(){
    localStorage.removeItem("customer_name");
    localStorage.removeItem("customer_phone");
    localStorage.removeItem("customer_id");
    localStorage.removeItem("customer_email");
    localStorage.removeItem("customer_address");
    window.location.href = "../karma-master/login.html";
}

function cancelorder(id){
    const data = {
        id: id,
        orderstatus: "Cancelled",
    }

    fetch("http://localhost:9192/updateOrder", {
        method: "PUT",
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
                getUserOrders();
            }else{
                $("#error_msg").show();
            }
        })
        .catch(error => {
            console.log(error)
            alert("Something went wrong!");
        });
}

function getUserOrders(){
    var order_tracking_details = '';
    var orderstatuscolor = 'Green';
    var cancelorderbutton = 'Green';
    fetch("http://localhost:9192/getOrderByUserId/"+localStorage.getItem("customer_id"), {
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
                $("#ordertrackingcard").html("");
                data.data.forEach((orders, index) => {
                    if(orders.orderstatus == 'Cancelled'){
                        orderstatuscolor = "red"
                        cancelorderbutton = ""
                    }else{
                        orderstatuscolor = 'Green';
                        cancelorderbutton = '<button class="buy-now-button cancelorderbutton" onclick="cancelorder('+orders.id+')">Cancel Order</button>\n';
                    }
                    order_tracking_details = '<div class="card">\n' +
                        '                    <div class="card-content">\n' +
                        '                        <h2>Order ID: 1000<span id="'+orders.id+'">'+orders.id+'</span></h2>\n' +
                        '                        <p class="margin-top-30px">\n' +
                        '                            <div>'+orders.customername+'</div>\n' +
                        '                            <div>'+orders.address+'</div>\n' +
                        '                            <div>'+orders.email+'</div>\n' +
                        '                            <div>'+orders.phone+'</div>\n' +
                        '                            <div>\n' +
                        '                            <span>'+orders.productname+'</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n' +
                        '                            <span>'+orders.categoryname+'</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n' +
                        '                            <span>'+orders.price+'</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n' +
                        '                            <span style="color: '+orderstatuscolor+'">'+orders.orderstatus+'</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n' +
                        '                            </div>\n' +
                        '                        </p>\n' +
                        '' + cancelorderbutton +
                        '                    </div>\n' +
                        '                </div>';
                    $("#ordertrackingcard").append(order_tracking_details);
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