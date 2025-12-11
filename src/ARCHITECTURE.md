# 🏗️ Архітектура проекту (FSD)

## Структура директорій

```
src/
├── app/              # Next.js App Router (сторінки)
├── widgets/          # Великі самодостатні блоки UI
├── features/         # Бізнес-фічі (дії користувача)
├── entities/         # Бізнес-сутності
└── shared/           # Переіспользовувані ресурси
```

## 📚 Словник шарів

### `app/` - Сторінки

Next.js App Router. Сторінки імпортують widgets.

```
app/
├── (home)/page.tsx       # Головна - список вакансій
├── vacancy/[id]/page.tsx # Сторінка вакансії
├── analytics/page.tsx    # Аналітика
└── layout.tsx           # Головний layout
```

### `widgets/` - Віджети

Великі блоки, що комбінують entities та features.

| Віджет                 | Опис                              |
| ---------------------- | --------------------------------- |
| `header/`              | Шапка сайту                       |
| `vacancy-list/`        | Список вакансій з infinite scroll |
| `vacancy-page/`        | Повна сторінка вакансії           |
| `analytics-dashboard/` | Дашборд аналітики                 |

```typescript
import { Header } from "@/widgets/header";
import { VacancyListWidget } from "@/widgets/vacancy-list";
import { VacancyPageWidget } from "@/widgets/vacancy-page";
import { AnalyticsDashboard } from "@/widgets/analytics-dashboard";
```

### `features/` - Фічі

Бізнес-функціонал, дії користувача.

| Фіча               | Опис                         |
| ------------------ | ---------------------------- |
| `vacancy-filters/` | Фільтрація та пошук вакансій |
| `apply-vacancy/`   | Подача заявки на вакансію    |

```typescript
import {
  FiltersSidebar,
  useVacancyFiltersStore,
} from "@/features/vacancy-filters";
import { ApplyCard } from "@/features/apply-vacancy";
```

### `entities/` - Сутності

Бізнес-сутності з UI, типами та API.

| Сутність     | Компоненти                                         | Опис      |
| ------------ | -------------------------------------------------- | --------- |
| `vacancy/`   | `VacancyCard`, `VacancyHeader`, `VacancySalary`... | Вакансія  |
| `company/`   | `CompanyCard`, `CompanyLogo`                       | Компанія  |
| `skill/`     | `SkillBadge`, `SkillList`                          | Навичка   |
| `location/`  | —                                                  | Локація   |
| `analytics/` | —                                                  | Аналітика |

```typescript
import { VacancyCard, useVacancies, vacancyApi } from "@/entities/vacancy";
import { CompanyCard } from "@/entities/company";
import { useOverview, analyticsKeys } from "@/entities/analytics";
```

### `shared/` - Спільні ресурси

UI-kit, утиліти, конфігурація.

| Папка     | Опис                         |
| --------- | ---------------------------- |
| `ui/`     | Glass UI + Shadcn компоненти |
| `lib/`    | Утиліти, форматери           |
| `config/` | Константи                    |
| `api/`    | Axios клієнт                 |

```typescript
import { GlassCard, GlassBadge, GlassButton } from "@/shared/ui";
import { formatSalary, formatEnglishLevel, cn } from "@/shared/lib";
import { WorkFormat, ENGLISH_LEVEL_COLORS } from "@/shared/config";
import { api } from "@/shared/api";
```

## 🔄 Правила залежностей

```
app → widgets → features → entities → shared
```

- **app** може імпортувати: widgets, features, entities, shared
- **widgets** може імпортувати: features, entities, shared
- **features** може імпортувати: entities, shared
- **entities** може імпортувати: shared
- **shared** не імпортує нічого з вищих шарів

## 🎨 UI Компоненти

### Glass UI (`@/shared/ui`)

| Компонент       | Опис                   |
| --------------- | ---------------------- |
| `GlassCard`     | Картка з glass ефектом |
| `GlassBadge`    | Бейдж                  |
| `GlassButton`   | Кнопка                 |
| `GlassInput`    | Поле вводу             |
| `GlassCheckbox` | Чекбокс                |
| `GlassSelect`   | Селект                 |
| `GlassAlert`    | Алерт                  |
| `Skeleton`      | Скелетон               |

### Vacancy UI (`@/entities/vacancy`)

| Компонент             | Опис              |
| --------------------- | ----------------- |
| `VacancyCard`         | Повна картка      |
| `VacancyCardCompact`  | Компактна картка  |
| `VacancySalary`       | Бейдж зарплати    |
| `VacancyLocation`     | Бейдж локації     |
| `VacancyEnglishLevel` | Бейдж англійської |
| `VacancySource`       | Бейдж джерела     |
| `VacancySkills`       | Список навичок    |

## 📝 Приклад використання

```tsx
// app/(home)/page.tsx
import { vacancyApi } from "@/entities/vacancy";
import { VacancyListWidget } from "@/widgets/vacancy-list";

export default async function Home() {
  const data = await vacancyApi.getList({ take: 10 });
  return <VacancyListWidget initialData={data} />;
}
```

```tsx
// app/analytics/page.tsx
import { AnalyticsDashboard } from "@/widgets/analytics-dashboard";

export default function AnalyticsPage() {
  return <AnalyticsDashboard />;
}
```
