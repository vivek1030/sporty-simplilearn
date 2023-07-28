
window.onload = function () {
    getAllProducts();
    getCategories();
};

function getCategories(){
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
                const pcatid = document.getElementById('pcatid');
                pcatid.innerHTML = '';
                data.data.forEach((category) => {
                    const option = document.createElement('option');
                    option.value = category.id;
                    option.textContent = category.name;
                    pcatid.appendChild(option);
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

function getAllProducts(){
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
                const productstable = document.getElementById('ProductTableBody');
                productstable.innerHTML = '';
                data.data.forEach((products, index) => {
                    const newRow = productstable.insertRow();
                    const flightNameCell = newRow.insertCell();
                    flightNameCell.textContent = parseInt(index) + 1;

                    const name = newRow.insertCell();
                    name.textContent = products.name;

                    const categoryid = newRow.insertCell();
                    categoryid.textContent = products.categoryname;

                    const description = newRow.insertCell();
                    description.textContent = products.description;

                    const image = newRow.insertCell();
                    image.textContent = products.image;

                    const quantity = newRow.insertCell();
                    quantity.textContent = products.quantity;

                    const price = newRow.insertCell();
                    price.textContent = products.price;

                    const deleteCell = newRow.insertCell();
                    const deleteIcon = document.createElement('i');
                    deleteIcon.classList.add('fas', 'fa-trash-alt');
                    deleteIcon.onclick = () => deleteProduct(products.id); // Call the deleteFlight function with the row index
                    deleteCell.appendChild(deleteIcon);
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

document.addEventListener('DOMContentLoaded', function () {
    const maxChars = 20;
    const inputElement = document.getElementById('pdescription');
    const charCountElement = document.getElementById('charCount');

    inputElement.addEventListener('input', function () {
        const remainingChars = maxChars - this.value.length;
        charCountElement.textContent = remainingChars;

        // If the input exceeds the character limit, truncate the input text
        if (remainingChars < 0) {
            this.value = this.value.slice(0, maxChars);
            charCountElement.textContent = '0';
        }
    });
});

function CreateNewProduct(){
    const data = {
        name: document.getElementById("pname").value,
        categoryid: document.getElementById("pcatid").value,
        description: document.getElementById("pdescription").value,
        price: document.getElementById("pprice").value,
        image: document.getElementById("pimageurl").value,
        quantity: document.getElementById("pquantity").value,
    }

    fetch("http://localhost:9192/addproduct", {
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
                closeCreateProduct();
                document.getElementById("pname").value = "";
                document.getElementById("pcatid").value = "";
                document.getElementById("pdescription").value = "";
                document.getElementById("pprice").value = "";
                document.getElementById("pquantity").value = "";
                getAllProducts();
            }else{
                alert("Authentication failed!");
            }
        })
        .catch(error => {
            console.log(error)
            alert("Something went wrong!");
        });

}


function deleteProduct(id) {
    fetch("http://localhost:9192/deleteProduct/" + id, {
        method: "DELETE",
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
                getAllProducts();
            }else{
                alert("Authentication failed!");
            }
        })
        .catch(error => {
            alert("Something went wrong!");
        });
}






function showAddNewProductModal() {
    const modal = document.getElementById("passwordChangeModal");
    modal.style.display = "block";
}

function closeCreateProduct() {
    const modal = document.getElementById("passwordChangeModal");
    modal.style.display = "none";
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