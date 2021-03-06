process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';
import ProductRoute from './routes/products.route';
import AddressRoute from './routes/address.route';
import CustomersRoute from './routes/customers.route';
import ShoppingCartRoute from './routes/shoppingCart.route';
import OrderRoute from './routes/order.route';
import CategoryRoute from '@routes/category.route';
import RatingRoute from './routes/ratings.route';
import RecommenderRoute from './routes/recommender.route';

validateEnv();

const app = new App([
  new IndexRoute(),
  new UsersRoute(),
  new AuthRoute(),
  new ProductRoute(),
  new AddressRoute(),
  new CustomersRoute(),
  new ShoppingCartRoute(),
  new OrderRoute(),
  new CategoryRoute(),
  new RatingRoute(),
  new RecommenderRoute(),
]);

app.listen();
