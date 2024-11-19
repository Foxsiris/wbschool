
interface Product {
  id: number;
  name: string;
  price: number;
}

class Cart {
  private items: Product[] = [];

  addProduct(product: Product): void {
    this.items.push(product);
    console.log(`Добавлен товар в корзину: ${product.name}`);
  }

  removeProduct(productId: number): void {
    const index = this.items.findIndex(item => item.id === productId);
    if (index !== -1) {
      const removed = this.items.splice(index, 1);
      console.log(`Удален товар из корзины: ${removed[0].name}`);
    } else {
      console.log('Товар не найден в корзине');
    }
  }

  getTotal(): number {
    return this.items.reduce((total, item) => total + item.price, 0);
  }

  viewCart(): void {
    if (this.items.length === 0) {
      console.log('Корзина пуста');
    } else {
      console.log('Товары в корзине:');
      this.items.forEach(item => {
        console.log(`${item.name} - ${item.price}₽`);
      });
    }
  }
}

class Order {
  id: number;
  status: string;
  cart: Cart;

  constructor(id: number, cart: Cart) {
    this.id = id;
    this.status = 'В ожидании';
    this.cart = cart;
  }

  changeStatus(newStatus: string): void {
    this.status = newStatus;
    console.log(`Статус заказа №${this.id} изменен на: ${this.status}`);
  }

  viewOrder(): void {
    console.log(`Заказ №${this.id}, Статус: ${this.status}`);
    this.cart.viewCart();
    console.log(`Общая сумма: ${this.cart.getTotal()}₽`);
  }
}

class ProductManager {
  private products: Product[] = [];

  addProduct(product: Product): void {
    this.products.push(product);
    console.log(`Добавлен товар в ProductManager: ${product.name}`);
  }

  removeProduct(productId: number): void {
    const index = this.products.findIndex(item => item.id === productId);
    if (index !== -1) {
      const removed = this.products.splice(index, 1);
      console.log(`Удален товар из ProductManager: ${removed[0].name}`);
    } else {
      console.log('Товар не найден');
    }
  }

  viewProducts(): void {
    if (this.products.length === 0) {
      console.log('Нет доступных товаров');
    } else {
      console.log('Доступные товары:');
      this.products.forEach(item => {
        console.log(`${item.name} - ${item.price}₽`);
      });
    }
  }
}

class OrderManager {
  private orders: Order[] = [];

  addOrder(order: Order): void {
    this.orders.push(order);
    console.log(`Добавлен заказ №${order.id}`);
  }

  viewOrders(): void {
    if (this.orders.length === 0) {
      console.log('Нет заказов');
    } else {
      console.log('Заказы:');
      this.orders.forEach(order => {
        order.viewOrder();
      });
    }
  }
}

// Пример использования

const productManager = new ProductManager();
const orderManager = new OrderManager();

const product1: Product = { id: 1, name: 'mackbookPro', price: 150000 };
const product2: Product = { id: 2, name: 'iphone 16pro', price: 130000 };
const product3: Product = { id: 3, name: 'airpods2 pro', price: 25000 };

productManager.addProduct(product1);
productManager.addProduct(product2);
productManager.addProduct(product3);

const cart = new Cart();
cart.addProduct(product1);
cart.addProduct(product2);

const order1 = new Order(1, cart);
orderManager.addOrder(order1);

order1.viewOrder();
order1.changeStatus('Оплачен');

cart.addProduct(product3);
order1.viewOrder();

orderManager.viewOrders();
