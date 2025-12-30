import { router } from './trpc';
import { contractRouter } from './routers/contract';
import { userRouter } from './routers/user';
import { templateRouter } from './routers/template';
import { auditRouter } from './routers/audit';
import { approvalRouter } from './routers/approval';

export const appRouter = router({
  contract: contractRouter,
  user: userRouter,
  template: templateRouter,
  audit: auditRouter,
  approval: approvalRouter,
});

export type AppRouter = typeof appRouter;
