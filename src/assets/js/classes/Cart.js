class Cart {
	goodsData = [];
	goods = [];
	reCalculate = new Event('reCalculate');
	calculateData = {
		subTotal: 0,
		tax: 100,
		shipping: 150,
		total: 0,
	};
	timeOut = null;
	constructor() {
		this.setGoods();
		this.addListeners();
		this.setGoodsData();
		this.subTotal = document.querySelector('[data-name="subtotal"] .cart-total__value span');
		this.tax = document.querySelector('[data-name="tax"] .cart-total__value span');
		this.shipping = document.querySelector('[data-name="shipping"] .cart-total__value span');
		this.total = document.querySelector('[data-name="total"] .cart-total__value span');
		this.headerCountNode = document.querySelector('.header__goods-count');
	}

	setGoods() {
		this.goods = [...document.querySelectorAll('.goods-item')];
	}

	addListeners() {
		this.goods.forEach(good => {
			this.setCountHandlers(good);
			this.setRemoveHandler(good);
			this.setInputHandler(good);
		});
	}

	setGoodsData() {
		this.goodsData = [];
		const prices = this.goods.map(elem => {
			return elem.querySelector('[data-price]').getAttribute('data-price');
		});
		const count = this.goods.map(elem => {
			return elem.querySelector("[data-name='count']").value;
		});
		for (const i in this.goods) {
			this.goodsData.push({
				count: count[i],
				price: prices[i],
			});
		}
	}

	setInputHandler(node) {
		node.querySelector('input[data-name="count"]')?.addEventListener('input', ({ target }) => {
			target.value = target.value.replace(/\D/, '');
			if (this.timeOut) clearTimeout(this.timeOut);
			this.timeOut = setTimeout(() => {
				this.setGoodsData();
				this.fireReCalculateEvent();
			}, 1000);
		});
	}

	setRemoveHandler(node) {
		node.querySelector('.goods-item__remove')?.addEventListener(
			'click',
			({ target }) => {
				target.closest('.goods-item').remove();
				this.setGoods();
				this.fireReCalculateEvent();
			},
			{ once: true }
		);
	}

	setCountHandlers(node) {
		const inc = node.querySelector('.goods-item__inc');
		const dec = node.querySelector('.goods-item__dec');
		const current = node.querySelector('input[data-name="count"]');
		inc.addEventListener('click', () => {
			+current.value++;
			this.fireReCalculateEvent();
		});
		dec.addEventListener('click', () => {
			+current.value--;
			current.value = Math.max(+current.value--, 1);
			this.fireReCalculateEvent();
		});
	}

	fireReCalculateEvent() {
		document.dispatchEvent(this.reCalculate);
	}

	calculate() {
		this.setGoodsData();
		this.calculateData.subTotal = 0;
		this.goodsData.forEach(goods => {
			this.calculateData.subTotal += goods.count * goods.price;
		});
		this.calculateData.total =
			this.calculateData.tax + this.calculateData.shipping + this.calculateData.subTotal;
		this.setValues();
		this.headerCountNode.textContent = this.goods.length;
	}

	setValues() {
		this.tax.textContent = this.calculateData.tax;
		this.shipping.textContent = this.calculateData.shipping;
		this.subTotal.textContent = this.calculateData.subTotal;
		this.total.textContent = this.calculateData.total;
	}

	init() {
		this.calculate();
		this.calculateBind = this.calculate.bind(this);
		document.addEventListener('reCalculate', this.calculateBind);
		// this.addHandlers()
	}
}

export default Cart;
