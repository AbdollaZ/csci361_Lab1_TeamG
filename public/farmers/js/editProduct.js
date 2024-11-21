// Populate the form with query parameters
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);

    document.getElementById('edit-product-name').value = params.get('name');
    document.getElementById('edit-category').value = params.get('category');
    document.getElementById('edit-price').value = params.get('price');
    document.getElementById('edit-quantity').value = params.get('quantity');
    document.getElementById('edit-description').value = params.get('description');

    const productId = params.get('id');

    // Handle form submission
    document.getElementById('edit-product-form').onsubmit = async (event) => {
        event.preventDefault();

        // Prepare updated product data
        const updatedProduct = {
            productname: document.getElementById('edit-product-name').value,
            productcategory: document.getElementById('edit-category').value,
            productprice: parseFloat(document.getElementById('edit-price').value),
            productquantity: parseInt(document.getElementById('edit-quantity').value, 10),
            productdescription: document.getElementById('edit-description').value,
        };

        // Send the update request
        try {
            const response = await fetch(`/products/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProduct),
            });

            if (response.ok) {
                alert('Product updated successfully!');
                window.location.href = '/manageProducts.html';
            } else {
                throw new Error('Failed to update product.');
            }
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Error updating product.');
        }
    };
});
