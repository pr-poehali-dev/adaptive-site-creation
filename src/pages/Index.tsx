import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { toast } from "sonner";

const Index = () => {
  const [currentSection, setCurrentSection] = useState("home");
  const [showProfile, setShowProfile] = useState(false);

  const scrollToSection = (sectionId: string) => {
    setCurrentSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const handleRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Регистрация успешна! Скоро с вами свяжется администратор.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-muted">
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                <span className="text-2xl font-bold text-white">∑</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  ЛОМ
                </h1>
                <p className="text-xs text-muted-foreground">Любители Олимпиадной Математики</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <button onClick={() => scrollToSection("home")} className="text-sm font-medium hover:text-primary transition">
                Главная
              </button>
              <button onClick={() => scrollToSection("mathbattle")} className="text-sm font-medium hover:text-primary transition">
                Матбой
              </button>
              <button onClick={() => scrollToSection("olympiad")} className="text-sm font-medium hover:text-primary transition">
                Олимпиада
              </button>
              <button onClick={() => scrollToSection("schedule")} className="text-sm font-medium hover:text-primary transition">
                Расписание
              </button>
              <button onClick={() => scrollToSection("news")} className="text-sm font-medium hover:text-primary transition">
                Новости
              </button>
              <button onClick={() => scrollToSection("merch")} className="text-sm font-medium hover:text-primary transition">
                Мерч
              </button>
              <button onClick={() => scrollToSection("contacts")} className="text-sm font-medium hover:text-primary transition">
                Контакты
              </button>
            </div>
            <Button onClick={() => setShowProfile(!showProfile)} className="gap-2">
              <Icon name="User" size={18} />
              Личный кабинет
            </Button>
          </div>
        </div>
      </nav>

      {showProfile && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowProfile(false)}>
          <Card className="w-full max-w-2xl animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Личный кабинет
                <Button variant="ghost" size="icon" onClick={() => setShowProfile(false)}>
                  <Icon name="X" size={20} />
                </Button>
              </CardTitle>
              <CardDescription>Зарегистрируйтесь для записи на занятия и мероприятия</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegistration} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Данные родителя</h3>
                  <div className="space-y-2">
                    <Label htmlFor="parent-name">ФИО родителя</Label>
                    <Input id="parent-name" placeholder="Иванов Иван Иванович" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parent-phone">Телефон</Label>
                    <Input id="parent-phone" type="tel" placeholder="+7 (___) ___-__-__" required />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Данные ребенка</h3>
                  <div className="space-y-2">
                    <Label htmlFor="child-name">ФИО ребенка</Label>
                    <Input id="child-name" placeholder="Иванов Петр Иванович" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="school">Школа</Label>
                      <Input id="school" placeholder="Школа №1" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="grade">Класс</Label>
                      <Input id="grade" type="number" min="1" max="7" placeholder="5" required />
                    </div>
                  </div>
                </div>
                <Button type="submit" className="w-full" size="lg">
                  Зарегистрироваться
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      <section id="home" className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <Badge className="text-lg px-6 py-2" variant="secondary">
            Для детей 1-7 классов
          </Badge>
          <h1 className="text-6xl md:text-7xl font-bold leading-tight">
            Кружок олимпиадной{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              математики
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Развиваем логическое мышление и готовим к олимпиадам через увлекательные задачи и соревнования
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="gap-2" onClick={() => scrollToSection("schedule")}>
              <Icon name="Calendar" size={20} />
              Записаться на занятие
            </Button>
            <Button size="lg" variant="outline" className="gap-2" onClick={() => scrollToSection("mathbattle")}>
              <Icon name="Trophy" size={20} />
              Участвовать в матбое
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-20">
          <Card className="hover-scale">
            <CardHeader>
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Icon name="Monitor" size={28} className="text-primary" />
              </div>
              <CardTitle>Онлайн формат</CardTitle>
              <CardDescription>Занятия из любой точки мира через удобную платформу</CardDescription>
            </CardHeader>
          </Card>
          <Card className="hover-scale">
            <CardHeader>
              <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                <Icon name="Users" size={28} className="text-secondary" />
              </div>
              <CardTitle>Офлайн занятия</CardTitle>
              <CardDescription>Живое общение с преподавателем и одногруппниками</CardDescription>
            </CardHeader>
          </Card>
          <Card className="hover-scale">
            <CardHeader>
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                <Icon name="Target" size={28} className="text-accent" />
              </div>
              <CardTitle>Олимпиады</CardTitle>
              <CardDescription>Регулярные соревнования для проверки знаний</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      <section id="mathbattle" className="bg-gradient-to-br from-primary/5 to-accent/5 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Icon name="Swords" size={32} className="text-white" />
              </div>
              <div>
                <h2 className="text-4xl font-bold">Матбой</h2>
                <p className="text-muted-foreground">Командные математические соревнования</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Users" size={24} className="text-primary" />
                    Формат
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p>• Онлайн режим</p>
                  <p>• Максимум 12 участников</p>
                  <p>• 2 команды по 6 человек</p>
                  <p>• Длительность: 2 часа</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Target" size={24} className="text-secondary" />
                    Как проходит
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p>• Решение задач в команде</p>
                  <p>• Соревнование на скорость</p>
                  <p>• Обсуждение решений</p>
                  <p>• Награждение победителей</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-br from-primary to-accent text-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Записаться на матбой</h3>
                <p className="mb-6 opacity-90">Следующий матбой: 15 декабря в 10:00</p>
                <Button size="lg" variant="secondary" className="gap-2" onClick={() => setShowProfile(true)}>
                  <Icon name="UserPlus" size={20} />
                  Зарегистрироваться
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="olympiad" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                <Icon name="Award" size={32} className="text-white" />
              </div>
              <div>
                <h2 className="text-4xl font-bold">Олимпиада</h2>
                <p className="text-muted-foreground">Проверь свои знания в индивидуальном соревновании</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="hover-scale">
                <CardHeader>
                  <div className="text-3xl font-bold text-primary mb-2">1-3</div>
                  <CardTitle>Младшие классы</CardTitle>
                  <CardDescription>Базовая логика и арифметика</CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover-scale">
                <CardHeader>
                  <div className="text-3xl font-bold text-secondary mb-2">4-5</div>
                  <CardTitle>Средние классы</CardTitle>
                  <CardDescription>Геометрия и комбинаторика</CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover-scale">
                <CardHeader>
                  <div className="text-3xl font-bold text-accent mb-2">6-7</div>
                  <CardTitle>Старшие классы</CardTitle>
                  <CardDescription>Сложные олимпиадные задачи</CardDescription>
                </CardHeader>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Как записаться на олимпиаду</CardTitle>
                <CardDescription>Участие открыто для всех зарегистрированных пользователей</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Зарегистрируйтесь</h4>
                    <p className="text-sm text-muted-foreground">Заполните форму в личном кабинете</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Выберите дату</h4>
                    <p className="text-sm text-muted-foreground">Олимпиады проводятся ежемесячно</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Участвуйте и побеждайте</h4>
                    <p className="text-sm text-muted-foreground">Получите сертификат и призы</p>
                  </div>
                </div>
                <Button className="w-full mt-6" size="lg" onClick={() => setShowProfile(true)}>
                  Записаться на олимпиаду
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="schedule" className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Расписание занятий</h2>
              <p className="text-muted-foreground">Выберите удобный формат и время</p>
            </div>

            <Tabs defaultValue="online" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
                <TabsTrigger value="online" className="gap-2">
                  <Icon name="Monitor" size={18} />
                  Онлайн
                </TabsTrigger>
                <TabsTrigger value="offline" className="gap-2">
                  <Icon name="Users" size={18} />
                  Офлайн
                </TabsTrigger>
              </TabsList>

              <TabsContent value="online">
                <Card>
                  <CardContent className="p-6">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-3 font-semibold">Время</th>
                            <th className="text-left p-3 font-semibold">Класс</th>
                            <th className="text-left p-3 font-semibold">Понедельник</th>
                            <th className="text-left p-3 font-semibold">Среда</th>
                            <th className="text-left p-3 font-semibold">Пятница</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b hover:bg-muted/50 transition">
                            <td className="p-3">16:00-17:30</td>
                            <td className="p-3"><Badge variant="outline">1-2 класс</Badge></td>
                            <td className="p-3">
                              <Button variant="ghost" size="sm" className="gap-2">
                                <Icon name="Plus" size={16} />
                                Записаться
                              </Button>
                            </td>
                            <td className="p-3">—</td>
                            <td className="p-3">
                              <Button variant="ghost" size="sm" className="gap-2">
                                <Icon name="Plus" size={16} />
                                Записаться
                              </Button>
                            </td>
                          </tr>
                          <tr className="border-b hover:bg-muted/50 transition">
                            <td className="p-3">17:00-18:30</td>
                            <td className="p-3"><Badge variant="outline">3-4 класс</Badge></td>
                            <td className="p-3">—</td>
                            <td className="p-3">
                              <Button variant="ghost" size="sm" className="gap-2">
                                <Icon name="Plus" size={16} />
                                Записаться
                              </Button>
                            </td>
                            <td className="p-3">
                              <Button variant="ghost" size="sm" className="gap-2">
                                <Icon name="Plus" size={16} />
                                Записаться
                              </Button>
                            </td>
                          </tr>
                          <tr className="hover:bg-muted/50 transition">
                            <td className="p-3">18:00-19:30</td>
                            <td className="p-3"><Badge variant="outline">5-7 класс</Badge></td>
                            <td className="p-3">
                              <Button variant="ghost" size="sm" className="gap-2">
                                <Icon name="Plus" size={16} />
                                Записаться
                              </Button>
                            </td>
                            <td className="p-3">
                              <Button variant="ghost" size="sm" className="gap-2">
                                <Icon name="Plus" size={16} />
                                Записаться
                              </Button>
                            </td>
                            <td className="p-3">—</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="offline">
                <Card>
                  <CardContent className="p-6">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-3 font-semibold">Время</th>
                            <th className="text-left p-3 font-semibold">Класс</th>
                            <th className="text-left p-3 font-semibold">Вторник</th>
                            <th className="text-left p-3 font-semibold">Четверг</th>
                            <th className="text-left p-3 font-semibold">Суббота</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b hover:bg-muted/50 transition">
                            <td className="p-3">15:00-16:30</td>
                            <td className="p-3"><Badge variant="outline">1-2 класс</Badge></td>
                            <td className="p-3">
                              <Button variant="ghost" size="sm" className="gap-2">
                                <Icon name="Plus" size={16} />
                                Записаться
                              </Button>
                            </td>
                            <td className="p-3">
                              <Button variant="ghost" size="sm" className="gap-2">
                                <Icon name="Plus" size={16} />
                                Записаться
                              </Button>
                            </td>
                            <td className="p-3">—</td>
                          </tr>
                          <tr className="border-b hover:bg-muted/50 transition">
                            <td className="p-3">16:00-17:30</td>
                            <td className="p-3"><Badge variant="outline">3-4 класс</Badge></td>
                            <td className="p-3">—</td>
                            <td className="p-3">
                              <Button variant="ghost" size="sm" className="gap-2">
                                <Icon name="Plus" size={16} />
                                Записаться
                              </Button>
                            </td>
                            <td className="p-3">
                              <Button variant="ghost" size="sm" className="gap-2">
                                <Icon name="Plus" size={16} />
                                Записаться
                              </Button>
                            </td>
                          </tr>
                          <tr className="hover:bg-muted/50 transition">
                            <td className="p-3">17:00-18:30</td>
                            <td className="p-3"><Badge variant="outline">5-7 класс</Badge></td>
                            <td className="p-3">
                              <Button variant="ghost" size="sm" className="gap-2">
                                <Icon name="Plus" size={16} />
                                Записаться
                              </Button>
                            </td>
                            <td className="p-3">—</td>
                            <td className="p-3">
                              <Button variant="ghost" size="sm" className="gap-2">
                                <Icon name="Plus" size={16} />
                                Записаться
                              </Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      <section id="news" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Новости кружка</h2>
              <p className="text-muted-foreground">Следите за нашими достижениями и событиями</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="hover-scale">
                <div className="h-48 bg-gradient-to-br from-primary to-accent rounded-t-xl"></div>
                <CardHeader>
                  <div className="text-sm text-muted-foreground mb-2">25 ноября 2024</div>
                  <CardTitle>Победа на городской олимпиаде</CardTitle>
                  <CardDescription>
                    Наши ученики заняли призовые места на городском этапе олимпиады по математике
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover-scale">
                <div className="h-48 bg-gradient-to-br from-secondary to-primary rounded-t-xl"></div>
                <CardHeader>
                  <div className="text-sm text-muted-foreground mb-2">20 ноября 2024</div>
                  <CardTitle>Новый формат занятий</CardTitle>
                  <CardDescription>
                    Запускаем интерактивные онлайн-занятия с использованием игровых методик
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover-scale">
                <div className="h-48 bg-gradient-to-br from-accent to-secondary rounded-t-xl"></div>
                <CardHeader>
                  <div className="text-sm text-muted-foreground mb-2">15 ноября 2024</div>
                  <CardTitle>Открытие нового класса</CardTitle>
                  <CardDescription>
                    Начинаем набор в группу для учеников 1-2 классов по субботам
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="merch" className="bg-gradient-to-br from-accent/5 to-primary/5 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Мерч кружка</h2>
              <p className="text-muted-foreground">Стильные вещи для юных математиков</p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              <Card className="hover-scale">
                <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-t-xl flex items-center justify-center">
                  <span className="text-6xl">🎯</span>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">Стикеры ЛОМ</CardTitle>
                  <div className="text-2xl font-bold text-primary">300₽</div>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">Заказать</Button>
                </CardContent>
              </Card>

              <Card className="hover-scale">
                <div className="h-48 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-t-xl flex items-center justify-center">
                  <span className="text-6xl">☕</span>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">Кружка с формулами</CardTitle>
                  <div className="text-2xl font-bold text-secondary">650₽</div>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">Заказать</Button>
                </CardContent>
              </Card>

              <Card className="hover-scale">
                <div className="h-48 bg-gradient-to-br from-accent/20 to-secondary/20 rounded-t-xl flex items-center justify-center">
                  <span className="text-6xl">👕</span>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">Футболка ЛОМ</CardTitle>
                  <div className="text-2xl font-bold text-accent">1200₽</div>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">Заказать</Button>
                </CardContent>
              </Card>

              <Card className="hover-scale">
                <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-t-xl flex items-center justify-center">
                  <span className="text-6xl">📓</span>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">Блокнот для задач</CardTitle>
                  <div className="text-2xl font-bold text-primary">450₽</div>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">Заказать</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Контакты</h2>
              <p className="text-muted-foreground">Свяжитесь с нами удобным способом</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="hover-scale cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon name="Phone" size={32} className="text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Телефон</h3>
                  <p className="text-muted-foreground">+7 (999) 123-45-67</p>
                </CardContent>
              </Card>

              <Card className="hover-scale cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Icon name="Send" size={32} className="text-accent" />
                  </div>
                  <h3 className="font-semibold mb-2">Telegram</h3>
                  <p className="text-muted-foreground">@lom_math</p>
                </CardContent>
              </Card>

              <Card className="hover-scale cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon name="MessageCircle" size={32} className="text-secondary" />
                  </div>
                  <h3 className="font-semibold mb-2">WhatsApp</h3>
                  <p className="text-muted-foreground">+7 (999) 123-45-67</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gradient-to-br from-primary to-accent text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <span className="text-2xl font-bold">∑</span>
              </div>
              <div>
                <h3 className="font-bold text-xl">ЛОМ</h3>
                <p className="text-sm opacity-90">Любители Олимпиадной Математики</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm opacity-90">© 2024 Кружок ЛОМ. Все права защищены.</p>
              <p className="text-sm opacity-90 mt-1">Развиваем математические таланты с 2020 года</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
