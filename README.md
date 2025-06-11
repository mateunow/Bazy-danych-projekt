# Bazy-danych-projekt
Autorzy:
Agnieszka Mirosław
Mateusz Nowak

Technologie: MongoDB, Node.js + Express

System Rezerwacji Sal / Pokoi / Stanowisk Pracy – MongoDB + Node.js
Aplikacja backendowa do zarządzania rezerwacjami zasobów w firmie (np. sal konferencyjnych, pokoi, stanowisk). Projekt realizuje pełen zestaw operacji CRUD oraz wspiera zaawansowane mechanizmy kontroli dostępu i raportowania.

🔧 Technologie:
MongoDB (NoSQL, z replikacją i transakcjami)

Mongoose (modelowanie danych)

Express.js (REST API)

Node.js

📦 Funkcjonalności:
Zarządzanie użytkownikami, zasobami i rezerwacjami (CRUD)

Operacje rezerwacji z użyciem transakcji:

Sprawdzanie konfliktów czasowych

Ograniczenia dzienne dla użytkowników

Blokowanie „wyścigu” o ten sam zasób

Raporty agregujące:

Najczęściej rezerwowane zasoby

Aktywność użytkowników

Logowanie wszystkich operacji (logi systemowe)

✅ Bezpieczeństwo i wydajność:
Walidacja JSON Schema

Indeksy przyspieszające filtrowanie i wykrywanie kolizji

Obsługa transakcji z rollbackiem
