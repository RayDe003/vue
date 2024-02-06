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


            <button v-on:click="addToCart"
                    :disabled="!inStock"
                    :class="{ disabledButton: !inStock }"
            >Add to cart</button>
            <button v-on:click="getOutOfCart">No need</button>
        


        </div>

  
    </div>
 `,
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
        updateProduct(index) {
            this.selectedVariant = index;
            console.log(index);
        },
        getOutOfCart() {
            this.$emit('get-out-of-cart', this.variants[this.selectedVariant].variantId);
        },
        onSubmit() {
            let productReview = {
                name: this.name,
                review: this.review,
                rating: this.rating
            }
            this.$emit('review-submitted', productReview)
            this.name = null
            this.review = null
            this.rating = null
        },
        addReview: function (productReview) {
            this.reviews.push(productReview);
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
            reviews: [],

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
Vue.component('product-review', {
    props: {
        reviews: {
            type: Array,
            required: true,
        },
    },
    template: `

      <form class="review-form" @submit.prevent="onSubmit">

        <p v-if="errors.length">
          <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>


        <p>
          <label for="name">Name:</label>
          <input id="name" v-model="name" placeholder="name">
        </p>

        <p>
          <label for="review">Review:</label>
          <textarea id="review" v-model="review"></textarea>
        </p>

        <p>
          <label for="rating">Rating:</label>
          <select id="rating" v-model.number="rating">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
          </select>
        </p>

        <p>
          <label for="recommend">Would you recommend this product?</label>
        <div>
          <input type="radio" id="recommend-yes" value="yes" v-model="recommend" />
          <label for="recommend-yes">Yes</label>
        </div>
        <div>
          <input type="radio" id="recommend-no" value="no" v-model="recommend" />
          <label for="recommend-no">No</label>
        </div>
        

        <p>
          <input type="submit" value="Submit">
        </p>

      </form>
      <ul>
        <li v-for="review in reviews">
          <p>{{ review.name }}</p>
          <p>Rating: {{ review.rating }}</p>
          <p>{{ review.review }}</p>
        </li>
      </ul>
    `,

    data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors: [],
            recommend: null,
        }

    },
    methods:{
        onSubmit() {
            if (this.name && this.review && this.rating && this.recommend !== null) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommend: this.recommend,
                }
                this.$emit('review-submitted', productReview);
                this.name = null;
                this.review = null;
                this.rating = null;
                this.recommend = null;
            } else {
                this.errors = [];
                if (!this.name) this.errors.push("Name required.");
                if (!this.review) this.errors.push("Review required.");
                if (!this.rating) this.errors.push("Rating required.");
                if (this.recommend === null) this.errors.push("Recommendation required");
            }
        }
    }
})



let app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: [],
        reviews: []
    },

    methods: {
        updateCart(id) {
            this.cart.push(id);
        },
        deleteCartItem(id) {
            const index = this.cart.indexOf(id);
            if (index !== -1) {
                this.cart.splice(index, 1);
            }
        },
        addReview(productReview) {
            this.reviews.push(productReview);
        },
    }

})
