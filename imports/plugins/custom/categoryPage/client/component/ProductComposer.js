import { Meteor } from "meteor/meteor";
import { Session } from "meteor/session";
import { Reaction } from "/client/api";
import { ReactionProduct } from "/lib/api";
import { applyProductRevision } from "/lib/api/products";
import { Products, Tags, Shops, Cart } from "/lib/collections";

const productsComposer = (props, onData, category = undefined) => {
  window.prerenderReady = false;

  let canLoadMoreProducts = false;

  const slug = Reaction.Router.getParam("slug");
  const shopIdOrSlug = Reaction.Router.getParam("shopSlug");

  const tag = Tags.findOne({ slug }) || Tags.findOne(slug);
  const scrollLimit = Session.get("productScrollLimit");
  let tags = {}; // this could be shop default implementation needed
  let shopIds = {};

  if (tag) {
    tags = { tags: [tag._id] };
  }

  if (shopIdOrSlug) {
    shopIds = { shops: [shopIdOrSlug] };
  }

  // if we get an invalid slug, don't return all products
  if (!tag && slug) {
    onData(null, {
      showNotFound: true
    });

    return;
  }

  const currentTag = ReactionProduct.getTag();

  const sort = {
    [`positions.${currentTag}.position`]: 1,
    [`positions.${currentTag}.createdAt`]: 1,
    createdAt: 1
  };

  // Get the current user and their preferences
  const user = Meteor.user();
  const prefs = user && user.profile && user.profile.preferences;

  // Edit mode is true by default
  let editMode = true;

  // if we have a "viewAs" preference and the preference is not set to "administrator", then edit mode is false
  if (prefs && prefs["reaction-dashboard"] && prefs["reaction-dashboard"].viewAs) {
    if (prefs["reaction-dashboard"].viewAs !== "administrator") {
      editMode = false;
    }
  }

  const queryParams = Object.assign({}, tags, Reaction.Router.current().queryParams, shopIds);
  const productsSubscription = Meteor.subscribe("Products", scrollLimit, queryParams, sort, editMode);

  if (productsSubscription.ready()) {
    window.prerenderReady = true;
  }

  const activeShopsIds = Shops.find({
    $or: [{ "workflow.status": "active" }, { _id: Reaction.getPrimaryShopId() }]
  })
    .fetch()
    .map(activeShop => activeShop._id);

  const productCursor = Products.find({
    ancestors: [],
    type: { $in: ["simple"] },
    shopId: { $in: activeShopsIds }
  });

  const products = productCursor.map(product => {
    return applyProductRevision(product);
  });

  const isActionViewOpen = Reaction.isActionViewOpen();
  if (isActionViewOpen === false) {
    Session.set("productGrid/selectedProducts", []);
  }
  if (!category) {
    const sortedProducts = ReactionProduct.sortProducts(products, currentTag);
    canLoadMoreProducts = productCursor.count() >= Session.get("productScrollLimit");
    const stateProducts = sortedProducts;
    Session.set("productGrid/products", sortedProducts);
    const storedCart = Cart.findOne();
    onData(null, {
      productsSubscription,
      products: stateProducts,
      canLoadMoreProducts,
      storedCart
    });

    return;
  }
  const storedCart = Cart.findOne();
  onData(null, {
    productsSubscription,
    products: products.filter(product => product.category === category),
    canLoadMoreProducts,
    storedCart
  });
};

export default productsComposer;
