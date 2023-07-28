window.onload = function () {
    var user_email = localStorage.getItem("customer_email");
    if(user_email != "" && user_email != null){
        window.location.href = "../karma-master/index.html";
    }
}

function createaccountviewchange(){
    $("#loginform").hide();
    $("#registerform").show();
}

function userlogin(){
    const data = {
        username: $("#uname").val(),
        password: $("#upassword").val(),
    }

    fetch("http://localhost:9192/customerLogin", {
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
                data.data.forEach((customer) => {
                    localStorage.setItem("customer_id", customer.id);
                    localStorage.setItem("customer_name", customer.name);
                    localStorage.setItem("customer_phone", customer.phone);
                    localStorage.setItem("customer_email", customer.email);
                    localStorage.setItem("customer_address", customer.address);
                    var user_email = localStorage.getItem("customer_email");
                    if(user_email != "" && user_email != null){
                        window.location.href = "../karma-master/index.html";
                    }
                });
            }else{
                $("#error_msg").show();
            }
        })
        .catch(error => {
            console.log(error)
            alert("Something went wrong!");
        });
}

function registerUser(){
    const data = {
        name: $("#regname").val(),
        address: $("#regaddress").val(),
        phone: $("#regphone").val(),
        email: $("#regemail").val(),
        username: $("#regemail").val(),
        password: $("#regpassword").val(),
    }

    fetch("http://localhost:9192/customer", {
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
                data.data.forEach((customer) => {
                    localStorage.setItem("customer_id", customer.id);
                    localStorage.setItem("customer_name", customer.name);
                    localStorage.setItem("customer_phone", customer.phone);
                    localStorage.setItem("customer_email", customer.email);
                    var user_email = localStorage.getItem("customer_email");
                    if(user_email != "" && user_email != null){
                        window.location.href = "../karma-master/index.html";
                    }
                });
            }else{
                alert("Authentication failed!");
            }
        })
        .catch(error => {
            console.log(error)
            alert("Something went wrong!");
        });
}