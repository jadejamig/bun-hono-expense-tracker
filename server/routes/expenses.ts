import { Hono } from "hono";
import * as z from 'zod'
import { zValidator } from '@hono/zod-validator'

const expenseSchema = z.object({
    id: z.number().int().positive().min(1),
    title: z.string().min(1).max(100),
    amount: z.number().int().positive()
})

const createPostSchema = expenseSchema.omit({ id: true })

type Expense = z.infer<typeof expenseSchema>

const fakeExpenses: Expense[] = [
    { id: 1, title: "Groceries", amount: 50 },
    { id: 2, title: "Utilities", amount: 100 },
    { id: 3, title: "Rent", amount: 1000 },
]

export const expensesRoute = new Hono()

expensesRoute
.get('/', c => {
    return c.json({ expenses: fakeExpenses})
})
.get('/:id{[0-9]+}', c => {
    const id = Number.parseInt(c.req.param('id'));

    const expense = fakeExpenses.find(expense => expense.id === id)

    if (!expense) {
        return c.notFound()
    }

    return c.json({expense: expense})
})
.get("/total-spent", c => {
    const total = fakeExpenses.map(expense => expense.amount).reduce((prev, current) => prev + current, 0) // 0 as initial value
    return c.json({total: total})
})

expensesRoute.post('/',zValidator('json', createPostSchema) ,async (c) => {
    // const data = await c.req.json()
    // const expense = createPostSchema.parse(data)
    const expense = c.req.valid('json');
    fakeExpenses.push({...expense, id: fakeExpenses.length + 1})
    c.status(201)
    return c.json(expense)
})

expensesRoute.delete('/:id{[0-9]+}', c => {
    const id = Number.parseInt(c.req.param('id'));

    const index = fakeExpenses.findIndex(expense => expense.id === id)

    if (index === -1) {
        return c.notFound()
    }

    const deletedExpense = fakeExpenses.splice(index, 1)[0];

    return c.json({deletedExpense})
})

// app.put('/', c => {
//     return c.json({})
// })