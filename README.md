## Setup

- Clone the repo
```bash
git clone https://github.com/LaurynasGr/nestjs-saga-error-demo.git
```
- Go into the folder and install dependencies
```bash
cd nestjs-saga-error-demo && npm i
```
- Run the development server
```bash
npm run start:dev
```

## NestJS Saga Error Examples

### Normal activity:
- http://localhost:3200/user/1/update
- http://localhost:3200/user/2/update

No errors in this case - all events and actions are performed as expected.

### Error thrown in command handler:
- http://localhost:3200/user/3/update

This error is thrown in a `NotifyAdminsCommandHandler` that's being triggered by `UserSagas`. The error is handled by NestJS and logged to the console. Error handling works as expected.

### Error thrown directly in a saga:
- http://localhost:3200/user/4/update

This error is thrown in `UserSagas` directly (same error as above). The error causes the app to crash. The below code can be uncommented in `main.ts`. The issue here is that this will prevent the app from crashing but it would also prevent the saga from ever being triggered again after the first time it throws.

```ts
// process.on('uncaughtException', (err) => {
//   console.error('Application encountered an uncaught exception:', err);
// });
```
