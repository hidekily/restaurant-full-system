import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, boolean, index, serial, integer, decimal, pgEnum, } from "drizzle-orm/pg-core";
export const user = pgTable("user", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: boolean("email_verified").default(false).notNull(),
    image: text("image"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});
export const session = pgTable("session", {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .$onUpdate(() => new Date())
        .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
}, (table) => [index("session_user_id_idx").on(table.userId)]);
export const account = pgTable("account", {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .$onUpdate(() => new Date())
        .notNull(),
}, (table) => [index("account_user_id_idx").on(table.userId)]);
export const verification = pgTable("verification", {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
}, (table) => [index("verification_identifier_idx").on(table.identifier)]);
export const areaEnum = pgEnum("area", ["indoor", "outdoor"]);
export const orderStatusEnum = pgEnum("order_status", [
    "pending",
    "onhold",
    "completed",
]);
export const diningTable = pgTable("dining_table", {
    id: serial("id").primaryKey(),
    number: integer("number").notNull().unique(),
    occupied: boolean("occupied").default(false).notNull(),
    area: areaEnum("area").notNull(),
});
export const category = pgTable("category", {
    id: serial("id").primaryKey(),
    name: text("name").notNull().unique(),
    imageUrl: text("image_url"),
});
export const tag = pgTable("tag", {
    id: serial("id").primaryKey(),
    name: text("name").notNull().unique(),
});
export const menuItem = pgTable("menu_item", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description"),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    imageUrl: text("image_url"),
    available: boolean("available").default(true).notNull(),
    categoryId: integer("category_id")
        .notNull()
        .references(() => category.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});
export const menuItemTag = pgTable("menu_item_tag", {
    menuItemId: integer("menu_item_id")
        .notNull()
        .references(() => menuItem.id, { onDelete: "cascade" }),
    tagId: integer("tag_id")
        .notNull()
        .references(() => tag.id, { onDelete: "cascade" }),
}, (table) => [
    index("menu_item_tag_item_idx").on(table.menuItemId),
    index("menu_item_tag_tag_idx").on(table.tagId),
]);
export const order = pgTable("order", {
    id: serial("id").primaryKey(),
    tableId: integer("table_id")
        .notNull()
        .references(() => diningTable.id, { onDelete: "restrict" }),
    status: orderStatusEnum("status").default("pending").notNull(),
    notes: text("notes"),
    total: decimal("total", { precision: 10, scale: 2 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
}, (table) => [index("order_table_idx").on(table.tableId)]);
export const orderItem = pgTable("order_item", {
    id: serial("id").primaryKey(),
    orderId: integer("order_id")
        .notNull()
        .references(() => order.id, { onDelete: "cascade" }),
    menuItemId: integer("menu_item_id")
        .notNull()
        .references(() => menuItem.id, { onDelete: "restrict" }),
    quantity: integer("quantity").notNull().default(1),
    unitPrice: decimal("unit_price", { precision: 10, scale: 2 }).notNull(),
    done: boolean("done").default(false).notNull(),
    notes: text("notes"),
}, (table) => [
    index("order_item_order_idx").on(table.orderId),
    index("order_item_menu_item_idx").on(table.menuItemId),
]);
export const userRelations = relations(user, ({ many }) => ({
    sessions: many(session),
    accounts: many(account),
}));
export const sessionRelations = relations(session, ({ one }) => ({
    user: one(user, {
        fields: [session.userId],
        references: [user.id],
    }),
}));
export const accountRelations = relations(account, ({ one }) => ({
    user: one(user, {
        fields: [account.userId],
        references: [user.id],
    }),
}));
export const diningTableRelations = relations(diningTable, ({ many }) => ({
    orders: many(order),
}));
export const categoryRelations = relations(category, ({ many }) => ({
    menuItems: many(menuItem),
}));
export const tagRelations = relations(tag, ({ many }) => ({
    menuItemTags: many(menuItemTag),
}));
export const menuItemRelations = relations(menuItem, ({ one, many }) => ({
    category: one(category, {
        fields: [menuItem.categoryId],
        references: [category.id],
    }),
    menuItemTags: many(menuItemTag),
    orderItems: many(orderItem),
}));
export const menuItemTagRelations = relations(menuItemTag, ({ one }) => ({
    menuItem: one(menuItem, {
        fields: [menuItemTag.menuItemId],
        references: [menuItem.id],
    }),
    tag: one(tag, {
        fields: [menuItemTag.tagId],
        references: [tag.id],
    }),
}));
export const orderRelations = relations(order, ({ one, many }) => ({
    table: one(diningTable, {
        fields: [order.tableId],
        references: [diningTable.id],
    }),
    items: many(orderItem),
}));
export const orderItemRelations = relations(orderItem, ({ one }) => ({
    order: one(order, {
        fields: [orderItem.orderId],
        references: [order.id],
    }),
    menuItem: one(menuItem, {
        fields: [orderItem.menuItemId],
        references: [menuItem.id],
    }),
}));
