import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  sizes: string[];
  discount?: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'GRAFFITI HOODIE',
    price: 4990,
    category: 'Худи',
    image: 'https://cdn.poehali.dev/projects/095400d8-ef8b-4990-894b-4096a81e97d9/files/300d6b2a-1df4-40a3-afd0-d8289c818354.jpg',
    sizes: ['S', 'M', 'L', 'XL'],
    discount: 30
  },
  {
    id: 2,
    name: 'URBAN BOMBER',
    price: 7990,
    category: 'Куртки',
    image: 'https://cdn.poehali.dev/projects/095400d8-ef8b-4990-894b-4096a81e97d9/files/fd2ec74f-462c-4d81-a913-05e27d605109.jpg',
    sizes: ['M', 'L', 'XL', 'XXL']
  },
  {
    id: 3,
    name: 'STREET CREWNECK',
    price: 3990,
    category: 'Свитшоты',
    image: 'https://cdn.poehali.dev/projects/095400d8-ef8b-4990-894b-4096a81e97d9/files/5e558443-f475-406b-8420-5643b147f6d7.jpg',
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  }
];

const Index = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const totalPrice = cart.reduce((sum, item) => {
    const price = item.discount ? item.price * (1 - item.discount / 100) : item.price;
    return sum + price;
  }, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-montserrat font-black text-primary">STREET<span className="text-foreground">WEAR</span></h1>
            <div className="hidden md:flex gap-6">
              <a href="#catalog" className="text-sm hover:text-primary transition-colors">Каталог</a>
              <a href="#about" className="text-sm hover:text-primary transition-colors">О нас</a>
              <a href="#blog" className="text-sm hover:text-primary transition-colors">Блог</a>
              <a href="#faq" className="text-sm hover:text-primary transition-colors">FAQ</a>
              <a href="#contacts" className="text-sm hover:text-primary transition-colors">Контакты</a>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {cart.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-primary text-primary-foreground">
                      {cart.length}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="font-montserrat">Корзина</SheetTitle>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">Корзина пуста</p>
                  ) : (
                    <>
                      {cart.map((item, index) => (
                        <div key={index} className="flex items-center gap-4 p-4 border border-border rounded-lg">
                          <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                          <div className="flex-1">
                            <h4 className="font-montserrat font-bold text-sm">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {item.discount ? (
                                <>
                                  <span className="line-through mr-2">{item.price}₽</span>
                                  <span className="text-primary font-bold">{Math.round(item.price * (1 - item.discount / 100))}₽</span>
                                </>
                              ) : (
                                <span>{item.price}₽</span>
                              )}
                            </p>
                          </div>
                        </div>
                      ))}
                      <div className="border-t border-border pt-4 mt-4">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-montserrat font-bold">Итого:</span>
                          <span className="text-2xl font-montserrat font-black text-primary">{Math.round(totalPrice)}₽</span>
                        </div>
                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-montserrat font-bold">
                          Оформить заказ
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Icon name="Menu" size={24} />
            </Button>
          </div>
        </nav>
      </header>

      <main>
        <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-background to-background py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <Badge className="mb-6 bg-primary text-primary-foreground font-montserrat font-bold">
                🔥 СКИДКА 30% НА ХУДИ
              </Badge>
              <h2 className="text-4xl md:text-7xl font-montserrat font-black text-graffiti mb-6 animate-fade-in">
                УЛИЧНАЯ МОДА<br />
                <span className="text-primary">БЕЗ ПРАВИЛ</span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in">
                Эксклюзивные коллекции худи, курток и свитшотов для тех, кто создаёт тренды
              </p>
              <div className="flex flex-wrap gap-4 animate-fade-in">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-montserrat font-bold">
                  Смотреть каталог
                </Button>
                <Button size="lg" variant="outline" className="font-montserrat font-bold">
                  О нас
                </Button>
              </div>
            </div>
          </div>
          
          <div className="absolute top-20 right-10 text-9xl font-montserrat font-black text-primary/5 hidden lg:block">
            STREET
          </div>
        </section>

        <section id="benefits" className="py-16 border-y border-border">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Icon name="Shield" size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-montserrat font-bold mb-2">Гарантия качества</h3>
                  <p className="text-sm text-muted-foreground">Проверенные поставщики и реальные фото товаров</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Icon name="Truck" size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-montserrat font-bold mb-2">Быстрая доставка</h3>
                  <p className="text-sm text-muted-foreground">По всей России от 3 дней</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Icon name="RotateCcw" size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-montserrat font-bold mb-2">Лёгкий возврат</h3>
                  <p className="text-sm text-muted-foreground">14 дней на возврат без вопросов</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="catalog" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-montserrat font-black text-graffiti mb-4">
                ХИТ ПРОДАЖ
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Самые популярные модели сезона — проверено тысячами покупателей
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <Card key={product.id} className="group overflow-hidden border-2 hover:border-primary transition-all duration-300 animate-fade-in">
                  <div className="relative overflow-hidden">
                    {product.discount && (
                      <Badge className="absolute top-4 right-4 z-10 bg-primary text-primary-foreground font-montserrat font-bold">
                        -{product.discount}%
                      </Badge>
                    )}
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  <CardContent className="p-6">
                    <Badge variant="outline" className="mb-3">
                      {product.category}
                    </Badge>
                    <h3 className="text-xl font-montserrat font-black mb-3 text-graffiti">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl font-montserrat font-black text-primary">
                        {product.discount 
                          ? Math.round(product.price * (1 - product.discount / 100))
                          : product.price}₽
                      </span>
                      {product.discount && (
                        <span className="text-sm text-muted-foreground line-through">
                          {product.price}₽
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {product.sizes.map((size) => (
                        <Badge key={size} variant="secondary" className="hover:bg-primary hover:text-primary-foreground cursor-pointer">
                          {size}
                        </Badge>
                      ))}
                    </div>

                    <Button 
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-montserrat font-bold"
                      onClick={() => addToCart(product)}
                    >
                      <Icon name="ShoppingCart" size={18} className="mr-2" />
                      В корзину
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-montserrat font-black text-graffiti mb-6">
                ПОЧЕМУ МЫ?
              </h2>
              <p className="text-lg text-muted-foreground mb-12">
                Мы не просто продаём одежду — мы создаём культуру уличной моды
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                <Card className="p-6">
                  <Icon name="Video" size={32} className="text-primary mb-4" />
                  <h3 className="font-montserrat font-bold text-xl mb-2">Детальные видеообзоры</h3>
                  <p className="text-muted-foreground">
                    Смотрите товар со всех сторон — полная прозрачность перед покупкой
                  </p>
                </Card>
                
                <Card className="p-6">
                  <Icon name="Camera" size={32} className="text-primary mb-4" />
                  <h3 className="font-montserrat font-bold text-xl mb-2">Реальные фото</h3>
                  <p className="text-muted-foreground">
                    Профессиональные съёмки на моделях — вы видите то, что получите
                  </p>
                </Card>
                
                <Card className="p-6">
                  <Icon name="Star" size={32} className="text-primary mb-4" />
                  <h3 className="font-montserrat font-bold text-xl mb-2">Топовые бренды</h3>
                  <p className="text-muted-foreground">
                    Работаем только с проверенными производителями уличной моды
                  </p>
                </Card>
                
                <Card className="p-6">
                  <Icon name="Users" size={32} className="text-primary mb-4" />
                  <h3 className="font-montserrat font-bold text-xl mb-2">5000+ покупателей</h3>
                  <p className="text-muted-foreground">
                    Нам доверяют тысячи любителей street style по всей России
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-montserrat font-black text-graffiti mb-12 text-center">
                ЧАСТЫЕ ВОПРОСЫ
              </h2>
              
              <div className="space-y-4">
                <Card className="p-6">
                  <h3 className="font-montserrat font-bold mb-2">Как быстро доставите заказ?</h3>
                  <p className="text-muted-foreground">Доставка по Москве 1-2 дня, по России 3-7 дней в зависимости от региона</p>
                </Card>
                
                <Card className="p-6">
                  <h3 className="font-montserrat font-bold mb-2">Можно ли вернуть товар?</h3>
                  <p className="text-muted-foreground">Да, у вас есть 14 дней на возврат товара без объяснения причин</p>
                </Card>
                
                <Card className="p-6">
                  <h3 className="font-montserrat font-bold mb-2">Как подобрать размер?</h3>
                  <p className="text-muted-foreground">В карточке каждого товара есть подробная размерная сетка с замерами</p>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-secondary/50 border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-montserrat font-black text-xl mb-4">STREETWEAR</h3>
              <p className="text-sm text-muted-foreground">
                Уличная мода без правил
              </p>
            </div>
            
            <div>
              <h4 className="font-montserrat font-bold mb-4">Каталог</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Худи</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Куртки</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Свитшоты</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Футболки</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-montserrat font-bold mb-4">Информация</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Доставка</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Возврат</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Контакты</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-montserrat font-bold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Email: info@streetwear.ru</li>
                <li>Тел: +7 (999) 123-45-67</li>
                <li>ПН-ВС: 10:00 - 22:00</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 STREETWEAR. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
