Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },

    template: `
   <div class="product">
        <div class="product-image">
            <img :src="image" :alt="altText"/>
            <a :href="link">More products like this</a>
        </div>
        <div class="product-info">
          <p>User is premium: {{ premium }}</p>
            <h1>{{ title }}</h1>

            <p>{{ description }}</p>

            <p v-if="inStock && inventory > 10">In stock</p>
            <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>
            <p v-else :class="['outOfStock']">Out of stock</p>

            <span v-show="onSale">{{ sale }}</span>


          <product-details :details="details"></product-details>
          
          
          <p>Shipping: {{ shipping }}</p>

            <div  v-for="size in sizes" :key="size" >
                <p >{{ size }}</p>
            </div>

            <div
                    class="color-box"
                    v-for="(variant, index) in variants"
                    :key="variant.variantId"
                    :style="{ backgroundColor:variant.variantColor }"
                    @mouseover="updateProduct(index)"
            ></div>

            <div class="cart">
                <p>Cart({{ cart }})</p>
                <button v-on:click="addToCart"
                        :disabled="!inStock"
                        :class="{ disabledButton: !inStock }"
                >Add to cart</button>
                <button v-on:click="getOutOfCart">No need</button>

            </div>

        </div>


    </div>
 `,
    methods: {
        addToCart() {
            this.cart += 1
        },
        updateProduct(index) {
            this.selectedVariant = index;
            console.log(index);
        },

        getOutOfCart() {
            if (this.cart > 0) {
                this.cart -= 1;
            }
        },

    },
    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock(){
            return this.variants[this.selectedVariant].variantQuantity;
        },
        sale() {
            if (this.onSale) {return this.brand + ' ' + this.product + ' on sale!'}
            else {return this.brand + ' ' + this.product + ' no'}
        },
        shipping() {
            if (this.premium) {
                return "Free";
            } else {
                return 2.99
            }
        }

    },

    data () {
        return{
            selectedVariant: 0,
            brand: "Vue Mastery",
            product: "Socks",
            description: " A pair of warm, fuzzy socks.",
            altText: "A pair of socks",
            link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks.",
            inventory: 100,
            details: ['80% cotton', '20% polyester', 'Gender-neutral'],
            variants: [
                {
                    variantId: 2234,
                    variantColor: 'green',
                    variantImage: "./img/vmSocks-green-onWhite.jpg",
                    variantQuantity: 10,
                    onSale: false

                },
                {
                    variantId: 2235,
                    variantColor: 'blue',
                    variantImage: "./img/vmSocks-blue-onWhite.jpg",
                    variantQuantity: 0,
                    onSale: true
                }
            ],
            sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
            cart: 0,

        }
    }

})

Vue.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true,
        }
    },
    template:`
    <ul>
        <li v-for="detail in details">{{ detail }}</li>
    </ul>
    `,
})

let app = new Vue({
    el: '#app',
    data: {
        premium: true
    }
})
