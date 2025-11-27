import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { toast } from "sonner";

interface ScheduleItem {
  id: number;
  day_of_week: string;
  time_start: string;
  time_end: string;
  grade: string;
  format: string;
  is_active: boolean;
}

const Index = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSchedule();
  }, []);

  const fetchSchedule = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/e5269ba7-f839-4428-8e87-36f1b64e81c2');
      const data = await response.json();
      setSchedule(data.schedule);
    } catch (error) {
      console.error('Error fetching schedule:', error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = {
      parent_name: (form.elements.namedItem('parent-name') as HTMLInputElement).value,
      parent_phone: (form.elements.namedItem('parent-phone') as HTMLInputElement).value,
      child_name: (form.elements.namedItem('child-name') as HTMLInputElement).value,
      school: (form.elements.namedItem('school') as HTMLInputElement).value,
      grade: parseInt((form.elements.namedItem('grade') as HTMLInputElement).value)
    };

    try {
      const response = await fetch('https://functions.poehali.dev/5ce6a180-089e-4dfe-a6e0-a88c7178a059', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        toast.success("Регистрация успешна! Скоро с вами свяжется администратор.");
        setShowProfile(false);
        form.reset();
      }
    } catch (error) {
      toast.error("Ошибка регистрации. Попробуйте позже.");
    }
  };

  const daysOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-accent/10 to-white">
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button onClick={() => scrollToSection("home")} className="hover:opacity-80 transition-opacity">
              <img 
                src="https://cdn.poehali.dev/files/e3811560-6f8a-494e-8a65-7ed67863c0b3.PNG" 
                alt="ЛОМ Логотип" 
                className="h-12 w-auto"
              />
            </button>
            <div className="hidden md:flex items-center gap-6">
              <button onClick={() => scrollToSection("mathbattle")} className="text-sm font-medium hover:text-primary transition-colors">
                Матбой
              </button>
              <button onClick={() => scrollToSection("olympiad")} className="text-sm font-medium hover:text-primary transition-colors">
                Олимпиада
              </button>
              <button onClick={() => scrollToSection("schedule")} className="text-sm font-medium hover:text-primary transition-colors">
                Расписание
              </button>
              <button onClick={() => scrollToSection("news")} className="text-sm font-medium hover:text-primary transition-colors">
                Новости
              </button>
              <button onClick={() => scrollToSection("merch")} className="text-sm font-medium hover:text-primary transition-colors">
                Мерч
              </button>
              <button onClick={() => scrollToSection("contacts")} className="text-sm font-medium hover:text-primary transition-colors">
                Контакты
              </button>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setShowProfile(!showProfile)} className="gap-2" variant="outline">
                <Icon name="User" size={18} />
                Личный кабинет
              </Button>
              <Button onClick={() => setShowAdmin(!showAdmin)} className="gap-2" size="icon" variant="ghost">
                <Icon name="Settings" size={18} />
              </Button>
            </div>
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
                    <Input id="parent-name" name="parent-name" placeholder="Иванов Иван Иванович" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parent-phone">Телефон</Label>
                    <Input id="parent-phone" name="parent-phone" type="tel" placeholder="+7 (___) ___-__-__" required />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Данные ребенка</h3>
                  <div className="space-y-2">
                    <Label htmlFor="child-name">ФИО ребенка</Label>
                    <Input id="child-name" name="child-name" placeholder="Иванов Петр Иванович" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="school">Школа</Label>
                      <Input id="school" name="school" placeholder="Школа №1" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="grade">Класс</Label>
                      <Input id="grade" name="grade" type="number" min="1" max="7" placeholder="5" required />
                    </div>
                  </div>
                </div>
                <Button type="submit" className="w-full hover-glow" size="lg">
                  Зарегистрироваться
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {showAdmin && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowAdmin(false)}>
          <Card className="w-full max-w-4xl animate-fade-in max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Админ-панель
                <Button variant="ghost" size="icon" onClick={() => setShowAdmin(false)}>
                  <Icon name="X" size={20} />
                </Button>
              </CardTitle>
              <CardDescription>Управление расписанием занятий</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h3 className="font-semibold">Текущее расписание</h3>
                <div className="grid gap-2">
                  {schedule.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex gap-4 text-sm">
                        <span className="font-medium">{item.day_of_week}</span>
                        <span>{item.time_start} - {item.time_end}</span>
                        <Badge variant="outline">{item.grade}</Badge>
                        <Badge>{item.format === 'online' ? 'Онлайн' : 'Офлайн'}</Badge>
                      </div>
                      <Button size="sm" variant="ghost">
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <section id="home" className="container mx-auto px-4 py-20 relative overflow-hidden">
        <div className="absolute top-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '1s'}}></div>
        
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <Badge className="text-base px-4 py-2" variant="secondary">
              Для детей 1-7 классов
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Кружок олимпиадной{" "}
              <span className="text-primary">математики</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Развиваем логическое мышление и готовим к олимпиадам через увлекательные задачи и соревнования
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="gap-2 hover-glow" onClick={() => scrollToSection("schedule")}>
                <Icon name="Calendar" size={20} />
                Записаться на занятие
              </Button>
              <Button size="lg" variant="outline" className="gap-2" onClick={() => scrollToSection("mathbattle")}>
                <Icon name="Trophy" size={20} />
                Участвовать в матбое
              </Button>
            </div>
          </div>
          
          <div className="relative animate-slide-up">
            <img 
              src="https://cdn.poehali.dev/projects/ee813a67-8598-4e99-886d-e2fb1d49a3f5/files/9fdf5237-1d8a-4e50-91fd-0c2bfc9dd45e.jpg"
              alt="Математическое образование"
              className="rounded-2xl shadow-2xl w-full hover-lift"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-20 max-w-6xl mx-auto">
          <Card className="hover-lift hover-glow animate-slide-up" style={{animationDelay: '0.1s'}}>
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Icon name="Monitor" size={24} className="text-primary" />
              </div>
              <CardTitle>Онлайн формат</CardTitle>
              <CardDescription>Занятия из любой точки мира через удобную платформу</CardDescription>
            </CardHeader>
          </Card>
          <Card className="hover-lift hover-glow animate-slide-up" style={{animationDelay: '0.2s'}}>
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Icon name="Users" size={24} className="text-primary" />
              </div>
              <CardTitle>Офлайн занятия</CardTitle>
              <CardDescription>Живое общение с преподавателем и одногруппниками</CardDescription>
            </CardHeader>
          </Card>
          <Card className="hover-lift hover-glow animate-slide-up" style={{animationDelay: '0.3s'}}>
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Icon name="Target" size={24} className="text-primary" />
              </div>
              <CardTitle>Олимпиады</CardTitle>
              <CardDescription>Регулярные соревнования для проверки знаний</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      <section id="mathbattle" className="bg-gradient-to-br from-accent/5 to-accent/20 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8 animate-fade-in">
              <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center">
                <Icon name="Swords" size={32} className="text-white" />
              </div>
              <div>
                <h2 className="text-4xl font-bold">Матбой</h2>
                <p className="text-muted-foreground">Командные математические соревнования</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="hover-lift animate-slide-up" style={{animationDelay: '0.1s'}}>
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

              <Card className="hover-lift animate-slide-up" style={{animationDelay: '0.2s'}}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Target" size={24} className="text-primary" />
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

            <Card className="bg-gradient-to-br from-primary to-primary/80 text-white animate-slide-up hover-glow" style={{animationDelay: '0.3s'}}>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Записаться на матбой</h3>
                <p className="mb-6 opacity-90">Следующий матбой: 15 декабря в 10:00</p>
                <Button size="lg" variant="secondary" className="gap-2 hover-scale" onClick={() => setShowProfile(true)}>
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
              <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center">
                <Icon name="Award" size={32} className="text-white" />
              </div>
              <div>
                <h2 className="text-4xl font-bold">Олимпиада</h2>
                <p className="text-muted-foreground">Проверь свои знания в индивидуальном соревновании</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="hover-lift hover-glow animate-slide-up" style={{animationDelay: '0.1s'}}>
                <CardHeader>
                  <div className="text-3xl font-bold text-primary mb-2">1-3</div>
                  <CardTitle>Младшие классы</CardTitle>
                  <CardDescription>Базовая логика и арифметика</CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover-lift hover-glow animate-slide-up" style={{animationDelay: '0.2s'}}>
                <CardHeader>
                  <div className="text-3xl font-bold text-primary mb-2">4-5</div>
                  <CardTitle>Средние классы</CardTitle>
                  <CardDescription>Геометрия и комбинаторика</CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover-lift hover-glow animate-slide-up" style={{animationDelay: '0.3s'}}>
                <CardHeader>
                  <div className="text-3xl font-bold text-primary mb-2">6-7</div>
                  <CardTitle>Старшие классы</CardTitle>
                  <CardDescription>Сложные олимпиадные задачи</CardDescription>
                </CardHeader>
              </Card>
            </div>

            <Card className="hover-lift animate-slide-up" style={{animationDelay: '0.4s'}}>
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
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Выберите дату</h4>
                    <p className="text-sm text-muted-foreground">Олимпиады проводятся ежемесячно</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Участвуйте и побеждайте</h4>
                    <p className="text-sm text-muted-foreground">Получите сертификат и призы</p>
                  </div>
                </div>
                <Button className="w-full mt-6 hover-glow" size="lg" onClick={() => setShowProfile(true)}>
                  Записаться на олимпиаду
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="schedule" className="bg-muted/30 py-20">
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

              {['online', 'offline'].map(format => (
                <TabsContent key={format} value={format}>
                  <Card>
                    <CardContent className="p-6">
                      {loading ? (
                        <div className="text-center py-8">Загрузка...</div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left p-3 font-semibold">День недели</th>
                                <th className="text-left p-3 font-semibold">Время</th>
                                <th className="text-left p-3 font-semibold">Класс</th>
                                <th className="text-left p-3 font-semibold"></th>
                              </tr>
                            </thead>
                            <tbody>
                              {schedule
                                .filter(item => item.format === format)
                                .map(item => (
                                  <tr key={item.id} className="border-b hover:bg-muted/50 transition">
                                    <td className="p-3">{item.day_of_week}</td>
                                    <td className="p-3">{item.time_start} - {item.time_end}</td>
                                    <td className="p-3"><Badge variant="outline">{item.grade}</Badge></td>
                                    <td className="p-3">
                                      <Button variant="ghost" size="sm" className="gap-2" onClick={() => setShowProfile(true)}>
                                        <Icon name="Plus" size={16} />
                                        Записаться
                                      </Button>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
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
              <Card className="hover-lift hover-glow animate-slide-up" style={{animationDelay: '0.1s'}}>
                <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-t-xl relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-30">🏆</div>
                </div>
                <CardHeader>
                  <div className="text-sm text-muted-foreground mb-2">25 ноября 2024</div>
                  <CardTitle>Победа на городской олимпиаде</CardTitle>
                  <CardDescription>
                    Наши ученики заняли призовые места на городском этапе олимпиады по математике
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover-lift hover-glow animate-slide-up" style={{animationDelay: '0.2s'}}>
                <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-t-xl relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-30">💻</div>
                </div>
                <CardHeader>
                  <div className="text-sm text-muted-foreground mb-2">20 ноября 2024</div>
                  <CardTitle>Новый формат занятий</CardTitle>
                  <CardDescription>
                    Запускаем интерактивные онлайн-занятия с использованием игровых методик
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover-lift hover-glow animate-slide-up" style={{animationDelay: '0.3s'}}>
                <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-t-xl relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-30">🎓</div>
                </div>
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

      <section id="merch" className="bg-gradient-to-br from-accent/5 to-accent/20 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Мерч кружка</h2>
              <p className="text-muted-foreground">Стильные вещи для юных математиков</p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              <Card className="hover-lift hover-glow animate-slide-up" style={{animationDelay: '0.1s'}}>
                <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 rounded-t-xl flex items-center justify-center">
                  <span className="text-6xl">🎯</span>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">Стикеры ЛОМ</CardTitle>
                  <div className="text-2xl font-bold text-primary">300₽</div>
                </CardHeader>
                <CardContent>
                  <Button className="w-full hover-glow" variant="outline">Заказать</Button>
                </CardContent>
              </Card>

              <Card className="hover-lift hover-glow animate-slide-up" style={{animationDelay: '0.2s'}}>
                <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 rounded-t-xl flex items-center justify-center">
                  <span className="text-6xl">☕</span>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">Кружка с формулами</CardTitle>
                  <div className="text-2xl font-bold text-primary">650₽</div>
                </CardHeader>
                <CardContent>
                  <Button className="w-full hover-glow" variant="outline">Заказать</Button>
                </CardContent>
              </Card>

              <Card className="hover-lift hover-glow animate-slide-up" style={{animationDelay: '0.3s'}}>
                <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 rounded-t-xl flex items-center justify-center">
                  <span className="text-6xl">👕</span>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">Футболка ЛОМ</CardTitle>
                  <div className="text-2xl font-bold text-primary">1200₽</div>
                </CardHeader>
                <CardContent>
                  <Button className="w-full hover-glow" variant="outline">Заказать</Button>
                </CardContent>
              </Card>

              <Card className="hover-lift hover-glow animate-slide-up" style={{animationDelay: '0.4s'}}>
                <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 rounded-t-xl flex items-center justify-center">
                  <span className="text-6xl">📓</span>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">Блокнот для задач</CardTitle>
                  <div className="text-2xl font-bold text-primary">450₽</div>
                </CardHeader>
                <CardContent>
                  <Button className="w-full hover-glow" variant="outline">Заказать</Button>
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
              <Card className="hover-lift hover-glow cursor-pointer animate-slide-up" style={{animationDelay: '0.1s'}}>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon name="Phone" size={32} className="text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Телефон</h3>
                  <p className="text-muted-foreground">+7 (999) 123-45-67</p>
                </CardContent>
              </Card>

              <Card className="hover-lift hover-glow cursor-pointer animate-slide-up" style={{animationDelay: '0.2s'}}>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon name="Send" size={32} className="text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Telegram</h3>
                  <p className="text-muted-foreground">@lom_math</p>
                </CardContent>
              </Card>

              <Card className="hover-lift hover-glow cursor-pointer animate-slide-up" style={{animationDelay: '0.3s'}}>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon name="MessageCircle" size={32} className="text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">WhatsApp</h3>
                  <p className="text-muted-foreground">+7 (999) 123-45-67</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gradient-to-br from-primary/5 to-accent/10 py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img 
                src="https://cdn.poehali.dev/files/e3811560-6f8a-494e-8a65-7ed67863c0b3.PNG" 
                alt="ЛОМ Логотип" 
                className="h-12 w-auto"
              />
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-muted-foreground">© 2024 Кружок ЛОМ. Все права защищены.</p>
              <p className="text-sm text-muted-foreground mt-1">Развиваем математические таланты с 2020 года</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
