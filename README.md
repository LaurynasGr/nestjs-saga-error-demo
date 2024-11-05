## NestJS Saga Error Examples

### Normal activity:
- http://localhost:3200/user/1/update
- http://localhost:3200/user/2/update

No errors in this case

### Error thrown in command handler:
- http://localhost:3200/user/3/update

This error is thrown in a command handler that's being triggered by a saga. The error is handled by NestJS and logged to the console. Everything works as expected.

### Error thrown directly in a saga:
- http://localhost:3200/user/4/update

This error is thrown in a saga directly (same error as above). The error causes the app to crash. The below code can be uncommented in `main.ts`
```ts
// process.on('uncaughtException', (err) => {
//   console.error('Application encountered an uncaught exception:', err);
// });
```

The issue here is that this will prevent the app from crashing but it would also prevent the saga from ever being triggered again after the first time it throws.