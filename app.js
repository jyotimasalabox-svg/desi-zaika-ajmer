/* ===================================================================
   DESI ZAIKA (देसी जायका) - MULTICUISINE RESTAURANT, MADAR, AJMER
   Interactive Application Script (Modern English Edition)
   Features:
   - Rich HD food photos for every single menu item
   - Interactive portion selector (Quarter / Half / Full)
   - Dynamic price calculation
   - Strict Ajmer delivery rules (Free >= ₹1000, ₹50 < ₹1000, 2 hrs speed)
   - 1-Click WhatsApp Order formatting & sending
   - Table reservation modal
   =================================================================== */

// WhatsApp number for Desi Zaika orders
const RESTAURANT_WHATSAPP = "919829012345"; 

// Complete Menu Database with Curated High-Definition Food Images
const MENU_DATABASE = [
  // ==================== MUTTON SPECIALS ====================
  {
    id: "mut_korma",
    category: "mutton",
    nameEn: "Mutton Korma",
    nameHi: "मटन कोरमा",
    desc: "Tender goat meat slow-cooked in a velvety gravy of caramelized onions, yogurt, and royal aromatic spices.",
    diet: "non-veg",
    image: "https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=700&q=80",
    badge: "House Signature",
    variants: [
      { name: "Half", price: 300 },
      { name: "Full", price: 600 }
    ],
    selectedVariantIndex: 0
  },
  {
    id: "mut_stew",
    category: "mutton",
    nameEn: "Mutton Stew",
    nameHi: "मटन स्टू",
    desc: "Traditional Mughlai stew cooked with whole whole-cut spices, slivered onions, ginger juliennes, and green chillies.",
    diet: "non-veg",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=700&q=80",
    badge: "Chef Special",
    variants: [
      { name: "Half", price: 350 },
      { name: "Full", price: 650 }
    ],
    selectedVariantIndex: 0
  },
  {
    id: "mut_kadai",
    category: "mutton",
    nameEn: "Mutton Kadai",
    nameHi: "मटन कढ़ाई",
    desc: "Juicy mutton tossed in a searing iron wok with roasted bell peppers, fresh tomatoes, and crushed coriander seeds.",
    diet: "non-veg",
    image: "https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=700&q=80",
    variants: [
      { name: "Half", price: 350 },
      { name: "Full", price: 700 }
    ],
    selectedVariantIndex: 0
  },
  {
    id: "mut_nahari_sada",
    category: "mutton",
    nameEn: "Mutton Nahari (Classic)",
    nameHi: "मटन नहारी सादा",
    desc: "Overnight slow-braised shank meat in a rich, silken broth infused with secret potli spices and fresh ginger.",
    diet: "non-veg",
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=700&q=80",
    badge: "Traditional",
    variants: [
      { name: "Half", price: 200 },
      { name: "Full", price: 400 }
    ],
    selectedVariantIndex: 0
  },
  {
    id: "mut_nahari_ghee",
    category: "mutton",
    nameEn: "Mutton Nahari (Pure Desi Ghee)",
    nameHi: "मटन नहारी देसी घी",
    desc: "Our prized slow-cooked nahari crowned with a sizzling aromatic tadka of pure golden desi ghee.",
    diet: "non-veg",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=700&q=80",
    badge: "Must Try",
    variants: [
      { name: "Half", price: 250 },
      { name: "Full", price: 500 }
    ],
    selectedVariantIndex: 0
  },
  {
    id: "mut_handi",
    category: "mutton",
    nameEn: "Desi Zaika Special Handi Mutton",
    nameHi: "मटन हांडी स्पेशल",
    desc: "Sealed inside an earthen pot (handi) over slow embers, locking in intense smoky aromas and melting bone marrow.",
    diet: "non-veg",
    image: "https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?auto=format&fit=crop&w=700&q=80",
    badge: "Bestseller",
    variants: [
      { name: "Half", price: 330 },
      { name: "Full", price: 660 }
    ],
    selectedVariantIndex: 0
  },

  // ==================== CHICKEN CURRIES ====================
  {
    id: "chk_changezi",
    category: "chicken",
    nameEn: "Chicken Changezi",
    nameHi: "चिकन चंगेज़ी",
    desc: "Smoky tandoori roasted chicken pieces simmered in an indulgent tangy tomato, cream, and curd sauce.",
    diet: "non-veg",
    image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=700&q=80",
    badge: "Top Seller",
    variants: [
      { name: "Quarter", price: 200 },
      { name: "Half", price: 400 },
      { name: "Full", price: 800 }
    ],
    selectedVariantIndex: 0
  },
  {
    id: "chk_butter",
    category: "chicken",
    nameEn: "Butter Chicken",
    nameHi: "बटर चिकन",
    desc: "Silky charred chicken enveloped in a sweet, mildly spiced makhani sauce laced with rich butter and fenugreek.",
    diet: "non-veg",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=700&q=80",
    badge: "Crowd Favorite",
    variants: [
      { name: "Quarter", price: 250 },
      { name: "Half", price: 400 },
      { name: "Full", price: 800 }
    ],
    selectedVariantIndex: 0
  },
  {
    id: "chk_korma",
    category: "chicken",
    nameEn: "Chicken Shahi Korma",
    nameHi: "चिकन कोरमा",
    desc: "A feast dish made with tender chicken, ground cashews, fragrant kewra essence, and roasted spices.",
    diet: "non-veg",
    image: "https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=700&q=80",
    variants: [
      { name: "Quarter", price: 250 },
      { name: "Half", price: 500 }
    ],
    selectedVariantIndex: 0
  },
  {
    id: "chk_kadai",
    category: "chicken",
    nameEn: "Kadai Chicken",
    nameHi: "कढ़ाई चिकन",
    desc: "Wok-fried chicken with crunchy diced capsicum, onions, and bold freshly pounded whole Indian spices.",
    diet: "non-veg",
    image: "https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?auto=format&fit=crop&w=700&q=80",
    variants: [
      { name: "Half", price: 300 },
      { name: "Full", price: 600 }
    ],
    selectedVariantIndex: 0
  },
  {
    id: "chk_handi",
    category: "chicken",
    nameEn: "Handi Chicken",
    nameHi: "हांडी चिकन",
    desc: "Simmered in a clay pot with desi spices, thick onion-tomato gravy, and fresh mint leaves.",
    diet: "non-veg",
    image: "https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=700&q=80",
    variants: [
      { name: "Half", price: 300 },
      { name: "Full", price: 600 }
    ],
    selectedVariantIndex: 0
  },

  // ==================== TANDOORI & STARTERS ====================
  {
    id: "dry_chk_roasted",
    category: "dry",
    nameEn: "Tandoori Roasted Chicken",
    nameHi: "चिकन रोस्टेड तन्दूरी",
    desc: "Marinated in mustard oil, Kashmiri paprika, and hang curd, then blistered over glowing clay oven charcoal.",
    diet: "non-veg",
    image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=700&q=80",
    badge: "Hot & Smoky",
    variants: [
      { name: "Half", price: 250 },
      { name: "Full", price: 500 }
    ],
    selectedVariantIndex: 0
  },
  {
    id: "dry_chk_afghani",
    category: "dry",
    nameEn: "Chicken Afghani (Creamy Tandoor)",
    nameHi: "चिकन अफ़गानी",
    desc: "Mild, melt-in-mouth chicken steeped in cashew cream, white pepper, melted butter, and royal herbs.",
    diet: "non-veg",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=700&q=80",
    variants: [
      { name: "Half", price: 250 },
      { name: "Full", price: 500 }
    ],
    selectedVariantIndex: 0
  },
  {
    id: "dry_chk_tikka",
    category: "dry",
    nameEn: "Boneless Chicken Tikka (6 Pcs)",
    nameHi: "चिकन टिक्का (6 पीस)",
    desc: "6 succulent boneless morsels skewered and grilled to juicy perfection with lemon and mint dip.",
    diet: "non-veg",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=700&q=80",
    variants: [{ name: "Plate (6 Pcs)", price: 320 }],
    selectedVariantIndex: 0
  },
  {
    id: "dry_chk_malai_tikka",
    category: "dry",
    nameEn: "Chicken Malai Tikka (6 Pcs)",
    nameHi: "चिकन मलाई टिक्का (6 पीस)",
    desc: "6 ultra-creamy boneless pieces infused with cream cheese, cardamom, and subtle green chillies.",
    diet: "non-veg",
    image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=700&q=80",
    variants: [{ name: "Plate (6 Pcs)", price: 320 }],
    selectedVariantIndex: 0
  },
  {
    id: "dry_chk_kebab",
    category: "dry",
    nameEn: "Chicken Seekh Kebab",
    nameHi: "चिकन कबाब",
    desc: "Minced chicken skewers blended with roasted coriander, fresh mint, and toasted garam masala.",
    diet: "non-veg",
    image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&w=700&q=80",
    variants: [{ name: "Full Plate", price: 260 }],
    selectedVariantIndex: 0
  },
  {
    id: "dry_mut_kebab",
    category: "dry",
    nameEn: "Mutton Seekh Kebab",
    nameHi: "मटन कबाब",
    desc: "Spiced minced mutton kebabs slow-grilled over white hot charcoal, served with sliced onions.",
    diet: "non-veg",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=700&q=80",
    badge: "Chef Special",
    variants: [{ name: "Full Plate", price: 300 }],
    selectedVariantIndex: 0
  },
  {
    id: "dry_chk_lollipop",
    category: "dry",
    nameEn: "Crispy Chicken Lollipop (6 Pcs)",
    nameHi: "चिकन लॉलीपॉप (6 पीस)",
    desc: "6 Indo-Chinese spiced crispy wings battered and fried golden brown with hot garlic dip.",
    diet: "non-veg",
    image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=700&q=80",
    variants: [{ name: "Plate (6 Pcs)", price: 300 }],
    selectedVariantIndex: 0
  },
  {
    id: "dry_chk_fry",
    category: "dry",
    nameEn: "Crispy Chicken Fry",
    nameHi: "चिकन फ्राई",
    desc: "Old-school Ajmer street style crispy battered chicken fry, heavily sprinkled with chaat masala.",
    diet: "non-veg",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=700&q=80",
    variants: [{ name: "Full Plate", price: 320 }],
    selectedVariantIndex: 0
  },

  // ==================== ROLLS & KEBABS ====================
  {
    id: "roll_mut_kebab",
    category: "rolls",
    nameEn: "Mutton Kebab Roll (Set of 2)",
    nameHi: "मटन कबाब रोल (2 रोल)",
    desc: "2 flaky parathas rolled around juicy mutton seekh kebabs, pickled onions, and spicy green chutney.",
    diet: "non-veg",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=700&q=80",
    badge: "2 Rolls",
    variants: [{ name: "Pair (2 Rolls)", price: 360 }],
    selectedVariantIndex: 0
  },
  {
    id: "roll_chk_tikka",
    category: "rolls",
    nameEn: "Chicken Tikka Roll (Set of 2)",
    nameHi: "चिकन टिक्का रोल (2 रोल)",
    desc: "2 toasted rolls loaded with diced smoky chicken tikka, creamy dressing, and tangy chaat sprinkles.",
    diet: "non-veg",
    image: "https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=700&q=80",
    variants: [{ name: "Pair (2 Rolls)", price: 350 }],
    selectedVariantIndex: 0
  },
  {
    id: "roll_chk_seekh",
    category: "rolls",
    nameEn: "Chicken Seekh Kebab Roll (Set of 2)",
    nameHi: "चिकन सींक कबाब रोल (2 रोल)",
    desc: "2 rolls filled with hot minced chicken seekh kebabs, sliced peppers, and minty curd relish.",
    diet: "non-veg",
    image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&w=700&q=80",
    variants: [{ name: "Pair (2 Rolls)", price: 290 }],
    selectedVariantIndex: 0
  },
  {
    id: "roll_chk_khurma",
    category: "rolls",
    nameEn: "Chicken Khurma Roll (Set of 2)",
    nameHi: "चिकन खुरमा रोल (2 रोल)",
    desc: "Savory bite-sized chicken khurma chunks in crisp buttered parathas (set of 2).",
    diet: "non-veg",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=700&q=80",
    variants: [{ name: "Pair (2 Rolls)", price: 120 }],
    selectedVariantIndex: 0
  },
  {
    id: "roll_chk_malai",
    category: "rolls",
    nameEn: "Chicken Malai Tikka Roll (Set of 2)",
    nameHi: "चिकन मलाई टिक्का रोल (2 रोल)",
    desc: "Mild, creamy boneless malai tikka rolled in soft roomali wrappers with house mayo.",
    diet: "non-veg",
    image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=700&q=80",
    variants: [{ name: "Pair (2 Rolls)", price: 300 }],
    selectedVariantIndex: 0
  },
  {
    id: "roll_special_order",
    category: "rolls",
    nameEn: "Desi Zaika Special Roll (On Order)",
    nameHi: "देसी जायका स्पेशल रोल",
    desc: "Chef's loaded secret double-meat roll made fresh to order with cheese, eggs, and rich butter.",
    diet: "non-veg",
    image: "https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=700&q=80",
    badge: "Signature Roll",
    variants: [{ name: "Special Roll", price: 300 }],
    selectedVariantIndex: 0
  },

  // ==================== BIRYANI & RICE ====================
  {
    id: "bir_chk_dum",
    category: "biryani",
    nameEn: "Dum Pukht Chicken Biryani",
    nameHi: "चिकन दम बिरयानी",
    desc: "Aged long-grain Dehraduni basmati rice slow-dum cooked with succulent marinated chicken, saffron, and mint.",
    diet: "non-veg",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=700&q=80",
    badge: "Royal Dum",
    variants: [{ name: "Full Plate", price: 220 }],
    selectedVariantIndex: 0
  },
  {
    id: "rice_plain",
    category: "biryani",
    nameEn: "Steamed Basmati Rice",
    nameHi: "प्लेन राईस प्लेट",
    desc: "Fluffy, fragrant steamed white basmati rice, perfect to pair with our rich mutton korma or dal fry.",
    diet: "veg",
    image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=700&q=80",
    variants: [{ name: "Plate", price: 100 }],
    selectedVariantIndex: 0
  },

  // ==================== VEGETARIAN DELIGHTS ====================
  {
    id: "veg_paneer_butter",
    category: "veg",
    nameEn: "Paneer Butter Masala",
    nameHi: "पनीर बटर मसाला",
    desc: "Fresh, pillowy cottage cheese cubes steeped in a silky makhani gravy enriched with butter and cashews.",
    diet: "veg",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=700&q=80",
    badge: "Veg Bestseller",
    variants: [
      { name: "Half", price: 200 },
      { name: "Full", price: 340 }
    ],
    selectedVariantIndex: 0
  },
  {
    id: "veg_kadai_paneer",
    category: "veg",
    nameEn: "Kadai Paneer",
    nameHi: "कढ़ाई पनीर",
    desc: "Paneer cubes and bell peppers tossed in a spicy, freshly pounded masala gravy with dried fenugreek.",
    diet: "veg",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=700&q=80",
    variants: [
      { name: "Half", price: 200 },
      { name: "Full", price: 340 }
    ],
    selectedVariantIndex: 0
  },
  {
    id: "veg_palak_paneer",
    category: "veg",
    nameEn: "Palak Paneer",
    nameHi: "पालक पनीर",
    desc: "Smooth spinach purée cooked with aromatic garlic, whole cumin, and fresh golden-fried paneer chunks.",
    diet: "veg",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80",
    variants: [
      { name: "Half", price: 200 },
      { name: "Full", price: 340 }
    ],
    selectedVariantIndex: 0
  },
  {
    id: "veg_dal_fry",
    category: "veg",
    nameEn: "Dal Fry Tadka",
    nameHi: "दाल फ्राई",
    desc: "Yellow lentils tempered with fragrant hing, golden garlic, whole red chillies, and pure ghee.",
    diet: "veg",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=700&q=80",
    variants: [
      { name: "Half", price: 100 },
      { name: "Full", price: 200 }
    ],
    selectedVariantIndex: 0
  },
  {
    id: "veg_aloo_chhole",
    category: "veg",
    nameEn: "Aloo Chhole Masaledar",
    nameHi: "आलू छोले",
    desc: "Hearty chickpeas and baby potatoes simmered in a spiced Punjabi tea-infused thick gravy.",
    diet: "veg",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=700&q=80",
    variants: [
      { name: "Half", price: 100 },
      { name: "Full", price: 200 }
    ],
    selectedVariantIndex: 0
  },
  {
    id: "veg_sev_tamatar",
    category: "veg",
    nameEn: "Rajasthani Sev Tamatar Special",
    nameHi: "स्पेशल सेव टमाटर",
    desc: "Ajmer's iconic comfort dish: spiced sweet-tangy tomato gravy topped with crunchy Ratlami sev.",
    diet: "veg",
    image: "https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=700&q=80",
    badge: "Ajmer Special",
    variants: [{ name: "Full Plate", price: 120 }],
    selectedVariantIndex: 0
  },

  // ==================== CHEF'S SPECIALS ====================
  {
    id: "spc_egg_curry",
    category: "special",
    nameEn: "Dhaba Style Egg Curry",
    nameHi: "अण्डा करी",
    desc: "Two golden-fried farm eggs simmered in a robust, homestyle highway dhaba masala gravy.",
    diet: "non-veg",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=700&q=80",
    variants: [{ name: "Plate (2 Eggs)", price: 120 }],
    selectedVariantIndex: 0
  },
  {
    id: "spc_murg_hara_dhaniya",
    category: "special",
    nameEn: "Murg Hara Dhaniya (Desi Zaika Special)",
    nameHi: "मुर्ग हरा धनिया स्पेशल",
    desc: "Chef's exclusive signature: chicken simmered in an aromatic cilantro, mint, and green chilli puree.",
    diet: "non-veg",
    image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=700&q=80",
    badge: "House Exclusive",
    variants: [
      { name: "Half", price: 300 },
      { name: "Full", price: 600 }
    ],
    selectedVariantIndex: 0
  },
  {
    id: "spc_kheer",
    category: "special",
    nameEn: "Desi Zaika Shahi Kheer",
    nameHi: "देसी जायका स्पेशल खीर",
    desc: "Traditional slow-reduced milk pudding laced with saffron, ground green cardamom, and toasted nuts.",
    diet: "veg",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=700&q=80",
    badge: "Dessert",
    variants: [{ name: "Bowl", price: 80 }],
    selectedVariantIndex: 0
  },

  // ==================== ROTI, NAAN & BREADS ====================
  {
    id: "bread_tandoori_plain",
    category: "roti",
    nameEn: "Tandoori Roti (Plain)",
    nameHi: "तन्दूरी रोटी प्लेन",
    desc: "Fresh whole-wheat dough baked against the blazing walls of our charcoal tandoor.",
    diet: "veg",
    image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=700&q=80",
    variants: [{ name: "1 Pc", price: 10 }],
    selectedVariantIndex: 0
  },
  {
    id: "bread_tandoori_butter",
    category: "roti",
    nameEn: "Tandoori Roti (Butter)",
    nameHi: "तन्दूरी रोटी बटर",
    desc: "Hot, crispy clay-oven baked roti generously brushed with melting fresh butter.",
    diet: "veg",
    image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=700&q=80",
    variants: [{ name: "1 Pc", price: 20 }],
    selectedVariantIndex: 0
  },
  {
    id: "bread_naan_plain",
    category: "roti",
    nameEn: "Tandoori Naan (Plain)",
    nameHi: "नान प्लेन",
    desc: "Light and blistered classic tandoori naan, pillowy soft with a subtle crunch.",
    diet: "veg",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80",
    variants: [{ name: "1 Pc", price: 20 }],
    selectedVariantIndex: 0
  },
  {
    id: "bread_naan_butter",
    category: "roti",
    nameEn: "Butter Naan",
    nameHi: "नान बटर",
    desc: "Glazed with pure butter, this tandoor-baked flatbread melts right into your gravy.",
    diet: "veg",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80",
    badge: "Popular",
    variants: [{ name: "1 Pc", price: 30 }],
    selectedVariantIndex: 0
  },
  {
    id: "bread_roomali",
    category: "roti",
    nameEn: "Roomali Roti",
    nameHi: "रूमाली रोटी",
    desc: "Paper-thin, handkerchief-soft Mughlai flatbread stretched and cooked on an inverted wok.",
    diet: "veg",
    image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=700&q=80",
    variants: [{ name: "1 Pc", price: 15 }],
    selectedVariantIndex: 0
  },
  {
    id: "bread_tawa_plain",
    category: "roti",
    nameEn: "Tawa Phulka (Plain)",
    nameHi: "तवा रोटी प्लेन",
    desc: "Homestyle whole wheat roti puffed up on open flame, light on the stomach.",
    diet: "veg",
    image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=700&q=80",
    variants: [{ name: "1 Pc", price: 10 }],
    selectedVariantIndex: 0
  },
  {
    id: "bread_tawa_butter",
    category: "roti",
    nameEn: "Tawa Phulka (Butter)",
    nameHi: "तवा रोटी बटर",
    desc: "Hot puffed tawa roti generously glazed with fresh butter.",
    diet: "veg",
    image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=700&q=80",
    variants: [{ name: "1 Pc", price: 20 }],
    selectedVariantIndex: 0
  },
  {
    id: "bread_bajre",
    category: "roti",
    nameEn: "Rajasthani Bajre ki Roti",
    nameHi: "बाजरे की रोटी प्लेन",
    desc: "Traditional pearl millet flatbread, rich in rustic flavor and wholesome earthy goodness.",
    diet: "veg",
    image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=700&q=80",
    badge: "Heritage",
    variants: [{ name: "1 Pc", price: 20 }],
    selectedVariantIndex: 0
  },
  {
    id: "bread_makki",
    category: "roti",
    nameEn: "Makki ki Roti",
    nameHi: "मक्की की रोटी",
    desc: "Golden yellow cornmeal flatbread, pan-roasted to a crispy aromatic finish.",
    diet: "veg",
    image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=700&q=80",
    variants: [{ name: "1 Pc", price: 10 }],
    selectedVariantIndex: 0
  },
  {
    id: "bread_bejad",
    category: "roti",
    nameEn: "Bejad Multigrain Roti",
    nameHi: "मिक्स रोटी बेजड़",
    desc: "Ajmer's indigenous multigrain bread made with barley, chickpeas, and wheat.",
    diet: "veg",
    image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=700&q=80",
    variants: [{ name: "1 Pc", price: 20 }],
    selectedVariantIndex: 0
  },
  {
    id: "bread_baati",
    category: "roti",
    nameEn: "Traditional Baati",
    nameHi: "बाटी (Baati)",
    desc: "Hard wheat dough balls slow-baked in charcoal, ready to be crushed into curries or dal.",
    diet: "veg",
    image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=700&q=80",
    variants: [{ name: "Per Pc", price: 20 }],
    selectedVariantIndex: 0
  },

  // ==================== SALADS & DRINKS ====================
  {
    id: "side_salad",
    category: "sides",
    nameEn: "Fresh Green Garden Salad",
    nameHi: "सलाद वेजीटेबिल",
    desc: "Crisp sliced cucumbers, ripe tomatoes, spicy onions, lemon wedges, and fiery green chillies.",
    diet: "veg",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=80",
    variants: [{ name: "Full Plate", price: 30 }],
    selectedVariantIndex: 0
  },
  {
    id: "side_water",
    category: "sides",
    nameEn: "Packaged Mineral Water (1 Liter)",
    nameHi: "पानी की बोतल (1 लीटर)",
    desc: "Chilled, sealed, hygienic 1000ml drinking water bottle.",
    diet: "veg",
    image: "https://images.unsplash.com/photo-1559839914-ba2ae6477683?auto=format&fit=crop&w=700&q=80",
    variants: [{ name: "1 Liter Bottle", price: 20 }],
    selectedVariantIndex: 0
  },
  {
    id: "side_colddrink",
    category: "sides",
    nameEn: "Chilled Soft Drink",
    nameHi: "कोल्डड्रिंक (ठंडी बोतल)",
    desc: "Thums Up, Coca Cola, Sprite, or Fanta (served chilled as per availability).",
    diet: "veg",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=700&q=80",
    variants: [{ name: "Chilled Bottle", price: 40 }],
    selectedVariantIndex: 0
  },
  {
    id: "side_icecream",
    category: "sides",
    nameEn: "Rich Dairy Ice Cream",
    nameHi: "आईसक्रीम",
    desc: "Smooth creamy scoop available in Vanilla, Butterscotch, or Belgian Chocolate.",
    diet: "veg",
    image: "https://images.unsplash.com/photo-1576506295286-5cda18df43e7?auto=format&fit=crop&w=700&q=80",
    variants: [{ name: "Single Scoop", price: 50 }],
    selectedVariantIndex: 0
  }
];

// Cart State (keyed by itemId_variantIndex)
let CART = {};

// Active Filter State
let currentCategory = "all";
let currentDiet = "all";
let searchQuery = "";

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
  loadCartFromStorage();
  renderMenu();
  updateCartUI();

  // Mobile menu toggle
  const toggleBtn = document.getElementById("mobileMenuToggle");
  const drawer = document.getElementById("mobileNavDrawer");
  if (toggleBtn && drawer) {
    toggleBtn.addEventListener("click", () => {
      drawer.classList.toggle("active");
    });
  }

  // Cart button
  const cartBtn = document.getElementById("cartOpenBtn");
  if (cartBtn) {
    cartBtn.addEventListener("click", openCartDrawer);
  }

  // Pre-fill reservation date
  const resDate = document.getElementById("resDate");
  if (resDate) {
    const today = new Date().toISOString().split("T")[0];
    resDate.min = today;
    resDate.value = today;
  }
});

/* ===================================================================
   MENU RENDERING & FILTERS
   =================================================================== */
function renderMenu() {
  const grid = document.getElementById("menuItemsGrid");
  const noState = document.getElementById("noItemsState");
  if (!grid) return;

  const filteredItems = MENU_DATABASE.filter(item => {
    const matchCategory = (currentCategory === "all") || (item.category === currentCategory);
    const matchDiet = (currentDiet === "all") || (item.diet === currentDiet);
    const query = searchQuery.trim().toLowerCase();
    const matchSearch = !query || 
      item.nameEn.toLowerCase().includes(query) || 
      item.nameHi.toLowerCase().includes(query) ||
      item.desc.toLowerCase().includes(query);

    return matchCategory && matchDiet && matchSearch;
  });

  if (filteredItems.length === 0) {
    grid.innerHTML = "";
    if (noState) noState.style.display = "block";
    return;
  }

  if (noState) noState.style.display = "none";

  grid.innerHTML = filteredItems.map(item => {
    const activeVar = item.variants[item.selectedVariantIndex] || item.variants[0];
    const cartKey = `${item.id}_${item.selectedVariantIndex}`;
    const qtyInCart = CART[cartKey] ? CART[cartKey].qty : 0;

    // Portion Selector Chips
    const variantsHtml = item.variants.length > 1 ? `
      <div class="dish-portion-chips">
        ${item.variants.map((v, idx) => `
          <button type="button" class="portion-chip ${idx === item.selectedVariantIndex ? 'active' : ''}" 
                  onclick="selectItemVariant('${item.id}', ${idx})">
            ${v.name} • ₹${v.price}
          </button>
        `).join('')}
      </div>
    ` : '';

    // Action button or quantity stepper
    const actionHtml = qtyInCart > 0 ? `
      <div class="dish-card-stepper">
        <button type="button" onclick="decrementCart('${cartKey}')" title="Decrease">−</button>
        <span>${qtyInCart}</span>
        <button type="button" onclick="incrementCart('${cartKey}')" title="Increase">+</button>
      </div>
    ` : `
      <button type="button" class="btn-dish-add" onclick="addToCart('${item.id}', ${item.selectedVariantIndex})">
        <i class="fa-solid fa-plus"></i> Add to Order
      </button>
    `;

    const badgeHtml = item.badge ? `<span class="dish-top-badge">${item.badge}</span>` : '';

    return `
      <article class="dish-card" id="card-${item.id}">
        <div class="dish-media">
          <img src="${item.image}" alt="${item.nameEn}" loading="lazy" class="dish-thumbnail"
               onerror="this.onerror=null; this.src='assets/images/hero-entrance.jpg';">
          <div class="dish-media-overlay"></div>
          ${badgeHtml}
          <div class="dish-diet-indicator ${item.diet}" title="${item.diet === 'veg' ? 'Pure Vegetarian' : 'Non-Vegetarian'}">
            <span class="diet-symbol"></span>
          </div>
        </div>

        <div class="dish-content">
          <div class="dish-header">
            <div>
              <span class="dish-category-crumb">${getCategoryLabel(item.category)}</span>
              <h3 class="dish-title-en">${item.nameEn}</h3>
              <span class="dish-title-hi">${item.nameHi}</span>
            </div>
          </div>

          <p class="dish-description">${item.desc}</p>
          ${variantsHtml}

          <div class="dish-footer-row">
            <div class="dish-price-tag">
              <span class="price-portion-label">${activeVar.name}</span>
              <span class="price-amount">₹${activeVar.price}</span>
            </div>
            <div class="dish-action-area" id="action-box-${item.id}">
              ${actionHtml}
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function getCategoryLabel(cat) {
  const map = {
    mutton: "Mutton Royals",
    chicken: "Chicken Delights",
    dry: "Tandoori & Starters",
    rolls: "Signature Rolls",
    biryani: "Dum Biryani & Rice",
    veg: "Vegetarian Specials",
    special: "Chef Exclusives",
    roti: "Breads & Baati",
    sides: "Salad & Drinks"
  };
  return map[cat] || "Special";
}

function selectCategory(cat) {
  currentCategory = cat;
  document.querySelectorAll(".cat-tab").forEach(tab => {
    tab.classList.toggle("active", tab.getAttribute("data-cat") === cat);
  });
  renderMenu();
}

function setDietFilter(diet) {
  currentDiet = diet;
  document.querySelectorAll(".diet-btn").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-diet") === diet);
  });
  renderMenu();
}

function filterMenuItems() {
  const input = document.getElementById("menuSearchInput");
  const clearBtn = document.getElementById("clearSearchBtn");
  searchQuery = input ? input.value : "";
  if (clearBtn) {
    clearBtn.style.display = searchQuery ? "block" : "none";
  }
  renderMenu();
}

function clearMenuSearch() {
  const input = document.getElementById("menuSearchInput");
  if (input) input.value = "";
  searchQuery = "";
  const clearBtn = document.getElementById("clearSearchBtn");
  if (clearBtn) clearBtn.style.display = "none";
  renderMenu();
}

function resetFilters() {
  currentCategory = "all";
  currentDiet = "all";
  clearMenuSearch();
  selectCategory("all");
  setDietFilter("all");
}

function selectItemVariant(itemId, varIdx) {
  const item = MENU_DATABASE.find(i => i.id === itemId);
  if (item) {
    item.selectedVariantIndex = varIdx;
    renderMenu();
  }
}

/* ===================================================================
   CART & AJMER DELIVERY CALCULATION LOGIC
   =================================================================== */
function addToCart(itemId, varIdx) {
  const item = MENU_DATABASE.find(i => i.id === itemId);
  if (!item) return;

  const variant = item.variants[varIdx];
  const cartKey = `${itemId}_${varIdx}`;

  if (!CART[cartKey]) {
    CART[cartKey] = {
      id: item.id,
      nameEn: item.nameEn,
      nameHi: item.nameHi,
      variantName: variant.name,
      price: variant.price,
      image: item.image,
      qty: 1
    };
  } else {
    CART[cartKey].qty += 1;
  }

  saveCartToStorage();
  updateCartUI();
  renderMenu();
  showToast(`Added "${item.nameEn} (${variant.name})" to cart!`);
}

function incrementCart(cartKey) {
  if (CART[cartKey]) {
    CART[cartKey].qty += 1;
    saveCartToStorage();
    updateCartUI();
    renderMenu();
  }
}

function decrementCart(cartKey) {
  if (CART[cartKey]) {
    CART[cartKey].qty -= 1;
    if (CART[cartKey].qty <= 0) {
      delete CART[cartKey];
    }
    saveCartToStorage();
    updateCartUI();
    renderMenu();
  }
}

function removeFromCart(cartKey) {
  if (CART[cartKey]) {
    const name = CART[cartKey].nameEn;
    delete CART[cartKey];
    saveCartToStorage();
    updateCartUI();
    renderMenu();
    showToast(`Removed "${name}" from cart`);
  }
}

function calculateSubtotal() {
  let subtotal = 0;
  for (const k in CART) {
    subtotal += CART[k].price * CART[k].qty;
  }
  return subtotal;
}

function getTotalCount() {
  let count = 0;
  for (const k in CART) {
    count += CART[k].qty;
  }
  return count;
}

function updateCartUI() {
  const subtotal = calculateSubtotal();
  const totalCount = getTotalCount();

  // Strict Delivery Rules:
  // - Delivery strictly ONLY in Ajmer.
  // - Orders >= ₹1,000: FREE Delivery.
  // - Orders < ₹1,000: Flat ₹50 delivery charge (if cart > 0).
  let deliveryFee = 0;
  if (subtotal > 0) {
    deliveryFee = subtotal >= 1000 ? 0 : 50;
  }
  const grandTotal = subtotal + deliveryFee;

  // Header Cart Badge & Totals
  const badge = document.getElementById("cartBadgeCount");
  const headTotal = document.getElementById("cartHeaderTotal");
  if (badge) badge.innerText = totalCount;
  if (headTotal) headTotal.innerText = `₹${grandTotal}`;

  // Mobile Sticky Bar
  const floatBar = document.getElementById("floatingCartBar");
  const floatCount = document.getElementById("floatingCartCount");
  const floatTotal = document.getElementById("floatingCartTotal");
  if (floatBar) {
    if (totalCount > 0) {
      floatBar.style.display = "block";
      if (floatCount) floatCount.innerText = `${totalCount} item${totalCount > 1 ? 's' : ''}`;
      if (floatTotal) floatTotal.innerText = `₹${grandTotal}`;
    } else {
      floatBar.style.display = "none";
    }
  }

  // Free Delivery Tracker inside Cart
  const trackerMsg = document.getElementById("trackerMessage");
  const trackerFill = document.getElementById("trackerBarFill");
  if (trackerMsg && trackerFill) {
    if (subtotal === 0) {
      trackerMsg.innerHTML = `<span>Spend ₹1,000+ for <strong>FREE Ajmer Delivery</strong>!</span>`;
      trackerFill.style.width = "0%";
    } else if (subtotal >= 1000) {
      trackerMsg.innerHTML = `<span class="text-gold">🎉 Congratulations! You have unlocked <strong>FREE Delivery</strong>!</span>`;
      trackerFill.style.width = "100%";
      trackerFill.style.background = "#22c55e";
    } else {
      const remaining = 1000 - subtotal;
      const pct = Math.min(100, Math.round((subtotal / 1000) * 100));
      trackerMsg.innerHTML = `Add <strong>₹${remaining}</strong> more for <strong>FREE Delivery</strong>! <span style="opacity:0.75">(or flat ₹50 applies)</span>`;
      trackerFill.style.width = `${pct}%`;
      trackerFill.style.background = "linear-gradient(90deg, #ffb703 0%, #22c55e 100%)";
    }
  }

  // Cart Drawer Items List
  const itemsContainer = document.getElementById("cartItemsList");
  const emptyView = document.getElementById("cartEmptyView");
  const footer = document.getElementById("cartFooter");

  if (itemsContainer && emptyView && footer) {
    if (totalCount === 0) {
      itemsContainer.innerHTML = "";
      itemsContainer.style.display = "none";
      emptyView.style.display = "flex";
      footer.style.display = "none";
    } else {
      emptyView.style.display = "none";
      itemsContainer.style.display = "flex";
      footer.style.display = "block";

      itemsContainer.innerHTML = Object.keys(CART).map(key => {
        const item = CART[key];
        const lineTotal = item.price * item.qty;
        return `
          <div class="cart-item-row">
            <img src="${item.image}" alt="${item.nameEn}" class="cart-item-thumb"
                 onerror="this.onerror=null; this.src='assets/images/hero-entrance.jpg';">
            <div class="cart-item-info">
              <div class="cart-item-title">${item.nameEn}</div>
              <div class="cart-item-variant">${item.variantName} • ₹${item.price} each</div>
            </div>

            <div class="cart-item-controls">
              <div class="cart-stepper">
                <button type="button" onclick="decrementCart('${key}')">−</button>
                <span>${item.qty}</span>
                <button type="button" onclick="incrementCart('${key}')">+</button>
              </div>
              <div class="cart-item-subtotal">₹${lineTotal}</div>
              <button type="button" class="cart-item-del-btn" onclick="removeFromCart('${key}')" title="Remove">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  // Bill Summary Totals
  const subtotalEl = document.getElementById("billSubtotal");
  const deliveryFeeEl = document.getElementById("billDeliveryFee");
  const grandTotalEl = document.getElementById("billGrandTotal");

  if (subtotalEl) subtotalEl.innerText = `₹${subtotal}`;
  if (deliveryFeeEl) {
    if (subtotal >= 1000) {
      deliveryFeeEl.innerHTML = `<span style="color:#22c55e; font-weight:700;">FREE (मुफ़्त)</span>`;
    } else {
      deliveryFeeEl.innerText = `₹${deliveryFee}`;
    }
  }
  if (grandTotalEl) grandTotalEl.innerText = `₹${grandTotal}`;
}

function saveCartToStorage() {
  try {
    localStorage.setItem("dz_cart_v2", JSON.stringify(CART));
  } catch (e) {}
}

function loadCartFromStorage() {
  try {
    const raw = localStorage.getItem("dz_cart_v2");
    if (raw) CART = JSON.parse(raw);
  } catch (e) {
    CART = {};
  }
}

/* ===================================================================
   CART DRAWER CONTROLS
   =================================================================== */
function openCartDrawer() {
  const drawer = document.getElementById("cartDrawer");
  const overlay = document.getElementById("cartOverlay");
  if (drawer && overlay) {
    drawer.classList.add("active");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeCartDrawer() {
  const drawer = document.getElementById("cartDrawer");
  const overlay = document.getElementById("cartOverlay");
  if (drawer && overlay) {
    drawer.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }
}

/* ===================================================================
   WHATSAPP ORDER DISPATCH
   =================================================================== */
function submitWhatsAppOrder() {
  const subtotal = calculateSubtotal();
  if (subtotal === 0) {
    showToast("⚠️ Your cart is empty! Please add dishes first.");
    return;
  }

  const name = document.getElementById("custName").value.trim();
  const phone = document.getElementById("custPhone").value.trim();
  const area = document.getElementById("custArea").value;
  const address = document.getElementById("custAddress").value.trim();

  if (!name || !phone || !address) {
    showToast("⚠️ Please fill in your Name, Phone and Delivery Address in Ajmer!");
    return;
  }

  const deliveryFee = subtotal >= 1000 ? 0 : 50;
  const grandTotal = subtotal + deliveryFee;

  let itemsList = "";
  let counter = 1;
  for (const k in CART) {
    const item = CART[k];
    itemsList += `${counter}. *${item.nameEn}* (${item.variantName}) x ${item.qty} = ₹${item.price * item.qty}\n`;
    counter++;
  }

  const deliveryNote = deliveryFee === 0 
    ? "FREE DELIVERY (Order over ₹1000)" 
    : "₹50 (Flat Ajmer Delivery Charge)";

  const message = `🍽️ *NEW FOOD ORDER - DESI ZAIKA (MADAR, AJMER)*
----------------------------------------------
👤 *Customer Name:* ${name}
📱 *Contact Number:* ${phone}
📍 *Ajmer Locality:* ${area}
🏠 *Complete Address:* ${address}
----------------------------------------------
📋 *ORDERED DISHES:*
${itemsList}----------------------------------------------
💰 *Food Subtotal:* ₹${subtotal}
🚚 *Ajmer Delivery Fee:* ${deliveryNote}
🌟 *GRAND TOTAL:* ₹${grandTotal}
----------------------------------------------
⏱️ *Delivery Promise:* Within 2 Hours (Guaranteed Hot Delivery)
📍 *Restaurant:* Desi Zaika, Near Raj Garden, Vinayak Nagar, Madar, Ajmer
🗺️ *Google Maps:* https://maps.app.goo.gl/Bj1pRUUsHpYYUhWW7

Please confirm my order and share estimated arrival time. Thank you!`;

  const waUrl = `https://wa.me/${RESTAURANT_WHATSAPP}?text=${encodeURIComponent(message)}`;
  window.open(waUrl, "_blank");

  showToast("🚀 Order sent to WhatsApp successfully!");
  closeCartDrawer();
}

function openWhatsAppDirectOrder() {
  const msg = `Hello Desi Zaika (Madar, Ajmer)! I want to order food. Please share today's specials and estimated delivery time within Ajmer.`;
  const waUrl = `https://wa.me/${RESTAURANT_WHATSAPP}?text=${encodeURIComponent(msg)}`;
  window.open(waUrl, "_blank");
}

/* ===================================================================
   TABLE RESERVATION MODAL
   =================================================================== */
function openReservationModal() {
  const modal = document.getElementById("reservationModal");
  if (modal) modal.classList.add("active");
}

function closeReservationModal() {
  const modal = document.getElementById("reservationModal");
  if (modal) modal.classList.remove("active");
}

function submitReservationWhatsApp() {
  const name = document.getElementById("resName").value.trim();
  const phone = document.getElementById("resPhone").value.trim();
  const date = document.getElementById("resDate").value;
  const time = document.getElementById("resTime").value;
  const guests = document.getElementById("resGuests").value;
  const notes = document.getElementById("resNotes").value.trim();

  const msg = `🍽️ *TABLE / PARTY RESERVATION - DESI ZAIKA AJMER*
----------------------------------------------
👤 *Name:* ${name}
📱 *Phone:* ${phone}
📅 *Date:* ${date}
⏰ *Time:* ${time}
👥 *Number of Guests:* ${guests} People
📝 *Special Note:* ${notes || 'Standard Dine-in'}
----------------------------------------------
Please confirm our reservation at Desi Zaika Madar. Thank you!`;

  const waUrl = `https://wa.me/${RESTAURANT_WHATSAPP}?text=${encodeURIComponent(msg)}`;
  window.open(waUrl, "_blank");
  closeReservationModal();
  showToast("📅 Reservation request dispatched to WhatsApp!");
}

/* ===================================================================
   ORIGINAL MENU CARD VIEWER
   =================================================================== */
function openOriginalMenuModal() {
  const modal = document.getElementById("menuCardsModal");
  if (modal) modal.classList.add("active");
}

function closeOriginalMenuModal() {
  const modal = document.getElementById("menuCardsModal");
  if (modal) modal.classList.remove("active");
}

function switchMenuCard(type) {
  const img = document.getElementById("activeMenuCardImg");
  const tabs = document.querySelectorAll(".card-tab");
  if (!img) return;

  if (type === "main") {
    img.src = "assets/images/menu-card-main.jpg";
    img.alt = "Desi Zaika Original Menu Card - Mutton, Chicken, Starters";
    tabs[0].classList.add("active");
    tabs[1].classList.remove("active");
  } else {
    img.src = "assets/images/menu-card-breads.jpg";
    img.alt = "Desi Zaika Original Menu Card - Roti, Breads, Baati";
    tabs[0].classList.remove("active");
    tabs[1].classList.add("active");
  }
}

/* ===================================================================
   LIGHTBOX FOR GALLERY
   =================================================================== */
function openLightbox(src, title) {
  const modal = document.getElementById("lightboxModal");
  const img = document.getElementById("lightboxImg");
  const caption = document.getElementById("lightboxTitle");
  if (modal && img) {
    img.src = src;
    if (caption) caption.innerText = title || "Desi Zaika Madar, Ajmer";
    modal.classList.add("active");
  }
}

function closeLightbox(e) {
  if (e.target.id === "lightboxModal" || e.target.classList.contains("lightbox-close")) {
    const modal = document.getElementById("lightboxModal");
    if (modal) modal.classList.remove("active");
  }
}

function closeLightboxDirect() {
  const modal = document.getElementById("lightboxModal");
  if (modal) modal.classList.remove("active");
}

/* ===================================================================
   DELIVERY AREA CHECKER
   =================================================================== */
function updateAreaDeliveryEstimate() {
  const select = document.getElementById("ajmerAreaSelect");
  const display = document.getElementById("calcResultDisplay");
  if (!select || !display) return;

  const val = select.value;
  let text = "";
  if (val === "madar") {
    text = "<strong>Madar & Vinayak Nagar:</strong> Fastest delivery within 20 to 35 mins! Free delivery over ₹1,000.";
  } else if (val === "kundan_nagar") {
    text = "<strong>Kundan Nagar:</strong> Neighboring zone, delivered hot in 30 to 45 mins! Free delivery over ₹1,000.";
  } else if (val === "vaishali_nagar" || val === "panchsheel") {
    text = "<strong>Vaishali Nagar / Panchsheel:</strong> Delivered fresh in 45 to 65 mins! 2-hour guarantee.";
  } else {
    text = "<strong>Ajmer City Delivery:</strong> Guaranteed steaming hot delivery within 2 hours to your doorstep!";
  }

  display.innerHTML = `
    <div class="calc-status success">
      <i class="fa-solid fa-circle-check"></i>
      <span>${text}</span>
    </div>
  `;
}

/* ===================================================================
   TOAST HELPER
   =================================================================== */
function showToast(message) {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast-msg";
  toast.innerHTML = `<span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(20px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 350);
  }, 3200);
}
