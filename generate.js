const pptxgen = require("pptxgenjs");
const pres = new pptxgen();

pres.layout = "LAYOUT_16x9";
pres.author = "FinalKvanta";
pres.title = "Библиотечная система управления на CoreWCF";

// Color palette - Midnight Executive
const C = {
  navy: "1E2761",
  navyDark: "141B42",
  ice: "CADCFC",
  white: "FFFFFF",
  offWhite: "F0F3FA",
  accent: "4A7BF7",
  accentLight: "6B93F9",
  gray: "6B7280",
  grayLight: "9CA3AF",
  text: "1F2937",
  textLight: "4B5563",
  green: "10B981",
  red: "EF4444",
  amber: "F59E0B",
};

const makeShadow = () => ({ type: "outer", blur: 4, offset: 2, angle: 135, color: "000000", opacity: 0.12 });

// Helper: add a content slide with standard header bar
function contentSlide(title) {
  const s = pres.addSlide();
  s.background = { color: C.offWhite };
  // Top bar
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.85, fill: { color: C.navy } });
  s.addText(title, { x: 0.6, y: 0.12, w: 8.8, h: 0.6, fontSize: 22, fontFace: "Georgia", color: C.white, bold: true, margin: 0 });
  return s;
}

// Helper: card shape
function addCard(s, x, y, w, h, opts = {}) {
  s.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: opts.fill || C.white },
    shadow: makeShadow(),
  });
  if (opts.accentColor) {
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.06, h, fill: { color: opts.accentColor } });
  }
}

// =============================================
// SLIDE 1: Title
// =============================================
{
  const s = pres.addSlide();
  s.background = { color: C.navyDark };

  // Large decorative circle
  s.addShape(pres.shapes.OVAL, { x: 7.0, y: -1.5, w: 5, h: 5, fill: { color: C.navy } });
  s.addShape(pres.shapes.OVAL, { x: -2.0, y: 3.5, w: 4, h: 4, fill: { color: C.navy } });

  s.addText("Библиотечная система\nуправления на CoreWCF", {
    x: 0.8, y: 0.9, w: 8.4, h: 2.2,
    fontSize: 36, fontFace: "Georgia", color: C.white, bold: true, margin: 0,
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 3.2, w: 2, h: 0.04, fill: { color: C.accent } });

  s.addText("Защита индивидуального проекта", {
    x: 0.8, y: 3.45, w: 8, h: 0.5,
    fontSize: 18, fontFace: "Calibri", color: C.ice, margin: 0,
  });

  s.addText("Дисциплина: Введение в CoreWCF", {
    x: 0.8, y: 4.0, w: 8, h: 0.5,
    fontSize: 14, fontFace: "Calibri", color: C.grayLight, margin: 0,
  });

  s.addText("2026", {
    x: 0.8, y: 4.8, w: 3, h: 0.4,
    fontSize: 12, fontFace: "Calibri", color: C.grayLight, margin: 0,
  });
}

// =============================================
// SLIDE 2: Overview
// =============================================
{
  const s = contentSlide("Обзор проекта");

  addCard(s, 0.5, 1.15, 5.8, 3.9, { accentColor: C.accent });

  s.addText("Library Management System", {
    x: 0.8, y: 1.3, w: 5.2, h: 0.5,
    fontSize: 18, fontFace: "Georgia", color: C.navy, bold: true, margin: 0,
  });

  s.addText("Полнофункциональная система для управления\nбиблиотекой на базе CoreWCF.", {
    x: 0.8, y: 1.85, w: 5.2, h: 0.7,
    fontSize: 13, fontFace: "Calibri", color: C.textLight, margin: 0,
  });

  s.addText([
    { text: "Каталог книг (CRUD)", options: { bullet: true, breakLine: true } },
    { text: "Управление читателями", options: { bullet: true, breakLine: true } },
    { text: "Выдача и возврат книг", options: { bullet: true, breakLine: true } },
    { text: "Статистика библиотеки", options: { bullet: true, breakLine: true } },
    { text: "JWT аутентификация + ролевая авторизация", options: { bullet: true } },
  ], {
    x: 0.8, y: 2.65, w: 5.2, h: 2.2,
    fontSize: 13, fontFace: "Calibri", color: C.text, paraSpaceAfter: 6, margin: 0,
  });

  // Right side: user cards
  const users = [
    { role: "Администратор", desc: "Полный доступ ко всем операциям", color: C.red },
    { role: "Библиотекарь", desc: "Управление книгами, читателями, выдачами", color: C.accent },
    { role: "Читатель", desc: "Просмотр каталога и своих выдач", color: C.green },
  ];

  s.addText("Пользователи", {
    x: 6.6, y: 1.15, w: 3, h: 0.4,
    fontSize: 14, fontFace: "Georgia", color: C.navy, bold: true, margin: 0,
  });

  users.forEach((u, i) => {
    const yy = 1.7 + i * 1.15;
    addCard(s, 6.6, yy, 2.9, 0.95, { accentColor: u.color });
    s.addText(u.role, {
      x: 6.85, y: yy + 0.1, w: 2.5, h: 0.35,
      fontSize: 13, fontFace: "Calibri", color: C.navy, bold: true, margin: 0,
    });
    s.addText(u.desc, {
      x: 6.85, y: yy + 0.48, w: 2.5, h: 0.35,
      fontSize: 10, fontFace: "Calibri", color: C.textLight, margin: 0,
    });
  });
}

// =============================================
// SLIDE 3: Clean Architecture
// =============================================
{
  const s = contentSlide("Архитектура — Clean Architecture");

  // Architecture layers
  const layers = [
    { name: "Core", desc: "Entities, Interfaces, Exceptions, Enums", color: "1E40AF" },
    { name: "Application", desc: "DTOs, Service Contracts, Business Services, Validators", color: "2563EB" },
    { name: "Infrastructure", desc: "EF Core, Repositories, UnitOfWork, SeedData", color: "3B82F6" },
    { name: "API", desc: "CoreWCF Host, Serilog, DI Configuration", color: "60A5FA" },
    { name: "Client", desc: "Blazor Server, ChannelFactory, UI", color: "93C5FD" },
  ];

  layers.forEach((l, i) => {
    const yy = 1.2 + i * 0.78;
    const indent = i * 0.25;
    const ww = 4.5 - indent;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.6 + indent, y: yy, w: ww, h: 0.62,
      fill: { color: l.color }, shadow: makeShadow(),
    });
    s.addText(l.name, {
      x: 0.75 + indent, y: yy + 0.05, w: ww - 0.3, h: 0.28,
      fontSize: 13, fontFace: "Calibri", color: C.white, bold: true, margin: 0,
    });
    s.addText(l.desc, {
      x: 0.75 + indent, y: yy + 0.32, w: ww - 0.3, h: 0.25,
      fontSize: 10, fontFace: "Calibri", color: "DBEAFE", margin: 0,
    });
  });

  // Right: why clean architecture
  addCard(s, 5.6, 1.2, 3.9, 3.7, { accentColor: C.green });

  s.addText("Почему Clean Architecture?", {
    x: 5.85, y: 1.35, w: 3.4, h: 0.4,
    fontSize: 14, fontFace: "Georgia", color: C.navy, bold: true, margin: 0,
  });

  s.addText([
    { text: "Разделение ответственности между слоями", options: { bullet: true, breakLine: true } },
    { text: "Тестируемость бизнес-логики в изоляции", options: { bullet: true, breakLine: true } },
    { text: "Независимость от фреймворков и БД", options: { bullet: true, breakLine: true } },
    { text: "Лёгкая замена инфраструктуры (InMemory → SQL)", options: { bullet: true, breakLine: true } },
    { text: "Чёткие границы модулей", options: { bullet: true } },
  ], {
    x: 5.85, y: 1.85, w: 3.4, h: 2.8,
    fontSize: 12, fontFace: "Calibri", color: C.text, paraSpaceAfter: 8, margin: 0,
  });
}

// =============================================
// SLIDE 4: Service Contracts
// =============================================
{
  const s = contentSlide("Контракты данных и служб");

  addCard(s, 0.5, 1.15, 4.3, 4.0, { accentColor: C.accent });

  s.addText("ILibraryService", {
    x: 0.75, y: 1.3, w: 3.8, h: 0.35,
    fontSize: 16, fontFace: "Consolas", color: C.accent, bold: true, margin: 0,
  });

  s.addText("[ServiceContract] — 15 операций", {
    x: 0.75, y: 1.65, w: 3.8, h: 0.3,
    fontSize: 11, fontFace: "Calibri", color: C.textLight, margin: 0,
  });

  const ops = [
    "Authenticate(user, pass)",
    "GetAllBooks / GetBookById / SearchBooks",
    "AddBook / UpdateBook / DeleteBook",
    "GetAllReaders / GetReaderById",
    "RegisterReader",
    "LendBook / ReturnBook",
    "GetLoansByReader / GetOverdueLoans",
    "GetStatistics",
  ];

  s.addText(ops.map((o, i) => ({
    text: o,
    options: { bullet: true, breakLine: i < ops.length - 1 },
  })), {
    x: 0.75, y: 2.05, w: 3.8, h: 2.8,
    fontSize: 11, fontFace: "Consolas", color: C.text, paraSpaceAfter: 4, margin: 0,
  });

  // Right side: DTOs
  addCard(s, 5.2, 1.15, 4.3, 4.0, { accentColor: C.amber });

  s.addText("Data Transfer Objects", {
    x: 5.45, y: 1.3, w: 3.8, h: 0.35,
    fontSize: 16, fontFace: "Georgia", color: C.navy, bold: true, margin: 0,
  });

  s.addText("[DataContract] / [DataMember]", {
    x: 5.45, y: 1.65, w: 3.8, h: 0.3,
    fontSize: 11, fontFace: "Calibri", color: C.textLight, margin: 0,
  });

  const dtos = [
    { name: "BookDto", fields: "10 полей (Title, Author, ISBN, Year, Genre...)" },
    { name: "ReaderDto", fields: "6 полей (FullName, Email, Phone...)" },
    { name: "LoanDto", fields: "9 полей (BookTitle, LoanDate, DueDate...)" },
    { name: "AuthTokenDto", fields: "4 поля (Token, Username, Role, ExpiresAt)" },
    { name: "SearchCriteriaDto", fields: "3 поля (Title?, Author?, Genre?)" },
    { name: "LibraryStatsDto", fields: "6 полей (TotalBooks, ActiveLoans...)" },
  ];

  dtos.forEach((d, i) => {
    const yy = 2.1 + i * 0.48;
    s.addText(d.name, {
      x: 5.45, y: yy, w: 3.8, h: 0.22,
      fontSize: 12, fontFace: "Consolas", color: C.accent, bold: true, margin: 0,
    });
    s.addText(d.fields, {
      x: 5.45, y: yy + 0.22, w: 3.8, h: 0.2,
      fontSize: 10, fontFace: "Calibri", color: C.textLight, margin: 0,
    });
  });
}

// =============================================
// SLIDE 5: Transports
// =============================================
{
  const s = contentSlide("Транспорты — HTTP и TCP");

  // HTTP card
  addCard(s, 0.5, 1.3, 4.3, 3.0, { accentColor: C.accent });
  s.addText("HTTP — BasicHttpBinding", {
    x: 0.75, y: 1.45, w: 3.8, h: 0.35,
    fontSize: 15, fontFace: "Georgia", color: C.navy, bold: true, margin: 0,
  });
  s.addText("Порт 5000", {
    x: 0.75, y: 1.8, w: 3.8, h: 0.25,
    fontSize: 12, fontFace: "Consolas", color: C.accent, margin: 0,
  });
  s.addText([
    { text: "SOAP/XML формат", options: { bullet: true, breakLine: true } },
    { text: "Совместимость с любым HTTP-клиентом", options: { bullet: true, breakLine: true } },
    { text: "Прост в отладке (текстовый протокол)", options: { bullet: true, breakLine: true } },
    { text: "Работает через прокси и файрволлы", options: { bullet: true } },
  ], {
    x: 0.75, y: 2.2, w: 3.8, h: 1.9,
    fontSize: 12, fontFace: "Calibri", color: C.text, paraSpaceAfter: 6, margin: 0,
  });

  // TCP card
  addCard(s, 5.2, 1.3, 4.3, 3.0, { accentColor: C.green });
  s.addText("TCP — NetTcpBinding", {
    x: 5.45, y: 1.45, w: 3.8, h: 0.35,
    fontSize: 15, fontFace: "Georgia", color: C.navy, bold: true, margin: 0,
  });
  s.addText("Порт 8090", {
    x: 5.45, y: 1.8, w: 3.8, h: 0.25,
    fontSize: 12, fontFace: "Consolas", color: C.green, margin: 0,
  });
  s.addText([
    { text: "Бинарный протокол", options: { bullet: true, breakLine: true } },
    { text: "Высокая производительность", options: { bullet: true, breakLine: true } },
    { text: "Меньший размер сообщений", options: { bullet: true, breakLine: true } },
    { text: "Оптимален для intranet-сценариев", options: { bullet: true } },
  ], {
    x: 5.45, y: 2.2, w: 3.8, h: 1.9,
    fontSize: 12, fontFace: "Calibri", color: C.text, paraSpaceAfter: 6, margin: 0,
  });

  // Bottom note
  addCard(s, 0.5, 4.55, 9.0, 0.65);
  s.addText("Клиент переключает транспорт в реальном времени через чекбокс на каждой странице", {
    x: 0.75, y: 4.6, w: 8.5, h: 0.5,
    fontSize: 12, fontFace: "Calibri", color: C.textLight, italic: true, margin: 0,
  });
}

// =============================================
// SLIDE 6: Authentication
// =============================================
{
  const s = contentSlide("Аутентификация и авторизация");

  addCard(s, 0.5, 1.15, 5.0, 4.0, { accentColor: C.red });

  s.addText("Кастомный JWT (HMAC-SHA256)", {
    x: 0.75, y: 1.3, w: 4.5, h: 0.4,
    fontSize: 16, fontFace: "Georgia", color: C.navy, bold: true, margin: 0,
  });

  s.addText([
    { text: "Реализация без Microsoft.IdentityModel", options: { bullet: true, breakLine: true } },
    { text: "(конфликт версий на .NET 8)", options: { indentLevel: 1, breakLine: true, color: C.grayLight } },
    { text: "Base64(header).Base64(payload).Base64(sig)", options: { bullet: true, breakLine: true } },
    { text: "Подпись: HMAC-SHA256 с секретным ключом", options: { bullet: true, breakLine: true } },
    { text: "Валидация: подпись, срок, издатель", options: { bullet: true, breakLine: true } },
    { text: "Токен передаётся параметром в каждый метод", options: { bullet: true, breakLine: true } },
    { text: "Проверка роли на сервере перед операцией", options: { bullet: true } },
  ], {
    x: 0.75, y: 1.85, w: 4.5, h: 3.0,
    fontSize: 12, fontFace: "Calibri", color: C.text, paraSpaceAfter: 5, margin: 0,
  });

  // Role table
  addCard(s, 5.8, 1.15, 3.7, 4.0, { accentColor: C.amber });

  s.addText("Матрица ролей", {
    x: 6.05, y: 1.3, w: 3.2, h: 0.35,
    fontSize: 14, fontFace: "Georgia", color: C.navy, bold: true, margin: 0,
  });

  const roleTable = [
    [
      { text: "Операция", options: { bold: true, fill: { color: C.navy }, color: C.white, fontSize: 10 } },
      { text: "R", options: { bold: true, fill: { color: C.navy }, color: C.white, fontSize: 10, align: "center" } },
      { text: "L", options: { bold: true, fill: { color: C.navy }, color: C.white, fontSize: 10, align: "center" } },
      { text: "A", options: { bold: true, fill: { color: C.navy }, color: C.white, fontSize: 10, align: "center" } },
    ],
    [{ text: "Просмотр книг", options: { fontSize: 10 } }, { text: "+", options: { align: "center", fontSize: 10 } }, { text: "+", options: { align: "center", fontSize: 10 } }, { text: "+", options: { align: "center", fontSize: 10 } }],
    [{ text: "Добавить книгу", options: { fontSize: 10 } }, { text: "—", options: { align: "center", fontSize: 10, color: C.red } }, { text: "+", options: { align: "center", fontSize: 10 } }, { text: "+", options: { align: "center", fontSize: 10 } }],
    [{ text: "Удалить книгу", options: { fontSize: 10 } }, { text: "—", options: { align: "center", fontSize: 10, color: C.red } }, { text: "—", options: { align: "center", fontSize: 10, color: C.red } }, { text: "+", options: { align: "center", fontSize: 10 } }],
    [{ text: "Читатели", options: { fontSize: 10 } }, { text: "—", options: { align: "center", fontSize: 10, color: C.red } }, { text: "+", options: { align: "center", fontSize: 10 } }, { text: "+", options: { align: "center", fontSize: 10 } }],
    [{ text: "Выдачи", options: { fontSize: 10 } }, { text: "—", options: { align: "center", fontSize: 10, color: C.red } }, { text: "+", options: { align: "center", fontSize: 10 } }, { text: "+", options: { align: "center", fontSize: 10 } }],
    [{ text: "Статистика", options: { fontSize: 10 } }, { text: "—", options: { align: "center", fontSize: 10, color: C.red } }, { text: "+", options: { align: "center", fontSize: 10 } }, { text: "+", options: { align: "center", fontSize: 10 } }],
  ];

  s.addTable(roleTable, {
    x: 6.0, y: 1.8, w: 3.3,
    colW: [1.5, 0.5, 0.5, 0.5],
    border: { pt: 0.5, color: "E5E7EB" },
    fontFace: "Calibri",
    rowH: 0.33,
  });

  s.addText("R = Reader, L = Librarian, A = Admin", {
    x: 6.0, y: 4.2, w: 3.3, h: 0.3,
    fontSize: 9, fontFace: "Calibri", color: C.grayLight, margin: 0,
  });
}

// =============================================
// SLIDE 7: Business Rules
// =============================================
{
  const s = contentSlide("Ключевые бизнес-правила");

  const rules = [
    { title: "Выдача книг", desc: "Проверка доступности экземпляров перед выдачей. Автоматический расчёт срока возврата (14 дней).", color: C.accent },
    { title: "Просрочки", desc: "Автоматическое отслеживание просроченных выдач. Просроченные выдачи выделены красным в UI.", color: C.red },
    { title: "Валидация", desc: "Проверка ISBN, обязательных полей. Ограничение операций по ролям.", color: C.amber },
    { title: "Экземпляры", desc: "Каскадное обновление AvailableCopies при выдаче и возврате книг.", color: C.green },
  ];

  rules.forEach((r, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.5 + col * 4.75;
    const y = 1.2 + row * 1.95;

    addCard(s, x, y, 4.4, 1.7, { accentColor: r.color });

    s.addText(r.title, {
      x: x + 0.25, y: y + 0.15, w: 3.9, h: 0.35,
      fontSize: 15, fontFace: "Georgia", color: C.navy, bold: true, margin: 0,
    });
    s.addText(r.desc, {
      x: x + 0.25, y: y + 0.6, w: 3.9, h: 0.9,
      fontSize: 12, fontFace: "Calibri", color: C.textLight, margin: 0,
    });
  });
}

// =============================================
// SLIDE 8: Database
// =============================================
{
  const s = contentSlide("База данных и хранение");

  addCard(s, 0.5, 1.15, 4.5, 4.0, { accentColor: C.accent });

  s.addText("Entity Framework Core", {
    x: 0.75, y: 1.3, w: 4.0, h: 0.4,
    fontSize: 16, fontFace: "Georgia", color: C.navy, bold: true, margin: 0,
  });

  s.addText("InMemory Provider", {
    x: 0.75, y: 1.7, w: 4.0, h: 0.25,
    fontSize: 12, fontFace: "Consolas", color: C.accent, margin: 0,
  });

  s.addText([
    { text: "4 таблицы: Books, Readers, Loans, Users", options: { bullet: true, breakLine: true } },
    { text: "Repository Pattern для каждой сущности", options: { bullet: true, breakLine: true } },
    { text: "UnitOfWork для транзакций", options: { bullet: true, breakLine: true } },
    { text: "SeedData — начальные данные при старте", options: { bullet: true, breakLine: true } },
    { text: "Scoped lifetime для DbContext и DI", options: { bullet: true, breakLine: true } },
    { text: "Легко заменить на SQL Server / PostgreSQL", options: { bullet: true } },
  ], {
    x: 0.75, y: 2.1, w: 4.0, h: 2.8,
    fontSize: 12, fontFace: "Calibri", color: C.text, paraSpaceAfter: 6, margin: 0,
  });

  // Right: patterns
  addCard(s, 5.3, 1.15, 4.2, 4.0, { accentColor: C.green });

  s.addText("Паттерны доступа к данным", {
    x: 5.55, y: 1.3, w: 3.7, h: 0.4,
    fontSize: 14, fontFace: "Georgia", color: C.navy, bold: true, margin: 0,
  });

  const patterns = [
    { name: "IBookRepository", desc: "CRUD + Search + Count" },
    { name: "IReaderRepository", desc: "CRUD + FindByEmail" },
    { name: "ILoanRepository", desc: "CRUD + ByReader + Overdue" },
    { name: "IUserRepository", desc: "FindByUsername" },
    { name: "IUnitOfWork", desc: "SaveChangesAsync()" },
  ];

  patterns.forEach((p, i) => {
    const yy = 1.9 + i * 0.58;
    s.addText(p.name, {
      x: 5.55, y: yy, w: 3.7, h: 0.25,
      fontSize: 12, fontFace: "Consolas", color: C.accent, bold: true, margin: 0,
    });
    s.addText(p.desc, {
      x: 5.55, y: yy + 0.25, w: 3.7, h: 0.22,
      fontSize: 11, fontFace: "Calibri", color: C.textLight, margin: 0,
    });
  });
}

// =============================================
// SLIDE 9: Client (Blazor)
// =============================================
{
  const s = contentSlide("Клиентская часть — Blazor Server");

  // Pages grid
  const pages = [
    { name: "Login", desc: "Авторизация, выбор транспорта", color: C.red },
    { name: "Home", desc: "Дашборд с навигацией по роли", color: C.accent },
    { name: "Books", desc: "CRUD, поиск, фильтрация", color: "2563EB" },
    { name: "Readers", desc: "Регистрация и список читателей", color: C.green },
    { name: "Loans", desc: "Выдача, возврат, просрочки", color: C.amber },
    { name: "Statistics", desc: "Сводные показатели", color: "8B5CF6" },
  ];

  pages.forEach((p, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.5 + col * 3.1;
    const y = 1.2 + row * 1.5;

    addCard(s, x, y, 2.8, 1.25, { accentColor: p.color });

    s.addText(p.name, {
      x: x + 0.2, y: y + 0.15, w: 2.4, h: 0.35,
      fontSize: 14, fontFace: "Consolas", color: C.navy, bold: true, margin: 0,
    });
    s.addText(p.desc, {
      x: x + 0.2, y: y + 0.55, w: 2.4, h: 0.5,
      fontSize: 11, fontFace: "Calibri", color: C.textLight, margin: 0,
    });
  });

  // Bottom: tech
  addCard(s, 0.5, 4.35, 9.0, 0.85);
  s.addText([
    { text: "ChannelFactory<ILibraryService>", options: { bold: true, fontFace: "Consolas", fontSize: 11 } },
    { text: "  для HTTP и TCP  |  ", options: { fontSize: 11 } },
    { text: "SessionService", options: { bold: true, fontFace: "Consolas", fontSize: 11 } },
    { text: "  для токена  |  ", options: { fontSize: 11 } },
    { text: "Bootstrap 5", options: { bold: true, fontSize: 11 } },
    { text: "  UI", options: { fontSize: 11 } },
  ], {
    x: 0.75, y: 4.45, w: 8.5, h: 0.6,
    fontFace: "Calibri", color: C.text, margin: 0,
  });
}

// =============================================
// SLIDE 10: Error Handling
// =============================================
{
  const s = contentSlide("Обработка ошибок");

  const errors = [
    { type: "FaultException", desc: "Бизнес-ошибки (доступ, не найдено, нет экземпляров)", color: C.red },
    { type: "CommunicationException", desc: "Проблемы соединения с сервером", color: C.amber },
    { type: "TimeoutException", desc: "Превышение времени ожидания", color: "8B5CF6" },
  ];

  errors.forEach((e, i) => {
    const yy = 1.2 + i * 1.0;
    addCard(s, 0.5, yy, 5.0, 0.82, { accentColor: e.color });
    s.addText(e.type, {
      x: 0.75, y: yy + 0.08, w: 4.5, h: 0.3,
      fontSize: 13, fontFace: "Consolas", color: C.navy, bold: true, margin: 0,
    });
    s.addText(e.desc, {
      x: 0.75, y: yy + 0.4, w: 4.5, h: 0.3,
      fontSize: 11, fontFace: "Calibri", color: C.textLight, margin: 0,
    });
  });

  // Right: centralized handler
  addCard(s, 5.8, 1.2, 3.7, 3.8, { accentColor: C.accent });

  s.addText("ErrorHandler", {
    x: 6.05, y: 1.35, w: 3.2, h: 0.35,
    fontSize: 14, fontFace: "Georgia", color: C.navy, bold: true, margin: 0,
  });

  s.addText([
    { text: "Централизованная обработка", options: { bullet: true, breakLine: true } },
    { text: "Русскоязычные сообщения", options: { bullet: true, breakLine: true } },
    { text: "Парсинг FaultException.Message", options: { bullet: true, breakLine: true } },
    { text: "alert-danger / alert-success", options: { bullet: true, breakLine: true } },
    { text: "Спиннеры при загрузке", options: { bullet: true, breakLine: true } },
    { text: "Кнопки «Закрыть» у алертов", options: { bullet: true } },
  ], {
    x: 6.05, y: 1.8, w: 3.2, h: 2.8,
    fontSize: 11, fontFace: "Calibri", color: C.text, paraSpaceAfter: 5, margin: 0,
  });
}

// =============================================
// SLIDE 11: Testing
// =============================================
{
  const s = contentSlide("Тестирование");

  // Big number
  addCard(s, 0.5, 1.2, 2.5, 2.2);
  s.addText("40", {
    x: 0.5, y: 1.3, w: 2.5, h: 1.2,
    fontSize: 60, fontFace: "Georgia", color: C.accent, bold: true, align: "center", margin: 0,
  });
  s.addText("unit-тестов", {
    x: 0.5, y: 2.5, w: 2.5, h: 0.4,
    fontSize: 14, fontFace: "Calibri", color: C.textLight, align: "center", margin: 0,
  });
  s.addText("Все проходят", {
    x: 0.5, y: 2.85, w: 2.5, h: 0.3,
    fontSize: 12, fontFace: "Calibri", color: C.green, bold: true, align: "center", margin: 0,
  });

  // KT-4 tests
  addCard(s, 3.3, 1.2, 3.1, 2.2, { accentColor: C.accent });
  s.addText("КТ-4: Сервер (22 теста)", {
    x: 3.55, y: 1.35, w: 2.6, h: 0.3,
    fontSize: 12, fontFace: "Georgia", color: C.navy, bold: true, margin: 0,
  });
  s.addText([
    { text: "AuthServiceTests — 6", options: { bullet: true, breakLine: true } },
    { text: "BookServiceTests — 8", options: { bullet: true, breakLine: true } },
    { text: "LoanServiceTests — 8", options: { bullet: true } },
  ], {
    x: 3.55, y: 1.8, w: 2.6, h: 1.4,
    fontSize: 11, fontFace: "Calibri", color: C.text, paraSpaceAfter: 4, margin: 0,
  });

  // KT-5 tests
  addCard(s, 6.7, 1.2, 2.8, 2.2, { accentColor: C.green });
  s.addText("КТ-5: Клиент (18 тестов)", {
    x: 6.95, y: 1.35, w: 2.3, h: 0.3,
    fontSize: 12, fontFace: "Georgia", color: C.navy, bold: true, margin: 0,
  });
  s.addText([
    { text: "SessionServiceTests — 9", options: { bullet: true, breakLine: true } },
    { text: "ErrorHandlerTests — 9", options: { bullet: true } },
  ], {
    x: 6.95, y: 1.8, w: 2.3, h: 1.2,
    fontSize: 11, fontFace: "Calibri", color: C.text, paraSpaceAfter: 4, margin: 0,
  });

  // Framework info
  addCard(s, 0.5, 3.65, 9.0, 1.4);
  s.addText("Инструменты тестирования", {
    x: 0.75, y: 3.8, w: 8.5, h: 0.3,
    fontSize: 14, fontFace: "Georgia", color: C.navy, bold: true, margin: 0,
  });
  s.addText([
    { text: "xUnit", options: { bold: true } },
    { text: " — тестовый фреймворк  |  ", options: {} },
    { text: "Moq", options: { bold: true } },
    { text: " — мокирование зависимостей  |  ", options: {} },
    { text: "EF Core InMemory", options: { bold: true } },
    { text: " — тестовая БД", options: {} },
  ], {
    x: 0.75, y: 4.2, w: 8.5, h: 0.5,
    fontSize: 12, fontFace: "Calibri", color: C.text, margin: 0,
  });
}

// =============================================
// SLIDE 12: Logging
// =============================================
{
  const s = contentSlide("Логирование — Serilog");

  addCard(s, 0.5, 1.15, 4.5, 4.0, { accentColor: C.accent });

  s.addText("Structured Logging", {
    x: 0.75, y: 1.3, w: 4.0, h: 0.4,
    fontSize: 16, fontFace: "Georgia", color: C.navy, bold: true, margin: 0,
  });

  s.addText([
    { text: "Console Sink — вывод в консоль", options: { bullet: true, breakLine: true } },
    { text: "File Sink — ротация по дням", options: { bullet: true, breakLine: true } },
    { text: "logs/library-YYYY-MM-DD.log", options: { indentLevel: 1, breakLine: true, color: C.grayLight, fontFace: "Consolas" } },
    { text: "UseSerilogRequestLogging()", options: { bullet: true, breakLine: true, fontFace: "Consolas" } },
    { text: "Логирование каждой бизнес-операции", options: { bullet: true } },
  ], {
    x: 0.75, y: 1.85, w: 4.0, h: 2.5,
    fontSize: 12, fontFace: "Calibri", color: C.text, paraSpaceAfter: 6, margin: 0,
  });

  // Right: levels
  addCard(s, 5.3, 1.15, 4.2, 4.0, { accentColor: C.amber });

  s.addText("Уровни логирования", {
    x: 5.55, y: 1.3, w: 3.7, h: 0.35,
    fontSize: 14, fontFace: "Georgia", color: C.navy, bold: true, margin: 0,
  });

  const levels = [
    { name: "Debug", desc: "Детальная отладочная информация", color: C.grayLight },
    { name: "Information", desc: "Ключевые события и операции", color: C.accent },
    { name: "Warning", desc: "Подозрительные ситуации", color: C.amber },
    { name: "Error", desc: "Ошибки, не прерывающие работу", color: C.red },
    { name: "Fatal", desc: "Критические сбои", color: "991111" },
  ];

  levels.forEach((l, i) => {
    const yy = 1.85 + i * 0.56;
    s.addShape(pres.shapes.RECTANGLE, { x: 5.55, y: yy + 0.02, w: 0.08, h: 0.4, fill: { color: l.color } });
    s.addText(l.name, {
      x: 5.75, y: yy, w: 1.5, h: 0.25,
      fontSize: 12, fontFace: "Consolas", color: C.navy, bold: true, margin: 0,
    });
    s.addText(l.desc, {
      x: 5.75, y: yy + 0.24, w: 3.4, h: 0.22,
      fontSize: 10, fontFace: "Calibri", color: C.textLight, margin: 0,
    });
  });
}

// =============================================
// SLIDE 13: Development Stages
// =============================================
{
  const s = contentSlide("Этапы разработки");

  const stages = [
    { kt: "КТ-1", name: "DeviceMonitoringService", desc: "Базовый CoreWCF с HTTP + TCP", color: "93C5FD" },
    { kt: "КТ-2", name: "SecureBankingService", desc: "JWT аутентификация, роли, аудит", color: "60A5FA" },
    { kt: "КТ-3", name: "LibraryService", desc: "Прототип библиотеки, 12 операций", color: "3B82F6" },
    { kt: "КТ-4", name: "LibrarySystem", desc: "Clean Architecture, EF Core, Serilog, 22 теста", color: "2563EB" },
    { kt: "КТ-5", name: "LibrarySystemClient", desc: "Blazor Server, 18 тестов, UI", color: "1E40AF" },
  ];

  stages.forEach((st, i) => {
    const yy = 1.2 + i * 0.82;

    // Timeline dot
    s.addShape(pres.shapes.OVAL, { x: 0.85, y: yy + 0.18, w: 0.28, h: 0.28, fill: { color: st.color } });
    if (i < stages.length - 1) {
      s.addShape(pres.shapes.RECTANGLE, { x: 0.95, y: yy + 0.46, w: 0.08, h: 0.52, fill: { color: "DBEAFE" } });
    }

    addCard(s, 1.5, yy, 8.0, 0.65, { accentColor: st.color });

    s.addText(st.kt, {
      x: 1.75, y: yy + 0.05, w: 0.8, h: 0.28,
      fontSize: 12, fontFace: "Calibri", color: C.white, bold: true, margin: 0,
      fill: { color: st.color },
    });

    s.addText(st.name, {
      x: 2.7, y: yy + 0.05, w: 3.0, h: 0.28,
      fontSize: 12, fontFace: "Consolas", color: C.navy, bold: true, margin: 0,
    });

    s.addText(st.desc, {
      x: 1.75, y: yy + 0.35, w: 7.5, h: 0.25,
      fontSize: 11, fontFace: "Calibri", color: C.textLight, margin: 0,
    });
  });

  s.addText("GitHub: github.com/FinalKvanta", {
    x: 1.5, y: 5.0, w: 4, h: 0.3,
    fontSize: 11, fontFace: "Consolas", color: C.accent, margin: 0,
  });
}

// =============================================
// SLIDE 14: Expansion
// =============================================
{
  const s = contentSlide("Возможности расширения");

  const items = [
    { title: "SQL Server / PostgreSQL", desc: "Замена InMemory — изменения только в Infrastructure", color: C.accent },
    { title: "gRPC транспорт", desc: "Добавление нового высокопроизводительного транспорта", color: C.green },
    { title: "REST API", desc: "Параллельный REST контроллер рядом с WCF", color: "2563EB" },
    { title: "Redis кэширование", desc: "Кэш часто запрашиваемых данных", color: C.red },
    { title: "Email-уведомления", desc: "Оповещения о просроченных выдачах", color: C.amber },
    { title: "Импорт/экспорт", desc: "Каталог в CSV, XML форматах", color: "8B5CF6" },
  ];

  items.forEach((it, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.5 + col * 4.75;
    const y = 1.15 + row * 1.35;

    addCard(s, x, y, 4.4, 1.1, { accentColor: it.color });
    s.addText(it.title, {
      x: x + 0.25, y: y + 0.12, w: 3.9, h: 0.35,
      fontSize: 13, fontFace: "Georgia", color: C.navy, bold: true, margin: 0,
    });
    s.addText(it.desc, {
      x: x + 0.25, y: y + 0.5, w: 3.9, h: 0.45,
      fontSize: 11, fontFace: "Calibri", color: C.textLight, margin: 0,
    });
  });
}

// =============================================
// SLIDE 15: Summary & Thank You
// =============================================
{
  const s = pres.addSlide();
  s.background = { color: C.navyDark };

  s.addShape(pres.shapes.OVAL, { x: -1.5, y: -1.0, w: 4, h: 4, fill: { color: C.navy } });
  s.addShape(pres.shapes.OVAL, { x: 8.0, y: 3.5, w: 4, h: 4, fill: { color: C.navy } });

  s.addText("Итоги проекта", {
    x: 0.8, y: 0.5, w: 8.4, h: 0.6,
    fontSize: 28, fontFace: "Georgia", color: C.white, bold: true, margin: 0,
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 1.2, w: 1.5, h: 0.04, fill: { color: C.accent } });

  // Stats row
  const stats = [
    { num: "5", label: "проектов" },
    { num: "60+", label: "файлов" },
    { num: "40", label: "тестов" },
    { num: "2", label: "транспорта" },
  ];

  stats.forEach((st, i) => {
    const x = 0.8 + i * 2.2;
    s.addText(st.num, {
      x, y: 1.5, w: 1.8, h: 0.8,
      fontSize: 36, fontFace: "Georgia", color: C.accent, bold: true, align: "center", margin: 0,
    });
    s.addText(st.label, {
      x, y: 2.25, w: 1.8, h: 0.35,
      fontSize: 13, fontFace: "Calibri", color: C.ice, align: "center", margin: 0,
    });
  });

  // Tech stack
  s.addText([
    { text: "Clean Architecture + CoreWCF + EF Core + Serilog + Blazor", options: { breakLine: true } },
    { text: "JWT аутентификация + ролевая авторизация", options: { breakLine: true } },
    { text: "Полная обработка ошибок (FaultException)", options: {} },
  ], {
    x: 0.8, y: 3.0, w: 8.4, h: 1.2,
    fontSize: 14, fontFace: "Calibri", color: C.ice, paraSpaceAfter: 8, margin: 0,
  });

  s.addText("Спасибо за внимание!", {
    x: 0.8, y: 4.2, w: 8.4, h: 0.6,
    fontSize: 24, fontFace: "Georgia", color: C.white, bold: true, margin: 0,
  });

  s.addText("Вопросы?", {
    x: 0.8, y: 4.75, w: 8.4, h: 0.4,
    fontSize: 16, fontFace: "Calibri", color: C.accent, margin: 0,
  });
}

// Write file
pres.writeFile({ fileName: "C:/Users/msp_pc17/Desktop/peresdacha-kt6/presentation.pptx" })
  .then(() => console.log("Presentation created successfully!"))
  .catch(err => console.error("Error:", err));
