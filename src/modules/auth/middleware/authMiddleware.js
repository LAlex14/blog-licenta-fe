/**
 * Middleware to check if user has the correct right to access a certain page.
 * Checks are performed based on route meta fields `meta: { requiresAuth: true, requiresPermissionTo?: {action_name} }`.
 * @param {object} router Vue router instance
 */

import {hasToken} from "@/modules/auth/utils/tokenUtils";

const loginRoute = {
  path: `/auth`
};

const defaultRoute = {
  path: `/blogs`
}

export default function authMiddleware(router) {
  router.beforeEach(async (to, from, next) => {

    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    if (requiresAuth && !hasToken()) {
      return next(loginRoute);
    }

    return next();
  });
}
