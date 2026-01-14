import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  boolean,
  index,
  serial,
  integer,
  decimal,
  pgEnum,
} from "drizzle-orm/pg-core";

// ============================================
// BETTER-AUTH TABLES (já existentes)
// ============================================

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

export const session = pgTable(
  "session",
  {
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
  },
  (table) => [index("session_userId_idx").on(table.userId)]
);

export const account = pgTable(
  "account",
  {
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
    refreshTokenExpiresAt: timestamp("access_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)]
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)]
);

// ============================================
// RESTAURANT SYSTEM TABLES
// ============================================

// Enums
export const areaEnum = pgEnum("area", ["interna", "externa"]);
export const statusPedidoEnum = pgEnum("status_pedido", [
  "aberto",
  "preparando",
  "pronto",
  "pago",
]);

// Mesa
export const mesa = pgTable("mesa", {
  id: serial("id").primaryKey(),
  numero: integer("numero").notNull().unique(),
  ocupada: boolean("ocupada").default(false).notNull(),
  area: areaEnum("area").notNull(),
});

// Categoria (bebidas, pratos principais, sobremesas, etc)
export const categoria = pgTable("categoria", {
  id: serial("id").primaryKey(),
  nome: text("nome").notNull().unique(),
  imagemUrl: text("imagem_url"), // NOVO: opcional (sem .notNull())
});

// Tag (vegetariano, vegano, sem glúten, etc)
export const tag = pgTable("tag", {
  id: serial("id").primaryKey(),
  nome: text("nome").notNull().unique(),
});

// Item do cardápio
export const itemCardapio = pgTable("item_cardapio", {
  id: serial("id").primaryKey(),
  nome: text("nome").notNull(),
  descricao: text("descricao"),
  preco: decimal("preco", { precision: 10, scale: 2 }).notNull(),
  imagemUrl: text("imagem_url"),
  disponivel: boolean("disponivel").default(true).notNull(),
  categoriaId: integer("categoria_id")
    .notNull()
    .references(() => categoria.id, { onDelete: "restrict" }),
  criadoEm: timestamp("criado_em").defaultNow().notNull(),
  atualizadoEm: timestamp("atualizado_em")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// Tabela de junção: Item ↔ Tag (muitos-pra-muitos)
export const itemTag = pgTable(
  "item_tag",
  {
    itemId: integer("item_id")
      .notNull()
      .references(() => itemCardapio.id, { onDelete: "cascade" }),
    tagId: integer("tag_id")
      .notNull()
      .references(() => tag.id, { onDelete: "cascade" }),
  },
  (table) => [index("item_tag_item_idx").on(table.itemId), index("item_tag_tag_idx").on(table.tagId)]
);

// Pedido
export const pedido = pgTable(
  "pedido",
  {
    id: serial("id").primaryKey(),
    mesaId: integer("mesa_id")
      .notNull()
      .references(() => mesa.id, { onDelete: "restrict" }),
    status: statusPedidoEnum("status").default("aberto").notNull(),
    observacao: text("observacao"),
    criadoEm: timestamp("criado_em").defaultNow().notNull(),
    atualizadoEm: timestamp("atualizado_em")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("pedido_mesa_idx").on(table.mesaId)]
);

// Item do pedido (conecta pedido ↔ item do cardápio)
export const itemPedido = pgTable(
  "item_pedido",
  {
    id: serial("id").primaryKey(),
    pedidoId: integer("pedido_id")
      .notNull()
      .references(() => pedido.id, { onDelete: "cascade" }),
    itemCardapioId: integer("item_cardapio_id")
      .notNull()
      .references(() => itemCardapio.id, { onDelete: "restrict" }),
    quantidade: integer("quantidade").notNull().default(1),
    precoUnitario: decimal("preco_unitario", { precision: 10, scale: 2 }).notNull(),
    observacao: text("observacao"),
  },
  (table) => [
    index("item_pedido_pedido_idx").on(table.pedidoId),
    index("item_pedido_item_idx").on(table.itemCardapioId),
  ]
);

// ============================================
// RELATIONS (para queries com joins automáticos)
// ============================================

// Auth relations
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

// Restaurant relations
export const mesaRelations = relations(mesa, ({ many }) => ({
  pedidos: many(pedido),
}));

export const categoriaRelations = relations(categoria, ({ many }) => ({
  itens: many(itemCardapio),
}));

export const tagRelations = relations(tag, ({ many }) => ({
  itemTags: many(itemTag),
}));

export const itemCardapioRelations = relations(itemCardapio, ({ one, many }) => ({
  categoria: one(categoria, {
    fields: [itemCardapio.categoriaId],
    references: [categoria.id],
  }),
  itemTags: many(itemTag),
  itensPedido: many(itemPedido),
}));

export const itemTagRelations = relations(itemTag, ({ one }) => ({
  item: one(itemCardapio, {
    fields: [itemTag.itemId],
    references: [itemCardapio.id],
  }),
  tag: one(tag, {
    fields: [itemTag.tagId],
    references: [tag.id],
  }),
}));

export const pedidoRelations = relations(pedido, ({ one, many }) => ({
  mesa: one(mesa, {
    fields: [pedido.mesaId],
    references: [mesa.id],
  }),
  itens: many(itemPedido),
}));

export const itemPedidoRelations = relations(itemPedido, ({ one }) => ({
  pedido: one(pedido, {
    fields: [itemPedido.pedidoId],
    references: [pedido.id],
  }),
  itemCardapio: one(itemCardapio, {
    fields: [itemPedido.itemCardapioId],
    references: [itemCardapio.id],
  }),
}));