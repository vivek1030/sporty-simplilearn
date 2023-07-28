// Get the input element for searching
const searchInput = document.getElementById('searchInput');

// Get the unordered list for categories
const categoryUl = document.getElementById('categoryUl');

// Function to filter categories based on the search input
function filterCategories() {
    const filterValue = searchInput.value.toLowerCase();
    const categories = categoryUl.getElementsByTagName('li');

    for (const category of categories) {
        const categoryName = category.getElementsByTagName('span')[0].textContent.toLowerCase();
        if (categoryName.includes(filterValue)) {
            category.style.display = 'flex';
        } else {
            category.style.display = 'none';
        }
    }
}

// Attach keyup event to the search input
searchInput.addEventListener('keyup', filterCategories);


window.onload = function () {
    getCategories();
};

function CreateNewCategory(){
    const data = {
        name: document.getElementById("newcategoryname").value,
    }

    fetch("http://localhost:9192/savecategory", {
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
                closeCreateCategory();
                document.getElementById("newcategoryname").value = "";
                getCategories();
            }else{
                alert("Authentication failed!");
            }
        })
        .catch(error => {
            console.log(error)
            alert("Something went wrong!");
        });

}

function deleteCategory(id) {
    fetch("http://localhost:9192/deleteCategory/" + id, {
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
                getCategories();
            }else{
                alert("Authentication failed!");
            }
        })
        .catch(error => {
            alert("Something went wrong!");
        });
}

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
                const categoryUl = document.getElementById('categoryUl');
                categoryUl.innerHTML = '';
                data.data.forEach((category) => {
                    const li = document.createElement('li');
                    li.innerHTML = '<span>'+category.name+'</span> ' +
                        '<button onclick="deleteCategory('+category.id+')" class="delete-button">Delete</button>';
                    categoryUl.appendChild(li);
                });
            }else{
                alert("Authentication failed!");
            }
        })
        .catch(error => {
            alert("Something went wrong!");
        });
}

function openAddCategoryForm(){
    const modal = document.getElementById("passwordChangeModal");
    modal.style.display = "block";
}

function closeCreateCategory(){
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