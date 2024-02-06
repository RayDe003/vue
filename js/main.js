let app = new Vue({
    el: '#app',
    methods: {
        addToCart() {
            this.cart += 1
        },
        updateProduct(variantImage) {
            this.image = variantImage
        },
        getOutOfCart() {
            if (this.cart > 0) {
                this.cart -= 1;
            }
        },

    },
    data: {
        product: "Socks",
        description: " A pair of warm, fuzzy socks.",
        // image: "./img/vmSocks-green-onWhite.jpg",
        image: "./img/vmSocks-blue-onWhite.jpg",
        altText: "A pair of socks",
        link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks.",
        inStock: true,
        inventory: 100,
        onSale: false,
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        variants: [
            {
                variantId: 2234,
                variantColor: 'green',
                variantImage: "./img/vmSocks-green-onWhite.jpg",

            },
            {
                variantId: 2235,
                variantColor: 'blue',
                variantImage: "./img/vmSocks-blue-onWhite.jpg",
            }
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
        cart: 0,

    }
})
