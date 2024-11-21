document.addEventListener('DOMContentLoaded', () => {
    console.log('Script loaded and DOM fully loaded!');
    const productList = document.getElementById('product-list');
    const productTemplate = document.getElementById('product-template');
    const searchBar = document.getElementById('search-bar');
    const categoryFilter = document.getElementById('category-filter');
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');

    let allProducts = []; // Store all products for filtering
    // Verify the fetchProducts() function is accessing the correct endpoint
    async function fetchProducts() {
        try {
            const response = await fetch('/api/products');
            console.log('here');
            if (!response.ok) throw new Error('Failed to fetch products');
            console.log('here2');
            const products = await response.json();
            allProducts = products.rows;
            console.log('here3');
            console.log('Fetched products:', products); // Debug here
            displayProducts(products.rows);
        } catch (error) {
            console.error(error);
        }
    }

    // Check that the displayProducts() function is rendering the data correctly
    function displayProducts(products) {
        productList.innerHTML = '';
        products.forEach(product => {
            const productCard = productTemplate.cloneNode(true);
            productCard.removeAttribute('id'); // Remove the ID from the cloned card
            productCard.style.display = 'block';
            productCard.querySelector('.product-name').textContent = `${product.productname}`;
            productCard.querySelector('.product-category').textContent = `Category: ${product.productcategory}`;
            productCard.querySelector('.product-quantity').textContent = `Quantity: ${product.productquantity}`;
            productCard.querySelector('.product-price').textContent = `Price: ${product.productprice}`;
            productCard.querySelector('.farm-location').textContent = `Farm ID: ${product.farmid}`;
            productList.appendChild(productCard);
        });
        console.log('Product cards rendered:', document.querySelectorAll('.product-card:not(#product-template)').length);
        // document.querySelectorAll('.product-card'); // Should include all cards, including the template
        // document.querySelectorAll('.product-card:not(#product-template)'); // Should exclude only the template
    }

    // Filter products by search
    searchBar.addEventListener('input', () => {
        const query = searchBar.value.toLowerCase();
        // console.log('Search query:', query);
        const productCards = document.querySelectorAll('.product-card:not(#product-template)');
        productCards.forEach(card => {
            const productName = card.querySelector('.product-name').textContent.toLowerCase();
            const productCateg= card.querySelector('.product-category').textContent.toLowerCase();

            const matches = productName.includes(query) || productCateg.includes(query)

            card.style.display = matches ? 'block' : 'none';
        });
    });

     // Filter and search combined
    function filterProducts() {
        const query = searchBar.value.toLowerCase();
        const selectedCategory = categoryFilter.value;
        console.log('Search query:', query);
        console.log('Selected category:', selectedCategory);
        const minPrice = parseFloat(minPriceInput.value) || 0; // Default to 0 if empty
        const maxPrice = parseFloat(maxPriceInput.value) || Infinity; // Default to Infinity if empty

        console.log('Min price:', minPrice);
        console.log('Max price:', maxPrice);

        const filteredProducts = allProducts.filter(product => {
            // Check search query
            const matchesSearch = product.productname.toLowerCase().includes(query) || 
                                  product.productcategory.toLowerCase().includes(query);

            // Check category filter
            const matchesCategory = selectedCategory === 'all' || product.productcategory === selectedCategory;

            // Check user-defined price range
            const matchesPrice = product.productprice >= minPrice && product.productprice <= maxPrice;

            console.log('Product:', product);
            console.log('Matches search:', matchesSearch);
            console.log('Matches category:', matchesCategory);
            console.log('Matches price:', matchesPrice);

            return matchesSearch && matchesCategory && matchesPrice;
        });

        console.log('Filtered products:', filteredProducts);
        displayProducts(filteredProducts);
    }

    // Add event listeners for search and filters
    searchBar.addEventListener('input', filterProducts);
    categoryFilter.addEventListener('change', filterProducts);
    minPriceInput.addEventListener('input', filterProducts);
    maxPriceInput.addEventListener('input', filterProducts);

    console.log('here1');

    fetchProducts(); // Initial fetch
});
