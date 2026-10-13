import { prisma } from "../prisma";

/**
 * Moves a record one step up or down and renumbers `order` sequentially.
 * `scope` restricts the list (e.g. skills of the same category).
 */
export async function moveInOrder(model, id, direction, scope = {}) {
  const delegate = prisma[model];
  const items = await delegate.findMany({ where: scope, orderBy: [{ order: "asc" }, { id: "asc" }], select: { id: true } });
  const index = items.findIndex((item) => item.id === id);
  const target = direction === "up" ? index - 1 : index + 1;
  if (index < 0 || target < 0 || target >= items.length) return false;
  [items[index], items[target]] = [items[target], items[index]];
  await prisma.$transaction(items.map((item, order) => delegate.update({ where: { id: item.id }, data: { order } })));
  return true;
}

export async function nextOrder(model, scope = {}) {
  const result = await prisma[model].aggregate({ where: scope, _max: { order: true } });
  return (result._max.order ?? -1) + 1;
}
