// async function fetchAndDisplayProducts() {
//     const farmerId = 1; // Replace with the actual farmer ID (e.g., fetched from the session or login system)
    
//     try {
//         const response = await fetch(`/products/farmer/9/products`);
//         console.log("Response received:", response);
//         if (!response.ok) throw new Error('Failed to fetch products');
        

//         const products = await response.json();

//         // Populate the table
//         const tableBody = document.getElementById('product-table-body');
//         tableBody.innerHTML = ''; // Clear previous rows

//         products.forEach(product => {
//             const row = document.createElement('tr');
//             row.innerHTML = `
//                 <td>${product.productname}</td>
//                 <td>${product.productcategory}</td>
//                 <td>${product.productprice}</td>
//                 <td>${product.productquantity}</td>
//                 <td>
//                     <button onclick="editProduct(${product.productid})">Edit</button>
//                     <button onclick="deleteProduct(${product.productid})">Delete</button>
//                 </td>
//             `;
//             tableBody.appendChild(row);
//         });
//     } catch (error) {
//         console.error('Error fetching products:', error);
//         //showNotification('Error fetching products', 'error');
//     }
// }

// Function to handle editing a product
async function editProduct(productId) {
    try {
        // Fetch the product details from the server
        const response = await fetch(`/products/${productId}`);

        if (!response.ok) {
            throw new Error('Failed to fetch product details');
        }

        const product = await response.json();
        const queryParams = new URLSearchParams({
            id: product.productid,
            name: product.productname,
            category: product.productcategory,
            price: product.productprice,
            quantity: product.productquantity,
        });

        window.location.href = `/editProduct.html?${queryParams.toString()}`;
    } catch (error) {
        console.error('Error fetching product details:', error);
        alert('Failed to fetch product details for editing.');
    }
}



// async function editProduct(productId) {
//     // Fetch the product details
//     const response = await fetch(`/product/${productId}`);
//     const product = await response.json();

//     // Populate a form or modal with the product details
//     const productNameInput = document.getElementById('edit-product-name');
//     const categorySelect = document.getElementById('edit-category');
//     const priceInput = document.getElementById('edit-price');
//     const quantityInput = document.getElementById('edit-quantity');
//     const descriptionInput = document.getElementById('edit-description');

//     productNameInput.value = product.productname;
//     categorySelect.value = product.productcategory;
//     priceInput.value = product.productprice;
//     quantityInput.value = product.productquantity;
//     descriptionInput.value = product.productdescription;

//     // Show the modal (you can use a library like Bootstrap or create your own modal)
//     document.getElementById('edit-modal').style.display = 'block';

//     // Handle form submission
//     document.getElementById('edit-product-form').onsubmit = async function (event) {
//         event.preventDefault();

//         const updatedProduct = {
//             productname: productNameInput.value,
//             productcategory: categorySelect.value,
//             productprice: parseFloat(priceInput.value),
//             productquantity: parseInt(quantityInput.value, 10),
//             productdescription: descriptionInput.value,
//         };

//         // Send the update request to the server
//         const updateResponse = await fetch(`/products/${productId}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(updatedProduct),
//         });

//         if (updateResponse.ok) {
//             alert('Product updated successfully!');
//             location.reload(); // Refresh the product table
//         } else {
//             alert('Failed to update product.');
//         }
//     };
// }


async function deleteProduct(productId) {
    const confirmation = confirm('Are you sure you want to delete this product?');
    if (!confirmation) return;

    // Send delete request to the server
    const response = await fetch(`/products/${productId}`, { method: 'DELETE' });

    if (response.ok) {
        alert('Product deleted successfully!');
        location.reload(); // Refresh the product table
    } else {
        alert('Failed to delete product.');
    }
}


document.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayProducts();

    // Add Product Button
    const addProductBtn = document.getElementById('add-product-btn');
    const addProductModal = document.getElementById('add-product-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const addProductForm = document.getElementById('add-product-form');

    addProductBtn.addEventListener('click', () => {
        addProductModal.style.display = 'block';
    });

    closeModalBtn.addEventListener('click', () => {
        addProductModal.style.display = 'none';
    });

    addProductForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const newProduct = {
            name: document.getElementById('product-name').value,
            category: document.getElementById('product-category').value,
            price: parseFloat(document.getElementById('product-price').value),
            quantity: parseInt(document.getElementById('product-quantity').value, 10),
        };

        try {
            const response = await fetch('/products/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProduct),
            });

            if (response.ok) {
                alert('Product added successfully!');
                addProductModal.style.display = 'none';
                fetchAndDisplayProducts(); // Refresh the table
            } else {
                const errorData = await response.json();
                alert(`Error adding product: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error adding product:', error);
            alert('Failed to add product.');
        }
    });
});



async function fetchAndDisplayProducts() {
    //const farmerId = 1; // Replace with the actual farmer ID (e.g., fetched from the session or login system)

    try {
        const response = await fetch(`/products/farmer/5/products`);
        console.log("Response received:", response);
        if (!response.ok) throw new Error('Failed to fetch products');
        
        const products = await response.json();

        // Populate the table
        const tableBody = document.getElementById('product-table-body');
        tableBody.innerHTML = ''; // Clear previous rows

        // Low stock threshold
        const lowStockThreshold = 4100;

        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.productname}</td>
                <td>${product.productcategory}</td>
                <td>${product.productprice}</td>
                <td>${product.productquantity}</td>
                <td>
                    <button onclick="editProduct(${product.productid})">Edit</button>
                    <button onclick="deleteProduct(${product.productid})">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);

            // Check for low stock and notify
            if (product.productquantity < lowStockThreshold) {
                showNotification(
                    `Low Stock Alert: ${product.productname} only has ${product.productquantity} items left!`,
                    'warning'
                );
            }
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Notification function
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`; // e.g., 'notification warning'
    notification.textContent = message;

    // Add notification to the body
    document.body.appendChild(notification);

    // Automatically remove the notification after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', fetchAndDisplayProducts);





// Call this function when the page loads
document.addEventListener('DOMContentLoaded', fetchAndDisplayProducts);
