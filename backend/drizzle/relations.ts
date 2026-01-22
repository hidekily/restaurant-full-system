import { relations } from "drizzle-orm/relations";
import { user, session, account, mesa, pedido, itemPedido, itemCardapio, itemTag, tag, categoria } from "./schema";

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	sessions: many(session),
	accounts: many(account),
}));

export const accountRelations = relations(account, ({one}) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	}),
}));

export const pedidoRelations = relations(pedido, ({one, many}) => ({
	mesa: one(mesa, {
		fields: [pedido.mesaId],
		references: [mesa.id]
	}),
	itemPedidos: many(itemPedido),
}));

export const mesaRelations = relations(mesa, ({many}) => ({
	pedidos: many(pedido),
}));

export const itemPedidoRelations = relations(itemPedido, ({one}) => ({
	pedido: one(pedido, {
		fields: [itemPedido.pedidoId],
		references: [pedido.id]
	}),
	itemCardapio: one(itemCardapio, {
		fields: [itemPedido.itemCardapioId],
		references: [itemCardapio.id]
	}),
}));

export const itemCardapioRelations = relations(itemCardapio, ({one, many}) => ({
	itemPedidos: many(itemPedido),
	itemTags: many(itemTag),
	categoria: one(categoria, {
		fields: [itemCardapio.categoriaId],
		references: [categoria.id]
	}),
}));

export const itemTagRelations = relations(itemTag, ({one}) => ({
	itemCardapio: one(itemCardapio, {
		fields: [itemTag.itemId],
		references: [itemCardapio.id]
	}),
	tag: one(tag, {
		fields: [itemTag.tagId],
		references: [tag.id]
	}),
}));

export const tagRelations = relations(tag, ({many}) => ({
	itemTags: many(itemTag),
}));

export const categoriaRelations = relations(categoria, ({many}) => ({
	itemCardapios: many(itemCardapio),
}));