# grenton-ts

Biblioteka API w TypeScript dla modułów sprzętowych inteligentnego domu [Grenton](https://grenton.com). Dostarcza typowane wrappery dla niskopoziomowych interfejsów sprzętowych Grenton, ułatwiając interakcję z urządzeniami Grenton w projektach TypeScript.

## Przegląd

Urządzenia Grenton udostępniają surowe API oparte na Lua. Ta biblioteka opakowuje te surowe interfejsy typowanymi klasami TypeScript, dając:

- **Typowane właściwości** z getterami/setterami
- **Typowane zdarzenia** z rejestracją callbacków
- **Typowane metody** do wykonywania komend urządzeń
- **Warianty zdalne (Remote)** do komunikacji między bramami (CLU-to-CLU)



Każdy katalog modułu sprzętowego zawiera podkatalogi oznaczone wersją firmware (np. `fv03_02`), dzięki czemu wiele wersji firmware tego samego modułu może współistnieć.

## Architektura

Każdy moduł podąża za tym samym trójwarstwowym wzorcem:

### 1. Interfejs surowy (`*Raw`)

`declare class` odzwierciedlająca niskopoziomowe API sprzętowe:

```typescript
declare class RollerShutterRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}
```

### 2. Klasa wrappera

Klasa wysokopoziomowa, która przyjmuje surowy interfejs w konstruktorze i udostępnia typowane metody, właściwości oraz rejestrację zdarzeń:

```typescript
import { RollerShutter, RollerShutterRaw } from './roller-shutter-din-3/fv03_02/roller-shutter';

const shutter = new RollerShutter(rawRollerShutter);

// Zdarzenia
shutter.addOnPositionChange(() => {
    logInfo('Pozycja:', shutter.position);
});

// Metody
shutter.moveUp(5000);     // ruch w górę przez 5 sekund
shutter.setPosition(50);  // ustawienie na 50% otwarcia

// Właściwości
logInfo(shutter.state);    // wartość enuma StateType
logInfo(shutter.position); // liczba (0–100)
shutter.maxTime = 30000;       // właściwość do odczytu i zapisu
```

### 3. Wariant zdalny (`*Remote`)

Do sterowania urządzeniami znajdującymi się na innym CLU za pomocą `RemoteGate`. Wykorzystuje `rawExecutionBuilderFactory` do budowania ciągów komend wysyłanych przez bramę. Zdarzenia zdalne nie są obsługiwane.

```typescript
import { RollerShutterRemote } from './roller-shutter-din-3/fv03_02/roller-shutter';
import { RemoteGate } from './core/remote-gate';

const gate = new RemoteGate(rawRemoteGate);
const shutter = new RollerShutterRemote('ROLLER_SHUTTER_1', gate);

shutter.moveUp(5000);
shutter.setPosition(75);
```


## Pierwsze kroki

Jeśli chcesz rozpocząć własny projekt Grenton w TypeScript, zacznij od repozytorium szablonu:

```bash
git clone https://github.com/rpaczkow/grenton-ts-template
```

Ten szablon jest już skonfigurowany tak, aby odwoływać się do opublikowanego pakietu zbudowanego z tego repozytorium:
- `https://github.com/rpaczkow/grenton-ts`

## Budowanie

```bash
npm run build   # kompilacja TypeScript → dist/
npm run watch   # tryb watch
```

Wymaga Node.js z TypeScript 5.x (`devDependency`). Skompilowany kod trafia do `dist/`.

## Licencja

MIT
