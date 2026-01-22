import { pgTable, index, foreignKey, unique, text, timestamp, boolean, serial, integer, numeric, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const area = pgEnum("area", ['interna', 'externa'])
export const statusPedido = pgEnum("status_pedido", ['aberto', 'preparando', 'pronto', 'pago'])


export const session = pgTable("session", {
	id: text().primaryKey().notNull(),
	expiresAt: timestamp("expires_at", { mode: 'string' }).notNull(),
	token: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	userId: text("user_id").notNull(),
}, (table) => [
	index("session_userId_idx").using("btree", table.userId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "session_user_id_user_id_fk"
		}).onDelete("cascade"),
	unique("session_token_unique").on(table.token),
]);

export const user = pgTable("user", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	email: text().notNull(),
	emailVerified: boolean("email_verified").default(false).notNull(),
	image: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	unique("user_email_unique").on(table.email),
]);

export const verification = pgTable("verification", {
	id: text().primaryKey().notNull(),
	identifier: text().notNull(),
	value: text().notNull(),
	expiresAt: timestamp("expires_at", { mode: 'string' }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("verification_identifier_idx").using("btree", table.identifier.asc().nullsLast().op("text_ops")),
]);

export const account = pgTable("account", {
	id: text().primaryKey().notNull(),
	accountId: text("account_id").notNull(),
	providerId: text("provider_id").notNull(),
	userId: text("user_id").notNull(),
	accessToken: text("access_token"),
	refreshToken: text("refresh_token"),
	idToken: text("id_token"),
	accessTokenExpiresAt: timestamp("access_token_expires_at", { mode: 'string' }),
	scope: text(),
	password: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
}, (table) => [
	index("account_userId_idx").using("btree", table.userId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "account_user_id_user_id_fk"
		}).onDelete("cascade"),
]);

export const pedido = pgTable("pedido", {
	id: serial().primaryKey().notNull(),
	mesaId: integer("mesa_id").notNull(),
	status: statusPedido().default('aberto').notNull(),
	observacao: text(),
	criadoEm: timestamp("criado_em", { mode: 'string' }).defaultNow().notNull(),
	atualizadoEm: timestamp("atualizado_em", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("pedido_mesa_idx").using("btree", table.mesaId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.mesaId],
			foreignColumns: [mesa.id],
			name: "pedido_mesa_id_mesa_id_fk"
		}).onDelete("restrict"),
]);

export const itemPedido = pgTable("item_pedido", {
	id: serial().primaryKey().notNull(),
	pedidoId: integer("pedido_id").notNull(),
	itemCardapioId: integer("item_cardapio_id").notNull(),
	quantidade: integer().default(1).notNull(),
	precoUnitario: numeric("preco_unitario", { precision: 10, scale:  2 }).notNull(),
	observacao: text(),
}, (table) => [
	index("item_pedido_item_idx").using("btree", table.itemCardapioId.asc().nullsLast().op("int4_ops")),
	index("item_pedido_pedido_idx").using("btree", table.pedidoId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.pedidoId],
			foreignColumns: [pedido.id],
			name: "item_pedido_pedido_id_pedido_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.itemCardapioId],
			foreignColumns: [itemCardapio.id],
			name: "item_pedido_item_cardapio_id_item_cardapio_id_fk"
		}).onDelete("restrict"),
]);

export const itemTag = pgTable("item_tag", {
	itemId: integer("item_id").notNull(),
	tagId: integer("tag_id").notNull(),
}, (table) => [
	index("item_tag_item_idx").using("btree", table.itemId.asc().nullsLast().op("int4_ops")),
	index("item_tag_tag_idx").using("btree", table.tagId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.itemId],
			foreignColumns: [itemCardapio.id],
			name: "item_tag_item_id_item_cardapio_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.tagId],
			foreignColumns: [tag.id],
			name: "item_tag_tag_id_tag_id_fk"
		}).onDelete("cascade"),
]);

export const tag = pgTable("tag", {
	id: serial().primaryKey().notNull(),
	nome: text().notNull(),
}, (table) => [
	unique("tag_nome_unique").on(table.nome),
]);

export const mesa = pgTable("mesa", {
	id: serial().primaryKey().notNull(),
	numero: integer().notNull(),
	ocupada: boolean().default(false).notNull(),
	area: area().notNull(),
}, (table) => [
	unique("mesa_numero_unique").on(table.numero),
]);

export const categoria = pgTable("categoria", {
	id: serial().primaryKey().notNull(),
	nome: text().notNull(),
	imagemUrl: text("imagem_url"),
}, (table) => [
	unique("categoria_nome_unique").on(table.nome),
]);

export const itemCardapio = pgTable("item_cardapio", {
	id: serial().primaryKey().notNull(),
	nome: text().notNull(),
	descricao: text(),
	preco: numeric({ precision: 10, scale:  2 }).notNull(),
	imagemUrl: text("imagem_url"),
	disponivel: boolean().default(true).notNull(),
	categoriaId: integer("categoria_id").notNull(),
	criadoEm: timestamp("criado_em", { mode: 'string' }).defaultNow().notNull(),
	atualizadoEm: timestamp("atualizado_em", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.categoriaId],
			foreignColumns: [categoria.id],
			name: "item_cardapio_categoria_id_categoria_id_fk"
		}).onDelete("restrict"),
]);

export const todos = pgTable("todos", {
	id: serial().primaryKey().notNull(),
	title: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
});
