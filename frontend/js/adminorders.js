
window.onload = function () {
    getAllOrders();
};

function getAllOrders(){
    fetch("http://localhost:9192/getAllOrders", {
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
                const productstable = document.getElementById('orderTableBody');
                productstable.innerHTML = '';
                data.data.forEach((orders, index) => {
                    const newRow = productstable.insertRow();
                    const flightNameCell = newRow.insertCell();
                    flightNameCell.textContent = parseInt(index) + 1;

                    const customername = newRow.insertCell();
                    customername.textContent = orders.customername;

                    const productname = newRow.insertCell();
                    productname.textContent = orders.productname;

                    const categoryname = newRow.insertCell();
                    categoryname.textContent = orders.categoryname;

                    const quantity = newRow.insertCell();
                    quantity.textContent = orders.quantity;

                    const price = newRow.insertCell();
                    price.textContent = orders.price;

                    const date = newRow.insertCell();
                    date.textContent = orders.date;

                    const orderstatus = newRow.insertCell();
                    orderstatus.textContent = orders.orderstatus;

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

function openPage(pagename){
    switch (pagename){
        case "category":
            window.location.href = "./admincategory.html";
            break;
        case "products":
            window.location.href = "./adminproducts.html";
            break;
        case "orders":
            window.location.href = "./adminorders.html";
            break;
        case "customers":
            window.location.href = "./admincustomers.html";
            break;
        case "dashboard":
            window.location.href = "./adminhomepage.html";
            break;
        case "logout":
            window.location.href = "./adminlogin.html";
            break;
    }
}