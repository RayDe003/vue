let app = new Vue({
    el: '#app',
    data: {
        product: "Socks",
        description: " A pair of warm, fuzzy socks.",
        // image: "./img/vmSocks-green-onWhite.jpg",
        image: "./img/vmSocks-blue-onWhite.jpg",
        altText: "A pair of socks",
        link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks.",
        inStock: true,
        inventory: 9,
        onSale: false
    }
})
