

window.onload = function () {
    getAllOrders();
};

function getAllOrders(){
    fetch("http://localhost:9192/allCustomers", {
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
                const productstable = document.getElementById('customerTableBody');
                productstable.innerHTML = '';
                data.data.forEach((allCustomers, index) => {
                    const newRow = productstable.insertRow();
                    const flightNameCell = newRow.insertCell();
                    flightNameCell.textContent = parseInt(index) + 1;

                    const customername = newRow.insertCell();
                    customername.textContent = allCustomers.name;

                    const email = newRow.insertCell();
                    email.textContent = allCustomers.email;

                    const phone = newRow.insertCell();
                    phone.textContent = allCustomers.phone;

                    const address = newRow.insertCell();
                    address.textContent = allCustomers.address;

                    const nullvalue = newRow.insertCell();
                    nullvalue.textContent = "";

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