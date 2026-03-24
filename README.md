# КТ-6. Защита индивидуального проекта

## Презентация

Файл: [`presentation.pptx`](presentation.pptx) — 15 слайдов

## Содержание презентации

| № | Слайд | Описание |
|---|-------|----------|
| 1 | Титульный | Библиотечная система управления на CoreWCF |
| 2 | Обзор проекта | Функции, пользователи, цели |
| 3 | Архитектура | Clean Architecture — 5 слоёв |
| 4 | Контракты | ILibraryService (15 операций), 6 DTO |
| 5 | Транспорты | HTTP (BasicHttpBinding) + TCP (NetTcpBinding) |
| 6 | Аутентификация | Кастомный JWT (HMAC-SHA256), 3 роли |
| 7 | Бизнес-правила | Выдачи, просрочки, валидация, экземпляры |
| 8 | База данных | EF Core InMemory, Repository + UnitOfWork |
| 9 | Клиент | Blazor Server — 6 страниц, Bootstrap 5 |
| 10 | Ошибки | FaultException, CommunicationException, TimeoutException |
| 11 | Тестирование | 40 unit-тестов (xUnit), все проходят |
| 12 | Логирование | Serilog — Console + File, 5 уровней |
| 13 | Этапы разработки | КТ-1 → КТ-5, timeline |
| 14 | Расширение | SQL Server, gRPC, REST, Redis, email |
| 15 | Итоги | Статистика, стек, вопросы |

## Все проекты курса

| КТ | Репозиторий | Описание |
|----|-------------|----------|
| КТ-1 | [DeviceMonitoringService](https://github.com/FinalKvanta/DeviceMonitoringService) | Базовый CoreWCF (HTTP + TCP) |
| КТ-2 | [SecureBankingService](https://github.com/FinalKvanta/SecureBankingService) | JWT, роли, аудит |
| КТ-3 | [LibraryService](https://github.com/FinalKvanta/LibraryService) | Прототип библиотеки |
| КТ-4 | [LibrarySystem](https://github.com/FinalKvanta/LibrarySystem) | Clean Architecture, EF Core, Serilog |
| КТ-5 | [LibrarySystemClient](https://github.com/FinalKvanta/LibrarySystemClient) | Blazor Server клиент |
| КТ-6 | **Этот репозиторий** | Презентация и защита |

## Инструкция по запуску

### Сервер (КТ-4)
```bash
git clone https://github.com/FinalKvanta/LibrarySystem.git
cd LibrarySystem
dotnet run --project src/LibrarySystem.API
# HTTP: http://localhost:5000/LibraryService.svc
# TCP:  net.tcp://localhost:8090/LibraryService.svc
```

### Клиент (КТ-5)
```bash
git clone https://github.com/FinalKvanta/LibrarySystemClient.git
cd LibrarySystemClient
dotnet run --project src/LibrarySystem.BlazorClient
# Открыть: http://localhost:5100
```

### Тесты
```bash
# Серверные тесты (22)
cd LibrarySystem && dotnet test

# Клиентские тесты (18)
cd LibrarySystemClient && dotnet test
```

### Тестовые аккаунты
| Логин | Пароль | Роль |
|-------|--------|------|
| admin | admin123 | Admin |
| librarian | lib123 | Librarian |
| reader | read123 | Reader |

## Ответы на вопросы к защите

### Архитектура и проектирование

**Какую архитектуру выбрали?**
Clean Architecture (чистая архитектура) — 5 слоёв: Core, Application, Infrastructure, API, Client.

**Почему именно эта архитектура?**
- Разделение ответственности между слоями
- Тестируемость бизнес-логики без зависимости от БД и фреймворков
- Лёгкая замена инфраструктуры (например, InMemory → SQL Server)
- Чёткие границы модулей

**Как организовано разделение ответственности?**
- Core: сущности, интерфейсы, исключения — без внешних зависимостей
- Application: бизнес-логика, DTO, контракты сервисов
- Infrastructure: реализация доступа к данным (EF Core)
- API: хостинг CoreWCF, конфигурация DI, Serilog
- Client: Blazor UI, WCF-клиент

**Как спроектированы контракты?**
- `ILibraryService` — единый `[ServiceContract]` с 15 операциями
- 6 DTO с атрибутами `[DataContract]` / `[DataMember(Order = N)]`
- Namespace: `http://library.example.com/services`

### Реализация серверной части

**Ключевые бизнес-правила:**
- Проверка AvailableCopies перед выдачей
- Автоматический DueDate = LoanDate + 14 дней
- Каскадное обновление экземпляров при выдаче/возврате
- Валидация обязательных полей

**Транзакции и конкурентный доступ:**
- UnitOfWork паттерн (`SaveChangesAsync`)
- Scoped lifetime для DbContext — каждый запрос получает свой контекст
- EF Core отслеживает изменения через Change Tracker

**Аутентификация/авторизация:**
- Кастомный JWT на HMAC-SHA256 (из-за конфликтов Microsoft.IdentityModel на .NET 8)
- Токен передаётся параметром в каждый метод
- Проверка роли на сервере перед выполнением операции
- 3 роли: Admin, Librarian, Reader

**Миграции БД:**
- Используется InMemory Provider — миграции не требуются
- При замене на SQL Server — стандартные EF Core Migrations

### Клиентская часть

**Механизмы обратной связи:**
- Bootstrap alerts (success/danger) с кнопкой закрытия
- Спиннеры при загрузке данных
- Русскоязычные сообщения об ошибках
- Визуальное выделение просроченных выдач (красный)

**Долгие операции:**
- `Task.Run()` для WCF-вызовов (не блокируют UI)
- Spinner отображается пока идёт запрос
- Кнопки блокируются во время загрузки

### Тестирование

**Покрытие кода:**
- 40 unit-тестов (22 серверных + 18 клиентских)
- Покрыты: аутентификация, CRUD книг, выдачи, сессии, обработка ошибок
- Фреймворк: xUnit + Moq

**Логирование:**
- Serilog (structured logging)
- Console sink + File sink (ротация по дням)
- `logs/library-YYYY-MM-DD.log`
- `UseSerilogRequestLogging()` для HTTP-запросов
- 5 уровней: Debug, Information, Warning, Error, Fatal

### Общего плана

**Какую проблему решает проект?**
Автоматизация учёта библиотечного фонда: каталог, читатели, выдачи, просрочки, статистика.

**Потенциальные пользователи:**
Библиотекари, администраторы, читатели.

**Возможности расширения:**
- Замена InMemory → SQL Server/PostgreSQL (только Infrastructure)
- gRPC или REST транспорт
- Redis кэширование
- Email-уведомления о просрочках

**Какие транспорты и почему?**
- HTTP (BasicHttpBinding) — совместимость, простота отладки, работа через прокси
- TCP (NetTcpBinding) — производительность, бинарный протокол для intranet

**Асинхронный код:**
- `Task.Run()` обёртки вокруг синхронных WCF-вызовов
- Тестирование через стандартные async/await паттерны в xUnit
