# UniQer - Платформа кампус-туров

Web-платформа для продажи и управления кампус-турами для школьников и родителей.

## Технологии

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **База данных**: PostgreSQL
- **Аутентификация**: NextAuth.js

## Быстрый старт

### 1. Установка зависимостей

```bash
npm install
```

### 2. Запуск PostgreSQL через Docker

```bash
npm run docker:up
```

### 3. Настройка переменных окружения

Скопируйте `.env.example` в `.env` и настройте переменные:

```bash
cp .env.example .env
```

### 4. Применение миграций и генерация Prisma Client

```bash
npm run db:push
npm run db:generate
```

### 5. Заполнение базы тестовыми данными

```bash
npm run db:seed
```

### 6. Запуск в режиме разработки

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000)

## Доступ к админ-панели

- URL: [http://localhost:3000/admin](http://localhost:3000/admin)
- Email: `admin@uniqer.kz`
- Пароль: `admin123`

## Структура проекта

```
uniqer/
├── prisma/
│   ├── schema.prisma      # Схема базы данных
│   └── seed.ts            # Seed данные
├── src/
│   ├── app/
│   │   ├── (public)/      # Публичные страницы
│   │   ├── admin/         # Админ-панель
│   │   └── api/           # API Routes
│   ├── components/
│   │   ├── ui/            # UI компоненты
│   │   ├── public/        # Компоненты сайта
│   │   └── admin/         # Компоненты админки
│   ├── lib/               # Утилиты и конфигурации
│   └── types/             # TypeScript типы
├── public/
├── docker-compose.yml
└── package.json
```

## Публичные страницы

- `/` - Главная
- `/tours` - Каталог туров
- `/tours/[slug]` - Страница тура
- `/universities` - Каталог университетов
- `/universities/[slug]` - Страница университета
- `/routes` - Маршруты туров
- `/programs` - Программы профориентации
- `/for-schools` - Раздел для школ (B2B)
- `/about` - О проекте
- `/contacts` - Контакты

## Админ-панель

- `/admin` - Dashboard
- `/admin/tours` - Управление турами
- `/admin/universities` - Управление университетами
- `/admin/applications` - Управление заявками

## API Endpoints

### Туры
- `GET /api/tours` - Список туров
- `POST /api/tours` - Создать тур
- `GET /api/tours/[id]` - Получить тур
- `PUT /api/tours/[id]` - Обновить тур
- `DELETE /api/tours/[id]` - Удалить тур

### Университеты
- `GET /api/universities` - Список университетов
- `POST /api/universities` - Создать университет
- `GET /api/universities/[id]` - Получить университет
- `PUT /api/universities/[id]` - Обновить университет
- `DELETE /api/universities/[id]` - Удалить университет

### Заявки
- `GET /api/applications` - Список заявок
- `POST /api/applications` - Создать заявку
- `PUT /api/applications/[id]` - Обновить статус заявки
- `DELETE /api/applications/[id]` - Удалить заявку

### Экспорт
- `GET /api/export/applications` - Экспорт заявок в CSV

## Скрипты

```bash
npm run dev          # Запуск в режиме разработки
npm run build        # Сборка для продакшена
npm run start        # Запуск продакшен-сервера
npm run lint         # Проверка кода

npm run db:generate  # Генерация Prisma Client
npm run db:migrate   # Применение миграций
npm run db:push      # Push схемы в БД (без миграций)
npm run db:seed      # Заполнение тестовыми данными
npm run db:studio    # Открыть Prisma Studio

npm run docker:up    # Запуск PostgreSQL
npm run docker:down  # Остановка PostgreSQL
```

## Переменные окружения

```env
# Database
DATABASE_URL="postgresql://uniqer:uniqer_password@localhost:5432/uniqer?schema=public"

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Email (опционально)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"
EMAIL_FROM="UniQer <noreply@uniqer.kz>"

# WhatsApp (опционально)
WHATSAPP_TOKEN="your-whatsapp-token"
WHATSAPP_PHONE_ID="your-phone-id"

# Site
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_NAME="UniQer"
```

## Деплой

### Vercel

1. Push код в GitHub
2. Импортируйте проект в Vercel
3. Добавьте переменные окружения
4. Используйте внешнюю PostgreSQL (Supabase, Neon, Railway)

### Docker

```bash
docker-compose -f docker-compose.prod.yml up -d
```

## Лицензия

MIT
