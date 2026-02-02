export type MenuItem = {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: "hamburguesas" | "bebidas-sin-alcohol" | "bebidas-con-alcohol" | "papas-y-aros" | "postres"
  customizable?: boolean
  ingredients?: string[]
  extras?: { name: string; price: number }[]
  servings?: string
}

export type OrderItem = MenuItem & {
  quantity: number
  removedIngredients: string[]
  addedExtras: { name: string; price: number; quantity: number }[]
}

export type TableStatus = "available" | "occupied" | "calling" | "bill" | "dirty"

export type Table = {
  id: number
  status: TableStatus
  order: OrderItem[]
  guests?: number
}

export const mockMenu: MenuItem[] = [
  // Hamburguesas
  {
    id: "burger-1",
    name: "Smash Clasica",
    description: "Medallon de carne smash con lechuga, tomate y nuestra salsa secreta",
    price: 8500,
    image: "/images/classic-burger.jpg",
    category: "hamburguesas",
    customizable: true,
    ingredients: ["Lechuga", "Tomate", "Cebolla", "Pepinillos", "Salsa Secreta"],
    extras: [
      { name: "Panceta", price: 1200 },
      { name: "Cheddar Extra", price: 800 },
      { name: "Jalapeños", price: 600 },
      { name: "Huevo Frito", price: 900 },
    ],
  },
  {
    id: "burger-2",
    name: "Bacon Beast",
    description: "Doble panceta crocante, cebolla caramelizada y cheddar fundido",
    price: 10500,
    image: "/images/bacon-burger.jpg",
    category: "hamburguesas",
    customizable: true,
    ingredients: ["Lechuga", "Tomate", "Cebolla Caramelizada", "Panceta", "Cheddar"],
    extras: [
      { name: "Panceta Extra", price: 1500 },
      { name: "Cheddar Extra", price: 800 },
      { name: "Jalapeños", price: 600 },
      { name: "Palta", price: 1200 },
    ],
  },
  {
    id: "burger-3",
    name: "Doble Smash",
    description: "Dos medallones smash con doble queso y todos los condimentos",
    price: 11500,
    image: "/images/double-burger.jpg",
    category: "hamburguesas",
    customizable: true,
    ingredients: ["Lechuga", "Tomate", "Cebolla", "Pepinillos", "Doble Queso"],
    extras: [
      { name: "Panceta", price: 1200 },
      { name: "Medallon Extra", price: 2500 },
      { name: "Jalapeños", price: 600 },
      { name: "Hongos", price: 900 },
    ],
  },
  {
    id: "burger-4",
    name: "Criolla",
    description: "Medallon con chimichurri casero, provoleta y cebolla grillada",
    price: 9800,
    image: "/images/criolla-burger.jpg",
    category: "hamburguesas",
    customizable: true,
    ingredients: ["Chimichurri", "Provoleta", "Cebolla Grillada", "Lechuga", "Tomate"],
    extras: [
      { name: "Provoleta Extra", price: 1000 },
      { name: "Panceta", price: 1200 },
      { name: "Huevo Frito", price: 900 },
      { name: "Pimientos Asados", price: 800 },
    ],
  },
  {
    id: "burger-5",
    name: "BBQ Deluxe",
    description: "Panceta, aros de cebolla crocantes y salsa BBQ ahumada",
    price: 10800,
    image: "/images/bbq-burger.jpg",
    category: "hamburguesas",
    customizable: true,
    ingredients: ["Panceta", "Aros de Cebolla", "Salsa BBQ", "Cheddar", "Lechuga"],
    extras: [
      { name: "Panceta Extra", price: 1500 },
      { name: "Cheddar Extra", price: 800 },
      { name: "Jalapeños", price: 600 },
      { name: "Huevo Frito", price: 900 },
    ],
  },
  {
    id: "burger-6",
    name: "Veggie Smash",
    description: "Medallon vegetal con palta, brotes y mayonesa de chipotle",
    price: 9200,
    image: "/images/veggie-burger.jpg",
    category: "hamburguesas",
    customizable: true,
    ingredients: ["Lechuga", "Tomate", "Palta", "Brotes", "Mayo Chipotle"],
    extras: [
      { name: "Palta Extra", price: 1200 },
      { name: "Queso Vegano", price: 1000 },
      { name: "Jalapeños", price: 600 },
      { name: "Hongos", price: 900 },
    ],
  },

  // Papas y Aros
  {
    id: "papas-med",
    name: "Papas Medianas",
    description: "Papas crocantes con sal marina",
    price: 3200,
    image: "/images/fries.jpg",
    category: "papas-y-aros",
    servings: "Para 1-2 personas",
    customizable: true,
    ingredients: ["Sal Marina"],
    extras: [
      { name: "Cheddar Fundido", price: 800 },
      { name: "Panceta Crocante", price: 1200 },
      { name: "Verdeo", price: 400 },
    ],
  },
  {
    id: "papas-gde",
    name: "Papas Grandes",
    description: "Porcion grande de papas crocantes",
    price: 4500,
    image: "/images/fries.jpg",
    category: "papas-y-aros",
    servings: "Para 3 personas",
    customizable: true,
    ingredients: ["Sal Marina"],
    extras: [
      { name: "Cheddar Fundido", price: 800 },
      { name: "Panceta Crocante", price: 1200 },
      { name: "Verdeo", price: 400 },
    ],
  },
  {
    id: "papas-volcan",
    name: "Papas Volcan",
    description: "Papas cargadas con cheddar, panceta y verdeo",
    price: 6800,
    image: "/images/fries.jpg",
    category: "papas-y-aros",
    servings: "Para 4-5 personas",
    customizable: true,
    ingredients: ["Cheddar Fundido", "Panceta", "Verdeo", "Crema"],
    extras: [
      { name: "Cheddar Extra", price: 800 },
      { name: "Panceta Extra", price: 1200 },
      { name: "Jalapeños", price: 600 },
    ],
  },
  {
    id: "aros-med",
    name: "Aros de Cebolla Medianos",
    description: "Aros de cebolla rebozados crocantes",
    price: 3500,
    image: "/images/onion-rings.jpg",
    category: "papas-y-aros",
    servings: "Para 1-2 personas",
    customizable: true,
    ingredients: ["Rebozado Especial"],
    extras: [
      { name: "Salsa Ranch", price: 500 },
      { name: "Salsa BBQ", price: 400 },
      { name: "Mayo Picante", price: 500 },
    ],
  },
  {
    id: "aros-gde",
    name: "Aros de Cebolla Grandes",
    description: "Porcion grande de aros crocantes",
    price: 4800,
    image: "/images/onion-rings.jpg",
    category: "papas-y-aros",
    servings: "Para 3 personas",
    customizable: true,
    ingredients: ["Rebozado Especial"],
    extras: [
      { name: "Salsa Ranch", price: 500 },
      { name: "Salsa BBQ", price: 400 },
      { name: "Mayo Picante", price: 500 },
    ],
  },
  {
    id: "aros-volcan",
    name: "Aros Volcan",
    description: "Aros con cheddar fundido y panceta crocante",
    price: 7200,
    image: "/images/onion-rings.jpg",
    category: "papas-y-aros",
    servings: "Para 4-5 personas",
    customizable: true,
    ingredients: ["Cheddar Fundido", "Panceta", "Verdeo"],
    extras: [
      { name: "Cheddar Extra", price: 800 },
      { name: "Panceta Extra", price: 1200 },
      { name: "Jalapeños", price: 600 },
    ],
  },
  {
    id: "nuggets",
    name: "Nuggets de Pollo x8",
    description: "Nuggets de pollo crocantes con salsa a eleccion",
    price: 4200,
    image: "/images/nuggets.jpg",
    category: "papas-y-aros",
    servings: "Para 1-2 personas",
    customizable: true,
    ingredients: ["Rebozado Crocante"],
    extras: [
      { name: "Salsa Ranch", price: 500 },
      { name: "Salsa BBQ", price: 400 },
      { name: "Ketchup", price: 0 },
      { name: "Mostaza Miel", price: 400 },
    ],
  },

  // Bebidas Sin Alcohol
  {
    id: "coca",
    name: "Coca-Cola",
    description: "Coca-Cola bien fria 500ml",
    price: 2200,
    image: "/images/cola.jpg",
    category: "bebidas-sin-alcohol",
    customizable: true,
    ingredients: ["Hielo"],
    extras: [
      { name: "Sin Hielo", price: 0 },
      { name: "Rodaja de Limon", price: 200 },
    ],
  },
  {
    id: "sprite",
    name: "Sprite",
    description: "Sprite refrescante 500ml",
    price: 2200,
    image: "/images/sprite.jpg",
    category: "bebidas-sin-alcohol",
    customizable: true,
    ingredients: ["Hielo"],
    extras: [
      { name: "Sin Hielo", price: 0 },
      { name: "Rodaja de Limon", price: 200 },
    ],
  },
  {
    id: "agua",
    name: "Agua Mineral",
    description: "Agua mineral con o sin gas 500ml",
    price: 1500,
    image: "/images/agua.jpg",
    category: "bebidas-sin-alcohol",
    customizable: true,
    ingredients: [],
    extras: [
      { name: "Con Gas", price: 0 },
      { name: "Sin Gas", price: 0 },
    ],
  },
  {
    id: "limonada",
    name: "Limonada Casera",
    description: "Limonada fresca con menta y jengibre",
    price: 2800,
    image: "/images/limonada.jpg",
    category: "bebidas-sin-alcohol",
    customizable: true,
    ingredients: ["Menta", "Jengibre", "Hielo"],
    extras: [
      { name: "Sin Menta", price: 0 },
      { name: "Mas Dulce", price: 0 },
    ],
  },
  {
    id: "milkshake-choco",
    name: "Milkshake Chocolate",
    description: "Batido cremoso de chocolate con crema",
    price: 4500,
    image: "/images/milkshake.jpg",
    category: "bebidas-sin-alcohol",
    customizable: true,
    ingredients: ["Crema Batida", "Salsa de Chocolate"],
    extras: [
      { name: "Crema Extra", price: 400 },
      { name: "Oreo", price: 600 },
      { name: "Dulce de Leche", price: 500 },
    ],
  },
  {
    id: "milkshake-ddl",
    name: "Milkshake Dulce de Leche",
    description: "Batido cremoso de dulce de leche argentino",
    price: 4500,
    image: "/images/milkshake.jpg",
    category: "bebidas-sin-alcohol",
    customizable: true,
    ingredients: ["Crema Batida", "Dulce de Leche"],
    extras: [
      { name: "Crema Extra", price: 400 },
      { name: "Brownie", price: 700 },
      { name: "Nueces", price: 500 },
    ],
  },

  // Bebidas Con Alcohol
  {
    id: "cerveza-rubia",
    name: "Cerveza Rubia",
    description: "Pinta de cerveza artesanal rubia 500ml",
    price: 3500,
    image: "/images/beer.jpg",
    category: "bebidas-con-alcohol",
    customizable: true,
    ingredients: [],
    extras: [],
  },
  {
    id: "cerveza-roja",
    name: "Cerveza Roja",
    description: "Pinta de cerveza artesanal roja 500ml",
    price: 3500,
    image: "/images/beer.jpg",
    category: "bebidas-con-alcohol",
    customizable: true,
    ingredients: [],
    extras: [],
  },
  {
    id: "cerveza-ipa",
    name: "Cerveza IPA",
    description: "Pinta de IPA artesanal 500ml",
    price: 3800,
    image: "/images/beer.jpg",
    category: "bebidas-con-alcohol",
    customizable: true,
    ingredients: [],
    extras: [],
  },
  {
    id: "fernet",
    name: "Fernet con Coca",
    description: "Fernet Branca con Coca-Cola",
    price: 4200,
    image: "/images/fernet.jpg",
    category: "bebidas-con-alcohol",
    customizable: true,
    ingredients: ["Hielo"],
    extras: [
      { name: "Doble Fernet", price: 1500 },
      { name: "Sin Hielo", price: 0 },
    ],
  },
  {
    id: "aperol",
    name: "Aperol Spritz",
    description: "Aperol con prosecco y soda",
    price: 5500,
    image: "/images/fernet.jpg",
    category: "bebidas-con-alcohol",
    customizable: true,
    ingredients: ["Hielo", "Rodaja de Naranja"],
    extras: [
      { name: "Sin Hielo", price: 0 },
    ],
  },

  // Postres
  {
    id: "brownie-sundae",
    name: "Brownie con Helado",
    description: "Brownie tibio con helado de vainilla y salsa de chocolate",
    price: 5200,
    image: "/images/brownie.jpg",
    category: "postres",
    customizable: true,
    ingredients: ["Helado de Vainilla", "Salsa de Chocolate"],
    extras: [
      { name: "Helado Extra", price: 1200 },
      { name: "Crema Batida", price: 600 },
      { name: "Dulce de Leche", price: 500 },
      { name: "Nueces", price: 400 },
    ],
  },
  {
    id: "cheesecake",
    name: "Cheesecake NY",
    description: "Cheesecake estilo New York con frutos rojos",
    price: 4800,
    image: "/images/cheesecake.jpg",
    category: "postres",
    customizable: true,
    ingredients: ["Frutos Rojos", "Crema"],
    extras: [
      { name: "Dulce de Leche", price: 500 },
      { name: "Chocolate", price: 500 },
      { name: "Crema Extra", price: 400 },
    ],
  },
  {
    id: "churros",
    name: "Churros con Dulce de Leche",
    description: "6 churros caseros con dulce de leche para mojar",
    price: 4200,
    image: "/images/dulce-de-leche.jpg",
    category: "postres",
    customizable: true,
    ingredients: ["Azucar", "Canela"],
    extras: [
      { name: "Dulce de Leche Extra", price: 500 },
      { name: "Chocolate Fundido", price: 600 },
      { name: "Crema", price: 400 },
    ],
  },
  {
    id: "helado",
    name: "Copa Helado 3 Gustos",
    description: "Helado artesanal con crema y salsa a eleccion",
    price: 4500,
    image: "/images/helado.jpg",
    category: "postres",
    customizable: true,
    ingredients: ["Crema Batida"],
    extras: [
      { name: "Gusto Extra", price: 800 },
      { name: "Salsa Chocolate", price: 400 },
      { name: "Salsa Dulce de Leche", price: 400 },
      { name: "Nueces", price: 400 },
    ],
  },
  {
    id: "flan",
    name: "Flan Casero",
    description: "Flan casero con dulce de leche y crema",
    price: 3800,
    image: "/images/dulce-de-leche.jpg",
    category: "postres",
    customizable: true,
    ingredients: ["Dulce de Leche", "Crema"],
    extras: [
      { name: "Dulce de Leche Extra", price: 500 },
      { name: "Crema Extra", price: 400 },
    ],
  },
]

export const initialTablesStatus: Table[] = [
  { id: 1, status: "available", order: [] },
  { id: 2, status: "occupied", order: [
    { ...mockMenu[0], quantity: 2, removedIngredients: [], addedExtras: [] },
    { ...mockMenu[6], quantity: 1, removedIngredients: [], addedExtras: [] },
  ], guests: 2 },
  { id: 3, status: "calling", order: [
    { ...mockMenu[1], quantity: 1, removedIngredients: ["Cebolla Caramelizada"], addedExtras: [{ name: "Panceta Extra", price: 1500, quantity: 1 }] },
  ], guests: 1 },
  { id: 4, status: "available", order: [] },
  { id: 5, status: "occupied", order: [], guests: 4 },
  { id: 6, status: "bill", order: [
    { ...mockMenu[2], quantity: 2, removedIngredients: [], addedExtras: [] },
    { ...mockMenu[15], quantity: 2, removedIngredients: [], addedExtras: [] },
    { ...mockMenu[24], quantity: 1, removedIngredients: [], addedExtras: [] },
  ], guests: 2 },
  { id: 7, status: "dirty", order: [] },
  { id: 8, status: "available", order: [] },
  { id: 9, status: "occupied", order: [
    { ...mockMenu[5], quantity: 1, removedIngredients: [], addedExtras: [] },
  ], guests: 1 },
  { id: 10, status: "available", order: [] },
  { id: 11, status: "calling", order: [
    { ...mockMenu[0], quantity: 3, removedIngredients: [], addedExtras: [] },
    { ...mockMenu[7], quantity: 1, removedIngredients: [], addedExtras: [] },
    { ...mockMenu[15], quantity: 3, removedIngredients: [], addedExtras: [] },
  ], guests: 3 },
  { id: 12, status: "available", order: [] },
]
