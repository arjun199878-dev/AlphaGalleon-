import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// ─── Store Memo ────────────────────────────────────────
export const store = mutation({
  args: {
    userId: v.optional(v.id("users")),
    symbol: v.string(),
    verdict: v.union(v.literal("BUY"), v.literal("SELL"), v.literal("HOLD")),
    confidence: v.number(),
    summary: v.string(),
    reasoning: v.string(),
    priceAtGeneration: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("memos", {
      ...args,
      generatedAt: Date.now(),
    });
  },
});

// ─── List Recent Memos ─────────────────────────────────
export const listRecent = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const results = await ctx.db
      .query("memos")
      .withIndex("by_date")
      .order("desc")
      .take(args.limit ?? 50);
    return results;
  },
});

// ─── List Memos by Symbol ──────────────────────────────
export const listBySymbol = query({
  args: { symbol: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("memos")
      .withIndex("by_symbol", (q) => q.eq("symbol", args.symbol))
      .collect();
  },
});

// ─── List Memos by User ────────────────────────────────
export const listByUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("memos")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
  },
});
