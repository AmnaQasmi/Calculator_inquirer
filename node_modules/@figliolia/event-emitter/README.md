# @figliolia/event-emitter

### Installation

```bash
npm i -S @figliolia/event-emitter;
# or yarn
yarn add @figliolia/event-emitter;
```

### Basic Usage
#### Creating an instance
```typescript
import { EventEmitter } from "@figliolia/event-emitter";

export const MyEmitter = new EventEmitter();
```

#### Emitting Events
```typescript
import { MyEmitter } from "./path/to/myEmitter";

MyEmitter.emit("some-event", /* any data */);
```

#### Subscribing to Events
```typescript
import { MyEmitter } from "./path/to/myEmitter";

const ID = MyEmitter.on("some-event", (event) => {
  // any logic you wish!
});

// Cleaning up listeners
MyEmitter.off("some-event", ID);
```

### With Strict Typescript
#### Creating an Instance
```typescript
import { EventEmitter } from "@figliolia/event-emitter";

type MyEvents = {
  "event-0": {
    dataPoint: number;
    anotherDataPoint: any
  },
  "event-1": Map<string, () => void>
  // ... and so on
}

export const MyEmitter = new EventEmitter<MyEvents>();
```

#### Emitting type-safe Events
```typescript
import { MyEmitter } from "./path/to/myEmitter";

MyEmitter.emit("event-0", {
  dataPoint: 2,
  anotherDataPoint: [1, 2, 3]
});

// Fails typescript validation
MyEmitter.emit("event-0", {
  dataPoint: "one",
});

// Fails typescript validation
MyEmitter.emit("my-event2", /* event */);
```

#### Subscribing to Events
```typescript
import { MyEmitter } from "./path/to/myEmitter";

MyEmitter.on("event-0", (event) => {
  // any logic you wish!
});

// Fails typescript validation
MyEmitter.on("my-event2", /* handler */);
```