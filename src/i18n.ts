import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "app.title": "Albion Craft Master Pro",
      "nav.features": "Features",
      "nav.guide": "How it Works",
      "nav.dashboard": "Dashboard",
      "nav.login": "Login",
      "nav.logout": "Logout",
      "hero.title": "Dominate the Markets of Albion",
      "hero.subtitle": "Advanced crafting calculations, multi-city sourcing matrix, and real-time ROI analytics.",
      "hero.cta": "Launch Calculator",
      "auth.email": "Email Address",
      "auth.password": "Password",
      "auth.login": "Sign In",
      "auth.signup": "Create Account",
      "calc.item": "Target Item",
      "calc.batch": "Batch Size",
      "calc.budget": "Max Capital (Silver)",
      "calc.focus": "Focus Crafting",
      "calc.premium": "Premium Status",
      "calc.station": "Station Fee (per 100)",
      "calc.calculate": "Calculate Profit",
      "matrix.title": "Multi-City Sourcing Matrix",
      "matrix.bestBuy": "Best Buy City",
      "matrix.unitPrice": "Unit Price",
      "matrix.totalCost": "Total Cost",
      "matrix.sellCity": "Best Sell City",
      "analytics.revenue": "Est. Gross Revenue",
      "analytics.profit": "Net Profit",
      "analytics.roi": "Return on Investment (ROI)",
      "analytics.focusProfit": "Profit per Focus Point"
    }
  },
  de: {
    translation: {
      "app.title": "Albion Craft Master Pro",
      "nav.features": "Funktionen",
      "nav.guide": "Wie es funktioniert",
      "nav.dashboard": "Dashboard",
      "nav.login": "Anmelden",
      "nav.logout": "Abmelden",
      "hero.title": "Beherrsche die Märkte von Albion",
      "hero.subtitle": "Erweiterte Crafting-Berechnungen, Multi-Stadt-Beschaffungsmatrix und Echtzeit-ROI-Analysen.",
      "hero.cta": "Rechner starten",
      "auth.email": "E-Mail Adresse",
      "auth.password": "Passwort",
      "auth.login": "Einloggen",
      "auth.signup": "Konto erstellen",
      "calc.item": "Zielobjekt",
      "calc.batch": "Chargengröße",
      "calc.budget": "Max Kapital (Silber)",
      "calc.focus": "Fokus Crafting",
      "calc.premium": "Premium Status",
      "calc.station": "Stationsgebühr (pro 100)",
      "calc.calculate": "Gewinn Berechnen",
      "matrix.title": "Multi-Stadt-Beschaffungsmatrix",
      "matrix.bestBuy": "Beste Kaufstadt",
      "matrix.unitPrice": "Stückpreis",
      "matrix.totalCost": "Gesamtkosten",
      "matrix.sellCity": "Beste Verkaufsstadt",
      "analytics.revenue": "Geschätzter Bruttoumsatz",
      "analytics.profit": "Reingewinn",
      "analytics.roi": "Kapitalrendite (ROI)",
      "analytics.focusProfit": "Gewinn pro Fokuspunkt"
    }
  },
  ru: {
    translation: {
      "app.title": "Albion Craft Master Pro",
      "nav.features": "Функции",
      "nav.guide": "Как это работает",
      "nav.dashboard": "Панель",
      "nav.login": "Войти",
      "nav.logout": "Выйти",
      "hero.title": "Доминируйте на рынках Альбиона",
      "hero.subtitle": "Продвинутые расчеты крафта, матрица поиска по городам и аналитика ROI в реальном времени.",
      "hero.cta": "Запустить калькулятор",
      "auth.email": "Email",
      "auth.password": "Пароль",
      "auth.login": "Вход",
      "auth.signup": "Создать аккаунт",
      "calc.item": "Целевой предмет",
      "calc.batch": "Размер партии",
      "calc.budget": "Макс. капитал (серебро)",
      "calc.focus": "Крафт с фокусом",
      "calc.premium": "Премиум статус",
      "calc.station": "Сбор станции (за 100)",
      "calc.calculate": "Рассчитать прибыль",
      "matrix.title": "Матрица снабжения",
      "matrix.bestBuy": "Лучший город покупки",
      "matrix.unitPrice": "Цена за шт.",
      "matrix.totalCost": "Общая стоимость",
      "matrix.sellCity": "Лучший город продажи",
      "analytics.revenue": "Ориентировочная выручка",
      "analytics.profit": "Чистая прибыль",
      "analytics.roi": "Рентабельность инвестиций (ROI)",
      "analytics.focusProfit": "Прибыль на очко фокуса"
    }
  },
  fa: {
    translation: {
      "app.title": "Albion Craft Master Pro",
      "nav.features": "ویژگی‌ها",
      "nav.guide": "چگونه کار می‌کند",
      "nav.dashboard": "داشبورد",
      "nav.login": "ورود",
      "nav.logout": "خروج",
      "hero.title": "بر بازارهای آلبیون مسلط شوید",
      "hero.subtitle": "محاسبات پیشرفته ساخت، ماتریس تامین چند-شهری، و تحلیل بازگشت سرمایه زنده.",
      "hero.cta": "اجرای ماشین حساب",
      "auth.email": "آدرس ایمیل",
      "auth.password": "رمز عبور",
      "auth.login": "ورود به حساب",
      "auth.signup": "ایجاد حساب کاربری",
      "calc.item": "آیتم هدف",
      "calc.batch": "حجم ساخت",
      "calc.budget": "حداکثر سرمایه (نقره)",
      "calc.focus": "ساخت با تمرکز",
      "calc.premium": "وضعیت پریمیوم",
      "calc.station": "هزینه ایستگاه (هر ۱۰۰)",
      "calc.calculate": "محاسبه سود",
      "matrix.title": "ماتریس تامین چند-شهری",
      "matrix.bestBuy": "بهترین شهر خرید",
      "matrix.unitPrice": "قیمت واحد",
      "matrix.totalCost": "هزینه کل",
      "matrix.sellCity": "بهترین شهر فروش",
      "analytics.revenue": "درآمد ناخالص تخمینی",
      "analytics.profit": "سود خالص",
      "analytics.roi": "بازگشت سرمایه (ROI)",
      "analytics.focusProfit": "سود هر امتیاز تمرکز"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default
    fallbackLng: "en",
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
