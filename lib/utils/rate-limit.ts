interface RateLimitOptions {
  interval: number; // in milliseconds
  uniqueTokenPerInterval?: number;
}

export function rateLimit(options: RateLimitOptions) {
  const interval = options.interval;
  const maxTokens = options.uniqueTokenPerInterval || 5000;
  const tokenCache = new Map<string, { count: number; expiresAt: number }>();

  return {
    check: (limit: number, token: string): boolean => {
      const now = Date.now();
      const record = tokenCache.get(token);

      // Clean up expired tokens if cache grows large
      if (tokenCache.size > maxTokens) {
        for (const [key, val] of tokenCache.entries()) {
          if (val.expiresAt <= now) tokenCache.delete(key);
        }
      }

      if (!record || record.expiresAt <= now) {
        tokenCache.set(token, { count: 1, expiresAt: now + interval });
        return true;
      }

      if (record.count >= limit) {
        return false;
      }

      record.count += 1;
      return true;
    },
  };
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }
  return '127.0.0.1';
}
