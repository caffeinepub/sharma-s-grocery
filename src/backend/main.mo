import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import List "mo:core/List";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";

actor {
  // Data Types
  type Product = {
    name : Text;
    price : Nat;
    unit : Text;
    emoji : Text;
  };

  module Product {
    public func compare(product1 : Product, product2 : Product) : Order.Order {
      Text.compare(product1.name, product2.name);
    };
  };

  type Category = {
    name : Text;
    icon : Text;
    products : [Product];
  };

  module Category {
    public func compare(category1 : Category, category2 : Category) : Order.Order {
      Text.compare(category1.name, category2.name);
    };
  };

  type Review = {
    name : Text;
    rating : Nat;
    comment : Text;
    date : Time.Time;
  };

  module Review {
    public func compare(review1 : Review, review2 : Review) : Order.Order {
      Int.compare(review2.date, review1.date);
    };
  };

  type Contact = {
    name : Text;
    phone : Text;
    message : Text;
    date : Time.Time;
  };

  module Contact {
    public func compareByDate(contact1 : Contact, contact2 : Contact) : Order.Order {
      Int.compare(contact2.date, contact1.date);
    };
  };

  let categories = List.empty<Category>();
  let reviews = List.empty<Review>();
  let contacts = List.empty<Contact>();

  let storeInfo = {
    name = "Sharma's Grocery";
    phone = "+91 12345 67890";
    address = "123 Main St, Mumbai";
    tagline = "Fresh groceries at your doorstep!";
  };

  // Populate categories from sample data
  func createProduct(name : Text, price : Nat, unit : Text, emoji : Text) : Product {
    { name; price; unit; emoji };
  };

  func createCategory(name : Text, icon : Text, products : [Product]) : Category {
    { name; icon; products };
  };

  categories.add(
    createCategory(
      "Fruits & Vegetables",
      "🥦",
      [
        createProduct("Apple", 50, "1kg", "🍎"),
        createProduct("Banana", 30, "1 dozen", "🍌"),
        createProduct("Potato", 25, "1kg", "🥔"),
      ],
    )
  );

  categories.add(
    createCategory(
      "Dairy Products",
      "🥛",
      [
        createProduct("Milk", 45, "1L", "🥛"),
        createProduct("Curd", 30, "500g", "🥣"),
        createProduct("Cheese", 120, "200g", "🧀"),
      ],
    )
  );

  categories.add(
    createCategory(
      "Snacks & Biscuits",
      "🍪",
      [
        createProduct("Parle-G", 10, "100g", "🍪"),
        createProduct("Kurkure", 20, "80g", "🥨"),
        createProduct("Chocolate", 50, "1 bar", "🍫"),
      ],
    )
  );

  categories.add(
    createCategory(
      "Rice Wheat & Pulses",
      "🌾",
      [
        createProduct("Basmati Rice", 60, "1kg", "🍚"),
        createProduct("Wheat Flour", 50, "1kg", "🌾"),
        createProduct("Toor Dal", 80, "1kg", "🥣"),
      ],
    )
  );

  categories.add(
    createCategory(
      "Beverages",
      "☕",
      [
        createProduct("Tea", 120, "250g", "🍵"),
        createProduct("Coffee", 200, "100g", "☕"),
        createProduct("Juice", 30, "500ml", "🧃"),
      ],
    )
  );

  categories.add(
    createCategory(
      "Daily Essentials",
      "🧴",
      [
        createProduct("Soap", 30, "1 bar", "🧼"),
        createProduct("Shampoo", 80, "100ml", "🧴"),
        createProduct("Toothpaste", 50, "100g", "🦷"),
      ],
    )
  );

  // Add sample reviews
  reviews.add(
    {
      name = "Rajesh";
      rating = 5;
      comment = "Great quality products!";
      date = Time.now() - 86400_000_000_000; // 1 day ago
    }
  );

  reviews.add(
    {
      name = "Priya";
      rating = 4;
      comment = "Fast delivery and fresh groceries.";
      date = Time.now() - 172_800_000_000_000; // 2 days ago
    }
  );

  reviews.add(
    {
      name = "Anil";
      rating = 5;
      comment = "Wide variety of products, very happy!";
      date = Time.now() - 259_200_000_000_000; // 3 days ago
    }
  );

  // Public Functions
  public query ({ caller }) func getCategories() : async [Category] {
    categories.toArray();
  };

  public query ({ caller }) func getStoreInfo() : async {
    storeInfo : {
      name : Text;
      phone : Text;
      address : Text;
      tagline : Text;
    };
  } {
    { storeInfo };
  };

  public query ({ caller }) func getReviews() : async [Review] {
    reviews.toArray().sort();
  };

  public shared ({ caller }) func submitContact(name : Text, phone : Text, message : Text) : async () {
    let contact : Contact = {
      name;
      phone;
      message;
      date = Time.now();
    };
    contacts.add(contact);
  };

  public shared ({ caller }) func addReview(name : Text, rating : Nat, comment : Text) : async () {
    if (rating < 1 or rating > 5) {
      Runtime.trap("Rating must be between 1 and 5");
    };

    let review : Review = {
      name;
      rating;
      comment;
      date = Time.now();
    };
    reviews.add(review);
  };

  public query ({ caller }) func getContacts() : async [Contact] {
    contacts.toArray().sort(Contact.compareByDate);
  };
};
